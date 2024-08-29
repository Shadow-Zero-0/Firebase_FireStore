import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import er from './er.json';
const resources = {
    en: {
      translation: en
        
      
    },
    er: {
      translation: er
        
      
    }
  };
  i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection:{
        order: ['localStorage','htmlTag'],
        caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;