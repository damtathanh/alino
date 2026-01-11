import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import Toast from '../../../components/shared/Toast'
import { FaGoogle, FaFacebook, FaInstagram, FaTiktok, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

/**
 * BrandSettingsPage: Brand settings following same structure as Creator Settings
 * 
 * Architecture: Matches Creator Settings layout pattern
 * - Shared layout structure
 * - Similar navigation pattern
 * - Brand-specific fields only
 * - Reuses common components where possible
 */

export default function SettingsPage() {
  const { session } = useAuth()
  const { profile } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const supabase = getSupabase()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Check if user is OAuth-only (no email/password)
  const userProviders = session?.user?.app_metadata?.providers || []
  const hasEmailProvider = userProviders.includes('email') || session?.user?.email
  const isOAuthOnly = !hasEmailProvider && userProviders.length > 0

  // Get account created date
  const accountCreatedDate = session?.user?.created_at 
    ? new Date(session.user.created_at).toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'N/A'

  // Mock connected accounts - replace with real data later
  const connectedAccounts = [
    { name: 'Google', provider: 'google', connected: true, icon: FaGoogle },
    { name: 'Facebook', provider: 'facebook', connected: false, icon: FaFacebook },
    { name: 'Instagram', provider: 'instagram', connected: false, icon: FaInstagram },
    { name: 'TikTok', provider: 'tiktok', connected: false, icon: FaTiktok },
  ]

  // Clear error when user starts typing
  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value)
    if (passwordError) setPasswordError('')
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    if (passwordError) setPasswordError('')
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    if (passwordError) setPasswordError('')
  }

  const handleChangePassword = async () => {
    // Clear previous errors
    setPasswordError('')

    // Validation: All fields required
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin')
      return
    }

    // Validation: New password must be different from current password
    if (currentPassword === newPassword) {
      setPasswordError('Mật khẩu mới phải khác với mật khẩu hiện tại')
      return
    }

    // Validation: Confirm password must match new password
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu mới không khớp')
      return
    }

    // Validation: Minimum length
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    if (!session?.user?.email) {
      setPasswordError('Không tìm thấy thông tin người dùng')
      return
    }

    setPasswordLoading(true)

    try {
      // Step 1: Re-authenticate with current password to verify it's correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword,
      })

      if (signInError) {
        setPasswordError('Mật khẩu hiện tại không đúng')
        setPasswordLoading(false)
        return
      }

      // Step 2: Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        setPasswordError(updateError.message || 'Có lỗi xảy ra khi đổi mật khẩu')
        setPasswordLoading(false)
        return
      }

      // Success: Clear form and show toast
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordError('')
      setToast({ message: 'Đổi mật khẩu thành công', type: 'success' })
    } catch (error: any) {
      setPasswordError(error.message || 'Có lỗi xảy ra khi đổi mật khẩu')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD 1: Account Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-[#374151] mb-6">Thông tin tài khoản</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tạo tài khoản
                </label>
                <p className="text-gray-700">{accountCreatedDate}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tài khoản đã kết nối
                </label>
                <div className="space-y-2">
                  {connectedAccounts.map((account) => {
                    const Icon = account.icon
                    return (
                      <div
                        key={account.provider}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{account.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {account.connected ? (
                            <>
                              <FaCheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Đã kết nối</span>
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">Chưa kết nối</span>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Change Password */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-[#374151] mb-6">Đổi mật khẩu</h2>
            
            {isOAuthOnly ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Tài khoản của bạn được đăng nhập qua OAuth. Tính năng đổi mật khẩu không khả dụng cho tài khoản này.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {passwordLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>

                {passwordError && (
                  <p className="text-sm text-red-600 mt-2">
                    {passwordError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CARD 3: Subscription */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-[#374151] mb-6">Gói đăng ký</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gói hiện tại
                </label>
                <p className="text-gray-700">Miễn phí</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày hết hạn
                </label>
                <p className="text-gray-700">Không giới hạn</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Đang hoạt động
                </span>
              </div>

              <button
                disabled
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] opacity-50 cursor-not-allowed"
              >
                Nâng cấp gói (Coming soon)
              </button>
            </div>
          </div>

          {/* CARD 4: Security & Data Usage (READ-ONLY) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-[#374151] mb-6">Bảo mật & Sử dụng dữ liệu</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm mb-4">
                  ALINO sử dụng thông tin của bạn để vận hành, duy trì, cải thiện và tối ưu hóa nền tảng. 
                  Chúng tôi thu thập và xử lý dữ liệu cần thiết để cung cấp dịch vụ kết nối giữa Creator và Brand một cách hiệu quả.
                </p>
                <p className="text-sm mb-4">
                  Thông tin của bạn được sử dụng để nâng cao trải nghiệm người dùng, cải thiện chất lượng dịch vụ, 
                  và đảm bảo nền tảng hoạt động ổn định và an toàn.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Để biết thêm chi tiết về cách chúng tôi xử lý dữ liệu của bạn, vui lòng xem{' '}
                  <Link to="/privacy" className="text-[#6366F1] hover:underline">
                    Chính sách bảo mật
                  </Link>
                  {' '}của chúng tôi.
                </p>
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
