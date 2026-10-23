import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import frCommon from './locales/fr/common.json';
import swCommon from './locales/sw/common.json';

const resources = {
  en: { common: enCommon },
  fr: { common: frCommon },
  sw: { common: swCommon },
} as const;

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr', 'sw'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
