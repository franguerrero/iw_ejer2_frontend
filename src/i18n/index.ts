import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enApp from "./en/app.json";
import esApp from "./es/app.json";
import enCommon from "./en/common.json";
import esCommon from "./es/common.json";
import enClientForm from "./en/clientForm.json";
import esClientForm from "./es/clientForm.json";
import enDashboard from "./en/dashboard.view.json";
import esDashboard from "./es/dashboard.view.json";
import enClients from "./en/clients.view.json";
import esClients from "./es/clients.view.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "es", // 'en' | 'es'
  resources: {
    en: {
      translation: {
        app: enApp,
        common: enCommon,
        clientForm: enClientForm,
        dashboard: enDashboard,
        clients: enClients,
      },
    },
    es: {
      translation: {
        app: esApp,
        common: esCommon,
        clientForm: esClientForm,
        dashboard: esDashboard,
        clients: esClients,
      },
    },
  },
});

export default i18next;
