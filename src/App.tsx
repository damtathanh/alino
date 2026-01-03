import { BrowserRouter, useLocation } from 'react-router-dom'
import { Router } from './router'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function AppContent() {
  const location = useLocation()
  
  // Check if we're in dashboard mode - hide Footer
  const isDashboardMode = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/profile') ||
                          location.pathname.startsWith('/settings')
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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

