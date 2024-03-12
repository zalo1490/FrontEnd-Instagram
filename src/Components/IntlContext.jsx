import { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locale/en.json";
import es from "../locale/es.json";
import it from "../locale/it.json";

const messages = { es, en, it };

const IntlContext = createContext();

export const MyIntlProvider = ({ children }) => {
  const [lang, setLang] = useState(navigator.language || "es");

  return (
    <IntlContext.Provider value={[lang, setLang]}>
      <IntlProvider
        messages={messages[lang] || messages.es}
        locale={lang}
        defaultLocale="es"
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useLang = () => useContext(IntlContext);
