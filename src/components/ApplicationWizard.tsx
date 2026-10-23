import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, CheckCircle, Send, WarningCircle } from 'iconoir-react';
import {
  ADDITIONAL_LANGUAGES_OPTIONS,
  AMERICAS_COUNTRIES,
  type ApplicationIntent,
  HEAR_ABOUT_OPTIONS,
  HOURS_PER_WEEK_OPTIONS,
  PRIMARY_LANGUAGE_OPTIONS,
  STORAGE_KEY,
  TIMEZONES,
} from '../constants/ambassadorForm';
import './ApplicationWizard.css';

export type AmbassadorFormValues = {
  // Section 1
  fullName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  timezone: string;
  primaryLanguage: string;
  additionalLanguages: string;
  readWriteLanguages: 'yes' | 'no' | '';
  readWriteLanguagesDetail: string;
  hearAbout: string;
  // Section 2
  hoursPerWeek: string;
  commitThreeMonths: 'yes' | 'no' | '';
  hopeToLearn: string;
  helpCommunity: string;
  hasLaptop: 'yes' | 'no' | '';
  internetSpeed: string;
  videoConferencing: 'yes' | 'no' | '';
  // Section 4
  bitcoinKnowledge: string;
  usedBitcoin: 'yes' | 'no' | '';
  uniqueOptional: string;
  questionsForUs: string;
  teachingExperience: string;
  programmingExperience: string;
  anythingElse: string;
  consentAccepted: boolean;
};

const defaultValues: AmbassadorFormValues = {
  fullName: '',
  email: '',
  gender: '',
  country: '',
  city: '',
  timezone: '',
  primaryLanguage: '',
  additionalLanguages: '',
  readWriteLanguages: '',
  readWriteLanguagesDetail: '',
  hearAbout: '',
  hoursPerWeek: '',
  commitThreeMonths: '',
  hopeToLearn: '',
  helpCommunity: '',
  hasLaptop: '',
  internetSpeed: '',
  videoConferencing: '',
  bitcoinKnowledge: '',
  usedBitcoin: '',
  uniqueOptional: '',
  questionsForUs: '',
  teachingExperience: '',
  programmingExperience: '',
  anythingElse: '',
  consentAccepted: false,
};

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const STEP1_FIELDS: (keyof AmbassadorFormValues)[] = [
  'fullName',
  'email',
  'gender',
  'country',
  'city',
  'timezone',
  'primaryLanguage',
  'additionalLanguages',
  'readWriteLanguages',
  'readWriteLanguagesDetail',
  'hearAbout',
];

const STEP2_FIELDS: (keyof AmbassadorFormValues)[] = [
  'hoursPerWeek',
  'commitThreeMonths',
  'hopeToLearn',
  'helpCommunity',
  'hasLaptop',
  'internetSpeed',
  'videoConferencing',
];

type ApplicationWizardProps = {
  onClose: () => void;
  applicationIntent: ApplicationIntent;
};

