import { Link } from "react-router-dom";

export default function Product() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Alino là hệ thống cộng tác Brand × Creator</h1>
            <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
              Chúng tôi không phải marketplace. Alino chuẩn hoá quy trình hợp tác để đội marketing và creators làm việc
              rõ ràng, đo lường được và kiểm soát được chất lượng thực thi.
            </p>
          </div>
          <Link to="/" className="underline text-sm text-gray-700">Trang chủ</Link>
        </div>

        {/* Problem / Fit */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Vấn đề chúng tôi giải</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Brief thiếu, đổi nhiều, khó thống nhất.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tiến độ, phạm vi, nghiệm thu rời rạc.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Khó tổng hợp kết quả để tối ưu ngân sách.</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Alino phù hợp khi</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Bạn muốn kiểm soát chất lượng và tiến độ.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Bạn ưu tiên luồng làm việc rõ ràng hơn là tính năng phô diễn.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Bạn cần đo lường kết quả để ra quyết định.</li>
            </ul>
          </section>
        </div>

        {/* Shortcuts */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/features" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
            <div className="text-sm text-gray-500">Tính năng</div>
            <div className="mt-1 font-semibold">Chuẩn hoá workflow</div>
            <div className="mt-2 text-sm text-gray-600">Matching → Brief → Deliver → Report</div>
          </Link>
          <Link to="/pricing" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
            <div className="text-sm text-gray-500">Bảng giá</div>
            <div className="mt-1 font-semibold">Theo mức độ sử dụng</div>
            <div className="mt-2 text-sm text-gray-600">Individual / Team / Scale</div>
          </Link>
          <Link to="/creators" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
            <div className="text-sm text-gray-500">Cho Creators</div>
            <div className="mt-1 font-semibold">Làm việc chuyên nghiệp</div>
            <div className="mt-2 text-sm text-gray-600">Brief rõ ràng, checklist minh bạch</div>
          </Link>
          <Link to="/brands" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
            <div className="text-sm text-gray-500">Cho Brands</div>
            <div className="mt-1 font-semibold">Kiểm soát thực thi</div>
            <div className="mt-2 text-sm text-gray-600">Tiến độ, phạm vi, nghiệm thu</div>
          </Link>
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/features" className="px-5 py-3 rounded-full bg-black text-white">Xem tính năng</Link>
          <Link to="/pricing" className="px-5 py-3 rounded-full border border-gray-200">Xem bảng giá</Link>
        </div>
      </div>
    </div>
  );
}
