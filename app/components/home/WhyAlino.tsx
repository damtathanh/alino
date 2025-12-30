'use client';

export default function WhyAlino() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white via-[#FAFBFF] to-white">
      <div
        className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[100px] opacity-25"
        style={{ background: '#C7D2FE' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[95px] opacity-20"
        style={{ background: '#F6C1D1' }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          Tại sao chọn ALINO?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Thiết kế cho thị trường Việt Nam',
              desc: 'Hiểu rõ cách làm việc của Creator và Brand tại Việt Nam, ALINO được xây dựng phù hợp với thực tế hợp tác.',
            },
            {
              title: 'Đơn giản, tập trung',
              desc: 'Không phức tạp, không thừa tính năng. ALINO tập trung vào những gì thực sự cần thiết cho hợp tác hiệu quả.',
            },
            {
              title: 'Xây dựng cho hợp tác lâu dài',
              desc: 'Không chỉ một lần hợp tác, ALINO giúp bạn xây dựng mối quan hệ làm việc bền vững với đối tác.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-black/5"
            >
              <h3 className="font-semibold text-lg mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

