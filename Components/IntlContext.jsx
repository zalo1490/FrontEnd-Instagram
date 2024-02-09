import { createContext, useContext, useState } from "react"
import { IntlProvider } from 'react-intl'
import en from '../locale/en.json'
import es from '../locale/es.json'

const messages = { en, es }

const IntlContext = createContext()

export const MyIntlProvider = ({ children }) => {
  const [lang, setLang] = useState(navigator.language || 'en')

  return (
    <IntlContext.Provider value={[lang, setLang]}>
      <IntlProvider messages={messages[lang] || messages.en} locale={lang} defaultLocale="en">
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  )
}

export const useLang = () => useContext(IntlContext);
