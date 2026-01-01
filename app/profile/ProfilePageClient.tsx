'use client';

import { useState, useEffect } from 'react';

interface ProfilePageClientProps {
  profile: {
    id: string;
    role: string | null;
    onboarding_completed: boolean;
    onboarding_data?: any;
  };
}

export default function ProfilePageClient({ profile }: ProfilePageClientProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onboardingData = typeof profile.onboarding_data === 'object' ? profile.onboarding_data : {};
  const displayName = onboardingData.displayName || onboardingData.companyName || '';
  const [displayNameValue, setDisplayNameValue] = useState(displayName);

  useEffect(() => {
    setDisplayNameValue(displayName);
  }, [displayName]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Update profile with new display name
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          onboarding_data: {
            ...onboardingData,
            displayName: profile.role === 'creator' ? displayNameValue : undefined,
            companyName: profile.role === 'brand' ? displayNameValue : undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể cập nhật hồ sơ');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      window.location.reload(); // Refresh to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Hồ sơ</h1>

          <div className="space-y-6">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-3">
                Avatar
              </label>
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-3xl font-semibold">
                {displayNameValue.charAt(0).toUpperCase() || 'U'}
              </div>
              <p className="text-sm text-[#6B7280] mt-2">
                Avatar sẽ được cập nhật trong phiên bản tương lai
              </p>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                {profile.role === 'creator' ? 'Tên hiển thị' : 'Tên công ty'}
              </label>
              <input
                type="text"
                value={displayNameValue}
                onChange={(e) => setDisplayNameValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                placeholder={profile.role === 'creator' ? 'Nhập tên hiển thị' : 'Nhập tên công ty'}
              />
            </div>

            {/* Onboarding Info (Read-only for now) */}
            {Object.keys(onboardingData).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-3">
                  Thông tin bổ sung
                </label>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-[#6B7280]">
                  {Object.entries(onboardingData).map(([key, value]) => {
                    if (key === 'displayName' || key === 'companyName') return null;
                    return (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Đã cập nhật thành công!
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={loading || displayNameValue === displayName}
              className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
