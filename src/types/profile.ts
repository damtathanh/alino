export interface Profile {
  id: string
  role: 'creator' | 'brand' | null
  onboarding_completed: boolean
  onboarding_data?: OnboardingData
}

export interface OnboardingData {
  // Step 1 - Role
  role_selected_at?: string

  // Step 2 - Basic Identity
  // Creator fields
  display_name?: string
  avatar_url?: string
  country?: string
  city?: string
  birth_year?: number

  // Brand fields
  brand_name?: string
  industry?: string

  // Step 3 - Business/Creator Metrics
  // Creator fields
  creator_platforms?: string[]
  followers_count?: number
  avg_views?: number
  engagement_rate?: number
  content_categories?: string[]

  // Brand fields
  company_size?: string
  monthly_marketing_budget?: number
  target_platforms?: string[]

  // Step 4 - Collaboration Intent
  // Creator
  collaboration_expectation?: string
  // Brand
  collaboration_goal?: string
}

