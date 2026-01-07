import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import UpgradePlanModal from '../../../components/shared/UpgradePlanModal'
import { 
  FaEye, 
  FaLock, 
  FaPaperPlane, 
  FaTrophy,
  FaDollarSign,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa'

// Mock data - replace with real API data later
const MOCK_METRICS = {
  profileViews: 8450,
  pricingUnlocks: 24,
  proposalsSent: 15,
  dealsWon: 5,
  totalRevenue: 120000000,
}

const MOCK_ACTIVE_COLLABORATIONS = [
  {
    id: '1',
    campaignName: "Summer Campaign '24",
    brandName: "Aether Apparel",
    status: 'in_progress',
    statusLabel: 'Đang thực hiện',
  },
  {
    id: '2',
    campaignName: "Product Launch Video",
    brandName: "Zenith Innovations",
    status: 'pending',
    statusLabel: 'Chờ phê duyệt',
  },
  {
    id: '3',
    campaignName: "Holiday Influencer Series",
    brandName: "Glimmer Cosmetics",
    status: 'in_progress',
    statusLabel: 'Đang thực hiện',
  },
  {
    id: '4',
    campaignName: "Brand Story Reels",
    brandName: "Urban Brew Co.",
    status: 'negotiation',
    statusLabel: 'Đang đàm phán',
  },
]

const MOCK_RECENT_ACTIVITIES = [
  {
    id: '1',
    message: "Đề xuất của bạn cho 'Summer Campaign '24' đã được Aether Apparel chấp nhận.",
    timestamp: "2 phút trước",
  },
  {
    id: '2',
    message: "Tin nhắn mới từ Zenith Innovations về 'Product Launch Video'.",
    timestamp: "1 giờ trước",
  },
  {
    id: '3',
    message: "Glimmer Cosmetics đã xem hồ sơ của bạn.",
    timestamp: "Hôm qua",
  },
  {
    id: '4',
    message: "Thỏa thuận 'Holiday Influencer Series' đã chuyển sang trạng thái Đang thực hiện.",
    timestamp: "2 ngày trước",
  },
  {
    id: '5',
    message: "Aether Apparel đã mở khóa bảng giá của bạn.",
    timestamp: "3 ngày trước",
  },
]

const MOCK_OPPORTUNITIES = [
  {
    id: '1',
    campaignTitle: "Fashion Week Collaboration",
    brandName: "Style Co.",
    budgetRange: "5,000,000 - 10,000,000 VNĐ",
    deadline: "Còn 5 ngày",
    matchScore: 95,
  },
  {
    id: '2',
    campaignTitle: "Beauty Product Launch",
    brandName: "Cosmetics Brand",
    budgetRange: "3,000,000 - 5,000,000 VNĐ",
    deadline: "Còn 3 ngày",
    matchScore: 88,
  },
]

const MOCK_INSIGHTS = [
  {
    id: '1',
    metric: "Tăng trưởng lượt xem",
    value: "+25%",
    trend: 'up',
    description: "Hồ sơ của bạn đang được xem nhiều hơn so với tháng trước",
  },
]

export default function DashboardHome() {
  const { session } = useAuth()
  const { profile } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  // Check if profile is complete (mock logic)
  const profileComplete = profile?.onboarding_completed || false
  const profileProgress = profileComplete ? 100 : 80

  // Mock current plan - replace with real data later
  const currentPlan: 'free' | 'pro' | 'business' = 'free'

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Upgrade Banner */}
        {showUpgradeBanner && (
          <div className="bg-pink-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaExclamationCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-gray-800">
                Mở khóa phân tích nâng cao và đề xuất không giới hạn. Nâng cấp gói ngay!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Nâng cấp ngay
              </button>
              <button
                onClick={() => setShowUpgradeBanner(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Profile Views */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {MOCK_METRICS.profileViews.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-gray-600">Lượt xem hồ sơ</div>
              </div>
              <FaEye className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </div>

          {/* Pricing Unlocks */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {MOCK_METRICS.pricingUnlocks}
                </div>
                <div className="text-xs text-gray-600">Lần mở khóa bảng giá</div>
              </div>
              <FaLock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </div>

          {/* Proposals Sent */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {MOCK_METRICS.proposalsSent}
                </div>
                <div className="text-xs text-gray-600">Đề xuất đã gửi</div>
              </div>
              <FaPaperPlane className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </div>

          {/* Deals Won */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {MOCK_METRICS.dealsWon}
                </div>
                <div className="text-xs text-gray-600">Thỏa thuận đã ký</div>
              </div>
              <FaTrophy className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {MOCK_METRICS.totalRevenue.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-gray-600">Tổng doanh thu đã ký</div>
              </div>
              <FaDollarSign className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Active Collaborations */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Collaborations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Hợp tác đang diễn ra</h2>
              <p className="text-sm text-gray-600 mb-4">
                Các chiến dịch hợp tác với thương hiệu của bạn.
              </p>
              
              {MOCK_ACTIVE_COLLABORATIONS.length > 0 ? (
                <div className="space-y-4">
                  {MOCK_ACTIVE_COLLABORATIONS.map((collab) => (
                    <div
                      key={collab.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{collab.campaignName}</h3>
                          <p className="text-sm text-gray-600">{collab.brandName}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            collab.status === 'pending'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {collab.statusLabel}
                        </span>
                      </div>
                      <Link
                        to="/dashboard/workspace"
                        className="text-sm text-[#6366F1] hover:underline"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-2">Bạn chưa có hợp tác nào đang diễn ra</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Bắt đầu bằng cách gửi đề xuất cho các cơ hội phù hợp
                  </p>
                  <Link
                    to="/dashboard/opportunities"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Khám phá cơ hội
                  </Link>
                </div>
              )}
            </div>

            {/* Opportunities Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Cơ hội mới</h2>
                  <p className="text-sm text-gray-600">
                    Các chiến dịch phù hợp với hồ sơ của bạn.
                  </p>
                </div>
                <Link
                  to="/dashboard/opportunities"
                  className="text-sm text-[#6366F1] hover:underline"
                >
                  Xem tất cả
                </Link>
              </div>
              
              {MOCK_OPPORTUNITIES.length > 0 ? (
                <div className="space-y-4">
                  {MOCK_OPPORTUNITIES.map((opp) => (
                    <div
                      key={opp.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{opp.campaignTitle}</h3>
                          <p className="text-sm text-gray-600">{opp.brandName}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          {opp.matchScore}% phù hợp
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>{opp.budgetRange}</span>
                        <span>{opp.deadline}</span>
                      </div>
                      <Link
                        to="/dashboard/opportunities"
                        className="inline-block px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-2">Hiện không có cơ hội mới</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Cơ hội mới sẽ xuất hiện khi có chiến dịch phù hợp
                  </p>
                  <Link
                    to="/dashboard/profile"
                    className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cập nhật hồ sơ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Hoạt động gần đây</h2>
                <p className="text-sm text-gray-600">
                  Nhật ký hoạt động mới nhất trên tài khoản của bạn.
                </p>
              </div>
              
              {MOCK_RECENT_ACTIVITIES.length > 0 ? (
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {MOCK_RECENT_ACTIVITIES.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-l-2 border-[#6366F1] pl-3 py-2"
                    >
                      <p className="text-sm text-gray-700 mb-1">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-sm">Chưa có hoạt động nào</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Hoạt động mới sẽ xuất hiện ở đây
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {!profileComplete && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Bắt đầu với ALINO</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Hoàn thiện hồ sơ để nhận nhiều cơ hội hơn.
                </p>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Hoàn thiện hồ sơ</span>
                      <span className="text-xs text-gray-500">{profileProgress}%</span>
                    </div>
                    <Link
                      to="/dashboard/profile"
                      className="text-sm text-[#6366F1] hover:underline"
                    >
                      Hoàn thiện hồ sơ →
                    </Link>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Thiết lập dịch vụ</span>
                      <span className="text-xs text-gray-500">Chưa thiết lập</span>
                    </div>
                    <Link
                      to="/dashboard/services"
                      className="text-sm text-[#6366F1] hover:underline"
                    >
                      Thiết lập dịch vụ →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Insights */}
            {MOCK_INSIGHTS.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Hiểu biết hiệu suất</h2>
                  <Link
                    to="/dashboard/analytics"
                    className="text-sm text-[#6366F1] hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Phân tích hiệu suất hồ sơ của bạn.
                </p>
                
                <div className="space-y-3">
                  {MOCK_INSIGHTS.map((insight) => (
                    <div
                      key={insight.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{insight.metric}</span>
                        <div className="flex items-center gap-1">
                          {insight.trend === 'up' ? (
                            <FaArrowUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <FaArrowDown className="w-3 h-3 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {insight.value}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={currentPlan}
      />
    </div>
  )
}
