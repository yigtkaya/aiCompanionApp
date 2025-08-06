import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';

import en from './locales/en.json';
import es from './locales/es.json';

const storage = new MMKV({
  id: 'app-localization',
});

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const savedLanguage = storage.getString('language');
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
const fallbackLanguage = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || deviceLanguage || fallbackLanguage,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  storage.set('language', lng);
});

export default i18n;