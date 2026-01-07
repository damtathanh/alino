import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
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
import DashboardHeader from '../dashboard/DashboardHeader'

export default function CreatorDashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const mainNavItems = [
    { path: '', label: 'Bảng điều khiển', icon: FaTh },
    { path: 'profile', label: 'Hồ sơ cá nhân', icon: FaUser },
    { path: 'services', label: 'Dịch vụ & Bảng giá', icon: FaDollarSign },
    { path: 'discovery', label: 'Cơ hội', icon: FaLightbulb },
    { path: 'proposals', label: 'Đề xuất', icon: FaFileAlt },
    { path: 'workspace', label: 'Trung tâm làm việc', icon: FaCheckCircle },
    { path: 'analytics', label: 'Phân tích', icon: FaChartBar },
  ]

  const accountItems = [
    { path: 'settings', label: 'Cài đặt', icon: FaCog },
  ]

  const isActive = (path: string) => {
    if (path === '') {
      // Index route - only active when exactly at /dashboard/creator
      return location.pathname === '/dashboard/creator'
    }
    // For other paths, check if current pathname starts with the route
    return location.pathname === `/dashboard/creator/${path}` || location.pathname.startsWith(`/dashboard/creator/${path}/`)
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex">
          <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 h-full flex flex-col">
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
                      // Redirect to landing page after sign out
                      navigate('/')
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

          <main className="flex-1 ml-64">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

