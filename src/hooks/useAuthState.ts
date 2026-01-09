import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabase } from '../lib/supabase'

/**
 * useAuthState: Manages authentication state and Supabase session
 * 
 * Responsibilities:
 * - Fetches initial session on mount
 * - Listens to auth state changes from Supabase
 * - Maintains session and loading state
 * - Does NOT expose signOut or other operations (handled by AuthContext)
 */
export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabase()

  useEffect(() => {
    let mounted = true

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      setSession(session)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return { session, loading }
}
