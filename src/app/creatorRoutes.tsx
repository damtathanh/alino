import { useLocation, Navigate } from 'react-router-dom'
import CreatorDashboardLayout from '../components/creator/CreatorDashboardLayout'
import DashboardHome from '../pages/creator/dashboard/DashboardHome'
import AnalyticsPage from '../pages/creator/dashboard/AnalyticsPage'
import ProfilePage from '../pages/creator/profile/ProfilePage'
import SettingsPage from '../pages/creator/profile/SettingsPage'
import ServicesPage from '../pages/creator/services/ServicesPage'
import OpportunitiesPage from '../pages/creator/discovery/OpportunitiesPage'
import SubmitProposalPage from '../pages/creator/proposals/SubmitProposalPage'
import DealWorkspacePage from '../pages/creator/proposals/DealWorkspacePage'
import ComingSoonPage from '../pages/shared/ComingSoonPage'

export function CreatorRoutes() {
  const location = useLocation()
  
  // Guard: All old /creator/* routes must go through AppGate
  return <Navigate to="/app" replace />

  if (location.pathname === '/creator/dashboard') {
    return (
      <CreatorDashboardLayout>
        <DashboardHome />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/profile') {
    return (
      <CreatorDashboardLayout>
        <ProfilePage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/settings') {
    return (
      <CreatorDashboardLayout>
        <SettingsPage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/services') {
    return (
      <CreatorDashboardLayout>
        <ServicesPage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/discovery') {
    return (
      <CreatorDashboardLayout>
        <OpportunitiesPage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/proposals/new') {
    return (
      <CreatorDashboardLayout>
        <SubmitProposalPage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname.startsWith('/creator/proposals')) {
    return (
      <CreatorDashboardLayout>
        <ComingSoonPage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/workspace') {
    return (
      <CreatorDashboardLayout>
        <DealWorkspacePage />
      </CreatorDashboardLayout>
    )
  }

  if (location.pathname === '/creator/analytics') {
    return (
      <CreatorDashboardLayout>
        <AnalyticsPage />
      </CreatorDashboardLayout>
    )
  }

  return (
    <CreatorDashboardLayout>
      <ComingSoonPage />
    </CreatorDashboardLayout>
  )
}

