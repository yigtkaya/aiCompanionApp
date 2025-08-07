import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
const fallbackLanguage = 'en';

// Initialize with device language first, then update with saved language
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage || fallbackLanguage,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

// Asynchronously load saved language and update
AsyncStorage.getItem('language').then((savedLanguage) => {
  if (savedLanguage && savedLanguage !== i18n.language) {
    i18n.changeLanguage(savedLanguage);
  }
});

i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem('language', lng);
});

export default i18n;