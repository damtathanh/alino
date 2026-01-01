'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'
import { getBrowserSupabase } from '@/lib/supabase-client'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const supabase = getBrowserSupabase()

  useEffect(() => {
    let mounted = true

    // ✅ 1. LẤY SESSION TỪ SUPABASE CLIENT (SYNC)
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session ?? null)
      setLoading(false)
    })

    // ✅ 2. LISTEN AUTH CHANGE
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    router.push('/login')
  }

  return {
    session,
    user: session?.user ?? null,
    loading,
    signOut,
  }
}
