import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface UserMenuProps {
  userEmail: string
  displayName?: string
  avatarUrl?: string | null
  role?: string | null
}

export default function UserMenu({ userEmail, displayName, avatarUrl, role }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = async () => {
    setIsOpen(false)
    await signOut()
  }

  const dashboardPath = '/app?next=projects'

  const nameToShow = displayName || userEmail.split('@')[0]

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-0 py-0 text-[#6B7280] hover:text-[#6366F1] transition-colors group"
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={nameToShow}
            className="w-6 h-6 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
            {nameToShow.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm whitespace-nowrap">
          {nameToShow}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full pt-2 w-56 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2">
            <Link
              to={dashboardPath}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
            >
              Quản lý dự án
            </Link>
            <Link
              to="/app?next=profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
            >
              Hồ sơ
            </Link>
            <Link
              to="/app?next=settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
            >
              Cài đặt
            </Link>
            <div className="border-t border-gray-200 my-1" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

