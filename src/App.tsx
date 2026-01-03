import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

