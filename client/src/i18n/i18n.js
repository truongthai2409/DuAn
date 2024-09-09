import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { LOGIN_EN } from "../locals/en/login";
import { LOGIN_VI } from "../locals/vi/login";
import { PROFILE_EN } from "../locals/en/profile";
import { PROFILE_VI } from "../locals/vi/profile";
import { MAIN_EN } from "../locals/en/main";
import { MAIN_VI } from "../locals/vi/main";
import { FUNCTION_EN } from "../locals/en/function";
import { FUNCTION_VI } from "../locals/vi/function";
import { REGISTER_EN } from "../locals/en/register";
import { REGISTER_VI } from "../locals/vi/register";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        login: LOGIN_EN,
        profile: PROFILE_EN,
        main: MAIN_EN,
        function: FUNCTION_EN,
        register: REGISTER_EN,
      },
      vi: {
        login: LOGIN_VI,
        profile: PROFILE_VI,
        main: MAIN_VI,
        function: FUNCTION_VI,
        register: REGISTER_VI,
      }
    },
    lng: "vi", // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",
    // ns: ['login', 'profile'],
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }

  });

export default i18n;