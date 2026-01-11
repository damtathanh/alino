import { FaPlus, FaEnvelope, FaBullhorn, FaUser, FaClock, FaDollarSign, FaArrowRight } from 'react-icons/fa'

const MOCK_ACTIVE_CAMPAIGNS = [
  {
    id: '1',
    name: 'Summer Collection Launch',
    brand: 'Fashion Nova',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    progress: 75,
    status: 'active',
  },
  {
    id: '2',
    name: 'Tech Gadget Review',
    brand: 'Innovate Corp',
    thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    progress: 40,
    status: 'pending',
  },
  {
    id: '3',
    name: 'Healthy Snack Promotion',
    brand: 'NutriBoost',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    progress: 90,
    status: 'active',
  },
  {
    id: '4',
    name: 'Gaming Hardware Unboxing',
    brand: 'GamerTech',
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    progress: 100,
    status: 'completed',
  },
]

const MOCK_TOP_CREATORS = [
  {
    id: '1',
    name: 'Emily Studios',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    role: 'Lifestyle Vlogger',
    activeDeals: 5,
  },
  {
    id: '2',
    name: 'Mark Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'Tech Reviewer',
    activeDeals: 3,
  },
  {
    id: '3',
    name: 'Chef Chloe',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    role: 'Food Blogger',
    activeDeals: 2,
  },
]

const MOCK_PENDING_APPROVALS = [
  {
    id: '1',
    description: 'Proposal from Emily Studios for Summer Collection.',
    campaign: 'Summer Collection Launch',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    description: 'Draft submission for Tech Gadget Review campaign.',
    campaign: 'Tech Gadget Review',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    description: 'Final deliverable pending for Healthy Snack Promotion.',
    campaign: 'Healthy Snack Promotion',
    timestamp: '3 days ago',
  },
  {
    id: '4',
    description: 'Budget increase request for Gaming Hardware Unboxing.',
    campaign: 'Gaming Hardware Unboxing',
    timestamp: 'Last week',
  },
]

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    message: "Your campaign 'Winter Wonderland' is now live!",
    timestamp: '5 mins ago',
  },
  {
    id: '2',
    message: 'New message from Mark Digital regarding collaboration.',
    timestamp: '15 mins ago',
  },
  {
    id: '3',
    message: "Reminder: 'Influencer Spotlight' campaign deadline in 2 days.",
    timestamp: '1 hour ago',
  },
]

export default function BrandDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending Review</span>
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Completed</span>
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity">
                <FaPlus className="w-4 h-4" />
                <span>Create New Campaign</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FaEnvelope className="w-4 h-4" />
                <span>Review Proposals</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FaBullhorn className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
              <div className="text-xs text-green-600 mt-1">+2 this week</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">23</div>
              <div className="text-sm text-gray-600">Active Creators</div>
              <div className="text-xs text-green-600 mt-1">+5 new this month</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
              <div className="text-xs text-gray-500 mt-1">3 for proposals</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaDollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$12,345</div>
              <div className="text-sm text-gray-600">Total Spend</div>
              <div className="text-xs text-green-600 mt-1">+8% from last month</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
                  <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                    <span>View All</span>
                    <FaArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_ACTIVE_CAMPAIGNS.map((campaign) => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg overflow-hidden">
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
                        <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{campaign.brand}</p>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] h-2 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                          <span>View Details</span>
                          <FaArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Top Engaged Creators</h2>
                  <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                    <span>View All</span>
                    <FaArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-4">
                  {MOCK_TOP_CREATORS.map((creator) => (
                    <div key={creator.id} className="flex items-center gap-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{creator.name}</h3>
                        <p className="text-sm text-gray-600">{creator.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{creator.activeDeals} active deals</p>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                        <span>View</span>
                        <FaArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
                <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                  <span>View All</span>
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {MOCK_PENDING_APPROVALS.map((approval) => (
                  <div key={approval.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-gray-900 mb-1">{approval.description}</p>
                    <p className="text-xs text-gray-500">{approval.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
                <button className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                  <span>View All</span>
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {MOCK_NOTIFICATIONS.map((notification) => (
                  <div key={notification.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
