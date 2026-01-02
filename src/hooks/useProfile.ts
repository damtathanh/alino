import { useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabase'

interface Profile {
  id: string
  role: 'creator' | 'brand' | null
  onboarding_completed: boolean
  onboarding_data?: any
}

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabase()

  useEffect(() => {
    if (!userId) {
      setProfile(null)
      setLoading(false)
      return
    }

    let mounted = true

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, role, onboarding_completed, onboarding_data')
          .eq('id', userId)
          .single()

        if (error) throw error

        if (mounted) {
          setProfile(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        if (mounted) {
          setProfile(null)
          setLoading(false)
          // If profile is missing, sign out user
          await supabase.auth.signOut()
        }
      }
    }

    fetchProfile()

    return () => {
      mounted = false
    }
  }, [userId])

  return { profile, loading }
}

