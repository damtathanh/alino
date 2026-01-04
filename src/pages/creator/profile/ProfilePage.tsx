import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import type { Profile, CreatorProfile, BrandProfile } from '../../../types/profile'
import AvatarUpload from '../../../components/AvatarUpload'
import Toast from '../../../components/shared/Toast'

export default function ProfilePage() {
  const { session, isAuthenticated } = useAuth()
  const { profile, loading: profileLoading } = useProfile(session?.user?.id, isAuthenticated)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const supabase = getSupabase()
  
  // Refs for field focus/scroll
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>({})

  // Form state - matches FINAL schema exactly
  interface ProfileFormData {
    // Core fields
    display_name?: string | null
    avatar_url?: string | null
    bio?: string | null
    birth_year?: number | null
    country?: string | null
    city?: string | null
    // Creator fields
    creator_platforms?: string[] | null // TEXT[]
    content_categories?: string[] | null // TEXT[]
    followers_count?: number | null
    avg_views?: number | null
    collaboration_expectation?: string[] | null // TEXT[]
    // Brand fields
    brand_name?: string | null
    industry?: string | null
    company_size?: string | null
    monthly_marketing_budget?: number | null // NUMERIC
    target_platforms?: string[] | null // TEXT[]
    collaboration_goal?: string[] | null // TEXT[]
  }
  const [formData, setFormData] = useState<ProfileFormData>({})

  useEffect(() => {
    if (profile) {
      // Load all fields directly from profile columns (matches FINAL schema)
      setFormData({
        display_name: profile.display_name || undefined,
        avatar_url: profile.avatar_url || undefined,
        bio: profile.bio || undefined,
        birth_year: profile.birth_year || undefined,
        country: profile.country || undefined,
        city: profile.city || undefined,
        // Creator fields
        creator_platforms: (profile as any).creator_platforms || undefined,
        content_categories: (profile as any).content_categories || undefined,
        followers_count: (profile as any).followers_count || undefined,
        avg_views: (profile as any).avg_views || undefined,
        collaboration_expectation: (profile as any).collaboration_expectation || undefined,
        // Brand fields
        brand_name: (profile as any).brand_name || undefined,
        industry: (profile as any).industry || undefined,
        company_size: (profile as any).company_size || undefined,
        monthly_marketing_budget: (profile as any).monthly_marketing_budget ? Number((profile as any).monthly_marketing_budget) : undefined,
        target_platforms: (profile as any).target_platforms || undefined,
        collaboration_goal: Array.isArray((profile as any).collaboration_goal) ? (profile as any).collaboration_goal : undefined,
      })
    }
  }, [profile])

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#6B7280]">Không tìm thấy hồ sơ</div>
      </div>
    )
  }

  const role = profile.role || 'creator'

  // Validation function
  const validateProfile = (): { isValid: boolean; firstInvalidField: string | null } => {
    const errors: Record<string, string> = {}

    // Core required fields
    if (!formData.display_name || formData.display_name.trim() === '') {
      errors.display_name = 'Vui lòng nhập tên hiển thị'
    }
    if (!formData.birth_year) {
      errors.birth_year = 'Vui lòng nhập năm sinh'
    }
    if (!formData.country || formData.country.trim() === '') {
      errors.country = 'Vui lòng nhập quốc gia'
    }
    if (!formData.city || formData.city.trim() === '') {
      errors.city = 'Vui lòng nhập thành phố'
    }

    if (role === 'creator') {
      // Creator required fields
      if (!formData.creator_platforms || formData.creator_platforms.length === 0) {
        errors.creator_platforms = 'Vui lòng chọn ít nhất một nền tảng'
      }
      if (!formData.content_categories || formData.content_categories.length === 0) {
        errors.content_categories = 'Vui lòng chọn ít nhất một danh mục nội dung'
      }
      if (!formData.collaboration_expectation || formData.collaboration_expectation.length === 0) {
        errors.collaboration_expectation = 'Vui lòng chọn ít nhất một kỳ vọng hợp tác'
      }
      if (!formData.followers_count || formData.followers_count <= 0) {
        errors.followers_count = 'Vui lòng nhập số lượng người theo dõi (lớn hơn 0)'
      }
      if (!formData.avg_views || formData.avg_views <= 0) {
        errors.avg_views = 'Vui lòng nhập lượt xem trung bình (lớn hơn 0)'
      }
    } else {
      // Brand required fields
      if (!formData.brand_name || formData.brand_name.trim() === '') {
        errors.brand_name = 'Vui lòng nhập tên công ty'
      }
      if (!formData.industry || formData.industry.trim() === '') {
        errors.industry = 'Vui lòng nhập ngành nghề'
      }
      if (!formData.company_size || formData.company_size.trim() === '') {
        errors.company_size = 'Vui lòng chọn quy mô công ty'
      }
      if (!formData.monthly_marketing_budget || formData.monthly_marketing_budget <= 0) {
        errors.monthly_marketing_budget = 'Vui lòng nhập ngân sách marketing (lớn hơn 0)'
      }
      if (!formData.target_platforms || formData.target_platforms.length === 0) {
        errors.target_platforms = 'Vui lòng chọn ít nhất một nền tảng mục tiêu'
      }
      if (!formData.collaboration_goal || formData.collaboration_goal.length === 0) {
        errors.collaboration_goal = 'Vui lòng chọn ít nhất một mục tiêu hợp tác'
      }
    }

    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      // Find first invalid field for scrolling
      const fieldOrder = role === 'creator'
        ? ['display_name', 'birth_year', 'country', 'city', 'creator_platforms', 'content_categories', 'followers_count', 'avg_views', 'collaboration_expectation']
        : ['display_name', 'birth_year', 'country', 'city', 'brand_name', 'industry', 'company_size', 'monthly_marketing_budget', 'target_platforms', 'collaboration_goal']
      
      const firstInvalidField = fieldOrder.find(field => errors[field]) || null
      return { isValid: false, firstInvalidField }
    }

    return { isValid: true, firstInvalidField: null }
  }

  const scrollToField = (fieldName: string) => {
    const field = fieldRefs.current[fieldName]
    if (field) {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => field.focus(), 300)
    }
  }

  const handleSave = async () => {
    if (!session || !profile) return

    // Validate before saving
    const validation = validateProfile()
    if (!validation.isValid) {
      setToast({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc', type: 'error' })
      if (validation.firstInvalidField) {
        scrollToField(validation.firstInvalidField)
      }
      return
    }

    setLoading(true)
    setFieldErrors({})

    try {
      // Build update object with only columns (no onboarding_data)
      const updateData: any = {}

      // Core fields (matches FINAL schema)
      updateData.display_name = formData.display_name || null
      updateData.avatar_url = formData.avatar_url || null
      updateData.bio = formData.bio || null
      updateData.birth_year = formData.birth_year || null
      updateData.country = formData.country || null
      updateData.city = formData.city || null

      if (role === 'creator') {
        // Creator-specific fields (matches FINAL schema - TEXT[] are arrays)
        updateData.creator_platforms = formData.creator_platforms || null
        updateData.content_categories = formData.content_categories || null
        updateData.followers_count = formData.followers_count || null
        updateData.avg_views = formData.avg_views || null
        updateData.collaboration_expectation = formData.collaboration_expectation || null
      } else {
        // Brand-specific fields (matches FINAL schema)
        updateData.brand_name = formData.brand_name || null
        updateData.industry = formData.industry || null
        updateData.company_size = formData.company_size || null
        updateData.monthly_marketing_budget = formData.monthly_marketing_budget !== undefined ? formData.monthly_marketing_budget : null // NUMERIC
        updateData.target_platforms = formData.target_platforms || null
        updateData.collaboration_goal = formData.collaboration_goal || null // TEXT[]
      }

      // Explicitly remove any invalid columns (safety check)
      // These columns do NOT exist in the database schema
      const {
        preferred_collaboration_type,
        success_collaboration_rate,
        company_name,
        website,
        campaign_budget_range,
        campaign_goal,
        target_creator_size,
        contact_person_name,
        contact_person_phone,
        ...safeUpdateData
      } = updateData as any
      
      // Update profile (only with valid columns)
      const { error: profileError } = await supabase
        .from('profiles')
        .update(safeUpdateData)
        .eq('id', session.user.id)

      if (profileError) throw profileError

      // Sync display_name and avatar_url to auth metadata
      const metadataUpdate: Record<string, any> = {}
      if (formData.display_name !== undefined) {
        metadataUpdate.display_name = formData.display_name
      }
      if (formData.avatar_url !== undefined) {
        metadataUpdate.avatar_url = formData.avatar_url
      }

      if (Object.keys(metadataUpdate).length > 0) {
        const { error: authError } = await supabase.auth.updateUser({
          data: metadataUpdate,
        })
        if (authError) {
          console.warn('Failed to update auth metadata:', authError)
          // Don't throw - profile update succeeded
        }
      }

      setToast({ message: 'Lưu hồ sơ thành công', type: 'success' })
    } catch (err: any) {
      console.error('Profile save error:', err)
      setToast({ message: err.message || 'Có lỗi xảy ra, vui lòng thử lại', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (url: string) => {
    // URL is already a public URL from AvatarUpload component (after successful storage upload)
    if (!session || !profile) {
      console.error('Cannot save avatar: missing session or profile')
      return
    }

    // Optimistically update form state
    setFormData((prev) => ({ ...prev, avatar_url: url }))

    try {
      // Update profiles.avatar_url with public URL (primary source)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          avatar_url: url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)

      if (profileError) {
        console.error('Failed to update profiles.avatar_url:', profileError)
        throw profileError
      }

      // Sync to auth metadata (secondary, non-blocking)
      const { error: authError } = await supabase.auth.updateUser({
        data: { avatar_url: url },
      })
      if (authError) {
        console.warn('Failed to sync avatar_url to auth metadata (non-blocking):', authError)
        // Don't throw - profile update succeeded
      }

      setToast({ message: 'Đã lưu avatar thành công', type: 'success' })
    } catch (error: any) {
      console.error('Avatar save error:', error)
      // Revert optimistic update on error
      setFormData((prev) => ({ ...prev, avatar_url: profile.avatar_url || null }))
      setToast({ message: error.message || 'Có lỗi xảy ra khi lưu avatar', type: 'error' })
    }
  }

  return (
    <div className="bg-white py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-200">

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            {/* Basic Identity Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
              
              {role === 'creator' ? (
                <>
                  {/* Top Row: Display Name | Avatar */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                    {/* Left: Display Name */}
                    <div className="flex-1 space-y-4 w-full md:w-auto">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Tên hiển thị *
                        </label>
                        <input
                          ref={(el) => fieldRefs.current.display_name = el}
                          type="text"
                          value={formData.display_name || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, display_name: e.target.value })
                            if (fieldErrors.display_name) {
                              setFieldErrors(prev => {
                                const next = { ...prev }
                                delete next.display_name
                                return next
                              })
                            }
                          }}
                          className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.display_name ? 'border-red-500' : ''}`}
                          placeholder="Nhập tên hiển thị"
                        />
                        {fieldErrors.display_name && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.display_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Right: Avatar */}
                    <div className="flex-shrink-0">
                      <AvatarUpload
                        currentAvatarUrl={formData.avatar_url ?? undefined}
                        onAvatarChange={handleAvatarChange}
                        userId={session?.user?.id || ''}
                      />
                    </div>
                  </div>

                  {/* 2-Column Grid: Birth Year | Country + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Năm sinh *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.birth_year = el}
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        value={formData.birth_year || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, birth_year: e.target.value ? parseInt(e.target.value) : undefined })
                          if (fieldErrors.birth_year) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.birth_year
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.birth_year ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.birth_year && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.birth_year}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Quốc gia *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.country = el}
                        type="text"
                        value={formData.country || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, country: e.target.value })
                          if (fieldErrors.country) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.country
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.country ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.country && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Thành phố *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.city = el}
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value })
                          if (fieldErrors.city) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.city
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.city ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.city && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Top Row: Company Name | Avatar */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                    {/* Left: Company Name */}
                    <div className="flex-1 space-y-4 w-full md:w-auto">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Tên công ty *
                        </label>
                        <input
                          ref={(el) => fieldRefs.current.brand_name = el}
                          type="text"
                          value={formData.brand_name || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, brand_name: e.target.value })
                            if (fieldErrors.brand_name) {
                              setFieldErrors(prev => {
                                const next = { ...prev }
                                delete next.brand_name
                                return next
                              })
                            }
                          }}
                          className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.brand_name ? 'border-red-500' : ''}`}
                          placeholder="Nhập tên công ty"
                        />
                        {fieldErrors.brand_name && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.brand_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Right: Avatar */}
                    <div className="flex-shrink-0">
                      <AvatarUpload
                        currentAvatarUrl={formData.avatar_url ?? undefined}
                        onAvatarChange={handleAvatarChange}
                        userId={session?.user?.id || ''}
                      />
                    </div>
                  </div>

                  {/* 2-Column Grid: Industry | Country + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Ngành nghề *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.industry = el}
                        type="text"
                        value={formData.industry || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, industry: e.target.value })
                          if (fieldErrors.industry) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.industry
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.industry ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.industry && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.industry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Quốc gia *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.country = el}
                        type="text"
                        value={formData.country || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, country: e.target.value })
                          if (fieldErrors.country) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.country
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.country ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.country && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Thành phố *
                      </label>
                      <input
                        ref={(el) => fieldRefs.current.city = el}
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value })
                          if (fieldErrors.city) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.city
                              return next
                            })
                          }
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.city ? 'border-red-500' : ''}`}
                      />
                      {fieldErrors.city && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                      )}
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
                    Giới thiệu
                  </label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    placeholder="Giới thiệu về bản thân..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Nền tảng *
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
                          if (fieldErrors.creator_platforms && updated.length > 0) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.creator_platforms
                              return next
                            })
                          }
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
                  {fieldErrors.creator_platforms && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.creator_platforms}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Số lượng người theo dõi *
                    </label>
                    <input
                      ref={(el) => fieldRefs.current.followers_count = el}
                      type="number"
                      min="0"
                      value={formData.followers_count || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, followers_count: e.target.value ? parseInt(e.target.value) : undefined })
                        if (fieldErrors.followers_count) {
                          setFieldErrors(prev => {
                            const next = { ...prev }
                            delete next.followers_count
                            return next
                          })
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.followers_count ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.followers_count && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.followers_count}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Lượt xem trung bình *
                    </label>
                    <input
                      ref={(el) => fieldRefs.current.avg_views = el}
                      type="number"
                      min="0"
                      value={formData.avg_views || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, avg_views: e.target.value ? parseInt(e.target.value) : undefined })
                        if (fieldErrors.avg_views) {
                          setFieldErrors(prev => {
                            const next = { ...prev }
                            delete next.avg_views
                            return next
                          })
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.avg_views ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.avg_views && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.avg_views}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Danh mục nội dung *
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
                          if (fieldErrors.content_categories && updated.length > 0) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.content_categories
                              return next
                            })
                          }
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
                  {fieldErrors.content_categories && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.content_categories}</p>
                  )}
                </div>
              </div>
            )}

            {/* Brand Info Section */}
            {role === 'brand' && (
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin Brand</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Quy mô công ty *
                  </label>
                  <select
                    ref={(el) => fieldRefs.current.company_size = el}
                    value={formData.company_size || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, company_size: e.target.value })
                      if (fieldErrors.company_size) {
                        setFieldErrors(prev => {
                          const next = { ...prev }
                          delete next.company_size
                          return next
                        })
                      }
                    }}
                    className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.company_size ? 'border-red-500' : ''}`}
                  >
                    <option value="">Chọn quy mô</option>
                    <option value="startup">Startup (1-10 nhân viên)</option>
                    <option value="small">Nhỏ (11-50 nhân viên)</option>
                    <option value="medium">Vừa (51-200 nhân viên)</option>
                    <option value="large">Lớn (201-1000 nhân viên)</option>
                    <option value="enterprise">Doanh nghiệp (1000+ nhân viên)</option>
                  </select>
                  {fieldErrors.company_size && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.company_size}</p>
                  )}
                </div>
                <div className="mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Ngân sách marketing hàng tháng *
                    </label>
                    <input
                      ref={(el) => fieldRefs.current.monthly_marketing_budget = el}
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.monthly_marketing_budget || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, monthly_marketing_budget: e.target.value ? parseFloat(e.target.value) : undefined })
                        if (fieldErrors.monthly_marketing_budget) {
                          setFieldErrors(prev => {
                            const next = { ...prev }
                            delete next.monthly_marketing_budget
                            return next
                          })
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg ${fieldErrors.monthly_marketing_budget ? 'border-red-500' : ''}`}
                      placeholder="Ví dụ: 5000"
                    />
                    {fieldErrors.monthly_marketing_budget && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.monthly_marketing_budget}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Nền tảng mục tiêu *
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
                          if (fieldErrors.target_platforms && updated.length > 0) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.target_platforms
                              return next
                            })
                          }
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
                  {fieldErrors.target_platforms && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.target_platforms}</p>
                  )}
                </div>
              </div>
            )}

            {/* Collaboration Intent Section */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold mb-4">Mục tiêu hợp tác</h2>
              {role === 'creator' ? (
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Kỳ vọng hợp tác *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['paid', 'gift', 'affiliate'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          const current = formData.collaboration_expectation || []
                          const updated = current.includes(type)
                            ? current.filter((t) => t !== type)
                            : [...current, type]
                          setFormData({ ...formData, collaboration_expectation: updated })
                          if (fieldErrors.collaboration_expectation && updated.length > 0) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.collaboration_expectation
                              return next
                            })
                          }
                        }}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors h-10 ${
                          formData.collaboration_expectation?.includes(type)
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {type === 'paid' ? 'Trả phí' : type === 'gift' ? 'Quà tặng' : 'Affiliate'}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.collaboration_expectation && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.collaboration_expectation}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Mục tiêu hợp tác *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['brand_awareness', 'sales', 'engagement', 'lead_generation', 'product_launch', 'community_building'].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          const current = formData.collaboration_goal || []
                          const updated = current.includes(goal)
                            ? current.filter((g) => g !== goal)
                            : [...current, goal]
                          setFormData({ ...formData, collaboration_goal: updated })
                          if (fieldErrors.collaboration_goal && updated.length > 0) {
                            setFieldErrors(prev => {
                              const next = { ...prev }
                              delete next.collaboration_goal
                              return next
                            })
                          }
                        }}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors h-10 ${
                          formData.collaboration_goal?.includes(goal)
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {goal === 'brand_awareness' ? 'Nhận diện thương hiệu' :
                         goal === 'sales' ? 'Bán hàng' :
                         goal === 'engagement' ? 'Tương tác' :
                         goal === 'lead_generation' ? 'Tạo lead' :
                         goal === 'product_launch' ? 'Ra mắt sản phẩm' :
                         'Xây dựng cộng đồng'}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.collaboration_goal && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.collaboration_goal}</p>
                  )}
                </div>
              )}
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
