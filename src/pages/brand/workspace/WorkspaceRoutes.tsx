import { Routes, Route } from 'react-router-dom'
import CampaignListPage from '../campaigns/CampaignListPage'
import CreateCampaignPage from '../campaigns/CreateCampaignPage'

/**
 * WorkspaceRoutes: Handles nested workspace routes
 * 
 * Architecture: Legacy workspace/:workspaceId routes
 * Routes:
 * - /workspace/:workspaceId/campaigns - List view
 * - /workspace/:workspaceId/campaigns/new - Create new campaign
 * 
 * Note: Campaign execution UI is at /workspace/:campaignId (handled in routeConfig)
 * 
 * TODO: Add workspace verification/permission checks
 */

export default function WorkspaceRoutes() {
  return (
    <Routes>
      {/* Campaign list view for workspace */}
      <Route path="campaigns" element={<CampaignListPage />} />
      
      {/* Create new campaign */}
      <Route path="campaigns/new" element={<CreateCampaignPage />} />
    </Routes>
  )
}
