import { Link } from "react-router-dom";

const TIERS = [
  {
    name: "Starter",
    desc: "Dành cho team bắt đầu làm Influencer Marketing có cấu trúc",
    highlight: false,
    bullets: [
      "1–3 chiến dịch / tháng",
      "Brief & checklist chuẩn",
      "Quản lý Creator cơ bản",
      "Report tổng quan",
    ],
  },
  {
    name: "Growth",
    desc: "Dành cho team đã có quy trình và cần tối ưu hiệu quả",
    highlight: true,
    bullets: [
      "Nhiều chiến dịch song song",
      "Tracking tiến độ chi tiết",
      "Report theo từng chiến dịch",
      "Quản lý Creator & deal nâng cao",
    ],
  },
  {
    name: "Scale",
    desc: "Dành cho tổ chức lớn hoặc Agency",
    highlight: false,
    bullets: [
      "Phân quyền theo team",
      "Workflow tuỳ biến",
      "Template nâng cao",
      "Hỗ trợ triển khai riêng",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="pt-44 pb-32 text-center relative">
        <div className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 animate-fade-in-up">
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Bảng giá
          </span>

          <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
            Định giá theo <br />
            giai đoạn phát triển
          </h1>

          <p className="mt-8 text-xl text-gray-600 leading-relaxed">
            Alino không bán gói cứng.
            Chúng tôi định giá dựa trên
            <strong> quy mô, độ phức tạp và cách đội bạn làm việc</strong>.
          </p>
        </div>
      </section>

      {/* ================= TIERS ================= */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 border transition animate-fade-in-up
                ${tier.highlight
                  ? "bg-white border-indigo-600 shadow-xl scale-[1.03]"
                  : "bg-white border-gray-200 hover:shadow-lg"
                }
              `}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-4 py-1 rounded-full font-semibold">
                  Phổ biến nhất
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-3 text-gray-600">
                {tier.desc}
              </p>

              <div className="mt-6 text-3xl font-extrabold text-gray-900">
                Liên hệ
              </div>
              <div className="text-sm text-gray-500">
                Báo giá theo nhu cầu thực tế
              </div>

              <ul className="mt-8 space-y-3 text-gray-700">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-indigo-600" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 w-full py-3 rounded-full font-semibold transition
                  ${tier.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                Nhận demo & báo giá
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Triết lý định giá của Alino
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Chúng tôi không khuyến khích đội bạn
              nâng gói sớm hơn cần thiết.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Khi quy mô tăng, số chiến dịch nhiều hơn
              hoặc workflow phức tạp hơn —
              mức giá sẽ điều chỉnh tương ứng.
            </p>
          </div>
          {/* Pricing Philosophy Visual */}
          <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">

              <div className="text-sm font-semibold text-indigo-600">
                GIAI ĐOẠN PHÁT TRIỂN
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Starter</div>
                    <div className="h-2 mt-1 bg-gray-200 rounded-full">
                      <div className="h-full w-1/3 bg-indigo-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Growth</div>
                    <div className="h-2 mt-1 bg-gray-200 rounded-full">
                      <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Scale</div>
                    <div className="h-2 mt-1 bg-gray-200 rounded-full">
                      <div className="h-full w-full bg-indigo-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 pt-2">
                Quy mô & độ phức tạp tăng dần theo giai đoạn sử dụng
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 space-y-10 animate-fade-in-up">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Câu hỏi thường gặp
          </h2>

          {[
            {
              q: "Vì sao Alino không công khai giá?",
              a: "Vì mỗi đội có cách làm việc và quy mô khác nhau. Công khai một mức giá cố định thường dẫn đến sử dụng không phù hợp."
            },
            {
              q: "Có dùng thử không?",
              a: "Có. Chúng tôi thường demo theo use case thực tế của đội bạn."
            },
            {
              q: "Có hợp đồng dài hạn không?",
              a: "Không bắt buộc. Chúng tôi ưu tiên sự phù hợp lâu dài."
            },
          ].map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6 bg-white">
              <h3 className="font-semibold text-gray-900">{f.q}</h3>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 bg-indigo-600 text-white text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
          Chọn đúng giai đoạn, <br />
          làm việc hiệu quả hơn
        </h2>
        <p className="mt-6 text-xl text-white/80">
          Chúng tôi sẵn sàng tư vấn để bạn chọn gói phù hợp nhất.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
          >
            Bắt đầu miễn phí
          </Link>
          <Link
            to="/features"
            className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
          >
            Xem tính năng
          </Link>
        </div>
      </section>

    </div>
  );
}
