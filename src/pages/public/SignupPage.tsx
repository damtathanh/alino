import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSupabase } from '../../lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const supabase = getSupabase()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      })

      if (error) {
        setError(error.message || 'Đăng ký thất bại')
        setLoading(false)
        return
      }

      navigate('/?signup=success', { replace: true })
    } catch (err) {
      setError('Có lỗi xảy ra')
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    })

    if (error) {
      setError(error.message)
      return
    }

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6 pt-16">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex">
        <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#6366F1]/20 via-[#7C3AED]/15 to-[#EC4899]/20">
          <div className="flex flex-col px-12 pt-12 items-center">
            <img
              src="/logo/logo.png"
              alt="ALINO"
              className="w-40 h-40 mb-6"
            />
            <h1 className="text-3xl font-semibold text-[#1F2937] mb-3">
              Tạo tài khoản mới
            </h1>
            <p className="text-[#6B7280] leading-relaxed">
              Bắt đầu hành trình hợp tác với Alino
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[55%] px-10 py-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-2">Đăng ký</h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Tạo tài khoản mới để bắt đầu
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-lg"
                required
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-lg"
                required
              />

              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-lg"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-[#6366F1] to-[#EC4899] disabled:opacity-50"
              >
                {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
              </button>
            </form>

            <div className="my-5 text-center text-xs text-[#9CA3AF]">HOẶC</div>

            <button
              onClick={handleGoogleSignup}
              className="w-full py-2.5 border rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              Đăng ký với Google
            </button>

            <p className="mt-6 text-center text-sm text-[#6B7280]">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-[#6366F1] font-medium">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

