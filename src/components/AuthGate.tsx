import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading: authLoading, isAuthenticated } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    isAuthenticated
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!session) {
      navigate('/login', { replace: true })
      return
    }

    if (!profile) return

    if (!profile.role) {
      navigate('/role', { replace: true })
      return
    }

    if (!profile.onboarding_completed) {
      navigate('/onboarding', { replace: true })
      return
    }
  }, [session, profile, authLoading, profileLoading, navigate])

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    )
  }

  return <>{children}</>
}
