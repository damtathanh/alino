import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import UserMenu from './UserMenu'

export default function Header() {
  const { session, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src="/logo/logo.png" alt="ALINO" className="w-8 h-8" />
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
            ALINO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm text-[#6B7280]">
          <a href="#about">Về chúng tôi</a>
          <a href="#product">Sản phẩm</a>
          <a href="#news">Tin tức</a>
          <a href="#contact">Liên hệ</a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {loading ? null : session ? (
            <UserMenu userEmail={session.user.email || ''} />
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899]"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
