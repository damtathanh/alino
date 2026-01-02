import { useAuth } from '../hooks/useAuth'

export default function SettingsPage() {
  const { signOut } = useAuth()

  const handleChangePassword = async () => {
    // Coming soon
  }

  const handleChangeEmail = async () => {
    // Coming soon
  }

  const handleLogoutAll = async () => {
    // Coming soon
  }

  const handleDeleteAccount = async () => {
    // Coming soon
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Cài đặt</h1>

          <div className="space-y-6">

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đổi mật khẩu</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Cập nhật mật khẩu của bạn để bảo vệ tài khoản
              </p>
              <button
                onClick={handleChangePassword}
                disabled
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] opacity-50 cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đổi email</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Cập nhật địa chỉ email của bạn
              </p>
              <button
                onClick={handleChangeEmail}
                disabled
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] opacity-50 cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đăng xuất tất cả thiết bị</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Đăng xuất khỏi tất cả các thiết bị và trình duyệt
              </p>
              <button
                onClick={handleLogoutAll}
                disabled
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] opacity-50 cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>

            <div className="pb-6">
              <h2 className="text-lg font-semibold text-red-600 mb-2">Xóa tài khoản</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled
                className="px-6 py-2.5 rounded-xl font-medium text-red-600 border border-red-600 opacity-50 cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

