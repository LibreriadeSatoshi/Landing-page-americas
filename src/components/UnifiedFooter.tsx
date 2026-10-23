import { useState } from 'react';
import {
  CheckCircle,
  Discord,
  Mail,
  Telegram,
  Twitter,
  WarningCircle,
  Youtube,
} from 'iconoir-react';
import { useTranslation } from 'react-i18next';
import './UnifiedFooter.css';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error';
type ErrorKey = 'invalidEmail' | 'subscribeError';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPPORTED_LOCALES = ['en', 'fr', 'sw'] as const;

export default function UnifiedFooter() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorKey, setErrorKey] = useState<ErrorKey>('subscribeError');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setErrorKey('invalidEmail');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Send only the 2-letter base locale (e.g. "en-US" → "en") and only if supported.
    const base = (i18n.language ?? 'en').slice(0, 2).toLowerCase();
    const locale = (SUPPORTED_LOCALES as readonly string[]).includes(base) ? base : 'en';

    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorKey(data.error === 'invalid_email' ? 'invalidEmail' : 'subscribeError');
        setStatus('error');
        return;
      }

      setEmail('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setErrorKey('subscribeError');
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';
  const year = new Date().getFullYear();

  return (
    <footer className="unified-footer ism-block">
      <div className="footer-content">
        <section className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-text">
              <h3>{t('unifiedFooter.newsletterTitle')}</h3>
              <p>{t('unifiedFooter.newsletterDescription')}</p>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form" noValidate>
              <div className="form-group">
                <input
                  type="email"
                  placeholder={t('unifiedFooter.emailPlaceholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  required
                  disabled={isSubmitting}
                  autoComplete="email"
                  className="email-input ism-field__input"
                  aria-invalid={status === 'error'}
                  aria-describedby="newsletter-status"
                />
                <button
                  type="submit"
                  className="subscribe-btn ism-btn ism-btn--on-color"
                  disabled={isSubmitting}
                >
                  <Mail aria-hidden />
                  {isSubmitting ? t('unifiedFooter.subscribing') : t('unifiedFooter.subscribe')}
                </button>
              </div>
              <div id="newsletter-status" aria-live="polite" role="status">
                {status === 'success' && (
                  <p className="success-message">
                    <CheckCircle aria-hidden />
                    {t('unifiedFooter.subscribeSuccess')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="error-message">
                    <WarningCircle aria-hidden />
                    {t(`unifiedFooter.${errorKey}`)}
                  </p>
                )}
              </div>
              <p className="consent-text">
                {t('unifiedFooter.consent')}
                <a href="#"> {t('unifiedFooter.privacyPolicy')}</a>
              </p>
            </form>
          </div>
        </section>

        <section className="footer-grid">
          <div className="footer-column">
            <h4 className="footer-title ism-label ism-label--on-color">
              {t('unifiedFooter.columnProgram')}
            </h4>
            <ul className="footer-links">
              <li>
                <a href="#about">{t('unifiedFooter.linkLearners')}</a>
              </li>
              <li>
                <a href="#about">{t('unifiedFooter.linkEducators')}</a>
              </li>
              <li>
                <a href="#about">{t('unifiedFooter.linkPartners')}</a>
              </li>
              <li>
                <a href="#apply" className="cta-link">
                  {t('unifiedFooter.linkApplyNow')}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title ism-label ism-label--on-color">
              {t('unifiedFooter.columnLearn')}
            </h4>
            <ul className="footer-links">
              <li>
                <a href="#">{t('unifiedFooter.linkBitcoinBasics')}</a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkResources')}</a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkBlog')}</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title ism-label ism-label--on-color">
              {t('unifiedFooter.columnExplore')}
            </h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://libreria.bitcoin.education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('unifiedFooter.linkLibreria')}
                </a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkDocumentation')}</a>
              </li>
              <li>
                <a href="#faq">{t('unifiedFooter.linkFaq')}</a>
              </li>
              <li>
                <a href="mailto:ambassadors@africabitcoineducation.org">
                  {t('unifiedFooter.linkContact')}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title ism-label ism-label--on-color">
              {t('unifiedFooter.columnConnect')}
            </h4>
            <div className="social-links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaTwitter')}
              >
                <Twitter aria-hidden />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaTelegram')}
              >
                <Telegram aria-hidden />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaYoutube')}
              >
                <Youtube aria-hidden />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaDiscord')}
              >
                <Discord aria-hidden />
              </a>
            </div>
            <div className="social-text">
              <p>{t('unifiedFooter.connectBlurb')}</p>
            </div>
          </div>
        </section>

        <section className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              <strong>{t('unifiedFooter.bottomLead')}</strong> · {t('unifiedFooter.bottomTagline')}
            </p>
            <p className="copyright">{t('unifiedFooter.copyright', { year })}</p>
          </div>
          <div className="footer-bottom-right">
            <a href="#">{t('unifiedFooter.legalPrivacy')}</a>
            <a href="#">{t('unifiedFooter.legalTerms')}</a>
            <a href="#">{t('unifiedFooter.legalConduct')}</a>
          </div>
        </section>
      </div>
    </footer>
  );
}
