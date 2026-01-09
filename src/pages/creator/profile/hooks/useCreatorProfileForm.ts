import { useState, useEffect } from 'react'
import type { Profile } from '../../../../types/profile'

/**
 * Form data type for creator profile
 */
export interface CreatorProfileFormData {
  display_name: string
  avatar_url: string
  bio: string
  portfolio_website: string
  instagram_url: string
  youtube_url: string
  response_time: string
}

/**
 * Display data type (read-only from profile)
 */
export interface CreatorProfileDisplayData {
  followers_count: number
  recommendations: number
}

/**
 * useCreatorProfileForm: Manages form state and initialization
 * 
 * Responsibilities:
 * - Initializes form data from profile
 * - Manages form state
 * - Separates editable form data from read-only display data
 */
export function useCreatorProfileForm(profile: Profile | null | undefined) {
  const [formData, setFormData] = useState<CreatorProfileFormData>({
    display_name: '',
    avatar_url: '',
    bio: '',
    portfolio_website: '',
    instagram_url: '',
    youtube_url: '',
    response_time: '24 hours',
  })

  const [displayData, setDisplayData] = useState<CreatorProfileDisplayData>({
    followers_count: 0,
    recommendations: 0,
  })

  useEffect(() => {
    if (profile && profile.role === 'creator') {
      const creatorProfile = profile as any
  
      const rawAvatarUrl = creatorProfile.avatar_url
      const safeAvatarUrl =
        typeof rawAvatarUrl === 'string' && !rawAvatarUrl.startsWith('/src/')
          ? rawAvatarUrl
          : ''
  
      setFormData({
        display_name: creatorProfile.full_name || '',
        avatar_url: safeAvatarUrl,
        bio: creatorProfile.bio || '',
        portfolio_website: creatorProfile.portfolio_website || '',
        instagram_url: creatorProfile.instagram_url || '',
        youtube_url: creatorProfile.youtube_url || '',
        response_time: creatorProfile.response_time || '24 hours',
      })
  
      setDisplayData({
        followers_count: creatorProfile.followers_count || 0,
        recommendations: creatorProfile.recommendations || 0,
      })
    }
  }, [profile])  

  const updateFormField = <K extends keyof CreatorProfileFormData>(
    field: K,
    value: CreatorProfileFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return {
    formData,
    displayData,
    updateFormField,
    setFormData,
  }
}
