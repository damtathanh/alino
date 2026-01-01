// lib/hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'
import { getBrowserSupabase } from '@/lib/supabase-client'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const supabase = getBrowserSupabase() // ✅ SINGLETON

  useEffect(() => {
    let mounted = true

    // 🔥 LUÔN HỎI SERVER TRƯỚC
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then(({ session }) => {
        if (!mounted) return

        if (!session) {
          supabase.auth.signOut()
          setSession(null)
        } else {
          setSession(session)
        }
        setLoading(false)
      })
      .catch(() => {
        supabase.auth.signOut()
        setSession(null)
        setLoading(false)
      })

    // 🔁 Lắng nghe auth change (login/logout)
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
