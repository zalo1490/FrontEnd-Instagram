import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { MyIntlProvider } from './Components/IntlContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { UserProvider } from './UserContext.jsx'
import ErrorBoundary from './Components/Errors/ErrorBoundary.jsx'
import GenericError from './Components/Errors/GenericError.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <MyIntlProvider>
        <ThemeProvider>
          <BrowserRouter>
            <ErrorBoundary fallback={<GenericError />}>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </MyIntlProvider>
    </UserProvider>
  </React.StrictMode>
)
