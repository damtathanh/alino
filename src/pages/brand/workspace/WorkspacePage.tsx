import { Link } from 'react-router-dom'
import { FaArrowRight, FaUser, FaClock, FaBullhorn } from 'react-icons/fa'

/**
 * WorkspacePage: Workspace overview (STATE A - DEFAULT)
 * 
 * Route: /dashboard/brand/workspace
 * Architecture: Workspace = Execution Layer (daily working area)
 * 
 * This page MUST NOT auto-open any campaign.
 * It shows:
 * - Active campaigns summary (multiple campaigns)
 * - Pending work items (approvals, feedback)
 * - Creators currently working
 * 
 * This is a dashboard / overview page.
 * To work on a specific campaign, user clicks a campaign → /workspace/:campaignId
 */

// TODO: Replace with actual data fetching
// TODO: Fetch active campaigns summary
// TODO: Fetch pending work items
// TODO: Fetch active creators
const MOCK_ACTIVE_CAMPAIGNS = [
  {
    id: '1',
    name: 'Summer Collection Launch',
    status: 'active',
    progress: 75,
    creators: 4,
    pendingActions: 2,
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Tech Gadget Review',
    status: 'ongoing',
    progress: 40,
    creators: 3,
    pendingActions: 1,
    thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Healthy Snack Promotion',
    status: 'active',
    progress: 90,
    creators: 5,
    pendingActions: 3,
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
  },
]

const MOCK_TOP_CREATORS = [
  {
    id: '1',
    name: 'Emily Studios',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    role: 'Lifestyle Vlogger',
    activeCampaigns: 3,
  },
  {
    id: '2',
    name: 'Mark Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'Tech Reviewer',
    activeCampaigns: 2,
  },
  {
    id: '3',
    name: 'Chef Chloe',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    role: 'Food Blogger',
    activeCampaigns: 2,
  },
]

const MOCK_PENDING_ACTIONS = [
  {
    id: '1',
    type: 'approval',
    description: 'Proposal from Emily Studios for Summer Collection',
    campaign: 'Summer Collection Launch',
    campaignId: '1',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'review',
    description: 'Draft submission for Tech Gadget Review',
    campaign: 'Tech Gadget Review',
    campaignId: '2',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    type: 'deliverable',
    description: 'Final deliverable pending for Healthy Snack Promotion',
    campaign: 'Healthy Snack Promotion',
    campaignId: '3',
    timestamp: '3 days ago',
  },
]

export default function WorkspacePage() {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        )
      case 'ongoing':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Ongoing
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <FaBullhorn className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{MOCK_ACTIVE_CAMPAIGNS.length}</div>
            <div className="text-sm text-gray-600">Chiến dịch đang hoạt động</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FaUser className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{MOCK_TOP_CREATORS.length}</div>
            <div className="text-sm text-gray-600">Creator đang cộng tác</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <FaClock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{MOCK_PENDING_ACTIONS.length}</div>
            <div className="text-sm text-gray-600">Hành động cần xử lý</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Active Campaigns Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Chiến dịch đang hoạt động</h2>
              </div>

              {MOCK_ACTIVE_CAMPAIGNS.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">Chưa có chiến dịch nào đang hoạt động</p>
                  <Link
                    to="/dashboard/brand/campaigns/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <span>Tạo chiến dịch mới</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_ACTIVE_CAMPAIGNS.map((campaign) => (
                    <Link
                      key={campaign.id}
                      to={`/dashboard/brand/workspace/${campaign.id}`}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-40 bg-gray-100">
                        <img
                          src={campaign.thumbnail}
                          alt={campaign.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(campaign.status)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Tiến độ</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] h-2 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <span>{campaign.creators} creators</span>
                          <span className="text-yellow-600">{campaign.pendingActions} cần xử lý</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                          <span>Mở để làm việc</span>
                          <FaArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Creators & Pending Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Creators */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Creator đang cộng tác</h2>
              </div>
              <div className="space-y-4">
                {MOCK_TOP_CREATORS.map((creator) => (
                  <div key={creator.id} className="flex items-center gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{creator.name}</h3>
                      <p className="text-xs text-gray-600">{creator.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{creator.activeCampaigns} chiến dịch</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cần xử lý</h2>
              </div>
              <div className="space-y-4">
                {MOCK_PENDING_ACTIONS.map((action) => (
                  <Link
                    key={action.id}
                    to={`/dashboard/brand/workspace/${action.campaignId}`}
                    className="block border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
                  >
                    <p className="text-sm text-gray-900 mb-1">{action.description}</p>
                    <p className="text-xs text-gray-500">{action.campaign}</p>
                    <p className="text-xs text-gray-400 mt-1">{action.timestamp}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
