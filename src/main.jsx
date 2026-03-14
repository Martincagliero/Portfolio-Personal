import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './Portfolio.jsx'
import AllProjects from './AllProjects.jsx'
import AxusPage from './AxusPage.jsx'
import Preloader from './Preloader.jsx'
import { LanguageProvider } from './LanguageContext.jsx'
import './index.css'

function AppShell() {
  const [showPreloader, setShowPreloader] = React.useState(true)

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <div className={`app-shell ${showPreloader ? 'app-shell-loading' : 'app-shell-ready'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/axus" element={<AxusPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  </React.StrictMode>,
)
