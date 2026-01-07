import { useEffect, useState, useRef } from 'react'
import { getSupabase } from '../lib/supabase'
import type { Profile, CreatorProfile, BrandProfile } from '../types/profile'

const PROFILE_FETCH_TIMEOUT = 3000 // 3 seconds

export function useProfile(
  userId: string | undefined,
  enabled: boolean
) {
  const [profile, setProfile] = useState<Profile | CreatorProfile | BrandProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled || !userId) {
      setProfile(null)
      setLoading(false)
      setError(null)
      setNeedsOnboarding(false)
      return
    }
  
    let mounted = true
  
    async function fetchProfile() {
      const supabaseInstance = getSupabase()
      const { data: { session } } = await supabaseInstance.auth.getSession()
      
      if (!session || !session.access_token || !session.user.email_confirmed_at) {
        if (mounted) {
          setProfile(null)
          setLoading(false)
          setError(null)
          setNeedsOnboarding(false)
        }
        return
      }

      setLoading(true)
      setError(null)
      setNeedsOnboarding(false)
  
      timeoutRef.current = setTimeout(() => {
        if (mounted) {
          setLoading(false)
          setError('Timeout loading profile')
        }
      }, PROFILE_FETCH_TIMEOUT)
  
      try {
        // Step 1: Fetch core profile (role, onboarding flags)
        const { data: coreProfile, error: coreError } = await supabaseInstance
          .from('profiles')
          .select('id, role, onboarding_completed, created_at, updated_at')
          .eq('id', userId)
          .single()
  
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
  
        if (coreError) {
          if (mounted) {
            if (coreError.code === '42501' || coreError.code === 'PGRST301') {
              setLoading(false)
              return
            }
            setError(coreError.message)
            setLoading(false)
          }
          return
        }
  
        if (!coreProfile) {
          if (mounted) {
            setError('Profile not found')
            setLoading(false)
          }
          return
        }
  
        // Step 2: Fetch domain-specific profile based on role
        if (coreProfile.role === 'creator') {
          const { data: creatorProfile, error: creatorError } = await supabaseInstance
            .from('creator_profiles')
            .select('*')
            .eq('user_id', userId)
            .single()
  
          if (creatorError) {
            if (mounted) {
              if (creatorError.code === 'PGRST116') {
                setProfile(null)
                setNeedsOnboarding(true)
                setLoading(false)
                return
              }
              if (creatorError.code === '42501' || creatorError.code === 'PGRST301') {
                setLoading(false)
                return
              }
              setError(creatorError.message)
              setLoading(false)
            }
            return
          }
  
          if (mounted && creatorProfile) {
            // Merge core profile with creator profile
            setProfile({
              ...coreProfile,
              ...creatorProfile,
              role: 'creator',
            } as CreatorProfile)
            setLoading(false)
          }
        } else if (coreProfile.role === 'brand') {
          const { data: brandProfile, error: brandError } = await supabaseInstance
            .from('brand_profiles')
            .select('*')
            .eq('user_id', userId)
            .single()
  
          if (brandError && brandError.code === 'PGRST116') {
            // Brand profile not found - needs onboarding
            if (mounted) {
              setProfile(null)
              setNeedsOnboarding(true)
              setLoading(false)
            }
            return
          }
  
          if (brandError) {
            if (mounted) {
              if (brandError.code === '42501' || brandError.code === 'PGRST301') {
                setLoading(false)
                return
              }
              setError(brandError.message)
              setLoading(false)
            }
            return
          }
  
          if (mounted && brandProfile) {
            // Merge core profile with brand profile
            setProfile({
              ...coreProfile,
              ...brandProfile,
              role: 'brand',
            } as BrandProfile)
            setLoading(false)
          }
        } else {
          // No role set yet
          if (mounted) {
            setProfile(coreProfile)
            setLoading(false)
          }
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
  }, [userId, enabled])
  

  return { profile, loading, error, needsOnboarding }
}
