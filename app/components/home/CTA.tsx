'use client';

export default function CTA() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
        style={{ background: '#C7D2FE' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full blur-[115px] opacity-35"
        style={{ background: '#F6C1D1' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          Bắt đầu hợp tác{' '}
          <br className="hidden md:block" />
          một cách chuyên nghiệp hơn
        </h2>
        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
          ALINO giúp bạn làm việc cùng đối tác một cách minh bạch, rõ ràng và hiệu quả hơn.
        </p>
        <div className="flex flex-col items-center gap-4">
          <a
            href="/register"
            className="px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-2xl shadow-[#6366F1]/40"
          >
            Bắt đầu miễn phí
          </a>
          <p className="text-sm text-[#9CA3AF]">
            Không cần thẻ tín dụng • Thiết lập trong 5 phút
          </p>
        </div>
      </div>
    </section>
  );
}

