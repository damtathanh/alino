import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { getSupabase } from '../lib/supabase'
import type { OnboardingData } from '../types/profile'
import AvatarUpload from '../components/AvatarUpload'
import Toast from '../components/Toast'

export default function ProfilePage() {
  const { session, isAuthenticated } = useAuth()
  const { profile, loading: profileLoading } = useProfile(session?.user?.id, isAuthenticated)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const supabase = getSupabase()

  const onboardingData: OnboardingData = (profile?.onboarding_data && typeof profile.onboarding_data === 'object'
    ? profile.onboarding_data
    : {}) as OnboardingData

  // Form state - initialize from profile
  const [formData, setFormData] = useState<OnboardingData>({})

  useEffect(() => {
    if (profile?.onboarding_data) {
      setFormData(onboardingData)
    }
  }, [profile])

  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Accept +84xxxxxxxxx or 0xxxxxxxxx
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-[#6B7280]">Không tìm thấy hồ sơ</div>
      </div>
    )
  }

  const role = profile.role || 'creator'

  const handleSave = async () => {
    if (!session || !profile) return

    // Validate phone number if provided
    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập theo định dạng: +84xxxxxxxxx hoặc 0xxxxxxxxx')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Update both structured fields and onboarding_data
      const updatedOnboardingData = {
        ...onboardingData,
        ...formData,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_data: updatedOnboardingData,
        })
        .eq('id', session.user.id)

      if (error) throw error

      setSuccess(true)
      setToast({ message: 'Đã lưu thay đổi thành công', type: 'success' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể cập nhật hồ sơ'
      setError(errorMessage)
      setToast({ message: 'Có lỗi xảy ra, vui lòng thử lại', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (url: string) => {
    setFormData({ ...formData, avatar_url: url })
    // Auto-save avatar
    if (session && profile) {
      const updatedOnboardingData = {
        ...onboardingData,
        ...formData,
        avatar_url: url,
        updated_at: new Date().toISOString(),
      }
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            onboarding_data: updatedOnboardingData,
          })
          .eq('id', session.user.id)

        if (error) throw error

        setSuccess(true)
        setToast({ message: 'Đã lưu thay đổi thành công', type: 'success' })
        setTimeout(() => setSuccess(false), 3000)
      } catch {
        setToast({ message: 'Có lỗi xảy ra, vui lòng thử lại', type: 'error' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="max-w-4xl mx-auto">
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

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            {/* Basic Identity Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
              
              {role === 'creator' ? (
                <>
                  {/* Top Row: Display Name + Phone Number | Avatar */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                    {/* Left: Display Name + Phone Number */}
                    <div className="flex-1 space-y-4 w-full md:w-auto">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Tên hiển thị *
                        </label>
                        <input
                          type="text"
                          value={formData.display_name || ''}
                          onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                          className="w-full px-4 py-2.5 border rounded-lg"
                          placeholder="Nhập tên hiển thị"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone_number || ''}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          className="w-full px-4 py-2.5 border rounded-lg"
                          placeholder="+84xxxxxxxxx hoặc 0xxxxxxxxx"
                          required
                        />
                        {formData.phone_number && !validatePhoneNumber(formData.phone_number) && (
                          <p className="mt-1 text-xs text-red-600">
                            Định dạng không hợp lệ. Vui lòng nhập: +84xxxxxxxxx hoặc 0xxxxxxxxx
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Avatar */}
                    <div className="flex-shrink-0">
                      <AvatarUpload
                        currentAvatarUrl={formData.avatar_url}
                        onAvatarChange={handleAvatarChange}
                        userId={session?.user?.id || ''}
                      />
                    </div>
                  </div>

                  {/* 2-Column Grid: Gender + Birth Year | Country + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Giới tính
                      </label>
                      <select
                        value={formData.gender || ''}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'other' | undefined })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Quốc gia
                      </label>
                      <input
                        type="text"
                        value={formData.country || ''}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Năm sinh
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        value={formData.birth_year || ''}
                        onChange={(e) => setFormData({ ...formData, birth_year: e.target.value ? parseInt(e.target.value) : undefined })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Thành phố
                      </label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Top Row: Brand Name + Phone Number | Avatar */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                    {/* Left: Brand Name + Phone Number */}
                    <div className="flex-1 space-y-4 w-full md:w-auto">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Tên thương hiệu
                        </label>
                        <input
                          type="text"
                          value={formData.brand_name || ''}
                          onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                          className="w-full px-4 py-2.5 border rounded-lg"
                          placeholder="Nhập tên thương hiệu"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone_number || ''}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          className="w-full px-4 py-2.5 border rounded-lg"
                          placeholder="+84xxxxxxxxx hoặc 0xxxxxxxxx"
                          required
                        />
                        {formData.phone_number && !validatePhoneNumber(formData.phone_number) && (
                          <p className="mt-1 text-xs text-red-600">
                            Định dạng không hợp lệ. Vui lòng nhập: +84xxxxxxxxx hoặc 0xxxxxxxxx
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Avatar */}
                    <div className="flex-shrink-0">
                      <AvatarUpload
                        currentAvatarUrl={formData.avatar_url}
                        onAvatarChange={handleAvatarChange}
                        userId={session?.user?.id || ''}
                      />
                    </div>
                  </div>

                  {/* 2-Column Grid: Industry | Country + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Ngành nghề
                      </label>
                      <input
                        type="text"
                        value={formData.industry || ''}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Quốc gia
                      </label>
                      <input
                        type="text"
                        value={formData.country || ''}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Thành phố
                      </label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Business/Creator Metrics Section */}
            {role === 'creator' && (
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin Creator</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Nền tảng
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => {
                          const current = formData.creator_platforms || []
                          const updated = current.includes(platform)
                            ? current.filter((p) => p !== platform)
                            : [...current, platform]
                          setFormData({ ...formData, creator_platforms: updated })
                        }}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors h-10 ${
                          formData.creator_platforms?.includes(platform)
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Số lượng người theo dõi
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.followers_count || ''}
                      onChange={(e) => setFormData({ ...formData, followers_count: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-4 py-2.5 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Lượt xem trung bình
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.avg_views || ''}
                      onChange={(e) => setFormData({ ...formData, avg_views: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-4 py-2.5 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Danh mục nội dung
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Beauty', 'Fashion', 'Food', 'Travel', 'Tech', 'Fitness', 'Lifestyle', 'Education'].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          const current = formData.content_categories || []
                          const updated = current.includes(category)
                            ? current.filter((c) => c !== category)
                            : [...current, category]
                          setFormData({ ...formData, content_categories: updated })
                        }}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors h-10 ${
                          formData.content_categories?.includes(category)
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Brand Info Section */}
            {role === 'brand' && (
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin Brand</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Quy mô công ty
                  </label>
                  <select
                    value={formData.company_size || ''}
                    onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-lg"
                  >
                    <option value="">Chọn quy mô</option>
                    <option value="startup">Startup (1-10 nhân viên)</option>
                    <option value="small">Nhỏ (11-50 nhân viên)</option>
                    <option value="medium">Vừa (51-200 nhân viên)</option>
                    <option value="large">Lớn (201-1000 nhân viên)</option>
                    <option value="enterprise">Doanh nghiệp (1000+ nhân viên)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Ngân sách marketing hàng tháng (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthly_marketing_budget || ''}
                    onChange={(e) => setFormData({ ...formData, monthly_marketing_budget: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Nền tảng mục tiêu
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => {
                          const current = formData.target_platforms || []
                          const updated = current.includes(platform)
                            ? current.filter((p) => p !== platform)
                            : [...current, platform]
                          setFormData({ ...formData, target_platforms: updated })
                        }}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors h-10 ${
                          formData.target_platforms?.includes(platform)
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Collaboration Intent Section */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold mb-4">Mục tiêu hợp tác</h2>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  {role === 'creator' ? 'Kỳ vọng hợp tác' : 'Mục tiêu hợp tác'}
                </label>
                <textarea
                  value={role === 'creator' ? (formData.collaboration_expectation || '') : (formData.collaboration_goal || '')}
                  onChange={(e) =>
                    role === 'creator'
                      ? setFormData({ ...formData, collaboration_expectation: e.target.value })
                      : setFormData({ ...formData, collaboration_goal: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  placeholder={role === 'creator' ? 'Mô tả kỳ vọng của bạn về các hợp tác...' : 'Mô tả mục tiêu hợp tác của thương hiệu...'}
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="border-t pt-6">
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
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
