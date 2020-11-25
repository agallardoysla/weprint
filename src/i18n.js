import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ES from './utils/i18n/es.json';

const resources = {
  es: ES,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
});

export default i18n;
