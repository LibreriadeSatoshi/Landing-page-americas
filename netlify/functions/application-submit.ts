/**
 * Netlify Function — Ambassador application form → Customer.io
 *
 * - PUT identify: refreshes profile attributes (does not set signup_source,
 *   so newsletter subscribers keep their original signup_source).
 * - POST event `application_submitted`: full payload for workflows / reporting.
 *
 * Env: CUSTOMERIO_SITE_ID, CUSTOMERIO_API_KEY, CUSTOMERIO_REGION (us|eu)
 *
 * POST /api/application-submit  JSON body = ambassador form fields + locale + timestamp (+ optional form label)
 */

const CUSTOMER_IO_HOSTS = {
  us: 'https://track.customer.io',
  eu: 'https://track-eu.customer.io',
} as const;

type Region = keyof typeof CUSTOMER_IO_HOSTS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

const VALID_LOCALES = ['es', 'en', 'pt'] as const;

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const getString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

/** Maps wizard payload (camelCase) → Customer.io-friendly attribute keys. */
function buildIdentifyAttributes(
  p: Record<string, unknown>
): Record<string, string | number | boolean> {
  const localeRaw = getString(p.locale).toLowerCase();
  const locale = (VALID_LOCALES as readonly string[]).includes(localeRaw) ? localeRaw : 'es';

  const applicationIntentRaw = getString(p.applicationIntent).toLowerCase();
  const application_intent: 'learner' | 'tutor' =
    applicationIntentRaw === 'tutor' ? 'tutor' : 'learner';

  const bool = (v: unknown): boolean => v === true;
  const str = (k: keyof typeof p) => getString(p[k as string]);

  return {
    email: getString(p.email).toLowerCase(),
    name: str('fullName'),
    application_submitted: true,
    application_source: 'americas_ambassador',
    application_intent,
    locale,
    full_name: str('fullName'),
    gender: str('gender'),
    country: str('country'),
    city: str('city'),
    timezone: str('timezone'),
    primary_language: str('primaryLanguage'),
    additional_languages: str('additionalLanguages'),
    read_write_languages: str('readWriteLanguages'),
    read_write_languages_detail: str('readWriteLanguagesDetail'),
    hear_about: str('hearAbout'),
    hours_per_week: str('hoursPerWeek'),
    commit_three_months: str('commitThreeMonths'),
    hope_to_learn: str('hopeToLearn'),
    help_community: str('helpCommunity'),
    has_laptop: str('hasLaptop'),
    internet_speed: str('internetSpeed'),
    video_conferencing: str('videoConferencing'),
    bitcoin_knowledge: str('bitcoinKnowledge'),
    used_bitcoin: str('usedBitcoin'),
    unique_optional: str('uniqueOptional'),
    questions_for_us: str('questionsForUs'),
    teaching_experience: str('teachingExperience'),
    programming_experience: str('programmingExperience'),
    anything_else: str('anythingElse'),
    consent_accepted: bool(p.consentAccepted),
    application_submitted_at: Math.floor(Date.now() / 1000),
  };
}

/** Event payload: snake_case copy of the form (plus metadata). CIO dashboards read this easily. */
function buildEventData(p: Record<string, unknown>): Record<string, unknown> {
  const attrs = buildIdentifyAttributes(p);
  const { email: _e, ...rest } = attrs;
  return {
    ...rest,
    form_label:
      typeof p.form === 'string' ? p.form : 'Americas Bitcoin Education — Ambassador Application',
    client_timestamp: typeof p.timestamp === 'string' ? p.timestamp : undefined,
  };
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { error: 'method_not_allowed' });
  }

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  const rawRegion = (process.env.CUSTOMERIO_REGION ?? 'us').toLowerCase();

  if (!siteId || !apiKey) {
    console.error('application-submit: missing Customer.io credentials');
    return json(500, { error: 'server_misconfigured' });
  }

  if (rawRegion !== 'us' && rawRegion !== 'eu') {
    console.error(`application-submit: invalid region "${rawRegion}"`);
    return json(500, { error: 'server_misconfigured' });
  }
  const region: Region = rawRegion;

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const email = getString(payload.email).toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return json(400, { error: 'invalid_email' });
  }

  const host = CUSTOMER_IO_HOSTS[region];
  const auth = btoa(`${siteId}:${apiKey}`);
  const customerId = encodeURIComponent(email);
  const headers = {
    'content-type': 'application/json',
    authorization: `Basic ${auth}`,
  };

  const identifyBody = buildIdentifyAttributes(payload);

  try {
    const identify = await fetch(`${host}/api/v1/customers/${customerId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(identifyBody),
    });

    if (!identify.ok) {
      const text = await identify.text().catch(() => '');
      console.error(
        `application-submit: identify failed ${identify.status} ${identify.statusText}: ${text.slice(0, 200)}`
      );
      return json(502, { error: 'upstream_failed' });
    }

    const event = await fetch(`${host}/api/v1/customers/${customerId}/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'application_submitted',
        data: buildEventData(payload),
      }),
    });

    if (!event.ok) {
      const text = await event.text().catch(() => '');
      console.error(
        `application-submit: event failed ${event.status} ${event.statusText}: ${text.slice(0, 200)}`
      );
      return json(502, { error: 'upstream_failed' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('application-submit: fetch failed', err);
    return json(502, { error: 'upstream_unreachable' });
  }
};
