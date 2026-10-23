import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import ptCommon from './locales/pt/common.json';

const resources = {
  es: { common: esCommon },
  en: { common: enCommon },
  pt: { common: ptCommon },
} as const;

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage ?? 'es',
  fallbackLng: 'es',
  supportedLngs: ['es', 'en', 'pt'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
