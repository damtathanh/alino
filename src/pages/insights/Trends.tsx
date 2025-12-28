import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Trends() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Xu hướng Creator Economy")}</title>
        <meta
          name="description"
          content="Phân tích những chuyển dịch quan trọng của Creator Economy và tác động đến cách Brand–Creator hợp tác."
        />
      </Helmet>

      <div className="bg-white overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative pt-44 pb-32 bg-white">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Insights
              </span>

              <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
                Xu hướng <br />
                đang định hình <br />
                Creator Economy
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                Không phải dự đoán mơ hồ.
                Đây là những chuyển dịch <strong>đã và đang xảy ra</strong>
                – ảnh hưởng trực tiếp đến cách
                Brand và Creator làm việc cùng nhau.
              </p>
            </div>

            {/* Hero Visual – Market Shift */}
            <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <div className="font-semibold text-gray-900">
                  Creator Economy
                </div>
                <div className="text-sm text-gray-600">
                  Cảm tính → Có cấu trúc
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
                </div>
                <div className="text-xs text-gray-500">
                  Áp lực hiệu quả & minh bạch tăng
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Creator Economy đang trưởng thành
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Khi ngân sách bị soi kỹ hơn và áp lực hiệu quả tăng cao,
              thị trường đang rời xa cách làm cảm tính
              để tiến tới những mô hình hợp tác có cấu trúc.
            </p>
          </div>
        </section>

        {/* ================= TREND 1 ================= */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <span className="text-sm font-semibold text-indigo-600">
                Xu hướng #1
              </span>

              <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                Từ reach sang <br />
                thực thi có thể kiểm soát
              </h3>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Reach không biến mất,
                nhưng không còn là trung tâm của mọi quyết định.
              </p>
            </div>

            {/* Trend 1 Visual – Workflow */}
            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Workflow chiến dịch
                </div>
                {["Brief rõ", "Deliver đúng", "Nghiệm thu"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-indigo-600">✓</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= TREND 2 ================= */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">

            {/* Trend 2 Visual – Long-term */}
            <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Quan hệ hợp tác
                </div>
                <div className="text-sm text-gray-600">
                  Campaign 1 → Campaign 2 → Dài hạn
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-full bg-indigo-600 rounded-full" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-indigo-600">
                Xu hướng #2
              </span>

              <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                Quan hệ dài hạn <br />
                thay cho hợp tác one-off
              </h3>
            </div>
          </div>
        </section>

        {/* ================= TREND 3 ================= */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <span className="text-sm font-semibold text-indigo-600">
                Xu hướng #3
              </span>

              <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                Tối giản công cụ, <br />
                thống nhất luồng làm việc
              </h3>
            </div>

            {/* Trend 3 Visual – Unified Flow */}
            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Luồng thống nhất
                </div>
                <div className="text-sm text-gray-600">
                  Brief → Trao đổi → Deliver → Báo cáo
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-4/5 bg-indigo-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-36 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
            Xu hướng chỉ có giá trị <br />
            khi bạn hành động
          </h2>

          <p className="mt-6 text-xl text-white/80">
            Đọc blog, tham gia sự kiện và khám phá
            cách Alino giúp đội ngũ vận hành tốt hơn.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/blog"
              className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
            >
              Đọc Blog
            </Link>
            <Link
              to="/events"
              className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Xem Sự kiện
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
