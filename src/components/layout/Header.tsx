import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import UserMenu from './UserMenu'

/**
 * Landing Page Header Component
 * - Used ONLY on landing pages (not dashboard)
 * - Contains: Logo | Navigation | UserMenu
 */
export default function Header() {
  const { session, loading: authLoading } = useAuth()
  const { profile } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const displayName =
    (profile?.role === 'creator' ? (profile as any).full_name : profile?.role === 'brand' ? (profile as any).brand_name : null) ||
    session?.user?.user_metadata?.display_name ||
    undefined

  const avatarUrl =
    (profile?.role === 'creator' ? (profile as any).avatar_url : null) ||
    session?.user?.user_metadata?.avatar_url ||
    undefined

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3"
        >
          <img src="/logo/logo.png" alt="ALINO" className="w-8 h-8" />
          <span className="font-bold text-2xl leading-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
            ALINO
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-[#6B7280]">
          <a href="#about">Về chúng tôi</a>
          <a href="#features">Tính năng</a>
          <a href="#news">Tin tức</a>
          <a href="#contact">Liên hệ</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-sm">
          {authLoading ? null : session ? (
            <UserMenu
              userEmail={session.user.email || ''}
              displayName={displayName}
              avatarUrl={avatarUrl}
              role={profile?.role || null}
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
