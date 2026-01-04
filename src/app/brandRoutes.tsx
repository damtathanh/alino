import { useLocation } from 'react-router-dom'
import BrandDashboardLayout from '../components/brand/BrandDashboardLayout'
import BrandDashboard from '../pages/brand/dashboard/BrandDashboard'
import BrandCampaignAnalyticsPage from '../pages/brand/dashboard/BrandCampaignAnalyticsPage'
import CreatorDiscoveryPage from '../pages/brand/discovery/CreatorDiscoveryPage'
import CreateCampaignPage from '../pages/brand/campaigns/CreateCampaignPage'
import CampaignWorkspacePage from '../pages/brand/campaigns/CampaignWorkspacePage'
import ProposalInboxPage from '../pages/brand/deals/ProposalInboxPage'
import ComingSoonPage from '../pages/shared/ComingSoonPage'

export function BrandRoutes() {
  const location = useLocation()

  if (location.pathname === '/brand/dashboard') {
    return (
      <BrandDashboardLayout>
        <BrandDashboard />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/analytics') {
    return (
      <BrandDashboardLayout>
        <BrandCampaignAnalyticsPage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/discovery') {
    return (
      <BrandDashboardLayout>
        <CreatorDiscoveryPage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/campaigns/new') {
    return (
      <BrandDashboardLayout>
        <CreateCampaignPage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname.startsWith('/brand/campaigns')) {
    return (
      <BrandDashboardLayout>
        <CampaignWorkspacePage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/proposals' || location.pathname.startsWith('/brand/proposals')) {
    return (
      <BrandDashboardLayout>
        <ProposalInboxPage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/workspace') {
    return (
      <BrandDashboardLayout>
        <ComingSoonPage />
      </BrandDashboardLayout>
    )
  }

  if (location.pathname === '/brand/settings') {
    return (
      <BrandDashboardLayout>
        <ComingSoonPage />
      </BrandDashboardLayout>
    )
  }

  return (
    <BrandDashboardLayout>
      <ComingSoonPage />
    </BrandDashboardLayout>
  )
}

