import { Link, useParams } from 'react-router-dom'
import { FaPlus, FaArrowRight } from 'react-icons/fa'

/**
 * CampaignListPage: Shows a subset of campaigns (active + ongoing) for a workspace
 * 
 * Architecture: This is the list/summary view.
 * - Only shows active and ongoing campaigns (subset)
 * - Acts as overview/summary
 * - Clicking a campaign navigates to detail view
 * - No heavy campaign detail logic runs here
 * 
 * Route: /workspace/:workspaceId/campaigns
 */

// TODO: Replace with actual data fetching from workspace campaigns
// TODO: Filter campaigns by status (active + ongoing only)
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    name: 'Summer Collection Launch',
    status: 'active',
    progress: 75,
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Tech Gadget Review',
    status: 'ongoing',
    progress: 40,
    thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Healthy Snack Promotion',
    status: 'active',
    progress: 90,
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
  },
]

export default function CampaignListPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>()

  // TODO: Fetch campaigns for this workspace
  // TODO: Filter to show only active + ongoing campaigns
  const activeCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.status === 'active' || c.status === 'ongoing'
  )

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
            <p className="text-gray-600">
              Active and ongoing campaigns for this workspace
            </p>
          </div>
          <Link
            to={`/workspace/${workspaceId}/campaigns/new`}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-4 h-4" />
            <span>Create New Campaign</span>
          </Link>
        </div>

        {activeCampaigns.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No active campaigns yet</p>
            <Link
              to={`/workspace/${workspaceId}/campaigns/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Your First Campaign</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                to={`/workspace/${workspaceId}/campaigns/${campaign.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
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
                  <h3 className="font-semibold text-gray-900 mb-3">{campaign.name}</h3>
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
                  <div className="flex items-center gap-1 text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors">
                    <span>View Details</span>
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
