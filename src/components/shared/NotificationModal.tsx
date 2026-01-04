import { useState, useEffect } from 'react'
import { FaCheck, FaCheckCircle, FaTimes } from 'react-icons/fa'

// Mock notification data - replace with real API data later
interface Notification {
  id: string
  type: 'proposal' | 'booking' | 'approval' | 'comment' | 'campaign' | 'profile' | 'collaboration'
  avatar: string
  content: string
  time: string
  timeAgo: string
  read: boolean
  ctaLabel: string
  ctaAction?: () => void
  section: 'new' | 'thisWeek' | 'earlier'
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'proposal',
    avatar: 'https://ui-avatars.com/api/?name=Brand+X&background=6366F1&color=fff',
    content: 'Brand X đã gửi cho bạn một đề xuất mới cho đề xuất Winter Car của họ',
    time: '2025-01-20T10:00:00Z',
    timeAgo: '5 phút trước',
    read: false,
    ctaLabel: 'Xem đề xuất',
    section: 'new'
  },
  {
    id: '2',
    type: 'booking',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=EC4899&color=fff',
    content: 'Sarah Chen đã chấp nhận yêu cầu đặt lịch của bạn cho buổi chụp ảnh',
    time: '2025-01-20T09:00:00Z',
    timeAgo: '1 giờ trước',
    read: false,
    ctaLabel: 'Quản lý lịch',
    section: 'new'
  },
  {
    id: '3',
    type: 'profile',
    avatar: 'https://ui-avatars.com/api/?name=Profile&background=8B5CF6&color=fff',
    content: 'Hồ sơ của bạn đã đạt 1000 lượt xem trong tuần này! Hãy tiếp tục phát huy.',
    time: '2025-01-20T07:00:00Z',
    timeAgo: '3 giờ trước',
    read: false,
    ctaLabel: '',
    section: 'new'
  },
  {
    id: '4',
    type: 'approval',
    avatar: 'https://ui-avatars.com/api/?name=Alpha+Corp&background=6366F1&color=fff',
    content: 'Alpha Corp cần bạn phê duyệt bản nháp mới nhất cho "Project Zenith"',
    time: '2025-01-19T15:00:00Z',
    timeAgo: 'Hôm qua',
    read: true,
    ctaLabel: 'Phê duyệt bản nháp',
    section: 'thisWeek'
  },
  {
    id: '5',
    type: 'comment',
    avatar: 'https://ui-avatars.com/api/?name=Emily+White&background=EC4899&color=fff',
    content: 'Emily White đã bình luận về bản nháp bạn vừa tải lên',
    time: '2025-01-19T10:00:00Z',
    timeAgo: 'Hôm qua',
    read: true,
    ctaLabel: 'Xem bình luận',
    section: 'thisWeek'
  },
  {
    id: '6',
    type: 'campaign',
    avatar: 'https://ui-avatars.com/api/?name=Global+Brands&background=6366F1&color=fff',
    content: 'Global Brands Inc. đã đăng cơ hội chiến dịch mới: "Summer Collec Campaign"',
    time: '2025-01-18T14:00:00Z',
    timeAgo: '2 ngày trước',
    read: true,
    ctaLabel: 'Xem chiến dịch',
    section: 'thisWeek'
  },
  {
    id: '7',
    type: 'approval',
    avatar: 'https://ui-avatars.com/api/?name=Creative+Studio&background=8B5CF6&color=fff',
    content: 'Creative Studio đã phê duyệt sản phẩm của bạn cho "Animated Explainer Project"',
    time: '2025-01-17T11:00:00Z',
    timeAgo: '3 ngày trước',
    read: true,
    ctaLabel: 'Xem thỏa thuận',
    section: 'thisWeek'
  },
  {
    id: '8',
    type: 'collaboration',
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Lee&background=EC4899&color=fff',
    content: 'Jessica Lee đã mời bạn cộng tác trong "Brand Launch Event"',
    time: '2025-01-13T09:00:00Z',
    timeAgo: '1 tuần trước',
    read: true,
    ctaLabel: 'Chấp nhận lời mời',
    section: 'earlier'
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unread', label: 'Chưa đọc' },
  { id: 'proposals', label: 'Đề xuất' },
  { id: 'bookings', label: 'Đặt lịch' },
  { id: 'drafts', label: 'Bản nháp' },
  { id: 'approvals', label: 'Phê duyệt' },
] as const

type FilterTab = typeof FILTER_TABS[number]['id']

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)

  // Handle Esc key to close modal
  useEffect(() => {
    if (!isOpen) return

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return !notification.read
    if (activeFilter === 'proposals') return notification.type === 'proposal'
    if (activeFilter === 'bookings') return notification.type === 'booking'
    if (activeFilter === 'drafts') return notification.type === 'comment'
    if (activeFilter === 'approvals') return notification.type === 'approval'
    return true
  })

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const newNotifications = filteredNotifications.filter(n => n.section === 'new')
  const thisWeekNotifications = filteredNotifications.filter(n => n.section === 'thisWeek')
  const earlierNotifications = filteredNotifications.filter(n => n.section === 'earlier')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-[1000px] h-[80vh] flex flex-col mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Sticky */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Thông báo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Tabs - Sticky */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 flex-shrink-0 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2
                ${activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <span>{tab.label}</span>
              {tab.id === 'unread' && unreadCount > 0 && (
                <span className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                  ${activeFilter === tab.id 
                    ? 'bg-white text-[#6366F1]' 
                    : 'bg-[#6366F1] text-white'
                  }
                `}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}

          {/* Mark all as read button */}
          <button
            onClick={markAllAsRead}
            className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-[#6366F1] transition-colors border-2 border-gray-300 rounded-lg hover:border-[#6366F1] hover:bg-gray-50 active:bg-gray-100 whitespace-nowrap"
          >
            <FaCheckCircle className="w-4 h-4" />
            <span>Đánh dấu tất cả là đã đọc</span>
          </button>
        </div>

        {/* Scrollable Notification List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* New Section */}
            {newNotifications.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Mới</h3>
                <div className="space-y-3">
                  {newNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={() => markAsRead(notification.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* This Week Section */}
            {thisWeekNotifications.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Tuần này</h3>
                <div className="space-y-3">
                  {thisWeekNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={() => markAsRead(notification.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier Section */}
            {earlierNotifications.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Trước đó</h3>
                <div className="space-y-3">
                  {earlierNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={() => markAsRead(notification.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Không có thông báo nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: () => void
}

function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  return (
    <div
      className={`
        flex items-start gap-4 p-4 rounded-xl border transition-colors
        ${notification.read 
          ? 'bg-white border-gray-200' 
          : 'bg-blue-50 border-blue-200'
        }
        hover:shadow-md
      `}
    >
      {/* Avatar */}
      <img
        src={notification.avatar}
        alt=""
        className="w-12 h-12 rounded-full flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
          {notification.content}
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.timeAgo}</p>
      </div>

      {/* Actions */}
      <div className="flex items-start gap-3 flex-shrink-0">
        {notification.ctaLabel && (
          <button
            onClick={onMarkAsRead}
            className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {notification.ctaLabel}
          </button>
        )}
        <button
          onClick={onMarkAsRead}
          className={`
            p-2 rounded-lg transition-colors
            ${notification.read 
              ? 'text-gray-400 hover:bg-gray-100' 
              : 'text-[#6366F1] hover:bg-blue-100'
            }
          `}
          title={notification.read ? 'Đã đọc' : 'Đánh dấu là đã đọc'}
        >
          <FaCheck className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

