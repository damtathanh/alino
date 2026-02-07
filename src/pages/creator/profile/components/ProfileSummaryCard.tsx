import { useState } from 'react'
import { ReactNode } from 'react'
import { FaClock, FaUsers, FaStar, FaLink, FaInstagram, FaYoutube, FaCopy } from 'react-icons/fa'
import AvatarUpload from '../../../../components/AvatarUpload/AvatarUpload'
import { publicProfileUrl as getPublicProfileUrl } from '../../../../lib/publicUrl'
import type { CreatorProfileFormData } from '../hooks/useCreatorProfileForm'
import type { CreatorProfileDisplayData } from '../hooks/useCreatorProfileForm'

interface ProfileSummaryCardProps {
  formData: CreatorProfileFormData
  displayData: CreatorProfileDisplayData
  loading: boolean
  userId: string
  onFormFieldChange: <K extends keyof CreatorProfileFormData>(
    field: K,
    value: CreatorProfileFormData[K]
  ) => void
  onAvatarChange: (url: string) => void
  onSave: () => void
}

export function ProfileSummaryCard({
  formData,
  displayData,
  loading,
  userId,
  onFormFieldChange,
  onAvatarChange,
  onSave,
}: ProfileSummaryCardProps) {
  const [copied, setCopied] = useState(false)

  const publicProfileLink = getPublicProfileUrl(userId)

  const handleCopyPublicLink = async () => {
    try {
      await navigator.clipboard.writeText(publicProfileLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // fallback for older browsers
      setCopied(false)
    }
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
        {/* Profile Header */}
        <div className="text-center mb-5">
          <div className="mb-4">
            <AvatarUpload
              currentAvatarUrl={formData.avatar_url}
              onAvatarChange={onAvatarChange}
              userId={userId}
            />
          </div>

          <input
            type="text"
            value={formData.display_name}
            onChange={(e) => onFormFieldChange('display_name', e.target.value)}
            placeholder="Tên hiển thị"
            className="text-lg font-semibold text-gray-900 text-center border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-[#6366F1] focus:outline-none bg-transparent mb-1 w-full"
          />

          <p className="text-xs text-gray-500 mb-2">Creator Profile</p>

          <button
            type="button"
            onClick={handleCopyPublicLink}
            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#6366F1] transition-colors mb-4"
          >
            <FaCopy className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Copy public profile link'}
          </button>

          <div className="mb-4">
            <select
              value={formData.response_time}
              onChange={(e) => onFormFieldChange('response_time', e.target.value)}
              className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border-0 focus:ring-2 focus:ring-green-500"
            >
              <option value="24 hours">Available</option>
              <option value="48 hours">Busy</option>
              <option value="1 week">Away</option>
            </select>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-5 pb-5 border-b border-gray-200">
          <FaClock className="w-3.5 h-3.5" />
          <span>Typically responds within</span>
          <input
            type="text"
            value={formData.response_time}
            onChange={(e) => onFormFieldChange('response_time', e.target.value)}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#6366F1] focus:border-transparent"
            placeholder="24 hours"
          />
        </div>

        {/* About Me */}
        <div className="mb-5 pb-5 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-900 mb-2">About Me</label>
          <textarea
            value={formData.bio}
            onChange={(e) => onFormFieldChange('bio', e.target.value)}
            placeholder="Tell brands about yourself, your experience, and what makes you unique..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Linked Platforms */}
        <div className="mb-5 pb-5 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-900 mb-3">Linked Platforms</label>
          <div className="space-y-2">
            <PlatformInput
              icon={<FaLink className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              value={formData.portfolio_website}
              onChange={(value) => onFormFieldChange('portfolio_website', value)}
              placeholder="Portfolio Website"
            />
            <PlatformInput
              icon={<FaInstagram className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              value={formData.instagram_url}
              onChange={(value) => onFormFieldChange('instagram_url', value)}
              placeholder="Instagram"
            />
            <PlatformInput
              icon={<FaYoutube className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              value={formData.youtube_url}
              onChange={(value) => onFormFieldChange('youtube_url', value)}
              placeholder="YouTube"
            />
          </div>
        </div>

        {/* Social Proof */}
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
          onClick={onSave}
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 disabled:opacity-50 transition-opacity text-sm"
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>
    </div>
  )
}

function PlatformInput({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: ReactNode
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
      />
    </div>
  )
}
