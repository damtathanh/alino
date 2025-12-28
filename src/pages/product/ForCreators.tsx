import { Link } from "react-router-dom";

export default function ForCreators() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-44 pb-32 bg-white">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              Dành cho Creators
            </span>

            <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
              Làm việc như <br />
              một Creator <br />
              chuyên nghiệp
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
              Alino giúp bạn tập trung vào sáng tạo nội dung —
              còn brief, phạm vi công việc và nghiệm thu
              được chuẩn hoá rõ ràng ngay từ đầu.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition"
              >
                Tạo hồ sơ Creator
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
              >
                Xem tính năng
              </Link>
            </div>
          </div>

          {/* Hero Visual – Creator Workspace */}
          <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
            <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
              <div className="font-semibold text-gray-900">
                Dự án đang làm
              </div>
              <div className="text-sm text-gray-600">
                Skincare Review • TikTok
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full w-2/3 bg-indigo-600 rounded-full" />
              </div>
              <div className="text-xs text-gray-500">
                Đang chờ duyệt nội dung
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
              Alino thay đổi cách Creator làm việc
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Mọi hợp tác đều dựa trên cấu trúc rõ ràng —
              giúp bạn làm đúng việc, đúng kỳ vọng và đúng giá trị.
            </p>
          </div>

          {/* Feature 1 – Brief */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <h3 className="text-3xl font-bold">Brief có cấu trúc</h3>
              <p className="mt-4 text-lg text-gray-600">
                Bạn biết chính xác Brand muốn gì,
                mục tiêu là gì và đâu là tiêu chí hoàn thành.
              </p>
            </div>

            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="text-sm font-semibold text-indigo-600">
                  BRIEF
                </div>
                <div className="font-medium text-gray-900">
                  Video TikTok 60s
                </div>
                <div className="text-sm text-gray-600">
                  Thông điệp: Da khoẻ tự nhiên
                </div>
                <div className="inline-flex px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                  Deadline: 25/06
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 – Checklist */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                <div className="font-semibold text-gray-900">
                  Checklist nghiệm thu
                </div>
                {[
                  "Đúng format",
                  "Đúng thông điệp",
                  "Gắn hashtag",
                ].map((i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span> {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold">Checklist nghiệm thu</h3>
              <p className="mt-4 text-lg text-gray-600">
                Công sức của bạn được ghi nhận
                dựa trên checklist rõ ràng, không cảm tính.
              </p>
            </div>
          </div>

          {/* Feature 3 – Progress */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div>
              <h3 className="text-3xl font-bold">Theo dõi tiến độ</h3>
              <p className="mt-4 text-lg text-gray-600">
                Bạn luôn biết mình đang ở giai đoạn nào
                và deadline tiếp theo là gì.
              </p>
            </div>

            <div className="rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="text-sm font-semibold mb-2">
                  Tiến độ chiến dịch
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-1/2 bg-indigo-600 rounded-full" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Đang chỉnh sửa nội dung
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 – Profile */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1 rounded-3xl bg-indigo-50 p-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Creator Profile
                    </div>
                    <div className="text-sm text-gray-500">
                      Beauty • Lifestyle
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold">Hồ sơ Creator chuyên nghiệp</h3>
              <p className="mt-4 text-lg text-gray-600">
                Thể hiện năng lực và phong cách
                một cách nhất quán để tạo niềm tin với Brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 bg-indigo-600 text-white text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
          Sáng tạo tốt hơn <br />
          khi mọi thứ đã rõ ràng
        </h2>
        <p className="mt-6 text-xl text-white/80 leading-relaxed">
          Tạo hồ sơ Creator và bắt đầu làm việc
          theo chuẩn chuyên nghiệp cùng Alino.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
          >
            Bắt đầu miễn phí
          </Link>
          <Link
            to="/brands"
            className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
          >
            Dành cho Brands
          </Link>
        </div>
      </section>

    </div>
  );
}
