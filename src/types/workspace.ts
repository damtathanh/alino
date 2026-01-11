/**
 * Workspace types
 * 
 * Architecture: Campaigns belong to Workspaces.
 * Workspace represents a container/organizational unit for campaigns.
 * 
 * TODO: Define full workspace schema and permissions model
 * - Should workspaces be multi-tenant (multiple brands per workspace)?
 * - Should workspaces have their own settings/permissions?
 * - What's the relationship between workspace and brand profile?
 */

export interface Workspace {
  id: string
  name: string
  // TODO: Add more workspace fields based on product requirements
  // brand_id?: string
  // created_at?: string
  // updated_at?: string
}

/**
 * Campaign types - campaigns belong to a workspace
 */
export interface Campaign {
  id: string
  workspace_id: string
  name: string
  status: 'active' | 'ongoing' | 'completed' | 'draft' | 'paused'
  // TODO: Add more campaign fields based on product requirements
  // goal?: string
  // budget?: number
  // deadline?: string
  // created_at?: string
  // updated_at?: string
}
