import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../../lib/supabase'

export default function VerifyEmailPage() {
  const supabase = getSupabase()

  useEffect(() => {
    // Sign out any existing session to prevent auto-login
    supabase.auth.signOut()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-black/5 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            Xác thực thành công
          </h1>

          <p className="text-[#6B7280] mb-8 leading-relaxed">
            Tài khoản đã được xác thực. Vui lòng đăng nhập để tiếp tục.
          </p>

          <Link
            to="/login"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}
