import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { getSupabase } from '../lib/supabase'

export default function OnboardingPage() {
  const { session } = useAuth()
  const { profile } = useProfile(session?.user?.id)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const supabase = getSupabase()

  useEffect(() => {
    if (!profile?.role) {
      navigate('/role', { replace: true })
      return
    }
    if (profile.onboarding_completed) {
      navigate('/dashboard', { replace: true })
      return
    }
  }, [profile, navigate])

  const role = profile?.role || 'creator'

  const handleComplete = async () => {
    if (!session) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
        })
        .eq('id', session.user.id)

      if (error) throw error

      navigate('/dashboard')
    } catch (err: any) {
      setLoading(false)
      alert(err.message || 'Có lỗi xảy ra khi hoàn tất onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Hoàn tất thiết lập
          </h1>
          <p className="text-[#6B7280] mb-8">
            Bạn đang thiết lập tài khoản {role === 'creator' ? 'Creator' : 'Brand'}
          </p>
          <button
            onClick={handleComplete}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Hoàn tất'}
          </button>
        </div>
      </div>
    </div>
  )
}

