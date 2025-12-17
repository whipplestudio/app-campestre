import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';

// Define supported languages
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Default to Spanish for Club Campestre de Tampico
const preferredLanguage = 'es';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: preferredLanguage, // Default to Spanish
    fallbackLng: 'es', // Fallback if translations are missing
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;