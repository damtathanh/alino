'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async () => {
    setLoading('password');
    setError('');
    setSuccess('');
    
    // TODO: Implement change password
    setTimeout(() => {
      setLoading(null);
      setSuccess('Tính năng đổi mật khẩu sẽ sớm có sẵn');
      setTimeout(() => setSuccess(''), 3000);
    }, 500);
  };

  const handleChangeEmail = async () => {
    setLoading('email');
    setError('');
    setSuccess('');
    
    // TODO: Implement change email
    setTimeout(() => {
      setLoading(null);
      setSuccess('Tính năng đổi email sẽ sớm có sẵn');
      setTimeout(() => setSuccess(''), 3000);
    }, 500);
  };

  const handleLogoutAll = async () => {
    setLoading('logoutAll');
    setError('');
    setSuccess('');
    
    try {
      // TODO: Implement logout all devices
      setSuccess('Tính năng đăng xuất tất cả thiết bị sẽ sớm có sẵn');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
      return;
    }

    setLoading('delete');
    setError('');
    setSuccess('');
    
    try {
      // TODO: Implement delete account
      setError('Tính năng xóa tài khoản sẽ sớm có sẵn');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Cài đặt</h1>

          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            {/* Change Password */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đổi mật khẩu</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Cập nhật mật khẩu của bạn để bảo vệ tài khoản
              </p>
              <button
                onClick={handleChangePassword}
                disabled={loading === 'password'}
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'password' ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </div>

            {/* Change Email */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đổi email</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Cập nhật địa chỉ email của bạn
              </p>
              <button
                onClick={handleChangeEmail}
                disabled={loading === 'email'}
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'email' ? 'Đang xử lý...' : 'Đổi email'}
              </button>
            </div>

            {/* Logout All Devices */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-2">Đăng xuất tất cả thiết bị</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Đăng xuất khỏi tất cả các thiết bị và trình duyệt
              </p>
              <button
                onClick={handleLogoutAll}
                disabled={loading === 'logoutAll'}
                className="px-6 py-2.5 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'logoutAll' ? 'Đang xử lý...' : 'Đăng xuất tất cả'}
              </button>
            </div>

            {/* Delete Account */}
            <div className="pb-6">
              <h2 className="text-lg font-semibold text-red-600 mb-2">Xóa tài khoản</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={loading === 'delete'}
                className="px-6 py-2.5 rounded-xl font-medium text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'delete' ? 'Đang xử lý...' : 'Xóa tài khoản'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
