'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get email from localStorage
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('pendingVerificationEmail');
      setEmail(storedEmail);
    }
  }, []);

  const handleResend = async () => {
    if (!email) {
      setError('Không tìm thấy email');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể gửi lại email');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-black/5 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            Kiểm tra email của bạn
          </h1>

          <p className="text-[#6B7280] mb-8 leading-relaxed">
            Chúng tôi đã gửi link xác thực đến địa chỉ email của bạn. 
            Vui lòng kiểm tra hộp thư và nhấp vào link để xác thực tài khoản.
          </p>

          {email && (
            <p className="text-sm text-[#6366F1] mb-6 font-medium">
              {email}
            </p>
          )}

          <div className="bg-[#EEF2FF] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#6B7280]">
              <strong>Lưu ý:</strong> Link xác thực có hiệu lực trong 24 giờ. 
              Nếu bạn không thấy email, vui lòng kiểm tra thư mục spam.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Email đã được gửi lại thành công!
            </div>
          )}

          {email && (
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full mb-4 px-6 py-3 rounded-xl font-medium text-[#6366F1] border border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang gửi...' : 'Gửi lại email xác thực'}
            </button>
          )}

          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
