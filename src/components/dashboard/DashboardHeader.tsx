import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'
import UserMenu from '../layout/UserMenu'
import NotificationModal from '../shared/NotificationModal'

/**
 * DashboardHeader
 * - Fixed header for dashboard pages
 * - Height: h-16 (same as Landing Header)
 * - Left: w-64 (aligned with Sidebar) → Logo + ALINO centered
 * - Middle: Title + Subtitle (auto by route)
 * - Right: Notification + UserMenu (tight spacing)
 */
export default function DashboardHeader() {
  const { session } = useAuth()
  const { profile } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const navigate = useNavigate()
  const location = useLocation()
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Navigate to dashboard home based on role
    if (profile?.role === 'creator') {
      navigate('/dashboard/creator', { replace: false })
    } else if (profile?.role === 'brand') {
      navigate('/dashboard/brand', { replace: false })
    } else {
      // Fallback to /app if role not set
      navigate('/app', { replace: false })
    }
  }

  const fullName =
    (profile?.role === 'creator' ? (profile as any).full_name : profile?.role === 'brand' ? (profile as any).brand_name : null) ||
    session?.user?.user_metadata?.display_name ||
    ''

  const avatarUrl =
    (profile?.role === 'creator' ? (profile as any).avatar_url : null) ||
    session?.user?.user_metadata?.avatar_url ||
    undefined

  // 🔔 mock unread count
  const unreadNotificationCount = 4

  /* ------------------------------
   * Title & Subtitle by route
   * ------------------------------ */
  const pathname = location.pathname

  const getTitleAndSubtitle = () => {
    // Creator dashboard routes
    if (pathname === '/dashboard/creator') {
      const displayName = (profile?.role === 'creator' ? (profile as any).full_name : profile?.role === 'brand' ? (profile as any).brand_name : null) || session?.user?.user_metadata?.display_name || 'Creator'
      return {
        title: `Chào mừng, ${displayName}!`,
        subtitle: 'Tổng quan tài khoản ALINO của bạn hôm nay.',
      }
    }

    if (pathname.startsWith('/dashboard/creator/profile')) {
      return {
        title: 'Hồ sơ cá nhân',
        subtitle: 'Quản lý thông tin hiển thị của bạn với đối tác',
      }
    }

    if (pathname.startsWith('/dashboard/creator/settings')) {
      return {
        title: 'Cài đặt',
        subtitle: 'Quản lý cài đặt tài khoản và tùy chọn',
      }
    }

    if (pathname.startsWith('/dashboard/creator/services')) {
      return {
        title: 'Dịch vụ & Bảng giá',
        subtitle: 'Thiết lập dịch vụ và mức giá bạn cung cấp',
      }
    }

    if (pathname.startsWith('/dashboard/creator/discovery')) {
      return {
        title: 'Cơ hội hợp tác',
        subtitle: 'Khám phá các cơ hội phù hợp với bạn',
      }
    }

    if (pathname.startsWith('/dashboard/creator/proposals')) {
      return {
        title: 'Đề xuất',
        subtitle: 'Quản lý các đề xuất hợp tác đang diễn ra',
      }
    }

    if (pathname.startsWith('/dashboard/creator/workspace')) {
      return {
        title: 'Trung tâm làm việc',
        subtitle: 'Theo dõi và xử lý các hoạt động hợp tác',
      }
    }

    if (pathname.startsWith('/dashboard/creator/analytics')) {
      return {
        title: 'Phân tích',
        subtitle: 'Theo dõi hiệu suất và tăng trưởng của bạn',
      }
    }

    // Brand dashboard routes
    if (pathname === '/dashboard/brand') {
      return {
        title: 'Brand Dashboard',
        subtitle: 'Tổng quan chiến dịch và hiệu suất',
      }
    }

    if (pathname.startsWith('/dashboard/brand/discovery')) {
      return {
        title: 'Tìm kiếm Creator',
        subtitle: 'Khám phá và kết nối với các creator phù hợp',
      }
    }

    if (pathname.startsWith('/dashboard/brand/campaigns')) {
      return {
        title: 'Chiến dịch',
        subtitle: 'Quản lý các chiến dịch marketing của bạn',
      }
    }

    if (pathname.startsWith('/dashboard/brand/proposals')) {
      return {
        title: 'Hộp thư đề xuất',
        subtitle: 'Xem và quản lý các đề xuất từ creator',
      }
    }

    if (pathname.startsWith('/dashboard/brand/workspace')) {
      return {
        title: 'Không gian làm việc',
        subtitle: 'Theo dõi tiến độ và cộng tác với creator',
      }
    }

    if (pathname.startsWith('/dashboard/brand/analytics')) {
      return {
        title: 'Phân tích',
        subtitle: 'Theo dõi hiệu suất chiến dịch và ROI',
      }
    }

    if (pathname.startsWith('/dashboard/brand/settings')) {
      return {
        title: 'Cài đặt',
        subtitle: 'Quản lý cài đặt tài khoản và tùy chọn',
      }
    }

    return { title: '', subtitle: '' }
  }

  const { title, subtitle } = getTitleAndSubtitle()

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-black/5">
  <div className="h-full flex">
    {/* LEFT: Sidebar-aligned block */}
    <div className="w-64 h-full flex items-center justify-center border-r border-gray-200 flex-shrink-0">
      <Link
        to="/"
        onClick={handleLogoClick}
        className="flex items-center gap-3"
      >
        <img src="/logo/logo.png" alt="ALINO" className="w-8 h-8" />
        <span className="font-bold text-2xl leading-none bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
          ALINO
        </span>
      </Link>
    </div>

    {/* RIGHT AREA: SAME CONTAINER AS LANDING */}
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Title */}
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 leading-tight mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* User actions – EXACT SAME POSITION AS LANDING */}
        {session && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative p-2 rounded-lg text-gray-600 hover:text-[#6366F1] hover:bg-gray-100 transition"
            >
              <FaBell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            <UserMenu
              userEmail={session.user.email || ''}
              displayName={fullName}
              avatarUrl={avatarUrl}
              role={profile?.role || null}
            />
          </div>
        )}
      </div>
    </div>
  </div>
</header>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  )
}