export default function ApplicationWizard({
  onClose,
  applicationIntent,
}: Readonly<ApplicationWizardProps>) {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AmbassadorFormValues>({
    defaultValues,
    mode: 'onTouched',
  });

  const readWriteLanguagesChoice = watch('readWriteLanguages');

  useEffect(() => {
    if (readWriteLanguagesChoice === 'no') {
      setValue('readWriteLanguagesDetail', '');
    }
  }, [readWriteLanguagesChoice, setValue]);

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { values?: AmbassadorFormValues; step?: number };
      if (parsed.values) reset({ ...defaultValues, ...parsed.values });
      if (typeof parsed.step === 'number' && parsed.step >= 0 && parsed.step <= 2) {
        setStep(parsed.step);
      }
    } catch {
      /* ignore */
    }
  }, [reset]);

  const formSnapshot = watch();
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: getValues(), step }));
    } catch {
      /* ignore */
    }
  }, [formSnapshot, step, getValues]);

  const inputClass = (hasError: boolean) =>
    `ism-field__input aw-input${hasError ? ' aw-input--error' : ''}`;

  const labelClass = 'aw-label';

  const validateStep1 = async () => {
    return trigger(STEP1_FIELDS);
  };

  const validateStep2 = async () => {
    const v = getValues();
    if (wordCount(v.hopeToLearn) > 200) {
      await trigger('hopeToLearn');
      return false;
    }
    return trigger(STEP2_FIELDS);
  };

  const goNext = async () => {
    if (step === 0) {
      const valid = await validateStep1();
      if (valid) setStep(1);
      return;
    }
    if (step === 1) {
      const valid = await validateStep2();
      if (valid) setStep(2);
    }
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onFinalSubmit = async (data: AmbassadorFormValues) => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const base = (i18n.language ?? 'es').slice(0, 2).toLowerCase();
      const locale = ['es', 'en', 'pt'].includes(base) ? base : 'es';

      const res = await fetch('/api/application-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Integration identifier read by Customer.io as form_label, not interface copy: keep it
          // byte-identical to the default in netlify/functions/application-submit.ts.
          form: 'Africa Bitcoin Education \u2014 Ambassador Application',
          applicationIntent,
          ...data,
          locale,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error('application_submit_failed');
      }

      setSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      reset(defaultValues);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const bitcoinKnowledgeOptions = [
    { value: 'beginner', label: t('application.bitcoinOptions.beginner') },
    { value: 'intermediate', label: t('application.bitcoinOptions.intermediate') },
    { value: 'advanced', label: t('application.bitcoinOptions.advanced') },
    { value: 'expert', label: t('application.bitcoinOptions.expert') },
  ];

  if (submitted) {
    return (
      <div className="aw-success ism-block" data-testid="application-success">
        <div className="aw-success__inner">
          <CheckCircle className="aw-success__icon" aria-hidden />
          <h1 className="aw-success__title">{t('application.success.title')}</h1>
          <p className="aw-success__text">{t('application.success.description')}</p>
          <button type="button" onClick={onClose} className="ism-btn ism-btn--on-color">
            {t('application.backHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="aw-page" data-testid="application-wizard">
      <div className="aw-container">
        <div className="aw-head">
          <button type="button" onClick={onClose} className="aw-backlink">
            <ArrowLeft aria-hidden />
            {t('application.backHome')}
          </button>
          <p className="ism-label">{t('application.label')}</p>
          <h1 className="aw-title">{t('application.title')}</h1>
          <p className="aw-description">{t('application.description')}</p>
          <progress className="aw-progress" value={step + 1} max={3} />
          <p className="aw-progress-count">
            {t('application.stepOf', { current: step + 1, total: 3 })}
          </p>
        </div>

        <form onSubmit={handleSubmit(onFinalSubmit)} className="aw-form">
          {/* Step 1: Personal */}
          {step === 0 && (
            <div className="aw-step" data-testid="wizard-step-1">
              <h2 className="aw-section-title">{t('application.sections.one')}</h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.fullName')} <span className="aw-required">*</span>
                </label>
                <input
                  type="text"
                  className={inputClass(!!errors.fullName)}
                  {...register('fullName', { required: 'Required' })}
                />
                {errors.fullName && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.email')} <span className="aw-required">*</span>
                </label>
                <input
                  type="email"
                  className={inputClass(!!errors.email)}
                  {...register('email', {
                    required: 'Required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.gender')} <span className="aw-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('application.placeholders.gender')}
                  className={inputClass(!!errors.gender)}
                  {...register('gender', { required: 'Required' })}
                />
                {errors.gender && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="aw-grid-2">
                <div>
                  <label className={labelClass}>
                    {t('application.fields.country')} <span className="aw-required">*</span>
                  </label>
                  <select
                    className={inputClass(!!errors.country)}
                    {...register('country', { required: 'Required' })}
                  >
                    <option value="">{t('application.select.country')}</option>
                    {AMERICAS_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="aw-error">
                      <WarningCircle aria-hidden />
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>
                    {t('application.fields.city')} <span className="aw-required">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass(!!errors.city)}
                    {...register('city', { required: 'Required' })}
                  />
                  {errors.city && (
                    <p className="aw-error">
                      <WarningCircle aria-hidden />
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.timezone')} <span className="aw-required">*</span>
                </label>
                <select
                  className={inputClass(!!errors.timezone)}
                  {...register('timezone', { required: 'Required' })}
                >
                  <option value="">{t('application.select.timezone')}</option>
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                {errors.timezone && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.timezone.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.primaryLanguage')} <span className="aw-required">*</span>
                </label>
                <select
                  className={inputClass(!!errors.primaryLanguage)}
                  {...register('primaryLanguage', { required: 'Required' })}
                >
                  <option value="">{t('application.select.language')}</option>
                  {PRIMARY_LANGUAGE_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.primaryLanguage && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.primaryLanguage.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.additionalLanguages')}{' '}
                  <span className="aw-required">*</span>
                </label>
                <select
                  className={inputClass(!!errors.additionalLanguages)}
                  {...register('additionalLanguages', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
                  {ADDITIONAL_LANGUAGES_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.additionalLanguages && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.additionalLanguages.message}
                  </p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.readWriteLanguages')}{' '}
                  <span className="aw-required">*</span>
                </span>
                <div className="aw-choices">
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="yes"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.yes')}</span>
                  </label>
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="no"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.no')}</span>
                  </label>
                </div>
                {readWriteLanguagesChoice === 'yes' && (
                  <div className="aw-subfield">
                    <label className={labelClass} htmlFor="readWriteLanguagesDetail">
                      {t('application.fields.readWriteLanguagesDetail')}{' '}
                      <span className="aw-required">*</span>
                    </label>
                    <input
                      id="readWriteLanguagesDetail"
                      type="text"
                      autoComplete="off"
                      placeholder={t('application.placeholders.readWriteLanguagesDetail')}
                      className={inputClass(!!errors.readWriteLanguagesDetail)}
                      {...register('readWriteLanguagesDetail', {
                        validate: (value, formValues) =>
                          formValues.readWriteLanguages !== 'yes' ||
                          value.trim().length > 0 ||
                          'Required',
                      })}
                    />
                    {errors.readWriteLanguagesDetail && (
                      <p className="aw-error">
                        <WarningCircle aria-hidden />
                        {errors.readWriteLanguagesDetail.message}
                      </p>
                    )}
                  </div>
                )}
                {errors.readWriteLanguages && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.readWriteLanguages.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hearAbout')} <span className="aw-required">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hearAbout)}
                  {...register('hearAbout', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
                  {HEAR_ABOUT_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.hearAbout && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.hearAbout.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Commitment */}
          {step === 1 && (
            <div className="aw-step" data-testid="wizard-step-2">
              <h2 className="aw-section-title">{t('application.sections.two')}</h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hoursPerWeek')} <span className="aw-required">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hoursPerWeek)}
                  {...register('hoursPerWeek', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
                  {HOURS_PER_WEEK_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.hoursPerWeek && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.hoursPerWeek.message}
                  </p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.commitThreeMonths')} <span className="aw-required">*</span>
                </span>
                <div className="aw-choices">
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="yes"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.yes')}</span>
                  </label>
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="no"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.no')}</span>
                  </label>
                </div>
                {errors.commitThreeMonths && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.commitThreeMonths.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hopeToLearn')} <span className="aw-required">*</span>
                  <span className="aw-label-note"> {t('application.maxWords')}</span>
                </label>
                <textarea
                  rows={6}
                  className={`${inputClass(!!errors.hopeToLearn)} aw-textarea`}
                  {...register('hopeToLearn', {
                    required: 'Required',
                    validate: (v) =>
                      wordCount(v) <= 200 || `Maximum 200 words (currently ${wordCount(v)})`,
                  })}
                />
                <p className="aw-help">
                  {t('application.wordsCount', {
                    current: wordCount(watch('hopeToLearn')),
                    max: 200,
                  })}
                </p>
                {errors.hopeToLearn && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.hopeToLearn.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.helpCommunity')} <span className="aw-required">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`${inputClass(!!errors.helpCommunity)} aw-textarea`}
                  {...register('helpCommunity', { required: 'Required' })}
                />
                {errors.helpCommunity && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.helpCommunity.message}
                  </p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.hasLaptop')} <span className="aw-required">*</span>
                </span>
                <div className="aw-choices">
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="yes"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.yes')}</span>
                  </label>
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="no"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.no')}</span>
                  </label>
                </div>
                {errors.hasLaptop && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.hasLaptop.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.internetSpeedPrefix')}{' '}
                  <a href="https://fast.com" target="_blank" rel="noopener noreferrer">
                    fast.com
                  </a>
                  {t('application.fields.internetSpeedSuffix')}{' '}
                  <span className="aw-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('application.placeholders.internetSpeed')}
                  className={inputClass(!!errors.internetSpeed)}
                  {...register('internetSpeed', { required: 'Required' })}
                />
                {errors.internetSpeed && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.internetSpeed.message}
                  </p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.videoConferencing')} <span className="aw-required">*</span>
                </span>
                <div className="aw-choices">
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="yes"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.yes')}</span>
                  </label>
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="no"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.no')}</span>
                  </label>
                </div>
                {errors.videoConferencing && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.videoConferencing.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Bitcoin + submit */}
          {step === 2 && (
            <div className="aw-step" data-testid="wizard-step-3">
              <h2 className="aw-section-title">{t('application.sections.three')}</h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.bitcoinKnowledge')} <span className="aw-required">*</span>
                </label>
                <div className="aw-options">
                  {bitcoinKnowledgeOptions.map((opt) => (
                    <label key={opt.value} className="aw-option">
                      <input
                        type="radio"
                        value={opt.value}
                        {...register('bitcoinKnowledge', { required: 'Please select' })}
                      />
                      <span className="aw-choice-text">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errors.bitcoinKnowledge && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.bitcoinKnowledge.message}
                  </p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.usedBitcoin')} <span className="aw-required">*</span>
                </span>
                <div className="aw-choices">
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="yes"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.yes')}</span>
                  </label>
                  <label className="aw-choice">
                    <input
                      type="radio"
                      value="no"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="aw-choice-text">{t('common.no')}</span>
                  </label>
                </div>
                {errors.usedBitcoin && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.usedBitcoin.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.uniqueOptional')}</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} aw-textarea`}
                  {...register('uniqueOptional')}
                />
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.questionsForUs')}</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} aw-textarea`}
                  {...register('questionsForUs')}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.teachingExperience')}{' '}
                  <span className="aw-required">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={t('application.placeholders.teaching')}
                  className={`${inputClass(!!errors.teachingExperience)} aw-textarea`}
                  {...register('teachingExperience', { required: 'Required' })}
                />
                {errors.teachingExperience && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.teachingExperience.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.programmingExperience')}{' '}
                  <span className="aw-required">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={t('application.placeholders.programming')}
                  className={`${inputClass(!!errors.programmingExperience)} aw-textarea`}
                  {...register('programmingExperience', { required: 'Required' })}
                />
                {errors.programmingExperience && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.programmingExperience.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.anythingElse')}</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} aw-textarea`}
                  {...register('anythingElse')}
                />
              </div>

              <div className="aw-consent">
                <label className="aw-consent-label">
                  <input
                    type="checkbox"
                    className="aw-checkbox"
                    {...register('consentAccepted', {
                      validate: (v) => v === true || 'You must confirm to submit',
                    })}
                  />
                  <span className="aw-consent-text">{t('application.fields.submitConsent')}</span>
                </label>
                {errors.consentAccepted && (
                  <p className="aw-error">
                    <WarningCircle aria-hidden />
                    {errors.consentAccepted.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Nav */}
          {submitError && (
            <p className="aw-alert" role="alert">
              <WarningCircle aria-hidden />
              {t('application.submitError')}
            </p>
          )}
          <div className="aw-actions">
            {step > 0 && (
              <button type="button" onClick={goBack} className="ism-btn ism-btn--secondary aw-back">
                <ArrowLeft aria-hidden />
                {t('application.back')}
              </button>
            )}
            {step < 2 && (
              <button type="button" onClick={goNext} className="ism-btn aw-next">
                {t('application.continue')}
                <ArrowRight aria-hidden />
              </button>
            )}
            {step === 2 && (
              <button type="submit" disabled={submitting} className="ism-btn aw-next">
                {submitting ? (
                  <>
                    <span className="aw-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </span>
                    {t('application.submitting')}
                  </>
                ) : (
                  <>
                    <Send aria-hidden />
                    {t('application.submit')}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
