import { useMemo, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BadgeCheck,
  Check,
  Coins,
  Community,
  Cpu,
  Folder,
  Globe,
  Leaf,
  NavArrowDown,
  Presentation,
  Suitcase,
} from 'iconoir-react';
import './LandingPage.css';
import LanguageSwitcher from './LanguageSwitcher';
import UnifiedFooter from './UnifiedFooter';
import type { ApplicationIntent } from '../constants/ambassadorForm';

type AudienceTab = 'learner' | 'teacher' | 'partner';

type FaqItem = {
  question: string;
  answer: string;
};

type HowCard = { title: string; body: string };
type BenefitCard = { title: string; body: string };

type LandingPageProps = {
  onApply?: (intent: ApplicationIntent) => void;
};

const benefitIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  BadgeCheck,
  Coins,
  Suitcase,
  Globe,
  Cpu,
  Folder,
];

function LandingPage({ onApply }: LandingPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AudienceTab>('learner');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = useMemo(
    () => t('landing.faqSection.items', { returnObjects: true }) as FaqItem[],
    [t]
  );

  const howCards = useMemo(
    () => t('landing.howSection.cards', { returnObjects: true }) as HowCard[],
    [t]
  );

  const benefitCards = useMemo(
    () => t('landing.benefitsSection.cards', { returnObjects: true }) as BenefitCard[],
    [t]
  );

  const learnerWhoItems = useMemo(
    () => t('landing.programSection.students.colWhoItems', { returnObjects: true }) as string[],
    [t]
  );

  const teacherWhoItems = useMemo(
    () => t('landing.programSection.teachers.colWhoItems', { returnObjects: true }) as string[],
    [t]
  );

  const partnerOppItems = useMemo(
    () => t('landing.programSection.partners.colOppItems', { returnObjects: true }) as string[],
    [t]
  );

  return (
    <div className="landing-page-root">
      <nav>
        <a href="#hero" className="nav-logo">
          {t('brand.prefix')} <span>{t('brand.highlight')}</span>
          {t('landing.nav.logoSuffix')}
        </a>
        <div className="landing-nav-end">
          <ul className="nav-links">
            <li>
              <a href="#about">{t('landing.nav.program')}</a>
            </li>
            <li>
              <a href="#about">{t('landing.nav.whyAfrica')}</a>
            </li>
            <li>
              <a href="#program">{t('landing.nav.howItWorks')}</a>
            </li>
            <li>
              <a href="#faq">{t('landing.nav.faq')}</a>
            </li>
            <li>
              <a href="#apply" className="nav-cta ism-btn ism-btn--on-color">
                {t('landing.nav.applyNow')}
              </a>
            </li>
          </ul>
          <LanguageSwitcher className="landing-lang-switcher flex-shrink-0" />
        </div>
      </nav>

      <section className="hero ism-block" id="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow ism-label ism-label--on-color">
              {t('landing.hero.eyebrow')}
            </div>
            <h1>
              {t('landing.hero.titleLine1')}
              <br />
              {t('landing.hero.titleLine2')}
              <br />
              <em>{t('landing.hero.titleEmphasis')}</em>
            </h1>
            <p className="hero-sub">{t('landing.hero.description')}</p>
            <div className="hero-actions">
              <button
                type="button"
                onClick={() => onApply?.('learner')}
                className="ism-btn ism-btn--on-color"
              >
                {t('landing.hero.applyAmbassador')}
              </button>
              <a href="#about" className="ism-btn ism-btn--on-color ism-btn--secondary">
                {t('landing.hero.exploreProgram')}
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-label ism-label ism-label--on-color">
              {t('landing.hero.cardTitle')}
            </div>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">{t('landing.hero.statNumberCountries')}</div>
                <div className="stat-label">{t('landing.hero.statCountries')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{t('landing.hero.statNumberLanguages')}</div>
                <div className="stat-label">{t('landing.hero.statLanguages')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{t('landing.hero.statNumberWeeks')}</div>
                <div className="stat-label">{t('landing.hero.statSchedule')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{t('landing.hero.statNumberFree')}</div>
                <div className="stat-label">{t('landing.hero.statFree')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-inner">
          <div className="section-label ism-label">{t('landing.programSection.label')}</div>
          <h2 className="section-title">{t('landing.programSection.title')}</h2>
          <p className="section-sub">{t('landing.programSection.description')}</p>

          <div className="tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'learner'}
              aria-controls="tab-students"
              className={`tab-btn ${activeTab === 'learner' ? 'active' : ''}`}
              onClick={() => setActiveTab('learner')}
            >
              {t('landing.programSection.tabLearners')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'teacher'}
              aria-controls="tab-teachers"
              className={`tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
            >
              {t('landing.programSection.tabEducators')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'partner'}
              aria-controls="tab-partners"
              className={`tab-btn ${activeTab === 'partner' ? 'active' : ''}`}
              onClick={() => setActiveTab('partner')}
            >
              {t('landing.programSection.tabPartners')}
            </button>
          </div>

          <div
            className={`tab-panel students ${activeTab === 'learner' ? 'active' : ''}`}
            id="tab-students"
            role="tabpanel"
          >
            <div className="panel-hero students">
              <div>
                <div className="panel-hero-icon" aria-hidden>
                  <Leaf />
                </div>
                <h3>{t('landing.programSection.students.title')}</h3>
                <p>{t('landing.programSection.students.body')}</p>
                <button type="button" onClick={() => onApply?.('learner')} className="ism-btn">
                  {t('landing.programSection.students.applyCta')}
                </button>
              </div>
              <div>
                <div className="feature-tiles students">
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.students.tileCommitment')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.students.tileCommitmentValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.students.tileWhat')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.students.tileWhatValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.students.tileWho')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.students.tileWhoValue')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col students">
              <div>
                <div className="col-head">{t('landing.programSection.students.colWhoTitle')}</div>
                <ul className="check-list">
                  {learnerWhoItems.map((item) => (
                    <li key={item}>
                      <Check aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="col-head">{t('landing.programSection.students.colLangTitle')}</div>
                <div className="pill-row">
                  <span className="pill">{t('landing.programSection.students.pillEnglish')}</span>
                  <span className="pill">{t('landing.programSection.students.pillFrench')}</span>
                  <span className="pill">Luganda</span>
                  <span className="pill">Kikuyu</span>
                  <span className="pill">Twi</span>
                  <span className="pill">Swahili</span>
                  <span className="pill">{t('landing.programSection.students.pillMore')}</span>
                </div>
                <div className="col-group">
                  <div className="col-head">
                    {t('landing.programSection.students.colCountriesTitle')}
                  </div>
                  <div className="pill-row">
                    <span className="pill">
                      {t('landing.programSection.students.countryNigeria')}
                    </span>
                    <span className="pill">
                      {t('landing.programSection.students.countryGhana')}
                    </span>
                    <span className="pill">
                      {t('landing.programSection.students.countryKenya')}
                    </span>
                    <span className="pill">
                      {t('landing.programSection.students.countryUganda')}
                    </span>
                    <span className="pill">
                      {t('landing.programSection.students.countryTanzania')}
                    </span>
                    <span className="pill">{t('landing.programSection.students.pillMore')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`tab-panel teachers ${activeTab === 'teacher' ? 'active' : ''}`}
            id="tab-teachers"
            role="tabpanel"
          >
            <div className="panel-hero teachers">
              <div>
                <div className="panel-hero-icon" aria-hidden>
                  <Presentation />
                </div>
                <h3>{t('landing.programSection.teachers.title')}</h3>
                <p>{t('landing.programSection.teachers.body')}</p>
                <button type="button" onClick={() => onApply?.('tutor')} className="ism-btn">
                  {t('landing.programSection.teachers.applyCta')}
                </button>
              </div>
              <div>
                <div className="feature-tiles teachers">
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.teachers.tilePersonas')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.teachers.tilePersonasValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.teachers.tileCohort')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.teachers.tileCohortValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.teachers.tileSupport')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.teachers.tileSupportValue')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col teachers">
              <div>
                <div className="col-head">{t('landing.programSection.teachers.colWhoTitle')}</div>
                <ul className="check-list">
                  {teacherWhoItems.map((item) => (
                    <li key={item}>
                      <Check aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="col-head">
                  {t('landing.programSection.teachers.colJourneyTitle')}
                </div>
                <ul className="check-list">
                  <li>
                    <Check aria-hidden />
                    <span>
                      <strong>{t('landing.programSection.teachers.journeyPhase1')}</strong>{' '}
                      {t('landing.programSection.teachers.journeyPhase1Body')}
                    </span>
                  </li>
                  <li>
                    <Check aria-hidden />
                    <span>
                      <strong>{t('landing.programSection.teachers.journeyPhase2')}</strong>{' '}
                      {t('landing.programSection.teachers.journeyPhase2Body')}
                    </span>
                  </li>
                  <li>
                    <Check aria-hidden />
                    <span>
                      <strong>{t('landing.programSection.teachers.journeyPhase3')}</strong>{' '}
                      {t('landing.programSection.teachers.journeyPhase3Body')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`tab-panel partners ${activeTab === 'partner' ? 'active' : ''}`}
            id="tab-partners"
            role="tabpanel"
          >
            <div className="panel-hero partners">
              <div>
                <div className="panel-hero-icon" aria-hidden>
                  <Community />
                </div>
                <h3>{t('landing.programSection.partners.title')}</h3>
                <p>{t('landing.programSection.partners.body')}</p>
                <a href="mailto:ambassadors@africabitcoineducation.org" className="ism-btn">
                  {t('landing.programSection.partners.cta')}
                </a>
              </div>
              <div>
                <div className="feature-tiles partners">
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.partners.tileReach')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.partners.tileReachValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.partners.tileOpportunity')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.partners.tileOpportunityValue')}
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label ism-label">
                      {t('landing.programSection.partners.tileHub')}
                    </div>
                    <div className="tile-value">
                      {t('landing.programSection.partners.tileHubValue')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col partners">
              <div>
                <div className="col-head">{t('landing.programSection.partners.colOppTitle')}</div>
                <ul className="check-list">
                  {partnerOppItems.map((item) => (
                    <li key={item}>
                      <Check aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="col-head">{t('landing.programSection.partners.colWhoTitle')}</div>
                <div className="pill-row">
                  <span className="pill">{t('landing.programSection.partners.pillNgo')}</span>
                  <span className="pill">{t('landing.programSection.partners.pillUni')}</span>
                  <span className="pill">{t('landing.programSection.partners.pillBitcoin')}</span>
                  <span className="pill">{t('landing.programSection.partners.pillTech')}</span>
                  <span className="pill">{t('landing.programSection.partners.pillGrants')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark ism-block" id="program">
        <div className="section-inner">
          <div className="section-label ism-label">{t('landing.howSection.label')}</div>
          <h2 className="section-title">{t('landing.howSection.title')}</h2>
          <p className="section-sub">{t('landing.howSection.description')}</p>

          <div className="how-grid">
            {howCards.map((card, index) => (
              <div key={card.title} className="how-card">
                <div className="how-num">{String(index + 1).padStart(2, '0')}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="benefits">
        <div className="section-inner">
          <div className="section-label ism-label">{t('landing.benefitsSection.label')}</div>
          <h2 className="section-title">{t('landing.benefitsSection.title')}</h2>
          <p className="section-sub">{t('landing.benefitsSection.description')}</p>

          <div className="benefits-grid">
            {benefitCards.map((card, index) => (
              <div key={card.title} className="benefit-card">
                <div className="benefit-icon" aria-hidden>
                  {(() => {
                    const Icon = benefitIcons[index];
                    return Icon ? <Icon /> : null;
                  })()}
                </div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-inner">
          <div className="section-label ism-label">{t('landing.faqSection.label')}</div>
          <h2 className="section-title">{t('landing.faqSection.title')}</h2>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={`faq-${index}`} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className="icon" aria-hidden>
                      <NavArrowDown />
                    </span>
                  </button>
                  <div className="faq-a">{item.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner ism-block" id="apply">
        <div className="cta-inner">
          <h2>
            {t('landing.cta.titleLine1')}
            <br />
            {t('landing.cta.titleLine2')} <em>{t('landing.cta.titleEmphasis')}</em>
          </h2>
          <p>{t('landing.cta.description')}</p>
          <div className="cta-actions">
            <button
              type="button"
              onClick={() => onApply?.('learner')}
              className="ism-btn ism-btn--on-color"
            >
              {t('landing.cta.applyLearner')}
            </button>
            <button
              type="button"
              onClick={() => onApply?.('tutor')}
              className="ism-btn ism-btn--on-color ism-btn--secondary"
            >
              {t('landing.cta.becomeTutor')}
            </button>
            <a
              href="mailto:ambassadors@africabitcoineducation.org"
              className="ism-btn ism-btn--on-color ism-btn--secondary"
            >
              {t('landing.cta.partnerWithUs')}
            </a>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}

export default LandingPage;
