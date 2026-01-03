import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import UserMenu from './UserMenu'

export default function Header() {
  const { session, loading: authLoading, isAuthenticated } = useAuth()
  const { profile } = useProfile(session?.user?.id, isAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Read display_name and avatar_url from profiles table FIRST (primary source)
  // Fallback to auth metadata if profile not loaded or avatar_url is null
  const displayName = profile?.display_name || session?.user?.user_metadata?.display_name || undefined
  const avatarUrl = profile?.avatar_url || session?.user?.user_metadata?.avatar_url || undefined

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
          {authLoading ? null : session ? (
            <UserMenu 
              userEmail={session.user.email || ''}
              displayName={displayName}
              avatarUrl={avatarUrl}
            />
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
