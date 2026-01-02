import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { getSupabase } from '../lib/supabase'

interface AuthGateProps {
  children: React.ReactNode
}

export default function AuthGate({ children }: AuthGateProps) {
  const { session, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile(session?.user?.id)
  const navigate = useNavigate()
  const supabase = getSupabase()

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!session) {
      navigate('/login', { replace: true })
      return
    }

    if (!profile) {
      supabase.auth.signOut()
      navigate('/login', { replace: true })
      return
    }

    if (!profile.role) {
      navigate('/role', { replace: true })
      return
    }

    if (!profile.onboarding_completed) {
      navigate('/onboarding', { replace: true })
      return
    }
  }, [session, profile, authLoading, profileLoading, navigate, supabase])

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!session || !profile || !profile.role || !profile.onboarding_completed) {
    return null
  }

  return <>{children}</>
}

