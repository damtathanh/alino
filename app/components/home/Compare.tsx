'use client';

export default function Compare() {
  return (
    <section className="relative pt-8 md:pt-12 pb-12 md:pb-16 bg-gradient-to-b from-[#F5F7FF] via-[#FAFBFF] to-white">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[110px] opacity-20"
        style={{ background: '#DDD6FE' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          Trước và sau khi dùng ALINO
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border-2 border-[#E5E7EB] shadow-lg">
            <h3 className="text-2xl font-semibold mb-8 tracking-tight">
              Trước khi có ALINO
            </h3>
            <ul className="space-y-4">
              {[
                'Tin nhắn Zalo/Messenger bị trôi, mất context',
                'File Google Drive lộn xộn, không đồng bộ',
                'Theo dõi deadline bằng Excel, dễ sai sót',
                'Không có lịch sử trao đổi rõ ràng',
                'Thanh toán và hợp đồng rải rác nhiều nơi',
                'Không đo lường được hiệu quả hợp tác',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                  <span className="text-[#6B7280]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#6366F1] to-[#EC4899] shadow-xl">
            <div className="bg-gradient-to-br from-white to-[#FAFBFF] rounded-3xl p-10 h-full">
              <h3 className="text-2xl font-semibold mb-8 tracking-tight">
                Với ALINO
              </h3>
              <ul className="space-y-4">
                {[
                  'Nền tảng chung minh bạch cho cả hai phía',
                  'File và phiên bản được quản lý rõ ràng, đồng bộ',
                  'Timeline tự động, deadline được nhắc nhở',
                  'Lịch sử trao đổi đầy đủ, dễ tìm lại',
                  'Thanh toán và hợp đồng tập trung, minh bạch',
                  'Báo cáo hiệu quả hợp tác tự động, cả hai phía đều thấy',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899]" />
                    <span className="text-[#6B7280]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

