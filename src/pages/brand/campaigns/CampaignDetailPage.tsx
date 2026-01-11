import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'

/**
 * CampaignDetailPage: Campaign configuration/details view (Management Layer)
 * 
 * Route: /dashboard/brand/campaigns/:campaignId
 * Architecture: Campaigns = Management Layer (config-level only)
 * 
 * This page shows:
 * - Campaign configuration (name, goal, budget, deadline, visibility)
 * - Campaign settings and collaborators
 * - Campaign status and metadata
 * 
 * NO execution logic here (no timeline, creator progress, approvals)
 * Execution UI is in Workspace
 */

export default function CampaignDetailPage() {
  const { campaignId } = useParams<{ campaignId: string }>()

  // TODO: Fetch campaign data by campaignId
  // TODO: Show config-level details only (no execution data)

  // Mock data for structure
  const campaign = {
    id: campaignId || '1',
    name: 'Summer Influencer Outreach 2024',
    goal: 'Increase brand awareness by 20% over 3 months',
    status: 'active',
    visibility: 'open',
    budgetRange: '$1,000 - $5,000',
    deadline: '2024-08-31',
    collaborators: ['collaborator@example.com'],
    createdAt: '2024-07-15',
    updatedAt: '2024-07-20',
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to campaigns list */}
        <Link
          to="/dashboard/brand/campaigns"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách chiến dịch</span>
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.name}</h1>
            <p className="text-gray-600">Chi tiết cấu hình chiến dịch</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {campaign.status === 'active' ? 'Đang hoạt động' : campaign.status}
            </span>
            <Link
              to={`/dashboard/brand/campaigns/${campaignId}/edit`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaEdit className="w-4 h-4" />
              <span>Chỉnh sửa</span>
            </Link>
          </div>
        </div>

        {/* Campaign Configuration */}
        <div className="space-y-6">
          {/* Campaign Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin chiến dịch</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chiến dịch
                </label>
                <p className="text-gray-900">{campaign.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mục tiêu chiến dịch
                </label>
                <p className="text-gray-900">{campaign.goal}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <p className="text-gray-900 capitalize">{campaign.status}</p>
              </div>
            </div>
          </div>

          {/* Budget & Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ngân sách & Lịch trình</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng ngân sách
                </label>
                <p className="text-gray-900">{campaign.budgetRange}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <p className="text-gray-900">{campaign.deadline}</p>
              </div>
            </div>
          </div>

          {/* Visibility & Collaborators */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Hiển thị & Cộng tác viên</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hiển thị chiến dịch
                </label>
                <p className="text-gray-900">
                  {campaign.visibility === 'open'
                    ? 'Open for Proposal (visible to all creators)'
                    : 'Private Campaign (invite-only)'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cộng tác viên đã mời
                </label>
                {campaign.collaborators.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {campaign.collaborators.map((email, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
                      >
                        {email}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Chưa có cộng tác viên nào</p>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin khác</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tạo
                </label>
                <p className="text-gray-900">{campaign.createdAt}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cập nhật lần cuối
                </label>
                <p className="text-gray-900">{campaign.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Action: Open in Workspace */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Làm việc với chiến dịch này</h3>
                <p className="text-sm text-gray-600">
                  Mở trong Không gian làm việc để xem timeline, tiến độ creator và thực hiện các hành động
                </p>
              </div>
              <Link
                to={`/dashboard/brand/workspace/${campaignId}`}
                className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Mở trong Workspace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
