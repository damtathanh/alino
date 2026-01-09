import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import AvatarUpload from '../../../components/AvatarUpload'
import Toast from '../../../components/shared/Toast'
import { FaClock, FaUsers, FaStar, FaLink, FaInstagram, FaYoutube } from 'react-icons/fa'

type TabType = 'overview' | 'services' | 'portfolio' | 'reviews'

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
  
  // Form state - only editable fields
  const [formData, setFormData] = useState({
    display_name: '',
    avatar_url: '',
    bio: '',
    portfolio_website: '',
    instagram_url: '',
    youtube_url: '',
    response_time: '24 hours',
  })

  // Non-editable display data (from profile)
  const [displayData, setDisplayData] = useState({
    followers_count: 0,
    recommendations: 0,
  })

  useEffect(() => {
    if (profile && profile.role === 'creator') {
      const creatorProfile = profile as any
      setFormData({
        display_name: creatorProfile.full_name || '',
        avatar_url: creatorProfile.avatar_url || '',
        bio: creatorProfile.bio || '',
        portfolio_website: creatorProfile.portfolio_website || '',
        instagram_url: creatorProfile.instagram_url || '',
        youtube_url: creatorProfile.youtube_url || '',
        response_time: creatorProfile.response_time || '24 hours',
      })
      setDisplayData({
        followers_count: creatorProfile.followers_count || 0,
        recommendations: creatorProfile.recommendations || 0,
      })
    }
  }, [profile])

  const handleSave = async () => {
    if (!session || !profile) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('creator_profiles')
        .update({
          full_name: formData.display_name,
          avatar_url: formData.avatar_url,
          bio: formData.bio,
          portfolio_website: formData.portfolio_website,
          instagram_url: formData.instagram_url,
          youtube_url: formData.youtube_url,
          response_time: formData.response_time,
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
        .from('creator_profiles')
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

  if (!profile || profile.role !== 'creator') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#6B7280]">Không tìm thấy hồ sơ</div>
      </div>
    )
  }

  const displayName = formData.display_name || 'Creator'

  return (
    <div className="bg-gray-50 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Creator Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              {/* Profile Summary - Editable */}
              <div className="text-center mb-5">
                {/* Single Avatar with Upload */}
                <div className="mb-4">
                      <AvatarUpload
                    currentAvatarUrl={formData.avatar_url}
                        onAvatarChange={handleAvatarChange}
                        userId={session?.user?.id || ''}
                      />
                  </div>

                {/* Display Name - Editable */}
                      <input
                        type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  placeholder="Tên hiển thị"
                  className="text-lg font-semibold text-gray-900 text-center border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-[#6366F1] focus:outline-none bg-transparent mb-1 w-full"
                />
                
                <p className="text-xs text-gray-500 mb-3">Creator Profile</p>
                
                {/* Availability Status - Editable */}
                <div className="mb-4">
                  <select
                    value={formData.response_time}
                    onChange={(e) => setFormData({ ...formData, response_time: e.target.value })}
                    className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border-0 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="24 hours">Available</option>
                    <option value="48 hours">Busy</option>
                    <option value="1 week">Away</option>
                  </select>
                    </div>
                  </div>

              {/* Response Time - Editable */}
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-5 pb-5 border-b border-gray-200">
                <FaClock className="w-3.5 h-3.5" />
                <span>Typically responds within</span>
                      <input
                        type="text"
                  value={formData.response_time}
                  onChange={(e) => setFormData({ ...formData, response_time: e.target.value })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="24 hours"
                />
                    </div>

              {/* About Me - Editable */}
              <div className="mb-5 pb-5 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-900 mb-2">About Me</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell brands about yourself, your experience, and what makes you unique..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  rows={4}
                />
                    </div>

              {/* Linked Platforms - Editable */}
              <div className="mb-5 pb-5 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-900 mb-3">Linked Platforms</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FaLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                      type="url"
                      value={formData.portfolio_website}
                      onChange={(e) => setFormData({ ...formData, portfolio_website: e.target.value })}
                      placeholder="Portfolio Website"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaInstagram className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="url"
                      value={formData.instagram_url}
                      onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                      placeholder="Instagram"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaYoutube className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="url"
                      value={formData.youtube_url}
                      onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                      placeholder="YouTube"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Social Proof - Read-only Display */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-900 mb-3">Social Proof</label>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <span>Followers: {displayData.followers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaStar className="w-4 h-4 text-gray-400" />
                    <span>Recommendations: {displayData.recommendations}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">These metrics are updated automatically</p>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 disabled:opacity-50 transition-opacity text-sm"
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
                  </div>
                </div>

          {/* Right Column - Tabbed Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-6">
                  {(['overview', 'services', 'portfolio', 'reviews'] as TabType[]).map((tab) => (
                      <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-[#6366F1] text-[#6366F1]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab === 'overview' ? 'Overview' :
                       tab === 'services' ? 'Services & Pricing' :
                       tab === 'portfolio' ? 'Portfolio' :
                       'Reviews'}
                      </button>
                    ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Overview</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This is your public profile that brands will see. Use the summary card on the left to edit your basic information, 
                      and explore the tabs above to manage your services, portfolio, and reviews.
                    </p>
              </div>
            )}

                {activeTab === 'services' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Services & Pricing</h3>
                        <p className="text-sm text-gray-600">Set up service packages and pricing tiers</p>
                      </div>
                      <button className="px-3 py-1.5 text-sm font-medium text-[#6366F1] border border-[#6366F1] rounded-lg hover:bg-[#6366F1]/10 transition-colors">
                        Manage Services
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500">Service packages will be displayed here</p>
                        <p className="text-xs text-gray-400 mt-2">Coming soon</p>
                      </div>
                    </div>
                  </div>
                  )}

                {activeTab === 'portfolio' && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Portfolio</h3>
                    <p className="text-gray-600 text-sm">Showcase your best work here. Portfolio items will be displayed here.</p>
                  </div>
                  )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviews</h3>
                    <p className="text-gray-600 text-sm">Reviews and testimonials from brands you've worked with will appear here.</p>
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
