'use client';

export default function ForWho() {
  return (
    <section className="relative py-14 md:py-16 bg-gradient-to-b from-[#FAFBFF] via-white to-[#F5F7FF]">
      <div
        className="absolute top-20 left-20 w-[380px] h-[380px] rounded-full blur-[100px] opacity-25"
        style={{ background: '#C7D2FE' }}
      />
      <div
        className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full blur-[90px] opacity-20"
        style={{ background: '#F6C1D1' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          ALINO dành cho ai?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-black/5">
            <h3 className="text-2xl font-semibold mb-6 tracking-tight">
              Creator
            </h3>
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              Dành cho nhà sáng tạo nội dung muốn làm việc chuyên nghiệp với nhiều Brand trong workspace chung, minh bạch và hiệu quả.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Khám phá và nhận lời mời hợp tác từ nhiều Brand',
                'Làm việc trong nền tảng chung, minh bạch với Brand',
                'Giao nội dung và nhận feedback có lịch sử đầy đủ',
                'Theo dõi deadline và tiến độ của từng dự án hợp tác',
                'Xem thống kê hiệu quả và kết quả công việc',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[#6B7280]">{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              href="/register"
              className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
            >
              Dùng thử miễn phí
            </a>
          </div>

          <div className="bg-gradient-to-br from-[#FAFBFF] to-white rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-black/5">
            <h3 className="text-2xl font-semibold mb-6 tracking-tight">
              Brand / Agency
            </h3>
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              Dành cho nhãn hàng và các công ty cần hợp tác với nhiều Creator trong workspace chung, cùng theo dõi tiến độ và hiệu quả.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Khám phá và kết nối với Creator phù hợp',
                'Làm việc trong nền tảng chung với từng Creator',
                'Theo dõi tiến độ và deadline của từng dự án hợp tác',
                'Xem và phản hồi nội dung có lịch sử đầy đủ',
                'Xem báo cáo tổng hợp hiệu quả của tất cả dự án',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[#6B7280]">{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              href="/register"
              className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
            >
              Dùng thử miễn phí
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

