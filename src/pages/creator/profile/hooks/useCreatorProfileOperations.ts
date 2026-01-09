import { useState } from 'react'
import { getSupabase } from '../../../../lib/supabase'
import type { Session } from '@supabase/supabase-js'
import type { Profile } from '../../../../types/profile'
import type { CreatorProfileFormData } from './useCreatorProfileForm'
import type { ToastState } from '../../../../types/toast'

/**
 * useCreatorProfileOperations: Handles profile save operations
 * 
 * Responsibilities:
 * - Manages save operations (profile and avatar)
 * - Handles loading and error states
 * - Provides toast notifications
 */
export function useCreatorProfileOperations(
  session: Session | null,
  profile: Profile | null | undefined
) {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)
  const supabase = getSupabase()

  const saveProfile = async (formData: CreatorProfileFormData) => {
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

  const saveAvatar = async (avatarUrl: string) => {
    if (!session || !profile) return

    try {
      const { error } = await supabase
        .from('creator_profiles')
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq('user_id', session.user.id)

      if (error) throw error
      setToast({ message: 'Đã lưu avatar thành công', type: 'success' })
    } catch (error: any) {
      setToast({ message: error.message || 'Có lỗi xảy ra', type: 'error' })
    }
  }

  return {
    loading,
    toast,
    setToast,
    saveProfile,
    saveAvatar,
  }
}
