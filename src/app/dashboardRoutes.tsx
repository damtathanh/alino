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

function DashboardRoutes() {
  const { role } = useParams<{ role: 'creator' | 'brand' }>()
  const { session, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile(session?.user?.id, !!session)

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!session || !profile) {
    return <Navigate to="/login" replace />
  }

  if (!role || (role !== 'creator' && role !== 'brand')) {
    return <Navigate to="/app" replace />
  }

  if (profile.role !== role) {
    // Redirect to correct role dashboard
    if (profile.role === 'creator') {
      return <Navigate to="/dashboard/creator" replace />
    } else if (profile.role === 'brand') {
      return <Navigate to="/dashboard/brand" replace />
    }
    return <Navigate to="/app" replace />
  }

  if (role === 'creator') {
    return (
      <Routes>
        <Route path="" element={
          <CreatorDashboardLayout>
            <DashboardHome />
          </CreatorDashboardLayout>
        } />
        <Route path="profile" element={
          <CreatorDashboardLayout>
            <ProfilePage />
          </CreatorDashboardLayout>
        } />
        <Route path="settings" element={
          <CreatorDashboardLayout>
            <SettingsPage />
          </CreatorDashboardLayout>
        } />
        <Route path="services" element={
          <CreatorDashboardLayout>
            <ServicesPage />
          </CreatorDashboardLayout>
        } />
        <Route path="discovery" element={
          <CreatorDashboardLayout>
            <OpportunitiesPage />
          </CreatorDashboardLayout>
        } />
        <Route path="proposals/new" element={
          <CreatorDashboardLayout>
            <SubmitProposalPage />
          </CreatorDashboardLayout>
        } />
        <Route path="proposals/*" element={
          <CreatorDashboardLayout>
            <ComingSoonPage />
          </CreatorDashboardLayout>
        } />
        <Route path="workspace" element={
          <CreatorDashboardLayout>
            <DealWorkspacePage />
          </CreatorDashboardLayout>
        } />
        <Route path="analytics" element={
          <CreatorDashboardLayout>
            <AnalyticsPage />
          </CreatorDashboardLayout>
        } />
        <Route path="*" element={
          <CreatorDashboardLayout>
            <ComingSoonPage />
          </CreatorDashboardLayout>
        } />
      </Routes>
    )
  }

  // Brand routes
  return (
    <Routes>
      <Route path="" element={
        <BrandDashboardLayout>
          <BrandDashboard />
        </BrandDashboardLayout>
      } />
      <Route path="analytics" element={
        <BrandDashboardLayout>
          <BrandCampaignAnalyticsPage />
        </BrandDashboardLayout>
      } />
      <Route path="discovery" element={
        <BrandDashboardLayout>
          <CreatorDiscoveryPage />
        </BrandDashboardLayout>
      } />
      <Route path="campaigns/new" element={
        <BrandDashboardLayout>
          <CreateCampaignPage />
        </BrandDashboardLayout>
      } />
      <Route path="campaigns/*" element={
        <BrandDashboardLayout>
          <CampaignWorkspacePage />
        </BrandDashboardLayout>
      } />
      <Route path="proposals/*" element={
        <BrandDashboardLayout>
          <ProposalInboxPage />
        </BrandDashboardLayout>
      } />
      <Route path="workspace" element={
        <BrandDashboardLayout>
          <ComingSoonPage />
        </BrandDashboardLayout>
      } />
      <Route path="settings" element={
        <BrandDashboardLayout>
          <ComingSoonPage />
        </BrandDashboardLayout>
      } />
      <Route path="*" element={
        <BrandDashboardLayout>
          <ComingSoonPage />
        </BrandDashboardLayout>
      } />
    </Routes>
  )
}

export default DashboardRoutes

