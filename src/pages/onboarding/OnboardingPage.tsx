import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getSupabase } from '../../lib/supabase'

// Form state interfaces
interface CreatorFormData {
  display_name?: string
  country?: string
  city?: string
  birth_year?: number
  gender?: string
  creator_platforms?: string[]
  followers_count?: number
  avg_views?: number
  content_categories?: string[]
  collaboration_expectation?: ('paid' | 'gift' | 'affiliate')[]
}

interface BrandFormData {
  company_name?: string
  industry?: string
  country?: string
  city?: string
  company_size?: string
  budget?: number
  campaign_budget_range?: string
  target_platforms?: string[]
  campaign_goal?: string
  preferred_collaboration_type?: ('paid' | 'gift' | 'affiliate')[]
}

export default function OnboardingPage() {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { role: roleParam } = useParams<{ role?: 'creator' | 'brand' }>()
  const supabase = getSupabase()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState<'creator' | 'brand' | null>(roleParam || null)
  
  // Form state - separate for creator and brand
  const [creatorData, setCreatorData] = useState<CreatorFormData>({})
  const [brandData, setBrandData] = useState<BrandFormData>({})

  useEffect(() => {
    if (authLoading) return
    if (!session) return
    checkOnboardingStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, authLoading])

  async function checkOnboardingStatus() {
    if (!session || !session.access_token) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_completed, role, onboarding_data')
        .eq('id', session.user.id)
        .single()

      if (error) {
        if (error.code === '42501' || error.code === 'PGRST301') {
          return
        }
        if (error.code !== 'PGRST116') throw error
      }

      if (data?.role) {
        setRole(data.role)
        loadExistingData(data.role, data?.onboarding_data)
      }
    } catch (err) {
      console.error('Error checking onboarding:', err)
    }
  }

  async function loadExistingData(userRole: 'creator' | 'brand', onboardingData: any) {
    if (!session) return

    try {
      // Read from onboarding_data JSON, not profile columns
      const data = onboardingData || {}

      if (userRole === 'creator') {
        const step2 = data.step2 || {}
        const step3 = data.step3 || {}
        const step4 = data.step4 || {}
        
        const cd: CreatorFormData = {
          display_name: step2.display_name || undefined,
          country: step2.country || undefined,
          city: step2.city || undefined,
          birth_year: step2.birth_year || undefined,
          gender: step2.gender || undefined,
          creator_platforms: step3.creator_platforms || undefined,
          followers_count: step3.followers_count || undefined,
          avg_views: step3.avg_views || undefined,
          content_categories: step3.content_categories || undefined,
          collaboration_expectation: step4.collaboration_expectation || undefined,
        }
        setCreatorData(cd)

        // Determine current step based on onboarding_data
        if (!step2.display_name) {
          setCurrentStep(2)
        } else if (!step3.creator_platforms || step3.creator_platforms.length === 0) {
          setCurrentStep(3)
        } else if (!step4.collaboration_expectation || step4.collaboration_expectation.length === 0) {
          setCurrentStep(4)
        } else {
          setCurrentStep(5)
        }
      } else {
        const step2 = data.step2 || {}
        const step3 = data.step3 || {}
        const step4 = data.step4 || {}
        
        const bd: BrandFormData = {
          company_name: step2.company_name || undefined,
          industry: step2.industry || undefined,
          country: step2.country || undefined,
          city: step2.city || undefined,
          company_size: step3.company_size || undefined,
          budget: step3.budget || undefined,
          campaign_budget_range: step3.campaign_budget_range || undefined,
          target_platforms: step3.target_platforms || undefined,
          campaign_goal: step4.campaign_goal || undefined,
          preferred_collaboration_type: step4.preferred_collaboration_type || undefined,
        }
        setBrandData(bd)

        // Determine current step based on onboarding_data
        if (!step2.company_name) {
          setCurrentStep(2)
        } else if (!step3.company_size) {
          setCurrentStep(3)
        } else if (!step4.campaign_goal) {
          setCurrentStep(4)
        } else {
          setCurrentStep(5)
        }
      }
    } catch (err) {
      console.error('Error loading existing data:', err)
    }
  }

  // Helper to merge onboarding_data JSON
  async function mergeOnboardingData(stepKey: string, stepData: any) {
    if (!session || !session.access_token) return null

    // Fetch current onboarding_data
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('onboarding_data')
      .eq('id', session.user.id)
      .single()

    if (fetchError) {
      if (fetchError.code === '42501' || fetchError.code === 'PGRST301') {
        return null
      }
      throw fetchError
    }

    // Merge new step data into existing onboarding_data
    const currentData = profile?.onboarding_data || {}
    const mergedData = {
      ...currentData,
      [stepKey]: stepData,
    }

    // Update only onboarding_data column
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        onboarding_data: mergedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id)

    if (updateError) {
      if (updateError.code === '42501' || updateError.code === 'PGRST301') {
        return null
      }
      throw updateError
    }

    return mergedData
  }

  async function saveStep(stepData: CreatorFormData | BrandFormData, nextStep?: number) {
    if (!session || !role) return

    setLoading(true)
    setError('')

    try {
      // Determine step key based on current step
      const stepKey = `step${currentStep}`

      // Update local state
      if (role === 'creator') {
        const cd = { ...creatorData, ...stepData } as CreatorFormData
        setCreatorData(cd)
      } else {
        const bd = { ...brandData, ...stepData } as BrandFormData
        setBrandData(bd)
      }

      // Save to onboarding_data JSON (merge)
      await mergeOnboardingData(stepKey, stepData)

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
    if (!session || !session.access_token || !role) {
      setError('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('onboarding_data')
        .eq('id', session.user.id)
        .single()

      if (fetchError) {
        if (fetchError.code === '42501' || fetchError.code === 'PGRST301') {
          setError('Không thể truy cập dữ liệu. Vui lòng thử lại.')
          setLoading(false)
          return
        }
        throw fetchError
      }

      const onboardingData = profile?.onboarding_data || {}

      // Validate required fields before completing
      if (role === 'creator') {
        const step2 = onboardingData.step2 || {}
        const step3 = onboardingData.step3 || {}
        const step4 = onboardingData.step4 || {}
        
        if (!step2.display_name?.trim() || !step2.birth_year || !step2.gender || !step2.country?.trim() || !step2.city?.trim()) {
          setError('Vui lòng điền đầy đủ thông tin cơ bản (tên, năm sinh, giới tính, quốc gia, thành phố)')
          setLoading(false)
          return
        }
        if (!step3.creator_platforms || step3.creator_platforms.length === 0) {
          setError('Vui lòng chọn ít nhất một nền tảng')
          setLoading(false)
          return
        }
        if (!step3.content_categories || step3.content_categories.length === 0) {
          setError('Vui lòng chọn ít nhất một danh mục nội dung')
          setLoading(false)
          return
        }
        if (!step4.collaboration_expectation || step4.collaboration_expectation.length === 0) {
          setError('Vui lòng chọn ít nhất một loại hợp tác')
          setLoading(false)
          return
        }
      } else {
        const step2 = onboardingData.step2 || {}
        const step3 = onboardingData.step3 || {}
        const step4 = onboardingData.step4 || {}
        
        if (!step2.company_name?.trim() || !step2.industry?.trim() || !step2.country?.trim() || !step2.city?.trim()) {
          setError('Vui lòng điền đầy đủ thông tin cơ bản (tên công ty, ngành nghề, quốc gia, thành phố)')
          setLoading(false)
          return
        }
        if (!step3.company_size) {
          setError('Vui lòng chọn quy mô công ty')
          setLoading(false)
          return
        }
        if (!step3.target_platforms || step3.target_platforms.length === 0) {
          setError('Vui lòng chọn ít nhất một nền tảng mục tiêu')
          setLoading(false)
          return
        }
        if (!step4.campaign_goal?.trim()) {
          setError('Vui lòng nhập mục tiêu chiến dịch')
          setLoading(false)
          return
        }
        if (!step4.preferred_collaboration_type || step4.preferred_collaboration_type.length === 0) {
          setError('Vui lòng chọn ít nhất một loại hợp tác')
          setLoading(false)
          return
        }
      }

      // Step 1: Create or update domain-specific profile FIRST
      if (role === 'creator') {
        const step2 = onboardingData.step2 || {}
        const step3 = onboardingData.step3 || {}
        const step4 = onboardingData.step4 || {}

        const creatorProfileData: any = {
          user_id: session.user.id,
          full_name: step2.display_name || null,
          birth_year: step2.birth_year || null,
          gender: step2.gender || null,
          country: step2.country || null,
          city: step2.city || null,
          creator_platforms: step3.creator_platforms || null,
          followers_count: step3.followers_count || null,
          avg_views: step3.avg_views || null,
          content_categories: step3.content_categories || null,
          collaboration_expectation: step4.collaboration_expectation || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        // Insert creator profile (if already exists, ignore duplicate)
        const { error: creatorError } = await supabase
          .from('creator_profiles')
          .insert(creatorProfileData)

        // Ignore duplicate key error (if profile already exists)
        if (creatorError && creatorError.code !== '23505') {
          throw creatorError
        }
      } else {
        const step2 = onboardingData.step2 || {}
        const step3 = onboardingData.step3 || {}
        const step4 = onboardingData.step4 || {}

        const brandProfileData: any = {
          user_id: session.user.id,
          brand_name: step2.company_name || null,
          industry: step2.industry || null,
          company_size: step3.company_size || null,
          monthly_marketing_budget: (() => {
            const budgetValue = step3.budget || step3.campaign_budget_range
            return budgetValue ? (typeof budgetValue === 'string' ? parseFloat(budgetValue.replace(/[^0-9.]/g, '')) || null : Number(budgetValue)) : null
          })(),
          target_platforms: step3.target_platforms || null,
          collaboration_goals: (() => {
            const goalValue = step4.campaign_goal || step4.collaboration_goal
            return Array.isArray(goalValue) ? goalValue : (goalValue ? [goalValue] : null)
          })(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        // Insert brand profile (if already exists, do nothing)
        const { error: brandError } = await supabase
          .from('brand_profiles')
          .insert(brandProfileData)

        // Ignore duplicate key error (if profile already exists)
        if (brandError && brandError.code !== '23505') {
          throw brandError
        }
      }

      // Step 2: Update profiles.onboarding_completed and clear onboarding_data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_data: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)

      if (profileError) throw profileError

      // Insert consent record
      const { error: consentError } = await supabase
        .from('user_consents')
        .insert({
          user_id: session.user.id,
          policy_version: 'v1.0',
          accepted_via: 'onboarding',
          accepted_at: new Date().toISOString(),
        })

      if (consentError) {
        console.error('Error inserting consent:', consentError)
        // Don't block onboarding if consent insert fails
      }

      // Redirect directly to dashboard based on role (bypass /app to prevent loops)
      const dashboardPath = role === 'creator' ? '/dashboard/creator' : '/dashboard/brand'
      navigate(dashboardPath, { replace: true })
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi hoàn tất onboarding')
      setLoading(false)
    }
  }

  // Show loading while checking auth or fetching role
  if (authLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải thông tin...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className={`max-w-7xl mx-auto ${role === 'creator' && currentStep >= 2 && currentStep <= 4 ? '' : 'max-w-3xl'}`}>
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
              creatorData={creatorData}
              brandData={brandData}
              onSave={(data) => saveStep(data, 3)}
              loading={loading}
            />
          )}

          {/* Step 3: Business/Creator Metrics */}
          {currentStep === 3 && (
            <Step3Metrics
              role={role}
              creatorData={creatorData}
              brandData={brandData}
              onSave={(data) => saveStep(data, 4)}
              loading={loading}
            />
          )}

          {/* Step 4: Collaboration Intent */}
          {currentStep === 4 && (
            <Step4Collaboration
              role={role}
              creatorData={creatorData}
              brandData={brandData}
              onSave={(data) => saveStep(data, 5)}
              loading={loading}
            />
          )}

          {/* Step 5: Finalize */}
          {currentStep === 5 && (
            <Step5Finalize
              role={role}
              creatorData={creatorData}
              brandData={brandData}
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
  creatorData,
  brandData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  creatorData: CreatorFormData
  brandData: BrandFormData
  onSave: (data: CreatorFormData | BrandFormData) => void
  loading: boolean
}) {
  const [localData, setLocalData] = useState(
    role === 'creator'
      ? {
          display_name: creatorData.display_name || '',
          country: creatorData.country || '',
          city: creatorData.city || '',
          birth_year: creatorData.birth_year || undefined,
          gender: creatorData.gender || '',
        }
      : {
          company_name: brandData.company_name || '',
          industry: brandData.industry || '',
          country: brandData.country || '',
          city: brandData.city || '',
        }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (role === 'creator') {
      if (!localData.display_name?.trim()) newErrors.display_name = 'Vui lòng nhập tên hiển thị'
      if (!localData.birth_year) newErrors.birth_year = 'Vui lòng nhập năm sinh'
      if (!localData.gender) newErrors.gender = 'Vui lòng chọn giới tính'
      if (!localData.country?.trim()) newErrors.country = 'Vui lòng nhập quốc gia'
      if (!localData.city?.trim()) newErrors.city = 'Vui lòng nhập thành phố'
    } else {
      if (!localData.company_name?.trim()) newErrors.company_name = 'Vui lòng nhập tên công ty'
      if (!localData.industry?.trim()) newErrors.industry = 'Vui lòng nhập ngành nghề'
      if (!localData.country?.trim()) newErrors.country = 'Vui lòng nhập quốc gia'
      if (!localData.city?.trim()) newErrors.city = 'Vui lòng nhập thành phố'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    
    if (role === 'creator') {
      onSave({
        display_name: localData.display_name,
        country: localData.country,
        city: localData.city,
        birth_year: localData.birth_year,
        gender: localData.gender,
      } as CreatorFormData)
    } else {
      onSave({
        company_name: localData.company_name,
        industry: localData.industry,
        country: localData.country,
        city: localData.city,
      } as BrandFormData)
    }
  }

  // Creator preview component
  const CreatorProfilePreview = () => {
    if (role !== 'creator') return null
    
    const displayName = localData.display_name || 'Tên của bạn'
    const location = localData.city && localData.country 
      ? `${localData.city}, ${localData.country}` 
      : localData.city || localData.country || 'Địa điểm'
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
          <p className="text-sm text-gray-600 mb-2">Creator Profile</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Available
          </span>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-600 mb-2">📍 {location}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Xem trước hồ sơ</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {displayName !== 'Tên của bạn' 
                ? `Đây là cách hồ sơ của bạn sẽ hiển thị cho các thương hiệu. Hoàn thành các bước để xem thêm thông tin.`
                : 'Nhập thông tin để xem trước hồ sơ của bạn'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Thông tin cơ bản
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Hãy cho chúng tôi biết về bạn' : 'Hãy cho chúng tôi biết về thương hiệu của bạn'}
      </p>

      {role === 'creator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Tên hiển thị *
              </label>
              <input
                type="text"
                value={localData.display_name}
                onChange={(e) => {
                  setLocalData({ ...localData, display_name: e.target.value } as any)
                  if (errors.display_name) {
                    setErrors({ ...errors, display_name: '' })
                  }
                }}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.display_name ? 'border-red-500' : ''}`}
                required
              />
              {errors.display_name && (
                <p className="mt-1 text-sm text-red-600">{errors.display_name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Năm sinh *
              </label>
              <input
                type="number"
                min="1950"
                max={new Date().getFullYear()}
                value={localData.birth_year || ''}
                onChange={(e) => {
                  setLocalData({ ...localData, birth_year: e.target.value ? parseInt(e.target.value) : undefined } as any)
                  if (errors.birth_year) {
                    setErrors({ ...errors, birth_year: '' })
                  }
                }}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.birth_year ? 'border-red-500' : ''}`}
                required
              />
              {errors.birth_year && (
                <p className="mt-1 text-sm text-red-600">{errors.birth_year}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Giới tính *
              </label>
              <select
                value={localData.gender}
                onChange={(e) => {
                  setLocalData({ ...localData, gender: e.target.value } as any)
                  if (errors.gender) {
                    setErrors({ ...errors, gender: '' })
                  }
                }}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.gender ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Quốc gia *
              </label>
              <input
                type="text"
                value={localData.country}
                onChange={(e) => {
                  setLocalData({ ...localData, country: e.target.value })
                  if (errors.country) {
                    setErrors({ ...errors, country: '' })
                  }
                }}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.country ? 'border-red-500' : ''}`}
                required
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Thành phố *
              </label>
              <input
                type="text"
                value={localData.city}
                onChange={(e) => {
                  setLocalData({ ...localData, city: e.target.value })
                  if (errors.city) {
                    setErrors({ ...errors, city: '' })
                  }
                }}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.city ? 'border-red-500' : ''}`}
                required
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tiếp tục'}
            </button>
          </form>

          {/* Right: Live Preview */}
          <CreatorProfilePreview />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Tên công ty *
            </label>
            <input
              type="text"
              value={localData.company_name}
              onChange={(e) => setLocalData({ ...localData, company_name: e.target.value } as any)}
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
              onChange={(e) => setLocalData({ ...localData, industry: e.target.value } as any)}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Tiếp tục'}
          </button>
        </form>
      )}
    </div>
  )
}

// Step 3: Business/Creator Metrics
function Step3Metrics({
  role,
  creatorData,
  brandData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  creatorData: CreatorFormData
  brandData: BrandFormData
  onSave: (data: CreatorFormData | BrandFormData) => void
  loading: boolean
}) {
  const platforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn']
  
  const [localData, setLocalData] = useState(
    role === 'creator'
      ? {
          creator_platforms: creatorData.creator_platforms || [],
          followers_count: creatorData.followers_count || undefined,
          avg_views: creatorData.avg_views || undefined,
          content_categories: creatorData.content_categories || [],
        }
      : {
          company_size: brandData.company_size || '',
          budget: brandData.budget || undefined,
          campaign_budget_range: brandData.campaign_budget_range || '',
          target_platforms: brandData.target_platforms || [],
        }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}
    if (role === 'creator') {
      if (!localData.creator_platforms || localData.creator_platforms.length === 0) {
        newErrors.creator_platforms = 'Vui lòng chọn ít nhất một nền tảng'
      }
      if (!localData.content_categories || localData.content_categories.length === 0) {
        newErrors.content_categories = 'Vui lòng chọn ít nhất một danh mục nội dung'
      }
    } else {
      if (!localData.company_size) {
        newErrors.company_size = 'Vui lòng chọn quy mô công ty'
      }
      if (!localData.target_platforms || localData.target_platforms.length === 0) {
        newErrors.target_platforms = 'Vui lòng chọn ít nhất một nền tảng mục tiêu'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const togglePlatform = (platform: string, type: 'creator' | 'target') => {
    if (type === 'creator') {
      const current = localData.creator_platforms || []
      const updated = current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform]
      setLocalData({ ...localData, creator_platforms: updated } as any)
    } else {
      const current = localData.target_platforms || []
      const updated = current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform]
      setLocalData({ ...localData, target_platforms: updated } as any)
    }
  }

  const toggleCategory = (category: string) => {
    const current = localData.content_categories || []
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category]
      setLocalData({ ...localData, content_categories: updated } as any)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep3()) return
    
    if (role === 'creator') {
      onSave({
        creator_platforms: localData.creator_platforms,
        followers_count: localData.followers_count,
        avg_views: localData.avg_views,
        content_categories: localData.content_categories,
      } as CreatorFormData)
    } else {
      onSave({
        company_size: localData.company_size,
        budget: localData.budget,
        campaign_budget_range: localData.campaign_budget_range,
        target_platforms: localData.target_platforms,
      } as BrandFormData)
    }
  }

  const categories = ['Beauty', 'Fashion', 'Food', 'Travel', 'Tech', 'Fitness', 'Lifestyle', 'Education']

  // Enhanced Creator preview for Step 3
  const CreatorMetricsPreview = () => {
    if (role !== 'creator') return null
    
    const displayName = creatorData.display_name || 'Tên của bạn'
    const location = creatorData.city && creatorData.country 
      ? `${creatorData.city}, ${creatorData.country}` 
      : creatorData.city || creatorData.country || 'Địa điểm'
    const followers = localData.followers_count 
      ? localData.followers_count >= 1000 
        ? `${(localData.followers_count / 1000).toFixed(1)}K` 
        : localData.followers_count.toString()
      : null
    const platforms = localData.creator_platforms || []
    const contentCategories = localData.content_categories || []
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
          <p className="text-sm text-gray-600 mb-2">Creator Profile</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
            Available
          </span>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-600 mb-2">📍 {location}</p>
          </div>
          
          {followers && (
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-gray-500">👥</span>
              <span>Followers: {followers}</span>
            </div>
          )}
          
          {platforms.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Platforms</p>
              <div className="flex flex-wrap gap-2">
                {platforms.slice(0, 3).map((platform) => (
                  <span key={platform} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    {platform}
                  </span>
                ))}
                {platforms.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    +{platforms.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {contentCategories.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Content Categories</p>
              <div className="flex flex-wrap gap-2">
                {contentCategories.slice(0, 3).map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded text-xs">
                    {cat}
                  </span>
                ))}
                {contentCategories.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    +{contentCategories.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        {role === 'creator' ? 'Thông tin Creator' : 'Thông tin Brand'}
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Chia sẻ về kênh và nội dung của bạn' : 'Chia sẻ về quy mô và ngân sách marketing'}
      </p>

      {role === 'creator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Nền tảng bạn sử dụng *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => {
                      togglePlatform(platform, 'creator')
                      if (errors.creator_platforms) {
                        setErrors({ ...errors, creator_platforms: '' })
                      }
                    }}
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
              {errors.creator_platforms && (
                <p className="mt-1 text-sm text-red-600">{errors.creator_platforms}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Số lượng người theo dõi
              </label>
              <input
                type="number"
                min="0"
                value={localData.followers_count || ''}
                onChange={(e) => setLocalData({ ...localData, followers_count: e.target.value ? parseInt(e.target.value) : undefined } as any)}
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
                onChange={(e) => setLocalData({ ...localData, avg_views: e.target.value ? parseInt(e.target.value) : undefined } as any)}
                className="w-full px-4 py-2.5 border rounded-lg"
                placeholder="Ví dụ: 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Danh mục nội dung *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      toggleCategory(category)
                      if (errors.content_categories) {
                        setErrors({ ...errors, content_categories: '' })
                      }
                    }}
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
              {errors.content_categories && (
                <p className="mt-1 text-sm text-red-600">{errors.content_categories}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tiếp tục'}
            </button>
          </form>

          {/* Right: Live Preview */}
          <CreatorMetricsPreview />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Quy mô công ty *
            </label>
            <select
              value={localData.company_size}
              onChange={(e) => {
                setLocalData({ ...localData, company_size: e.target.value } as any)
                if (errors.company_size) {
                  setErrors({ ...errors, company_size: '' })
                }
              }}
              className={`w-full px-4 py-2.5 border rounded-lg ${errors.company_size ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Chọn quy mô</option>
              <option value="startup">Startup (1-10 nhân viên)</option>
              <option value="small">Nhỏ (11-50 nhân viên)</option>
              <option value="medium">Vừa (51-200 nhân viên)</option>
              <option value="large">Lớn (201-1000 nhân viên)</option>
              <option value="enterprise">Doanh nghiệp (1000+ nhân viên)</option>
            </select>
            {errors.company_size && (
              <p className="mt-1 text-sm text-red-600">{errors.company_size}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Ngân sách marketing (USD)
            </label>
            <input
              type="number"
              min="0"
              value={localData.budget || ''}
              onChange={(e) => setLocalData({ ...localData, budget: e.target.value ? parseInt(e.target.value) : undefined } as any)}
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder="Ví dụ: 5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Khoảng ngân sách chiến dịch
            </label>
            <input
              type="text"
              value={localData.campaign_budget_range}
              onChange={(e) => setLocalData({ ...localData, campaign_budget_range: e.target.value } as any)}
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder="Ví dụ: $1000 - $5000"
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
                  onClick={() => {
                    togglePlatform(platform, 'target')
                    if (errors.target_platforms) {
                      setErrors({ ...errors, target_platforms: '' })
                    }
                  }}
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
            {errors.target_platforms && (
              <p className="mt-1 text-sm text-red-600">{errors.target_platforms}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Tiếp tục'}
          </button>
        </form>
      )}
    </div>
  )
}

// Step 4: Collaboration Intent
function Step4Collaboration({
  role,
  creatorData,
  brandData,
  onSave,
  loading,
}: {
  role: 'creator' | 'brand'
  creatorData: CreatorFormData
  brandData: BrandFormData
  onSave: (data: CreatorFormData | BrandFormData) => void
  loading: boolean
}) {
  const collaborationTypes: ('paid' | 'gift' | 'affiliate')[] = ['paid', 'gift', 'affiliate']
  
  const [localData, setLocalData] = useState(
    role === 'creator'
      ? {
          collaboration_expectation: creatorData.collaboration_expectation || [],
        }
      : {
          campaign_goal: brandData.campaign_goal || '',
          preferred_collaboration_type: brandData.preferred_collaboration_type || [],
        }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {}
    if (role === 'creator') {
      if (!localData.collaboration_expectation || localData.collaboration_expectation.length === 0) {
        newErrors.collaboration_expectation = 'Vui lòng chọn ít nhất một loại hợp tác'
      }
    } else {
      if (!localData.campaign_goal?.trim()) {
        newErrors.campaign_goal = 'Vui lòng nhập mục tiêu chiến dịch'
      }
      if (!localData.preferred_collaboration_type || localData.preferred_collaboration_type.length === 0) {
        newErrors.preferred_collaboration_type = 'Vui lòng chọn ít nhất một loại hợp tác'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const toggleCollaborationType = (type: 'paid' | 'gift' | 'affiliate') => {
    if (role === 'creator') {
      const current = localData.collaboration_expectation || []
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
      setLocalData({ ...localData, collaboration_expectation: updated } as any)
    } else {
      const current = localData.preferred_collaboration_type || []
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
      setLocalData({ ...localData, preferred_collaboration_type: updated } as any)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep4()) return
    
    if (role === 'creator') {
      onSave({
        collaboration_expectation: localData.collaboration_expectation,
      } as CreatorFormData)
    } else {
      onSave({
        campaign_goal: localData.campaign_goal,
        preferred_collaboration_type: localData.preferred_collaboration_type,
      } as BrandFormData)
    }
  }

  // Creator collaboration preview
  const CreatorCollaborationPreview = () => {
    if (role !== 'creator') return null
    
    const displayName = creatorData.display_name || 'Tên của bạn'
    const location = creatorData.city && creatorData.country 
      ? `${creatorData.city}, ${creatorData.country}` 
      : creatorData.city || creatorData.country || 'Địa điểm'
    const followers = creatorData.followers_count 
      ? creatorData.followers_count >= 1000 
        ? `${(creatorData.followers_count / 1000).toFixed(1)}K` 
        : creatorData.followers_count.toString()
      : null
    const platforms = creatorData.creator_platforms || []
    const contentCategories = creatorData.content_categories || []
    const collaborationTypes = localData.collaboration_expectation || []
    
    const getCollaborationLabel = (type: string) => {
      switch(type) {
        case 'paid': return 'Trả phí'
        case 'gift': return 'Sản phẩm'
        case 'affiliate': return 'Affiliate'
        default: return type
      }
    }
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
          <p className="text-sm text-gray-600 mb-2">Creator Profile</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
            Available
          </span>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-600 mb-2">📍 {location}</p>
          </div>
          
          {followers && (
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-gray-500">👥</span>
              <span>Followers: {followers}</span>
            </div>
          )}
          
          {platforms.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Platforms</p>
              <div className="flex flex-wrap gap-2">
                {platforms.slice(0, 3).map((platform) => (
                  <span key={platform} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    {platform}
                  </span>
                ))}
                {platforms.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    +{platforms.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {contentCategories.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Content Categories</p>
              <div className="flex flex-wrap gap-2">
                {contentCategories.slice(0, 3).map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded text-xs">
                    {cat}
                  </span>
                ))}
                {contentCategories.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    +{contentCategories.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {collaborationTypes.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Open to Collaboration</p>
              <div className="flex flex-wrap gap-2">
                {collaborationTypes.map((type) => (
                  <span key={type} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {getCollaborationLabel(type)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Mục tiêu hợp tác
      </h1>
      <p className="text-[#6B7280] mb-8">
        {role === 'creator' ? 'Bạn mong đợi gì từ các hợp tác?' : 'Mục tiêu hợp tác của thương hiệu là gì?'}
      </p>

      {role === 'creator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Loại hợp tác mong muốn *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {collaborationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      toggleCollaborationType(type)
                      if (errors.collaboration_expectation) {
                        setErrors({ ...errors, collaboration_expectation: '' })
                      }
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      localData.collaboration_expectation?.includes(type)
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type === 'paid' ? 'Trả phí' : type === 'gift' ? 'Quà tặng' : 'Affiliate'}
                  </button>
                ))}
              </div>
              {errors.collaboration_expectation && (
                <p className="mt-1 text-sm text-red-600">{errors.collaboration_expectation}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tiếp tục'}
            </button>
          </form>

          {/* Right: Live Preview */}
          <CreatorCollaborationPreview />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Mục tiêu chiến dịch *
            </label>
            <textarea
              value={localData.campaign_goal}
              onChange={(e) => {
                  setLocalData({ ...localData, campaign_goal: e.target.value } as any)
                  if (errors.campaign_goal) {
                    setErrors({ ...errors, campaign_goal: '' })
                  }
                }}
                rows={5}
                className={`w-full px-4 py-2.5 border rounded-lg ${errors.campaign_goal ? 'border-red-500' : ''}`}
                placeholder="Mô tả mục tiêu hợp tác của thương hiệu..."
                required
              />
              {errors.campaign_goal && (
                <p className="mt-1 text-sm text-red-600">{errors.campaign_goal}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Loại hợp tác ưa thích *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {collaborationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      toggleCollaborationType(type)
                      if (errors.preferred_collaboration_type) {
                        setErrors({ ...errors, preferred_collaboration_type: '' })
                      }
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      localData.preferred_collaboration_type?.includes(type)
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type === 'paid' ? 'Trả phí' : type === 'gift' ? 'Quà tặng' : 'Affiliate'}
                  </button>
                ))}
              </div>
              {errors.preferred_collaboration_type && (
                <p className="mt-1 text-sm text-red-600">{errors.preferred_collaboration_type}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Tiếp tục'}
            </button>
          </form>
        )}
    </div>
  )
}

// Step 5: Finalize
function Step5Finalize({
  role,
  creatorData,
  brandData,
  onComplete,
  loading,
}: {
  role: 'creator' | 'brand'
  creatorData: CreatorFormData
  brandData: BrandFormData
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
              <li>• Tên: {creatorData.display_name || 'Chưa có'}</li>
              <li>• Địa điểm: {creatorData.city && creatorData.country ? `${creatorData.city}, ${creatorData.country}` : 'Chưa có'}</li>
              <li>• Nền tảng: {creatorData.creator_platforms?.length || 0} nền tảng</li>
            </>
          )}
          {role === 'brand' && (
            <>
              <li>• Công ty: {brandData.company_name || 'Chưa có'}</li>
              <li>• Ngành: {brandData.industry || 'Chưa có'}</li>
              <li>• Quy mô: {brandData.company_size || 'Chưa có'}</li>
            </>
          )}
        </ul>
      </div>

      <p className="text-sm text-gray-600 mb-6 text-center">
        By clicking Continue, you agree to ALINO's{' '}
        <Link to="/terms" className="text-[#6366F1] hover:underline">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link to="/privacy" className="text-[#6366F1] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

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
