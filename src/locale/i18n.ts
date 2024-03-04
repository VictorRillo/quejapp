import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import * as esJSON from 'locale/es.json'
import * as glJSON from 'locale/gl.json'

i18n.use(initReactI18next).init({
    resources: {
        es: { ...esJSON },
        gl: { ...glJSON },
      },
 lng: "es"
});