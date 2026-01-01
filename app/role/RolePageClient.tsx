'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RolePageClient() {
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelectRole = async (role: 'creator' | 'brand') => {
    setSelectedRole(role);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi chọn vai trò');
      }

      router.push('/onboarding');
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi chọn vai trò';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Chọn vai trò của bạn
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Chọn vai trò phù hợp với cách bạn sử dụng ALINO. Bạn có thể thay đổi sau.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelectRole('creator')}
            disabled={loading}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-[#6366F1] transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 tracking-tight">Tôi là Creator</h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              Xây dựng hồ sơ chuyên nghiệp, quản lý dịch vụ và kết nối với các Brand để phát triển sự nghiệp.
            </p>
            <div className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] group-hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25">
              Tiếp tục với Creator
            </div>
          </button>

          <button
            onClick={() => handleSelectRole('brand')}
            disabled={loading}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-[#6366F1] transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 tracking-tight">Tôi là Brand</h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              Khám phá và hợp tác với các Creator có ảnh hưởng, khởi chạy campaign và theo dõi hiệu quả dễ dàng.
            </p>
            <div className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] group-hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25">
              Tiếp tục với Brand
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
