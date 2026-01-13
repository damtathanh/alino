/**
 * Campaign types (matches database schema exactly)
 */

export type CampaignStatus = 'draft' | 'open' | 'closed'

export interface Campaign {
  id: string
  brand_id: string
  title: string
  description: string | null
  status: CampaignStatus
  budget_min: number | null
  budget_max: number | null
  created_at: string
  updated_at: string
}
