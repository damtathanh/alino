import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export default function RolePage() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const supabase = getSupabase()

  const handleSelectRole = async (role: 'creator' | 'brand') => {
    if (!session) return

    setLoading(true)

    try {
      // Get existing onboarding_data
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('onboarding_data')
        .eq('id', session.user.id)
        .single()

      const existingData = (existingProfile?.onboarding_data as any) || {}

      // Update role and save role_selected_at timestamp in onboarding_data
      const { error } = await supabase
        .from('profiles')
        .update({
          role,
          onboarding_data: {
            ...existingData,
            role_selected_at: new Date().toISOString(),
          },
        })
        .eq('id', session.user.id)

      if (error) throw error

      // After success → navigate('/app')
      navigate('/app', { replace: true })
    } catch (err: any) {
      setLoading(false)
      alert(err.message || 'Có lỗi xảy ra khi chọn vai trò')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Chọn vai trò của bạn
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Chọn vai trò phù hợp với cách bạn sử dụng ALINO. Bạn có thể thay đổi sau.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelectRole('creator')}
            disabled={loading}
            className="p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#6366F1] transition-colors text-left disabled:opacity-50"
          >
            <h3 className="text-2xl font-semibold mb-2">Creator</h3>
            <p className="text-[#6B7280]">
              Tôi là Creator muốn hợp tác với các Brand
            </p>
          </button>

          <button
            onClick={() => handleSelectRole('brand')}
            disabled={loading}
            className="p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#6366F1] transition-colors text-left disabled:opacity-50"
          >
            <h3 className="text-2xl font-semibold mb-2">Brand</h3>
            <p className="text-[#6B7280]">
              Tôi là Brand muốn hợp tác với các Creator
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
