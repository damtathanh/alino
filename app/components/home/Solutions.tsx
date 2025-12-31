'use client';

export default function Solutions() {
  return (
    <section className="relative pt-12 md:pt-14 pb-14 md:pb-16 bg-gradient-to-b from-[#F5F7FF] via-[#FAFBFF] to-white">
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-35"
        style={{ background: '#C7D2FE' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full blur-[95px] opacity-30"
        style={{ background: '#DDD6FE' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          ALINO tạo nền tảng hợp tác rõ ràng
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Nền tảng chung',
              desc: 'Creator và Brand làm việc cùng nhau trong một nơi duy nhất, minh bạch và đồng bộ.',
            },
            {
              title: 'Quy trình rõ ràng',
              desc: 'Timeline tự động: Yêu cầu → Draft → Feedback → Duyệt → Hoàn thành.',
            },
            {
              title: 'Lịch sử đầy đủ',
              desc: 'Mọi trao đổi, comment và thay đổi đều được lưu lại, không bao giờ mất context.',
            },
            {
              title: 'Báo cáo minh bạch',
              desc: 'Thống kê tiến độ và kết quả hợp tác được cập nhật tự động, cả hai phía đều thấy.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all border border-black/5"
            >
              <h3 className="font-semibold text-lg mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

