// src/i18n.ts
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ENGLISH from "../locales/en.json"
import VIETNAMESE from "../locales/vi.json"

export const defaultNS = "ns2";
export const resources = {
  en: {
    main: ENGLISH,
  },
  vi: {
    main: VIETNAMESE,
  },
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
