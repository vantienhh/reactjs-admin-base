import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '../locales/en.json';
import vietnamese from '../locales/vi.json';

i18n.use(initReactI18next).init({
  react: {
    useSuspense: false
  },
  resources: {
    en: english,
    vi: vietnamese
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
