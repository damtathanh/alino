import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'
import type { OnboardingData } from '../types/profile'

export default function OnboardingPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const supabase = getSupabase()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [formData, setFormData] = useState<OnboardingData>({})

  useEffect(() => {
    if (!session) {
      navigate('/app', { replace: true })
      return
    }

    // Check if onboarding already completed
    checkOnboardingStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function checkOnboardingStatus() {
    if (!session) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_completed, role')
        .eq('id', session.user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data?.onboarding_completed) {
        navigate('/app', { replace: true })
        return
      }

      if (data?.role) {
        // Load existing data
        loadExistingData()
      }
    } catch (err) {
      console.error('Error checking onboarding:', err)
    }
  }

  async function loadExistingData() {
    if (!session) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_data, role')
        .eq('id', session.user.id)
        .single()

      if (error) throw error

      if (data?.onboarding_data && typeof data.onboarding_data === 'object') {
        setFormData(data.onboarding_data as OnboardingData)
      }

      // Determine current step based on existing data
      if (data?.role) {
        if (!data.onboarding_data || Object.keys(data.onboarding_data).length === 0) {
          setCurrentStep(2)
        } else {
          const od = data.onboarding_data as OnboardingData
          if (!od.display_name && !od.brand_name) {
            setCurrentStep(2)
          } else if (!od.creator_platforms && !od.company_size) {
            setCurrentStep(3)
          } else if (!od.collaboration_expectation && !od.collaboration_goal) {
            setCurrentStep(4)
          } else {
            setCurrentStep(5)
          }
        }
      }
    } catch (err) {
      console.error('Error loading existing data:', err)
    }
  }

  async function saveStep(stepData: Partial<OnboardingData>, nextStep?: number) {
    if (!session) return

    setLoading(true)
    setError('')

    try {
      const updatedData = { ...formData, ...stepData }
      setFormData(updatedData)

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_data: updatedData,
        })
        .eq('id', session.user.id)

      if (error) throw error

      if (nextStep) {
        setCurrentStep(nextStep)
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi lưu dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  async function handleComplete() {
    if (!session) return

    setLoading(true)
    setError('')

    try {
      const finalData = {
        ...formData,
        onboarding_completed_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_data: finalData,
        })
        .eq('id', session.user.id)

      if (error) throw error

      navigate('/app', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi hoàn tất onboarding')
      setLoading(false)
    }
  }

  const [role, setRole] = useState<'creator' | 'brand' | null>(null)

  useEffect(() => {
    async function getRole() {
      if (!session) return null
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      return data?.role || null
    }
    getRole().then(setRole)
  }, [session, supabase])

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">
                Bước {currentStep} / 5
              </span>
              <span className="text-sm text-[#6B7280]">
                {Math.round((currentStep / 5) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] h-2 rounded-full transition-all"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 2: Basic Identity */}
          {currentStep === 2 && (
            <Step2BasicIdentity
              role={role}
              formData={formData}
              onSave={(data) => saveStep(data, 3)}
              loading={loading}
            />
          )}

          {/* Step 3: Business/Creator Metrics */}
          {currentStep === 3 && (
            <Step3Metrics
              role={role}
              formData={formData}
              onSave={(data) => saveStep(data, 4)}
              loading={loading}
            />
          )}

          {/* Step 4: Collaboration Intent */}
          {currentStep === 4 && (
            <Step4Collaboration
              role={role}
              formData={formData}
              onSave={(data) => saveStep(data, 5)}
              loading={loading}
            />
          )}

          {/* Step 5: Finalize */}
          {currentStep === 5 && (
            <Step5Finalize
              role={role}
              formData={formData}
              onComplete={handleComplete}
              loading={loading}
            />
          )}

          {/* Navigation buttons */}
          {currentStep > 2 && (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl font-medium text-[#6B7280] border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                Quay lại
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Step 2: Basic Identity
function Step2BasicIdentity({
  role,
  formData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  formData: OnboardingData
  onSave: (data: Partial<OnboardingData>) => void
  loading: boolean
}) {
  const [localData, setLocalData] = useState({
    display_name: formData.display_name || '',
    brand_name: formData.brand_name || '',
    country: formData.country || '',
    city: formData.city || '',
    birth_year: formData.birth_year || undefined,
    industry: formData.industry || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === 'creator') {
      onSave({
        display_name: localData.display_name,
        country: localData.country,
        city: localData.city,
        birth_year: localData.birth_year,
      })
    } else {
      onSave({
        brand_name: localData.brand_name,
        industry: localData.industry,
        country: localData.country,
        city: localData.city,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Thông tin cơ bản
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Hãy cho chúng tôi biết về bạn' : 'Hãy cho chúng tôi biết về thương hiệu của bạn'}
      </p>

      <div className="space-y-4">
        {role === 'creator' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Tên hiển thị *
              </label>
              <input
                type="text"
                value={localData.display_name}
                onChange={(e) => setLocalData({ ...localData, display_name: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Quốc gia *
              </label>
              <input
                type="text"
                value={localData.country}
                onChange={(e) => setLocalData({ ...localData, country: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Thành phố *
              </label>
              <input
                type="text"
                value={localData.city}
                onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
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
                value={localData.birth_year || ''}
                onChange={(e) => setLocalData({ ...localData, birth_year: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Tên thương hiệu *
              </label>
              <input
                type="text"
                value={localData.brand_name}
                onChange={(e) => setLocalData({ ...localData, brand_name: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Ngành nghề *
              </label>
              <input
                type="text"
                value={localData.industry}
                onChange={(e) => setLocalData({ ...localData, industry: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Quốc gia *
              </label>
              <input
                type="text"
                value={localData.country}
                onChange={(e) => setLocalData({ ...localData, country: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Thành phố *
              </label>
              <input
                type="text"
                value={localData.city}
                onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Tiếp tục'}
        </button>
      </div>
    </form>
  )
}

// Step 3: Business/Creator Metrics
function Step3Metrics({
  role,
  formData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  formData: OnboardingData
  onSave: (data: Partial<OnboardingData>) => void
  loading: boolean
}) {
  const platforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn']
  
  const [localData, setLocalData] = useState({
    creator_platforms: formData.creator_platforms || [],
    followers_count: formData.followers_count || undefined,
    avg_views: formData.avg_views || undefined,
    content_categories: formData.content_categories || [],
    company_size: formData.company_size || '',
    monthly_marketing_budget: formData.monthly_marketing_budget || undefined,
    target_platforms: formData.target_platforms || [],
  })

  const togglePlatform = (platform: string, type: 'creator' | 'target') => {
    if (type === 'creator') {
      const current = localData.creator_platforms || []
      const updated = current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform]
      setLocalData({ ...localData, creator_platforms: updated })
    } else {
      const current = localData.target_platforms || []
      const updated = current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform]
      setLocalData({ ...localData, target_platforms: updated })
    }
  }

  const toggleCategory = (category: string) => {
    const current = localData.content_categories || []
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category]
    setLocalData({ ...localData, content_categories: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === 'creator') {
      onSave({
        creator_platforms: localData.creator_platforms,
        followers_count: localData.followers_count,
        avg_views: localData.avg_views,
        content_categories: localData.content_categories,
      })
    } else {
      onSave({
        company_size: localData.company_size,
        monthly_marketing_budget: localData.monthly_marketing_budget,
        target_platforms: localData.target_platforms,
      })
    }
  }

  const categories = ['Beauty', 'Fashion', 'Food', 'Travel', 'Tech', 'Fitness', 'Lifestyle', 'Education']

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        {role === 'creator' ? 'Thông tin Creator' : 'Thông tin Brand'}
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Chia sẻ về kênh và nội dung của bạn' : 'Chia sẻ về quy mô và ngân sách marketing'}
      </p>

      <div className="space-y-4">
        {role === 'creator' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Nền tảng bạn sử dụng *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform, 'creator')}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      localData.creator_platforms?.includes(platform)
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Số lượng người theo dõi
              </label>
              <input
                type="number"
                min="0"
                value={localData.followers_count || ''}
                onChange={(e) => setLocalData({ ...localData, followers_count: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-4 py-2.5 border rounded-lg"
                placeholder="Ví dụ: 100000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Lượt xem trung bình
              </label>
              <input
                type="number"
                min="0"
                value={localData.avg_views || ''}
                onChange={(e) => setLocalData({ ...localData, avg_views: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-4 py-2.5 border rounded-lg"
                placeholder="Ví dụ: 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Danh mục nội dung
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      localData.content_categories?.includes(category)
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Quy mô công ty *
              </label>
              <select
                value={localData.company_size}
                onChange={(e) => setLocalData({ ...localData, company_size: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg"
                required
              >
                <option value="">Chọn quy mô</option>
                <option value="startup">Startup (1-10 nhân viên)</option>
                <option value="small">Nhỏ (11-50 nhân viên)</option>
                <option value="medium">Vừa (51-200 nhân viên)</option>
                <option value="large">Lớn (201-1000 nhân viên)</option>
                <option value="enterprise">Doanh nghiệp (1000+ nhân viên)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Ngân sách marketing hàng tháng (USD)
              </label>
              <input
                type="number"
                min="0"
                value={localData.monthly_marketing_budget || ''}
                onChange={(e) => setLocalData({ ...localData, monthly_marketing_budget: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-4 py-2.5 border rounded-lg"
                placeholder="Ví dụ: 5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Nền tảng mục tiêu *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform, 'target')}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      localData.target_platforms?.includes(platform)
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Tiếp tục'}
        </button>
      </div>
    </form>
  )
}

// Step 4: Collaboration Intent
function Step4Collaboration({
  role,
  formData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  formData: OnboardingData
  onSave: (data: Partial<OnboardingData>) => void
  loading: boolean
}) {
  const [localData, setLocalData] = useState({
    collaboration_expectation: formData.collaboration_expectation || '',
    collaboration_goal: formData.collaboration_goal || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === 'creator') {
      onSave({ collaboration_expectation: localData.collaboration_expectation })
    } else {
      onSave({ collaboration_goal: localData.collaboration_goal })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Mục tiêu hợp tác
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Bạn mong đợi gì từ các hợp tác?' : 'Mục tiêu hợp tác của thương hiệu là gì?'}
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {role === 'creator' ? 'Kỳ vọng hợp tác *' : 'Mục tiêu hợp tác *'}
          </label>
          <textarea
            value={role === 'creator' ? localData.collaboration_expectation : localData.collaboration_goal}
            onChange={(e) =>
              role === 'creator'
                ? setLocalData({ ...localData, collaboration_expectation: e.target.value })
                : setLocalData({ ...localData, collaboration_goal: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-2.5 border rounded-lg"
            placeholder={role === 'creator' ? 'Mô tả kỳ vọng của bạn về các hợp tác...' : 'Mô tả mục tiêu hợp tác của thương hiệu...'}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Tiếp tục'}
        </button>
      </div>
    </form>
  )
}

// Step 5: Finalize
function Step5Finalize({
  role,
  formData,
  onComplete,
  loading,
}: {
  role: 'creator' | 'brand'
  formData: OnboardingData
  onComplete: () => void
  loading: boolean
}) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Hoàn tất thiết lập
      </h1>
      <p className="text-[#6B7280] mb-8">
        Bạn đã hoàn thành tất cả các bước thiết lập. Nhấn "Hoàn tất" để bắt đầu sử dụng ALINO.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-2">Tóm tắt thông tin:</h3>
        <ul className="text-sm text-[#6B7280] space-y-1">
          {role === 'creator' && (
            <>
              <li>• Tên: {formData.display_name || 'Chưa có'}</li>
              <li>• Địa điểm: {formData.city && formData.country ? `${formData.city}, ${formData.country}` : 'Chưa có'}</li>
              <li>• Nền tảng: {formData.creator_platforms?.length || 0} nền tảng</li>
            </>
          )}
          {role === 'brand' && (
            <>
              <li>• Thương hiệu: {formData.brand_name || 'Chưa có'}</li>
              <li>• Ngành: {formData.industry || 'Chưa có'}</li>
              <li>• Quy mô: {formData.company_size || 'Chưa có'}</li>
            </>
          )}
        </ul>
      </div>

      <button
        onClick={onComplete}
        disabled={loading}
        className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
      >
        {loading ? 'Đang xử lý...' : 'Hoàn tất'}
      </button>
    </div>
  )
}
