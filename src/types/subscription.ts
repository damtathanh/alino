/**
 * Subscription types (matches database schema exactly)
 */

export type SubscriptionPlan = 'free' | 'pro'

export interface Subscription {
  user_id: string
  plan: SubscriptionPlan
  valid_until: string | null
  created_at: string
}
