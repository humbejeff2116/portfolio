import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/theme/Theme.contextProvider.tsx'
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <ThemeProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </ThemeProvider>
    </Router>
  </StrictMode>,
)
