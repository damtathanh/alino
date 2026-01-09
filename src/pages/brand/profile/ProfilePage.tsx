import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import AvatarUpload from '../../../components/AvatarUpload'
import Toast from '../../../components/shared/Toast'
import { FaPaperPlane, FaFileAlt, FaClock, FaBuilding, FaIndustry, FaUsers, FaDollarSign } from 'react-icons/fa'

type TabType = 'overview' | 'campaigns' | 'analytics' | 'settings'

export default function ProfilePage() {
  const { session } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const supabase = getSupabase()

  // Form state
  const [formData, setFormData] = useState({
    brand_name: '',
    avatar_url: '',
    industry: '',
    company_size: '',
    bio: '',
    website: '',
    response_time: '24 hours',
    monthly_marketing_budget: 0,
  })

  useEffect(() => {
    if (profile && profile.role === 'brand') {
      const brandProfile = profile as any
      setFormData({
        brand_name: brandProfile.brand_name || '',
        avatar_url: brandProfile.avatar_url || '',
        industry: brandProfile.industry || '',
        company_size: brandProfile.company_size || '',
        bio: brandProfile.bio || '',
        website: brandProfile.website || '',
        response_time: brandProfile.response_time || '24 hours',
        monthly_marketing_budget: brandProfile.monthly_marketing_budget || 0,
      })
    }
  }, [profile])

  const handleSave = async () => {
    if (!session || !profile) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          brand_name: formData.brand_name,
          avatar_url: formData.avatar_url,
          industry: formData.industry,
          company_size: formData.company_size,
          bio: formData.bio,
          website: formData.website,
          response_time: formData.response_time,
          monthly_marketing_budget: formData.monthly_marketing_budget,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)

      if (error) throw error

      setToast({ message: 'Lưu hồ sơ thành công', type: 'success' })
    } catch (err: any) {
      setToast({ message: err.message || 'Có lỗi xảy ra', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (url: string) => {
    setFormData({ ...formData, avatar_url: url })
    if (!session || !profile) return

    try {
      const { error } = await supabase
        .from('brand_profiles')
        .update({ avatar_url: url, updated_at: new Date().toISOString() })
        .eq('user_id', session.user.id)

      if (error) throw error
      setToast({ message: 'Đã lưu avatar thành công', type: 'success' })
    } catch (error: any) {
      setToast({ message: error.message || 'Có lỗi xảy ra', type: 'error' })
    }
  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!profile || profile.role !== 'brand') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#6B7280]">Không tìm thấy hồ sơ</div>
      </div>
    )
  }

  const brandProfile = profile as any
  const displayName = formData.brand_name || brandProfile.brand_name || 'Brand'
  const companySizeLabels: Record<string, string> = {
    startup: 'Startup (1-10 nhân viên)',
    small: 'Nhỏ (11-50 nhân viên)',
    medium: 'Vừa (51-200 nhân viên)',
    large: 'Lớn (201-1000 nhân viên)',
    enterprise: 'Doanh nghiệp (1000+ nhân viên)',
  }

  return (
    <div className="bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  {formData.avatar_url ? (
                    <img
                      src={formData.avatar_url}
                      alt={displayName}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto flex items-center justify-center text-white text-3xl font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <AvatarUpload
                    currentAvatarUrl={formData.avatar_url}
                    onAvatarChange={handleAvatarChange}
                    userId={session?.user?.id || ''}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayName}</h2>
                <p className="text-sm text-gray-600 mb-2">Brand Profile</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <FaPaperPlane className="w-4 h-4" />
                  Create Campaign
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FaFileAlt className="w-4 h-4" />
                  Browse Creators
                </button>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <FaClock className="w-4 h-4" />
                <span>Typically responds within {formData.response_time}</span>
              </div>

              {/* About Us */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About Us</h3>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell creators about your brand, mission, and what you're looking for..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Company Info */}
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Industry</label>
                  <div className="flex items-center gap-2">
                    <FaIndustry className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="Industry"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Size</label>
                  <select
                    value={formData.company_size}
                    onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    {Object.entries(companySizeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                  <div className="flex items-center gap-2">
                    <FaBuilding className="w-4 h-4 text-gray-500" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="Company Website"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Budget */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Marketing Budget</h3>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={formData.monthly_marketing_budget || ''}
                    onChange={(e) => setFormData({ ...formData, monthly_marketing_budget: parseFloat(e.target.value) || 0 })}
                    placeholder="Monthly Budget (USD)"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full mt-6 px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Page Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{displayName}'s Profile</h1>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {(['overview', 'campaigns', 'analytics', 'settings'] as TabType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-[#6366F1] text-[#6366F1]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab === 'overview' ? 'Overview' :
                       tab === 'campaigns' ? 'Campaigns' :
                       tab === 'analytics' ? 'Analytics' :
                       'Settings'}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                    <p className="text-gray-600">Welcome to {displayName}'s profile. Manage campaigns, view analytics, and connect with creators.</p>
                  </div>
                )}

                {activeTab === 'campaigns' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Active Campaigns</h2>
                        <p className="text-gray-600">Manage your marketing campaigns and collaborations.</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg font-medium text-[#6366F1] border border-[#6366F1] hover:bg-[#6366F1]/10 transition-colors">
                        + New Campaign
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Campaigns will be displayed here</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics</h2>
                    <p className="text-gray-600">Campaign performance and engagement metrics will be displayed here.</p>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>
                    <p className="text-gray-600">Account and profile settings will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
