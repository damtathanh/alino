'use client';

export default function Problems() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white via-[#FAFBFF] to-[#F5F7FF]">
      <div
        className="absolute top-20 right-20 w-[350px] h-[350px] rounded-full blur-[90px] opacity-25"
        style={{ background: '#F6C1D1' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-10 md:mb-12">
          Hợp tác nhiều hơn{' '}
          <br className="md:hidden" />
          nhưng quy trình ngày càng rối
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Tin nhắn Zalo/Messenger bị trôi, mất context cuộc hội thoại',
            'File Google Drive lộn xộn, không biết phiên bản nào là mới nhất',
            'Theo dõi deadline bằng Excel, dễ bị quên hoặc trùng lịch',
            'Không có lịch sử phản hồi, không nhớ đã trao đổi gì',
            'Thanh toán và hợp đồng nằm rải rác nhiều nơi',
            'Không đo lường được hiệu quả của từng dự án hợp tác',
          ].map((point, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#9CA3AF] mt-2 flex-shrink-0" />
                <p className="text-[#6B7280] leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

