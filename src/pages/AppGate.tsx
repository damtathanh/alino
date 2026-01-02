import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export default function AppGate() {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const supabase = getSupabase()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    // a) No session → redirect to landing
    if (!session) {
      navigate('/', { replace: true })
      return
    }

    // b) Email NOT verified → sign out → redirect to /
    if (!session.user.email_confirmed_at) {
      supabase.auth.signOut().finally(() => {
        navigate('/', { replace: true })
      })
      return
    }

    // c) Fetch profile DIRECTLY from Supabase (no cached hook)
    runGate()
  }, [authLoading, session, navigate, supabase])

  async function runGate() {
    if (!session) return

    setLoading(true)

    try {
      // Fetch profile directly from Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, role, onboarding_completed')
        .eq('id', session.user.id)
        .single()

      // d) If profile does NOT exist → insert profile → redirect /role
      if (error && error.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            role: null,
            onboarding_completed: false,
          })

        if (insertError) throw insertError

        navigate('/role', { replace: true })
        return
      }

      if (error) throw error

      // e) If profile.role is null → redirect /role
      if (!profile.role) {
        navigate('/role', { replace: true })
        return
      }

      // f) If onboarding_completed is false → redirect /onboarding
      if (!profile.onboarding_completed) {
        navigate('/onboarding', { replace: true })
        return
      }

      // g) Else → redirect /dashboard (or next param)
      const next = searchParams.get('next')
      if (next === 'projects' || next === 'profile' || next === 'settings') {
        navigate(`/${next}`, { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('AppGate error:', error)
      navigate('/', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  return null
}
