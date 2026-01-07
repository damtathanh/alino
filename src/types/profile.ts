// Core profile fields (matches FINAL schema)
export interface Profile {
  id: string
  role: 'creator' | 'brand' | null
  onboarding_completed: boolean
  onboarding_data?: any
  is_admin?: boolean
  created_at?: string
  updated_at?: string
}

// Creator-specific fields (matches FINAL schema)
export interface CreatorProfile extends Profile {
  role: 'creator'
  full_name?: string | null
  avatar_url?: string | null
  birth_year?: number | null
  gender?: string | null
  country?: string | null
  city?: string | null
  creator_platforms?: string[] | null // TEXT[]
  content_categories?: string[] | null // TEXT[]
  followers_count?: number | null
  avg_views?: number | null
  collaboration_expectation?: string[] | null // TEXT[]
}

// Brand-specific fields (matches FINAL schema)
export interface BrandProfile extends Profile {
  role: 'brand'
  brand_name?: string | null
  industry?: string | null
  company_size?: string | null
  monthly_marketing_budget?: number | null // NUMERIC
  target_platforms?: string[] | null // TEXT[]
  collaboration_goals?: string[] | null // TEXT[]
}

export type ProfileWithRole = CreatorProfile | BrandProfile
