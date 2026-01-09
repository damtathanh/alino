import { BrowserRouter, useLocation } from 'react-router-dom'
import { Router } from './app/router'
import ScrollToTop from './components/shared/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'

function AppContent() {
  const location = useLocation()
  
  // Dashboard routes don't show header/footer
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
      <AuthProvider>
      <ScrollToTop />
    <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

