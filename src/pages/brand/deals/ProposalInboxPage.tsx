import { useState, useMemo } from 'react'
import { FaSearch, FaFilter, FaCheck, FaTimes } from 'react-icons/fa'
import BrandDashboardLayout from '../../../components/brand/BrandDashboardLayout'

interface Proposal {
  id: string
  creatorName: string
  creatorAvatar: string
  submittedDate: string
  proposalTitle: string
  campaignName: string
  budgetRange: string
  status: 'pending' | 'accepted' | 'rejected'
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    creatorName: 'Alice Johnson',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-28',
    proposalTitle: 'Engaging Content Series for "EcoLife"',
    campaignName: 'EcoLife Launch Campaign',
    budgetRange: '$1,500 - $2,000',
    status: 'pending',
  },
  {
    id: '2',
    creatorName: 'Bob Williams',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-27',
    proposalTitle: 'Innovative Ad Concepts for "Quantum Leap"',
    campaignName: 'Quantum Leap Brand Refresh',
    budgetRange: '$2,500 - $3,000',
    status: 'pending',
  },
  {
    id: '3',
    creatorName: 'Carol White',
    creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-25',
    proposalTitle: 'Lifestyle Photography for "Urban Chic"',
    campaignName: 'Urban Chic Summer Collection',
    budgetRange: '$1,200 - $1,800',
    status: 'accepted',
  },
  {
    id: '4',
    creatorName: 'David Green',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-24',
    proposalTitle: 'Influencer Collaboration for "Fitness First"',
    campaignName: 'Fitness First Expansion',
    budgetRange: '$3,000 - $3,500',
    status: 'rejected',
  },
  {
    id: '5',
    creatorName: 'Eve Brown',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-23',
    proposalTitle: 'Podcast Sponsorship for "Tech Insights"',
    campaignName: 'Tech Insights Season 3',
    budgetRange: '$2,000 - $2,500',
    status: 'pending',
  },
  {
    id: '6',
    creatorName: 'Frank Davis',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    submittedDate: '2024-07-22',
    proposalTitle: 'SEO-Optimized Blog Content for "Home Decor Hub"',
    campaignName: 'Home Decor Hub Content Boost',
    budgetRange: '$1,000 - $1,400',
    status: 'pending',
  },
]

export default function ProposalInboxPage() {
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS)
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const pendingCount = proposals.filter(p => p.status === 'pending').length

  const filteredProposals = useMemo(() => {
    if (!searchQuery) return proposals
    const query = searchQuery.toLowerCase()
    return proposals.filter(p =>
      p.creatorName.toLowerCase().includes(query) ||
      p.proposalTitle.toLowerCase().includes(query) ||
      p.campaignName.toLowerCase().includes(query)
    )
  }, [proposals, searchQuery])

  const handleSelectProposal = (proposalId: string) => {
    setSelectedProposals(prev =>
      prev.includes(proposalId)
        ? prev.filter(id => id !== proposalId)
        : [...prev, proposalId]
    )
  }

  const handleAccept = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => p.id === proposalId ? { ...p, status: 'accepted' as const } : p)
    )
    setSelectedProposals(prev => prev.filter(id => id !== proposalId))
  }

  const handleReject = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => p.id === proposalId ? { ...p, status: 'rejected' as const } : p)
    )
    setSelectedProposals(prev => prev.filter(id => id !== proposalId))
  }

  const handleAcceptSelected = () => {
    selectedProposals.forEach(id => handleAccept(id))
    setSelectedProposals([])
  }

  const handleRejectSelected = () => {
    selectedProposals.forEach(id => handleReject(id))
    setSelectedProposals([])
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Pending</span>
      case 'accepted':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Accepted</span>
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Rejected</span>
      default:
        return null
    }
  }

  return (
    <BrandDashboardLayout>
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Proposal Inbox ({pendingCount} New)
            </h1>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search proposals..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FaFilter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button
                disabled={selectedProposals.length === 0}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Selected ({selectedProposals.length})
              </button>
              <button
                onClick={handleAcceptSelected}
                disabled={selectedProposals.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck className="w-4 h-4" />
                <span>Accept Selected</span>
              </button>
              <button
                onClick={handleRejectSelected}
                disabled={selectedProposals.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes className="w-4 h-4" />
                <span>Reject Selected</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="bg-white rounded-xl border border-gray-200 p-6 relative">
                <input
                  type="checkbox"
                  checked={selectedProposals.includes(proposal.id)}
                  onChange={() => handleSelectProposal(proposal.id)}
                  className="absolute top-4 right-4 w-5 h-5 text-[#6366F1] border-gray-300 rounded focus:ring-[#6366F1]"
                />
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={proposal.creatorAvatar}
                    alt={proposal.creatorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{proposal.creatorName}</h3>
                    <p className="text-sm text-gray-500">{proposal.submittedDate}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">{proposal.proposalTitle}</h4>
                  <p className="text-sm text-gray-600 mb-2">{proposal.campaignName}</p>
                  <p className="text-sm font-medium text-gray-900 mb-2">{proposal.budgetRange}</p>
                  <div className="flex items-center justify-between">
                    {getStatusBadge(proposal.status)}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Quick Preview
                  </button>
                  {proposal.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(proposal.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FaCheck className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleReject(proposal.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <FaTimes className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrandDashboardLayout>
  )
}

