/**
 * Deal types (matches database schema exactly)
 */

export type DealStatus = 'invited' | 'accepted' | 'in_progress' | 'delivered' | 'approved' | 'completed' | 'cancelled'

export interface Deal {
  id: string
  campaign_id: string | null
  brand_id: string
  creator_id: string
  status: DealStatus
  created_at: string
}
