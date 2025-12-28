import { Link } from "react-router-dom";

export default function ForBrands() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-44 pb-32 bg-white">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              Dành cho Brands
            </span>

            <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
              Vận hành Influencer <br />
              Marketing <br />
              có kiểm soát
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
              Alino giúp đội marketing kiểm soát
              <strong> chất lượng thực thi, tiến độ và nghiệm thu</strong>
              — để bạn tập trung vào kết quả truyền thông thực tế.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition"
              >
                Bắt đầu cho Brand
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
              >
                Xem tính năng
              </Link>
            </div>
          </div>

          {/* Hero Visual – Campaign Overview */}
          <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
            <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
              <div className="font-semibold text-gray-900">
                Tổng quan chiến dịch
              </div>
              <div className="text-sm text-gray-600">
                Ra mắt sản phẩm mới • Q3
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
              </div>
              <div className="text-xs text-gray-500">
                12 / 16 Creator đã hoàn thành
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 space-y-24">

          {/* Intro */}
          <div className="max-w-3xl animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Alino giúp Brand làm việc có hệ thống
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Từ lúc xác định nhu cầu đến nghiệm thu và đánh giá —
              mọi bước đều có cấu trúc rõ ràng.
            </p>
          </div>

          {/* Feature 1 – Creator Selection */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <h3 className="text-3xl font-bold">
                Tìm & chọn đúng Creator
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Shortlist Creator dựa trên ngành, nền tảng
                và phong cách nội dung — không chọn theo cảm tính.
              </p>
            </div>

            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Danh sách Creator
                </div>
                {["Beauty", "Lifestyle", "Tech"].map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-between text-sm text-gray-600"
                  >
                    <span>{c}</span>
                    <span className="text-indigo-600 font-semibold">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 – Operation */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Vận hành chiến dịch
                </div>
                <div className="text-sm text-gray-600">
                  Brief • Checklist • Deadline
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-1/2 bg-indigo-600 rounded-full" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold">
                Vận hành chiến dịch mạch lạc
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Mọi thứ nằm trong một luồng thống nhất,
                giảm sai sót và bỏ sót deliver.
              </p>
            </div>
          </div>

          {/* Feature 3 – Approval */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <h3 className="text-3xl font-bold">
                Nghiệm thu minh bạch
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Biết chính xác đã nhận đủ hay chưa,
                tránh tranh cãi khi đánh giá chất lượng.
              </p>
            </div>

            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm text-center space-y-3">
                <div className="inline-flex px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✓ Đã nghiệm thu
                </div>
                <div className="text-sm text-gray-600">
                  Nội dung đạt yêu cầu
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 – Report */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Báo cáo chiến dịch
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-4/5 bg-indigo-600 rounded-full" />
                </div>
                <div className="text-xs text-gray-500">
                  Hiệu quả vượt KPI
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold">
                Báo cáo để tối ưu ngân sách
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Tổng hợp kết quả theo chiến dịch
                để phân bổ nguồn lực hiệu quả hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 bg-indigo-600 text-white text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
          Influencer Marketing hiệu quả <br />
          bắt đầu từ quy trình đúng
        </h2>
        <p className="mt-6 text-xl text-white/80 leading-relaxed">
          Bắt đầu vận hành chiến dịch
          một cách chuyên nghiệp cùng Alino.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
          >
            Bắt đầu cho Brand
          </Link>
          <Link
            to="/creators"
            className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
          >
            Dành cho Creators
          </Link>
        </div>
      </section>

    </div>
  );
}
