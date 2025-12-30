'use client';

import TrustedBy from './TrustedBy';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEF1FF] via-[#F5F7FF] to-white" />

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 bg-[#C7D2FE]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-40 bg-[#F6C1D1]" />
      <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full blur-[90px] opacity-35 bg-[#DDD6FE]" />

      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col py-16">
        <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
              Nền tảng hợp tác{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                cho Creator & Brand
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-xl">
              ALINO giúp Creator và Brand làm việc cùng nhau minh bạch, rõ ràng và hiệu quả — từ khám phá đối tác đến hoàn thành dự án.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="/register"
                className="px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/30"
              >
                Bắt đầu miễn phí
              </a>
              <span className="text-sm text-[#9CA3AF]">
                Không cần thẻ • 5 phút setup
              </span>
            </div>
          </div>

          <div className="relative">
  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-black/5">
    <div className="space-y-5">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 bg-[#E5E7EB] rounded-full" />
          <div className="h-3 w-16 bg-[#EEF2FF] rounded-full" />
        </div>
        <span className="text-xs text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Creator column */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-[#6366F1]">Creator</p>
          <div className="bg-[#EEF2FF] rounded-xl p-3">
            <p className="text-xs font-medium">Video TikTok</p>
            <p className="text-[11px] text-[#6B7280]">Draft đang chờ duyệt</p>
          </div>
          <div className="bg-[#E0E7FF] rounded-xl p-3">
            <p className="text-xs font-medium">Instagram Reel</p>
            <p className="text-[11px] text-[#6B7280]">Đã gửi</p>
          </div>
        </div>

        {/* Brand column */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-[#EC4899]">Brand</p>
          <div className="bg-[#FCE7F3] rounded-xl p-3">
            <p className="text-xs font-medium">Feedback</p>
            <p className="text-[11px] text-[#6B7280]">
              “Sửa caption đoạn đầu”
            </p>
          </div>
          <div className="bg-[#FBCFE8] rounded-xl p-3">
            <p className="text-xs font-medium">Approved</p>
            <p className="text-[11px] text-[#6B7280]">
              OK đăng ngày 25/12
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 pt-2">
        <div className="h-2 w-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] rounded-full" />
        <span className="text-[10px] text-[#6B7280]">75%</span>
      </div>
    </div>
  </div>
</div>

        </div>

        <div className="mt-10">
          <TrustedBy />
        </div>
      </div>
    </section>
  );
}

