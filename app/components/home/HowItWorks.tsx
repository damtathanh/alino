'use client';

export default function HowItWorks() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white to-[#FAFBFF]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-18"
        style={{ background: '#F6C1D1' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          ALINO hoạt động như thế nào?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            {
              step: '1',
              title: 'Tạo tài khoản',
              desc: 'Đăng ký nhanh chóng, chọn vai trò Creator hoặc Brand.',
            },
            {
              step: '2',
              title: 'Khám phá & kết nối',
              desc: 'Brand tìm Creator phù hợp, Creator nhận lời mời hợp tác.',
            },
            {
              step: '3',
              title: 'Làm việc cùng nhau',
              desc: 'Creator tạo nội dung, Brand xem và phản hồi trực tiếp trên nền tảng chung.',
            },
            {
              step: '4',
              title: 'Theo dõi & đánh giá',
              desc: 'Cả hai phía xem tiến độ, thống kê và kết quả hợp tác minh bạch.',
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="bg-gradient-to-br from-white to-[#FAFBFF] rounded-3xl p-8 border border-black/5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-xl font-bold text-white mb-6">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

