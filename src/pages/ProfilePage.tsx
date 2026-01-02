import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { getSupabase } from '../lib/supabase'

export default function ProfilePage() {
  const { session } = useAuth()
  const { profile } = useProfile(session?.user?.id)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onboardingData = profile?.onboarding_data && typeof profile.onboarding_data === 'object' 
    ? profile.onboarding_data 
    : {}
  const displayName = onboardingData.displayName || onboardingData.companyName || ''
  const [displayNameValue, setDisplayNameValue] = useState(displayName)

  useEffect(() => {
    setDisplayNameValue(displayName)
  }, [displayName])

  const handleSave = async () => {
    if (!session || !profile) return

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const supabase = getSupabase()
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_data: {
            ...onboardingData,
            displayName: profile.role === 'creator' ? displayNameValue : undefined,
            companyName: profile.role === 'brand' ? displayNameValue : undefined,
          },
        })
        .eq('id', session.user.id)

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Không thể cập nhật hồ sơ')
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Hồ sơ</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Đã cập nhật hồ sơ thành công!
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                {profile.role === 'creator' ? 'Tên hiển thị' : 'Tên công ty'}
              </label>
              <input
                type="text"
                value={displayNameValue}
                onChange={(e) => setDisplayNameValue(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg"
                placeholder={profile.role === 'creator' ? 'Nhập tên hiển thị' : 'Nhập tên công ty'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ''}
                disabled
                className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

