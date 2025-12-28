import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function News() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Tin tức & cập nhật ngành")}</title>
        <meta
          name="description"
          content="Những cập nhật quan trọng ảnh hưởng đến cách Brand và Creator làm việc: thuật toán, monetization và chính sách nền tảng."
        />
      </Helmet>

      <div className="bg-white overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative pt-44 pb-32 bg-white">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            {/* TEXT */}
            <div className="animate-fade-in-up">
              <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Insights
              </span>

              <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
                Những thay đổi <br />
                bạn không thể <br />
                bỏ qua
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                Không chạy theo tin thời sự.
                Chúng tôi chọn lọc những cập nhật
                <strong> thực sự ảnh hưởng</strong> đến cách
                Brand và Creator hợp tác & vận hành.
              </p>
            </div>

            {/* Hero Visual – Industry Signals */}
            <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <div className="font-semibold text-gray-900">
                  Tín hiệu ngành
                </div>
                <div className="text-sm text-gray-600">
                  Thuật toán • Monetization • Chính sách
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-4/5 bg-indigo-600 rounded-full" />
                </div>
                <div className="text-xs text-gray-500">
                  Tác động trực tiếp đến vận hành
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Tin tức theo góc nhìn vận hành
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Mỗi thay đổi về thuật toán, monetization hay chính sách
              đều kéo theo tác động trực tiếp tới
              brief, deliverables và cách nghiệm thu.
            </p>
          </div>
        </section>

        {/* ================= SECTIONS ================= */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6 space-y-24">

            {/* ALGORITHM */}
            <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
              <div>
                <span className="text-sm font-semibold text-indigo-600">
                  Thuật toán & phân phối
                </span>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                  Khi reach thay đổi, <br />
                  quy trình phải vững
                </h3>
              </div>

              {/* Algorithm Visual */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                  <div className="font-semibold text-gray-900">
                    Phân phối nội dung
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full w-2/5 bg-indigo-400 rounded-full" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full w-3/5 bg-indigo-500 rounded-full" />
                  </div>
                  <div className="text-xs text-gray-500">
                    Reach dao động theo update
                  </div>
                </div>
              </div>
            </div>

            {/* MONETIZATION */}
            <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
              {/* Monetization Visual */}
              <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                  <div className="font-semibold text-gray-900">
                    Cấu trúc chi phí
                  </div>
                  {["Deliverables", "Phạm vi", "Kết quả"].map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-indigo-600">✓</span> {i}
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-sm font-semibold text-indigo-600">
                  Monetization
                </span>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                  Định giá không còn <br />
                  là chuyện cảm tính
                </h3>
              </div>
            </div>

            {/* POLICY */}
            <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
              <div>
                <span className="text-sm font-semibold text-indigo-600">
                  Chính sách & tuân thủ
                </span>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                  Tuân thủ không phải <br />
                  lựa chọn
                </h3>
              </div>

              {/* Policy Visual */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                  <div className="font-semibold text-gray-900">
                    Checklist tuân thủ
                  </div>
                  {["Gắn disclosure", "Đúng guideline", "Lưu bằng chứng"].map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-600">✓</span> {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-36 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
            Muốn theo kịp ngành <br />
            mà không bị quá tải?
          </h2>

          <p className="mt-6 text-xl text-white/80">
            Đọc blog và tham gia sự kiện của Alino
            để cập nhật đúng thứ quan trọng.
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
