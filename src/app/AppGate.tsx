import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

const GATE_TIMEOUT = 3000 // 3 seconds

export default function AppGate() {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const supabase = getSupabase()
  const [loading, setLoading] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasRedirected = useRef(false)

  useEffect(() => {
    // a) If not authenticated → do nothing (let other routes handle it)
    if (authLoading) return
    if (!session) return

    // b) If already redirected → do nothing
    if (hasRedirected.current) return

    // c) Email NOT verified → sign out → redirect to /
    if (!session.user.email_confirmed_at) {
      hasRedirected.current = true
      supabase.auth.signOut().finally(() => {
        navigate('/', { replace: true })
      })
      return
    }

    // d) Fetch profile DIRECTLY from Supabase (no cached hook)
    runGate()
  }, [authLoading, session, navigate, supabase])

  async function runGate() {
    if (!session) return

    // b) If already redirected → do nothing
    if (hasRedirected.current) return

    setLoading(true)

    // Set timeout fallback
    timeoutRef.current = setTimeout(() => {
      if (hasRedirected.current) return
      console.error('AppGate timeout')
      hasRedirected.current = true
      navigate('/', { replace: true })
    }, GATE_TIMEOUT)

    try {
      // Fetch existing profile
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id, role, onboarding_completed')
        .eq('id', session.user.id)
        .single()

      // b) If already redirected → do nothing
      if (hasRedirected.current) return

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            role: null,
            onboarding_completed: false,
          })

        if (insertError) {
          throw insertError
        }

        // After creating, redirect to role selection
        if (!hasRedirected.current) {
          hasRedirected.current = true
          navigate('/role', { replace: true })
        }
        return
      }

      if (fetchError) throw fetchError

      // b) If already redirected → do nothing
      if (hasRedirected.current) return

      // Profile exists, handle redirect based on state
      if (profile) {
        handleProfileRedirect(profile)
      }
    } catch (error) {
      // b) If already redirected → do nothing
      if (hasRedirected.current) return
      console.error('AppGate error:', error)
      hasRedirected.current = true
      navigate('/', { replace: true })
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setLoading(false)
    }
  }

  function handleProfileRedirect(profile: { role: string | null; onboarding_completed: boolean }) {
    // b) If already redirected → do nothing
    if (hasRedirected.current) return

    // d) If no role → redirect to /role
    if (!profile.role) {
      hasRedirected.current = true
      navigate('/role', { replace: true })
      return
    }

    // e) If onboarding_completed = false → redirect to /onboarding/{role}
    if (!profile.onboarding_completed) {
      hasRedirected.current = true
      navigate(`/onboarding/${profile.role}`, { replace: true })
      return
    }

    // f) Else → redirect to role-based dashboard
    hasRedirected.current = true
    if (profile.role === 'creator') {
      navigate('/dashboard/creator', { replace: true })
    } else if (profile.role === 'brand') {
      navigate('/dashboard/brand', { replace: true })
    } else {
      navigate('/', { replace: true })
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
