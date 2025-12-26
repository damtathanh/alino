import { Link } from "react-router-dom";

export default function ForCreators() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Dành cho Creators</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Làm việc chuyên nghiệp: rõ ràng về brief, phạm vi và tiêu chí nghiệm thu.</p>
          </div>
          <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
        </div>

        {/* Value */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Brief rõ ràng</div>
            <div className="mt-1 text-sm text-gray-700">Thông tin đầu vào và mục tiêu cụ thể để tập trung vào chất lượng nội dung.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Checklist Deliver</div>
            <div className="mt-1 text-sm text-gray-700">Giảm thiếu sót; dễ nghiệm thu và ghi nhận công sức đúng.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Tracking tiến độ</div>
            <div className="mt-1 text-sm text-gray-700">Biết bạn đang ở bước nào; hạn chế miss timeline.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Hồ sơ chuyên nghiệp</div>
            <div className="mt-1 text-sm text-gray-700">Trình bày năng lực rõ ràng để tạo niềm tin với Brand.</div>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/brands" className="px-5 py-3 rounded-full border border-gray-200">Cho Brands</Link>
          <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
