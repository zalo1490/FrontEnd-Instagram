import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  const betterSetTheme = (theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeContext.Provider value={[theme, betterSetTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
