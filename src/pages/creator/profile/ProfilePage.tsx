import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import Toast from '../../../components/shared/Toast'
import { LoadingState, NotFoundState } from '../../../components/shared/LoadingState'
import { useCreatorProfileForm } from './hooks/useCreatorProfileForm'
import { useCreatorProfileOperations } from './hooks/useCreatorProfileOperations'
import { ProfileSummaryCard } from './components/ProfileSummaryCard'
import { TabbedContent } from './components/TabbedContent'

type TabType = 'overview' | 'services' | 'portfolio' | 'reviews'

/**
 * ProfilePage: Main component for creator profile management
 * 
 * Responsibilities:
 * - Orchestrates data fetching, form management, and UI rendering
 * - Delegates specific concerns to hooks and components
 */
export default function ProfilePage() {
  const { session } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const { formData, displayData, updateFormField, setFormData } = useCreatorProfileForm(profile)
  const { loading, toast, setToast, saveProfile, saveAvatar } = useCreatorProfileOperations(
    session,
    profile
  )

  const handleSave = () => {
    saveProfile(formData)
  }

  const handleAvatarChange = async (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
    await saveAvatar(url)
  }

  if (profileLoading) {
    return <LoadingState />
  }

  if (!profile || profile.role !== 'creator') {
    return <NotFoundState message="Không tìm thấy hồ sơ" />
  }

  const displayName = formData.display_name || 'Creator'

  return (
    <div className="bg-gray-50 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileSummaryCard
            formData={formData}
            displayData={displayData}
            loading={loading}
                        userId={session?.user?.id || ''}
            onFormFieldChange={updateFormField}
                        onAvatarChange={handleAvatarChange}
            onSave={handleSave}
          />

          <TabbedContent activeTab={activeTab} onTabChange={setActiveTab} displayName={displayName} />
        </div>
      </div>

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
