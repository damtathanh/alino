import { Link } from 'react-router-dom'
import { FaPlus, FaArrowRight } from 'react-icons/fa'

/**
 * CampaignManagementListPage: Campaign list for management layer
 * 
 * Route: /dashboard/brand/campaigns
 * Architecture: Campaigns = Management Layer (create, list, config-level details)
 * 
 * This page shows:
 * - All campaigns (for management/configuration)
 * - Entry point to create new campaign
 * - Links to campaign details (config-level)
 * 
 * NO execution logic here - that's in Workspace
 */

// TODO: Replace with actual data fetching
// TODO: Fetch all campaigns (not filtered by status - this is management view)
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    name: 'Summer Collection Launch',
    status: 'active',
    visibility: 'open',
    budget: '$15,000',
    deadline: '2024-08-31',
    createdAt: '2024-07-15',
  },
  {
    id: '2',
    name: 'Tech Gadget Review',
    status: 'ongoing',
    visibility: 'private',
    budget: '$8,000',
    deadline: '2024-09-15',
    createdAt: '2024-07-20',
  },
  {
    id: '3',
    name: 'Healthy Snack Promotion',
    status: 'active',
    visibility: 'open',
    budget: '$12,000',
    deadline: '2024-08-28',
    createdAt: '2024-07-10',
  },
  {
    id: '4',
    name: 'Gaming Hardware Unboxing',
    status: 'completed',
    visibility: 'open',
    budget: '$10,000',
    deadline: '2024-08-10',
    createdAt: '2024-06-25',
  },
]

export default function CampaignManagementListPage() {
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
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Completed
          </span>
        )
      default:
        return null
    }
  }

  const getVisibilityBadge = (visibility: string) => {
    return visibility === 'open' ? (
      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
        Open
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
        Private
      </span>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chiến dịch</h1>
            <p className="text-gray-600">
              Quản lý và cấu hình các chiến dịch của bạn
            </p>
          </div>
          <Link
            to="/dashboard/brand/campaigns/new"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-4 h-4" />
            <span>Tạo chiến dịch mới</span>
          </Link>
        </div>

        {MOCK_CAMPAIGNS.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">Chưa có chiến dịch nào</p>
            <Link
              to="/dashboard/brand/campaigns/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaPlus className="w-4 h-4" />
              <span>Tạo chiến dịch đầu tiên</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên chiến dịch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hiển thị
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngân sách
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_CAMPAIGNS.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getVisibilityBadge(campaign.visibility)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {campaign.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {campaign.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {campaign.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}`}
                          className="text-[#6366F1] hover:text-[#EC4899] transition-colors inline-flex items-center gap-1"
                        >
                          <span>Xem chi tiết</span>
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
