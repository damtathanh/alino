import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)
  const supabase = getSupabase()

  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleResendEmail = async () => {
    if (!email) {
      setResendError('Không tìm thấy email để gửi lại.')
      return
    }

    setResendLoading(true)
    setResendSuccess(false)
    setResendError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        throw new Error(error.message || 'Không thể gửi lại email xác thực')
      }

      setResendSuccess(true)
    } catch (err: any) {
      console.error('Resend verification email error:', err)
      setResendError(err.message || 'Có lỗi xảy ra khi gửi lại email xác thực')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
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

          <div className="bg-[#EEF2FF] rounded-xl p-4 mb-8">
            <p className="text-sm text-[#6B7280]">
              <strong>Lưu ý:</strong> Link xác thực có hiệu lực trong 24 giờ.
              Nếu bạn không thấy email, vui lòng kiểm tra thư mục spam.
            </p>
          </div>

          {resendSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Đã gửi lại email xác thực thành công!
            </div>
          )}
          {resendError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {resendError}
            </div>
          )}

          <button
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? 'Đang gửi...' : 'Gửi lại email xác thực'}
          </button>

          <Link
            to="/login"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}

