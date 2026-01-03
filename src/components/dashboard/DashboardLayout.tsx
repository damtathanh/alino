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
import DashboardHeader from './DashboardHeader'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const { signOut } = useAuth()

  // Main navigation items
  const mainNavItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: FaTh },
    { path: '/dashboard/profile', label: 'Hồ sơ cá nhân', icon: FaUser },
    { path: '/dashboard/services', label: 'Dịch vụ & Bảng giá', icon: FaDollarSign },
    { path: '/dashboard/opportunities', label: 'Cơ hội', icon: FaLightbulb },
    { path: '/dashboard/proposals', label: 'Đề xuất', icon: FaFileAlt },
    { path: '/dashboard/workspace', label: 'Trung tâm làm việc', icon: FaCheckCircle },
    { path: '/dashboard/analytics', label: 'Phân tích', icon: FaChartBar },
  ]

  // Account section items
  const accountItems = [
    { path: '/dashboard/settings', label: 'Cài đặt', icon: FaCog },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex">
          {/* Sidebar */}
          <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 h-full flex flex-col">
              {/* Main Navigation Items */}
              <nav className="space-y-1">
                {mainNavItems.map((item) => {
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

              {/* Account Section - Pinned to Bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <nav className="space-y-1">
                  {accountItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${active
                            ? 'bg-gray-100 text-[#6366F1]'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )})}
                  <button
                    onClick={async () => {
                      await signOut()
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
                  >
                    <FaSignOutAlt className="w-5 h-5 text-red-600" />
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

