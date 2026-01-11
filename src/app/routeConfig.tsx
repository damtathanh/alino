import { ReactElement } from 'react'
import DashboardHome from '../pages/creator/dashboard/DashboardHome'
import BrandDashboard from '../pages/brand/dashboard/BrandDashboard'
import AnalyticsPage from '../pages/creator/dashboard/AnalyticsPage'
import BrandCampaignAnalyticsPage from '../pages/brand/dashboard/BrandCampaignAnalyticsPage'
import ProfilePage from '../pages/creator/profile/ProfilePage'
import BrandProfilePage from '../pages/brand/profile/ProfilePage'
import SettingsPage from '../pages/creator/profile/SettingsPage'
import BrandSettingsPage from '../pages/brand/profile/SettingsPage'
import ServicesPage from '../pages/creator/services/ServicesPage'
import OpportunitiesPage from '../pages/creator/discovery/OpportunitiesPage'
import SubmitProposalPage from '../pages/creator/proposals/SubmitProposalPage'
import ProposalsListPage from '../pages/creator/proposals/ProposalsListPage'
import DealWorkspacePage from '../pages/creator/proposals/DealWorkspacePage'
import CreatorDiscoveryPage from '../pages/brand/discovery/CreatorDiscoveryPage'
import CreateCampaignPage from '../pages/brand/campaigns/CreateCampaignPage'
import CampaignManagementListPage from '../pages/brand/campaigns/CampaignManagementListPage'
import CampaignDetailPage from '../pages/brand/campaigns/CampaignDetailPage'
import ProposalInboxPage from '../pages/brand/deals/ProposalInboxPage'
import WorkspacePage from '../pages/brand/workspace/WorkspacePage'
import WorkspaceCampaignPage from '../pages/brand/workspace/WorkspaceCampaignPage'
import WorkspaceRoutes from '../pages/brand/workspace/WorkspaceRoutes'
import ComingSoonPage from '../pages/shared/ComingSoonPage'

/**
 * RouteConfig: Centralized route definitions
 * 
 * This file contains all route configurations in a declarative format.
 * Routes are organized by role and path, making it easy to:
 * - See all available routes at a glance
 * - Add new routes
 * - Understand route structure
 */

export type RouteRole = 'creator' | 'brand'

export interface RouteDefinition {
  path: string
  element: ReactElement
  exact?: boolean
}

export interface RoleRouteConfig {
  role: RouteRole
  routes: RouteDefinition[]
}

/**
 * Creator dashboard routes configuration
 */
export const creatorRoutes: RouteDefinition[] = [
  { path: '', element: <DashboardHome />, exact: true },
  { path: 'profile', element: <ProfilePage /> },
  { path: 'settings', element: <SettingsPage /> },
  { path: 'services', element: <ServicesPage /> },
  { path: 'discovery', element: <OpportunitiesPage /> },
  { path: 'proposals', element: <ProposalsListPage /> },
  { path: 'proposals/new', element: <SubmitProposalPage /> },
  { path: 'workspace', element: <DealWorkspacePage /> },
  { path: 'analytics', element: <AnalyticsPage /> },
]

/**
 * Brand dashboard routes configuration
 */
export const brandRoutes: RouteDefinition[] = [
  { path: '', element: <BrandDashboard />, exact: true },
  { path: 'profile', element: <BrandProfilePage /> },
  { path: 'analytics', element: <BrandCampaignAnalyticsPage /> },
  { path: 'discovery', element: <CreatorDiscoveryPage /> },
  
  // Workspace: Execution Layer (daily working area)
  // STATE A: Workspace Overview (DEFAULT) - shows multiple campaigns, pending work
  // Route: /dashboard/brand/workspace
  // MUST NOT auto-open any campaign - this is the overview dashboard
  { path: 'workspace', element: <WorkspacePage /> },
  // STATE B: Workspace with Campaign Selected - shows execution UI (timeline, creator progress, actions)
  // Route: /dashboard/brand/workspace/:campaignId
  // Only shows execution UI when a specific campaign is selected
  { path: 'workspace/:campaignId', element: <WorkspaceCampaignPage /> },
  // Legacy workspace/:workspaceId routes (for backward compatibility)
  // TODO: Potential route conflict - workspace/:workspaceId might match before workspace/:campaignId
  // Consider deprecating or using a different pattern if workspaceId concept is no longer needed
  { path: 'workspace/:workspaceId/*', element: <WorkspaceRoutes /> },
  
  // Campaigns: Management Layer (create, list, config-level details)
  // Create new campaign (must come before :campaignId to avoid route conflict)
  { path: 'campaigns/new', element: <CreateCampaignPage /> },
  // Campaign details (configuration-level only, no execution logic)
  { path: 'campaigns/:campaignId', element: <CampaignDetailPage /> },
  // Campaign list + entry point to create
  { path: 'campaigns', element: <CampaignManagementListPage /> },
  
  { path: 'proposals/*', element: <ProposalInboxPage /> },
  { path: 'settings', element: <BrandSettingsPage /> },
]

/**
 * Fallback route for unmatched paths
 */
export const fallbackRoute: RouteDefinition = {
  path: '*',
  element: <ComingSoonPage />,
}

/**
 * Get all routes for a specific role
 */
export function getRoutesForRole(role: RouteRole): RouteDefinition[] {
  return role === 'creator' ? creatorRoutes : brandRoutes
}

/**
 * Get route configuration for both roles
 */
export function getAllRoleRoutes(): RoleRouteConfig[] {
  return [
    { role: 'creator', routes: creatorRoutes },
    { role: 'brand', routes: brandRoutes },
  ]
}
