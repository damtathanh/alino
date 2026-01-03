import { BrowserRouter, useLocation } from 'react-router-dom'
import { Router } from './router'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function AppContent() {
  const location = useLocation()
  
  // Check if we're in dashboard mode - hide Header and Footer
  const isDashboardMode = location.pathname.startsWith('/dashboard')
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardMode && <Header />}
      <main className="flex-1">
        <Router />
      </main>
      {!isDashboardMode && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

export default App

