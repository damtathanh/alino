import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import UserMenu from './UserMenu'
import NotificationModal from '../dashboard/NotificationModal'

export default function Header() {
  const { session, loading: authLoading, isAuthenticated } = useAuth()
  const { profile } = useProfile(session?.user?.id, isAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)

  // Check if we're in dashboard mode
  const isDashboardMode = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/profile') ||
                          location.pathname.startsWith('/settings')

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

  // Mock unread count - replace with real data later
  const unreadNotificationCount = 4

  // Get dashboard title and subtitle based on current route
  const getDashboardTitle = () => {
    const path = location.pathname
    const firstName = displayName?.split(' ')[0] || 'Thành' // Default to "Thành" if no name
    
    if (path === '/dashboard') {
      return {
        title: `Xin chào ${firstName}`,
        subtitle: 'Chào mừng bạn đã quay trở lại 👋'
      }
    }
    if (path === '/dashboard/profile-public') {
      return {
        title: 'Hồ sơ công khai',
        subtitle: 'Quản lý thông tin hiển thị của bạn với đối tác'
      }
    }
    if (path === '/dashboard/services') {
      return {
        title: 'Dịch vụ & Bảng giá',
        subtitle: 'Thiết lập dịch vụ và mức giá bạn cung cấp'
      }
    }
    if (path === '/dashboard/opportunities') {
      return {
        title: 'Cơ hội hợp tác',
        subtitle: 'Khám phá các cơ hội phù hợp với bạn'
      }
    }
    if (path === '/dashboard/proposals') {
      return {
        title: 'Đề xuất',
        subtitle: 'Quản lý các đề xuất hợp tác đang diễn ra'
      }
    }
    if (path === '/dashboard/workspace') {
      return {
        title: 'Trung tâm làm việc',
        subtitle: 'Theo dõi và xử lý các hoạt động hợp tác'
      }
    }
    if (path === '/dashboard/analytics') {
      return {
        title: 'Phân tích',
        subtitle: 'Theo dõi hiệu suất và tăng trưởng của bạn'
      }
    }
    return null
  }

  const dashboardTitle = isDashboardMode ? getDashboardTitle() : null

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5 ${isDashboardMode && dashboardTitle ? 'h-20' : 'h-16'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            >
              <img src="/logo/logo.png" alt="ALINO" className="w-8 h-8" />
              <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                ALINO
              </span>
            </Link>

            {/* Dashboard Title & Subtitle - only show in dashboard mode */}
            {isDashboardMode && dashboardTitle && (
              <div className="hidden md:block border-l border-gray-200 pl-6">
                <h1 className="text-lg font-semibold text-gray-900 leading-tight">{dashboardTitle.title}</h1>
                <p className="text-sm text-gray-500 leading-tight mt-0.5">{dashboardTitle.subtitle}</p>
              </div>
            )}
          </div>

          {/* Landing page navigation - only show when NOT in dashboard mode */}
          {!isDashboardMode && (
            <nav className="hidden md:flex items-center gap-10 text-sm text-[#6B7280]">
              <a href="#about">Về chúng tôi</a>
              <a href="#product">Sản phẩm</a>
              <a href="#news">Tin tức</a>
              <a href="#contact">Liên hệ</a>
            </nav>
          )}

          <div className="flex items-center gap-4 text-sm">
            {authLoading ? null : session ? (
              <>
                {/* Notification Icon - only show in dashboard mode */}
                {isDashboardMode && (
                  <button
                    onClick={() => setIsNotificationModalOpen(true)}
                    className="relative p-2 text-gray-600 hover:text-[#6366F1] transition-colors"
                  >
                    <FaBell className="w-5 h-5" />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                )}
                <UserMenu 
                  userEmail={session.user.email || ''}
                  displayName={displayName}
                  avatarUrl={avatarUrl}
                />
              </>
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

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isNotificationModalOpen} 
        onClose={() => setIsNotificationModalOpen(false)} 
      />
    </>
  )
}
