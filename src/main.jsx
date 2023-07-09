import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './style/ResetStyle'
import GlobalStyle from './style/GlobalStyle'
import { LoginProvider } from './Contexts/LoginContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <LoginProvider>

      <App />

    </LoginProvider>
  </React.StrictMode>
)
