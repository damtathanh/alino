import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden bg-white pt-16">
      <div className="min-h-screen">
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
              Quản lý hợp tác Creator–Brand
            </h1>
            <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Nền tảng quản lý hợp tác chuyên nghiệp giữa Creator và Brand
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
              >
                Bắt đầu ngay
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-full font-semibold text-[#6366F1] border-2 border-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

