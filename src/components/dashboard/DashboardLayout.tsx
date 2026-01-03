import { Link, useLocation } from 'react-router-dom'
import { 
  FaTh, 
  FaUser, 
  FaDollarSign, 
  FaLightbulb, 
  FaFileAlt, 
  FaCheckCircle, 
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useProfile'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const { session, signOut } = useAuth()
  const { profile } = useProfile(session?.user?.id, !!session)

  const sidebarItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: FaTh },
    { path: '/dashboard/profile-public', label: 'Hồ sơ công khai', icon: FaUser },
    { path: '/dashboard/services', label: 'Dịch vụ & Bảng giá', icon: FaDollarSign },
    { path: '/dashboard/opportunities', label: 'Cơ hội', icon: FaLightbulb },
    { path: '/dashboard/proposals', label: 'Đề xuất', icon: FaFileAlt },
    { path: '/dashboard/workspace', label: 'Trung tâm làm việc', icon: FaCheckCircle },
    { path: '/dashboard/analytics', label: 'Phân tích', icon: FaChartBar },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            {/* Navigation Items */}
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${active 
                        ? 'bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4" />

            {/* Settings & Logout */}
            <nav className="space-y-1">
              <Link
                to="/settings"
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === '/settings'
                    ? 'bg-gray-100 text-[#6366F1]'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <FaCog className="w-5 h-5" />
                <span>Cài đặt</span>
              </Link>
              <button
                onClick={async () => {
                  await signOut()
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}

