import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getSupabase } from '../../lib/supabase'
import { FaUserCircle, FaBuilding, FaArrowRight, FaCheck } from 'react-icons/fa'

export default function RolePage() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(null)
  const navigate = useNavigate()
  const supabase = getSupabase()

  const handleSelectRole = async (role: 'creator' | 'brand') => {
    if (!session || !session.access_token) return

    setSelectedRole(role)
    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)

      if (error) {
        if (error.code === '42501' || error.code === 'PGRST301') {
          setLoading(false)
          setSelectedRole(null)
          return
        }
        throw error
      }

      // Navigate to /app - AppGate will handle routing to onboarding
      navigate('/app', { replace: true })
    } catch (err: any) {
      setLoading(false)
      setSelectedRole(null)
      alert(err.message || 'Có lỗi xảy ra khi chọn vai trò')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
            Chọn vai trò của bạn
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Chọn vai trò phù hợp với cách bạn mong muốn sử dụng ALINO.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Creator Card */}
          <button
            onClick={() => handleSelectRole('creator')}
            disabled={loading}
            className={`group relative p-10 bg-white/90 backdrop-blur-xl rounded-3xl border-2 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRole === 'creator'
                ? 'border-[#6366F1] shadow-2xl shadow-[#6366F1]/20 scale-105'
                : 'border-gray-200 hover:border-[#6366F1]/50 hover:shadow-xl hover:shadow-[#6366F1]/10 hover:scale-[1.02]'
            }`}
          >
            {/* Icon Container */}
            <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
              selectedRole === 'creator'
                ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-lg'
                : 'bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 group-hover:from-[#6366F1]/20 group-hover:to-[#8B5CF6]/20'
            }`}>
              <FaUserCircle className={`w-8 h-8 transition-colors ${
                selectedRole === 'creator' ? 'text-white' : 'text-[#6366F1]'
              }`} />
            </div>

            {/* Content */}
            <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-[#6366F1] transition-colors">
              Creator
            </h3>
            <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
              Tôi là Creator muốn hợp tác với các Brand
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                </div>
                Quản lý đề xuất và hợp tác
              </li>
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                </div>
                Theo dõi hiệu suất và phân tích
              </li>
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                </div>
                Kết nối với các Brand phù hợp
              </li>
            </ul>

            {/* Arrow Icon */}
            <div className={`flex items-center text-[#6366F1] font-semibold transition-all ${
              selectedRole === 'creator' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              <span className="text-sm mr-2">Bắt đầu</span>
              <FaArrowRight className="w-4 h-4" />
            </div>

            {/* Selected Indicator */}
            {selectedRole === 'creator' && loading && (
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center animate-pulse">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </button>

          {/* Brand Card */}
          <button
            onClick={() => handleSelectRole('brand')}
            disabled={loading}
            className={`group relative p-10 bg-white/90 backdrop-blur-xl rounded-3xl border-2 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRole === 'brand'
                ? 'border-[#EC4899] shadow-2xl shadow-[#EC4899]/20 scale-105'
                : 'border-gray-200 hover:border-[#EC4899]/50 hover:shadow-xl hover:shadow-[#EC4899]/10 hover:scale-[1.02]'
            }`}
          >
            {/* Icon Container */}
            <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
              selectedRole === 'brand'
                ? 'bg-gradient-to-br from-[#EC4899] to-[#F472B6] shadow-lg'
                : 'bg-gradient-to-br from-[#EC4899]/10 to-[#F472B6]/10 group-hover:from-[#EC4899]/20 group-hover:to-[#F472B6]/20'
            }`}>
              <FaBuilding className={`w-8 h-8 transition-colors ${
                selectedRole === 'brand' ? 'text-white' : 'text-[#EC4899]'
              }`} />
            </div>

            {/* Content */}
            <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-[#EC4899] transition-colors">
              Brand
            </h3>
            <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
              Tôi là Brand muốn hợp tác với các Creator
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
                </div>
                Tạo và quản lý chiến dịch
              </li>
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
                </div>
                Khám phá và kết nối Creator
              </li>
              <li className="flex items-center text-sm text-[#6B7280]">
                <div className="w-5 h-5 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
                </div>
                Theo dõi ROI và hiệu suất
              </li>
            </ul>

            {/* Arrow Icon */}
            <div className={`flex items-center text-[#EC4899] font-semibold transition-all ${
              selectedRole === 'brand' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              <span className="text-sm mr-2">Bắt đầu</span>
              <FaArrowRight className="w-4 h-4" />
            </div>

            {/* Selected Indicator */}
            {selectedRole === 'brand' && loading && (
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center animate-pulse">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg">
              <div className="w-5 h-5 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-[#6B7280]">
                Đang xử lý...
              </span>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-sm text-[#6B7280] mt-8">
          Bạn có thể thay đổi vai trò bất cứ lúc nào trong cài đặt
        </p>
      </div>
    </div>
  )
}
