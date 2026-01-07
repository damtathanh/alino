import { useEffect, useState, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export default function AppGate({ children }: { children: ReactNode }) {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const supabase = getSupabase()

  const [isProcessing, setIsProcessing] = useState(false)

  const isAppRoute = location.pathname.startsWith('/app')

  useEffect(() => {
    if (!isAppRoute) return
    if (authLoading) return
    if (isProcessing) return

    // Not logged in
    if (!session) {
      navigate('/login', { replace: true })
      return
    }

    // Email not confirmed
    if (!session.user.email_confirmed_at) {
      supabase.auth.signOut().finally(() => {
        navigate('/login', { replace: true })
      })
      return
    }

    runGate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, session, isAppRoute])

  async function runGate() {
    if (!session) return

    setIsProcessing(true)

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, onboarding_completed')
        .eq('id', session.user.id)
        .maybeSingle()

      if (error || !profile || !profile.role) {
        navigate('/role', { replace: true })
        return
      }

      if (!profile.onboarding_completed) {
        navigate(`/onboarding/${profile.role}`, { replace: true })
        return
      }

      const dashboardPath =
        profile.role === 'creator'
          ? '/dashboard/creator'
          : '/dashboard/brand'

      navigate(dashboardPath, { replace: true })
    } catch (err) {
      console.error('AppGate error:', err)
      navigate('/login', { replace: true })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isAppRoute && (authLoading || isProcessing)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  return <>{children}</>
}
