/**
 * Netlify Function — Newsletter subscribe → Customer.io
 *
 * Server-side proxy that identifies a person in Customer.io with
 * `newsletter_subscribed: true`. The actual welcome email is sent by a
 * Customer.io campaign whose trigger is "attribute newsletter_subscribed
 * becomes true" — configured in the Customer.io dashboard, NOT here.
 *
 * Required environment variables (set in Netlify → Site settings → Environment):
 *   - CUSTOMERIO_SITE_ID    Track API site ID
 *   - CUSTOMERIO_API_KEY    Track API key (NEVER expose client-side)
 *   - CUSTOMERIO_REGION     "us" (default) or "eu"
 *
 * Request:  POST /api/newsletter-subscribe   { email: string, locale?: "es"|"en"|"pt" }
 * Response: 200 { ok: true } | 4xx/5xx { error: string }
 */

const CUSTOMER_IO_HOSTS = {
  us: 'https://track.customer.io',
  eu: 'https://track-eu.customer.io',
} as const;

type Region = keyof typeof CUSTOMER_IO_HOSTS;

const VALID_LOCALES = ['es', 'en', 'pt'] as const;
type Locale = (typeof VALID_LOCALES)[number];

// Pragmatic email check; Customer.io performs its own deliverability validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { error: 'method_not_allowed' });
  }

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  const rawRegion = (process.env.CUSTOMERIO_REGION ?? 'us').toLowerCase();

  if (!siteId || !apiKey) {
    console.error('newsletter-subscribe: missing Customer.io credentials');
    return json(500, { error: 'server_misconfigured' });
  }

  if (rawRegion !== 'us' && rawRegion !== 'eu') {
    console.error(`newsletter-subscribe: invalid region "${rawRegion}"`);
    return json(500, { error: 'server_misconfigured' });
  }
  const region: Region = rawRegion;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const body = (payload ?? {}) as { email?: unknown; locale?: unknown };
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return json(400, { error: 'invalid_email' });
  }

  const rawLocale = typeof body.locale === 'string' ? body.locale.toLowerCase() : '';
  const locale: Locale = (VALID_LOCALES as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : 'es';

  // Track API uses HTTP Basic auth: site_id:api_key, base64-encoded.
  const auth = btoa(`${siteId}:${apiKey}`);

  // Use the email as the Customer.io customer ID for newsletter-only flows.
  // PUT is idempotent: re-subscribing simply refreshes the attributes
  // (and re-fires the welcome trigger only if the attribute actually changes).
  const url = `${CUSTOMER_IO_HOSTS[region]}/api/v1/customers/${encodeURIComponent(email)}`;

  try {
    const cio = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email,
        newsletter_subscribed: true,
        signup_source: 'africa_ambassador',
        locale,
        created_at: Math.floor(Date.now() / 1000),
      }),
    });

    if (!cio.ok) {
      const text = await cio.text().catch(() => '');
      console.error(
        `newsletter-subscribe: Customer.io ${cio.status} ${cio.statusText}: ${text.slice(0, 200)}`
      );
      return json(502, { error: 'upstream_failed' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('newsletter-subscribe: fetch failed', err);
    return json(502, { error: 'upstream_unreachable' });
  }
};
