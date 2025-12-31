'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Đăng ký thất bại');
        setLoading(false);
        return;
      }

      router.push('/verify-email');
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await fetch('/api/auth/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google' }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký với Google');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 via-[#7C3AED]/15 to-[#EC4899]/20 backdrop-blur-2xl" />
        <div className="relative z-10 flex flex-col justify-center items-start px-12 xl:px-16 w-full">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/logo/logo.png"
              alt="ALINO"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
              ALINO
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937] mb-4">
            Bắt đầu với ALINO
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Tạo tài khoản để quản lý các dự án hợp tác Creator–Brand chuyên nghiệp
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-6 overflow-y-auto bg-white">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-2 text-[#1F2937]">
              Đăng ký
            </h2>
            <p className="text-sm text-[#6B7280]">
              Tạo tài khoản mới để bắt đầu sử dụng ALINO
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-1.5">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#374151] mb-1.5">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E7EC]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-[#9CA3AF]">HOẶC</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#E4E7EC] hover:border-[#6366F1] hover:bg-[#F9FAFB] transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-[#374151]">Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-[#6B7280]">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-[#6366F1] hover:text-[#4338CA] font-medium transition-colors">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
