import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import * as esJSON from 'assets/i18n/es.json'
import * as glJSON from 'assets/i18n/gl.json'

i18n.use(initReactI18next).init({
    resources: {
        es: { ...esJSON },
        gl: { ...glJSON },
      },
 lng: "es"
});