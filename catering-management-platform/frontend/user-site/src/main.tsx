import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SiteSettingsProvider } from './contexts/SiteSettingsContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteSettingsProvider>
        <App />
      </SiteSettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
