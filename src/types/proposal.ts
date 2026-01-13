/**
 * Proposal types (matches database schema exactly)
 */

export type ProposalStatus = 'pending' | 'accepted' | 'rejected'

export interface Proposal {
  id: string
  campaign_id: string
  creator_id: string
  message: string | null
  price: number | null
  status: ProposalStatus
  created_at: string
}
