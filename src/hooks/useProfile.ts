import { useEffect, useState, useRef } from 'react'
import { getSupabase } from '../lib/supabase'
import type { Profile } from '../types/profile'

const PROFILE_FETCH_TIMEOUT = 3000 // 3 seconds

export function useProfile(
  userId: string | undefined,
  enabled: boolean
) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabase()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled || !userId) {
      setProfile(null)
      setLoading(false)
      setError(null)
      return
    }
  
    let mounted = true
  
    async function fetchProfile() {
      setLoading(true)
      setError(null)
  
      timeoutRef.current = setTimeout(() => {
        if (mounted) {
          setLoading(false)
          setError('Timeout loading profile')
        }
      }, PROFILE_FETCH_TIMEOUT)
  
      try {
        const { data, error: fetchError } = await supabase
  .from('profiles')
  .select(`
    id,
    role,
    onboarding_completed,
    avatar_url,
    display_name,
    bio,
    birth_year,
    country,
    city,
    followers_count,
    avg_views,
    creator_platforms,
    content_categories,
    collaboration_expectation,
    brand_name,
    industry,
    company_size,
    monthly_marketing_budget,
    target_platforms,
    collaboration_goal,
    created_at,
    updated_at
  `)
  .eq('id', userId)
  .single()
  
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
  
        if (fetchError) {
          if (mounted) {
            setError(fetchError.message)
            setLoading(false)
          }
          return
        }
  
        if (mounted && data) {
          setProfile(data)
          setLoading(false)
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load profile')
          setLoading(false)
        }
      }
    }
  
    fetchProfile()
  
    return () => {
      mounted = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [userId, enabled, supabase])
  

  return { profile, loading, error }
}
