import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaPlus } from 'react-icons/fa'

interface Proposal {
  id: string
  brandName: string
  brandAvatar: string
  submittedDate: string
  proposalTitle: string
  campaignName: string
  budgetRange: string
  status: 'pending' | 'accepted' | 'rejected' | 'viewed'
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    brandName: 'Echo Marketing',
    brandAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    submittedDate: '2024-07-28',
    proposalTitle: 'Digital Marketing Campaign Proposal',
    campaignName: 'Echo Marketing - Digital Marketing Campaign',
    budgetRange: '$1,500 - $2,000',
    status: 'pending',
  },
  {
    id: '2',
    brandName: 'Aqua Lifestyle',
    brandAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    submittedDate: '2024-07-27',
    proposalTitle: 'Health & Wellness Promotion',
    campaignName: 'Aqua Lifestyle - Health & Wellness Promotion',
    budgetRange: '$1,000 - $1,500',
    status: 'viewed',
  },
  {
    id: '3',
    brandName: 'Pixel Studios',
    brandAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    submittedDate: '2024-07-25',
    proposalTitle: 'Software Launch Campaign',
    campaignName: 'Pixel Studios - Software Launch Campaign',
    budgetRange: '$2,000 - $2,500',
    status: 'accepted',
  },
  {
    id: '4',
    brandName: 'Green Harvest Organics',
    brandAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    submittedDate: '2024-07-24',
    proposalTitle: 'Product Launch Campaign',
    campaignName: 'Green Harvest Organics - Product Launch',
    budgetRange: '$800 - $1,200',
    status: 'rejected',
  },
  {
    id: '5',
    brandName: 'Urban Chic Boutique',
    brandAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    submittedDate: '2024-07-23',
    proposalTitle: 'Fashion Campaign Collaboration',
    campaignName: 'Urban Chic Boutique - Summer Collection',
    budgetRange: '$1,200 - $1,800',
    status: 'pending',
  },
]

export default function ProposalsListPage() {
  const navigate = useNavigate()
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'viewed'>('all')

  const filteredProposals = useMemo(() => {
    let filtered = proposals

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.brandName.toLowerCase().includes(query) ||
        p.proposalTitle.toLowerCase().includes(query) ||
        p.campaignName.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [proposals, searchQuery, statusFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Chờ phản hồi</span>
      case 'viewed':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Đã xem</span>
      case 'accepted':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Đã chấp nhận</span>
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Đã từ chối</span>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const stats = {
    total: proposals.length,
    pending: proposals.filter(p => p.status === 'pending').length,
    accepted: proposals.filter(p => p.status === 'accepted').length,
    rejected: proposals.filter(p => p.status === 'rejected').length,
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Tổng đề xuất</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Chờ phản hồi</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-sm text-gray-600">Đã chấp nhận</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Đã từ chối</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm đề xuất..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ phản hồi</option>
                <option value="viewed">Đã xem</option>
                <option value="accepted">Đã chấp nhận</option>
                <option value="rejected">Đã từ chối</option>
              </select>
            </div>
            <button
              onClick={() => navigate('/dashboard/creator/proposals/new')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <FaPlus className="w-4 h-4" />
              <span>Tạo đề xuất mới</span>
            </button>
          </div>
        </div>

        {/* Proposals List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Không tìm thấy đề xuất nào phù hợp' 
                  : 'Bạn chưa có đề xuất nào'}
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <button
                  onClick={() => navigate('/dashboard/creator/proposals/new')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Tạo đề xuất đầu tiên
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (proposal.status === 'accepted') {
                      navigate('/dashboard/creator/workspace')
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={proposal.brandAvatar}
                        alt={proposal.brandName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{proposal.proposalTitle}</h3>
                          {getStatusBadge(proposal.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{proposal.brandName}</span> • {proposal.campaignName}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Ngày gửi: {formatDate(proposal.submittedDate)}</span>
                          <span>•</span>
                          <span>Ngân sách: {proposal.budgetRange}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {proposal.status === 'accepted' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/dashboard/creator/workspace')
                          }}
                          className="px-4 py-2 text-sm bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Xem chi tiết
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


