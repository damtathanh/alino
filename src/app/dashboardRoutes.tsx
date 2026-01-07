import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import CreatorDashboardLayout from '../components/creator/CreatorDashboardLayout'
import BrandDashboardLayout from '../components/brand/BrandDashboardLayout'
import DashboardHome from '../pages/creator/dashboard/DashboardHome'
import BrandDashboard from '../pages/brand/dashboard/BrandDashboard'
import AnalyticsPage from '../pages/creator/dashboard/AnalyticsPage'
import BrandCampaignAnalyticsPage from '../pages/brand/dashboard/BrandCampaignAnalyticsPage'
import ProfilePage from '../pages/creator/profile/ProfilePage'
import SettingsPage from '../pages/creator/profile/SettingsPage'
import ServicesPage from '../pages/creator/services/ServicesPage'
import OpportunitiesPage from '../pages/creator/discovery/OpportunitiesPage'
import SubmitProposalPage from '../pages/creator/proposals/SubmitProposalPage'
import DealWorkspacePage from '../pages/creator/proposals/DealWorkspacePage'
import CreatorDiscoveryPage from '../pages/brand/discovery/CreatorDiscoveryPage'
import CreateCampaignPage from '../pages/brand/campaigns/CreateCampaignPage'
import CampaignWorkspacePage from '../pages/brand/campaigns/CampaignWorkspacePage'
import ProposalInboxPage from '../pages/brand/deals/ProposalInboxPage'
import ComingSoonPage from '../pages/shared/ComingSoonPage'

/**
 * DashboardRoutes: Stable final destination routes
 * 
 * IMPORTANT: These routes are OUTSIDE AppGate and should NEVER redirect.
 * They are the final destination after onboarding is completed.
 * 
 * If user needs to complete onboarding or select role, they should go through /app
 * (which is handled by AppGate), not through dashboard redirects.
 * 
 * This component only:
 * 1. Checks authentication (redirects to login if not authenticated)
 * 2. Validates role matches URL
 * 3. Renders the appropriate dashboard
 * 
 * No onboarding checks, no role selection redirects - those are handled by AppGate at /app
 */
function DashboardRoutes() {
  const { role } = useParams<{ role: 'creator' | 'brand' }>()
  const { session, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  // Basic auth check - if not authenticated, redirect to login
  if (!session || !profile) {
    return <Navigate to="/login" replace />
  }

  // Validate role in URL matches profile role
  // If mismatch, redirect to /app (AppGate will handle routing to correct dashboard)
  if (!role || (role !== 'creator' && role !== 'brand') || profile.role !== role) {
    return <Navigate to="/app" replace />
  }

  if (role === 'creator') {
    return (
      <Routes>
        <Route element={<CreatorDashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="discovery" element={<OpportunitiesPage />} />
          <Route path="proposals/new" element={<SubmitProposalPage />} />
          <Route path="proposals/*" element={<ComingSoonPage />} />
          <Route path="workspace" element={<DealWorkspacePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<ComingSoonPage />} />
        </Route>
      </Routes>
    )
  }

  // Brand routes
  return (
    <Routes>
      <Route element={<BrandDashboardLayout />}>
        <Route index element={<BrandDashboard />} />
        <Route path="analytics" element={<BrandCampaignAnalyticsPage />} />
        <Route path="discovery" element={<CreatorDiscoveryPage />} />
        <Route path="campaigns/new" element={<CreateCampaignPage />} />
        <Route path="campaigns/*" element={<CampaignWorkspacePage />} />
        <Route path="proposals/*" element={<ProposalInboxPage />} />
        <Route path="workspace" element={<ComingSoonPage />} />
        <Route path="settings" element={<ComingSoonPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  )
}

export default DashboardRoutes

