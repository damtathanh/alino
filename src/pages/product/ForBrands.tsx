import { Link } from "react-router-dom";

export default function ForBrands() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Dành cho Brands</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Kiểm soát chất lượng thực thi, tiến độ và nghiệm thu. Tập trung vào kết quả có thể đo lường.</p>
          </div>
          <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
        </div>

        {/* Value */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Tìm đúng creator</div>
            <div className="mt-1 text-sm text-gray-700">Shortlist theo ngành, nền tảng, phong cách nội dung.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Vận hành ít sai</div>
            <div className="mt-1 text-sm text-gray-700">Checklist, deadline, trạng thái rõ ràng trong một luồng.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Minh bạch deliver</div>
            <div className="mt-1 text-sm text-gray-700">Biết chính xác đã nhận/chưa nhận để nghiệm thu đúng.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-semibold text-indigo-600">Báo cáo để tối ưu</div>
            <div className="mt-1 text-sm text-gray-700">Tổng hợp theo chiến dịch để phân bổ ngân sách hợp lý.</div>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/pricing" className="px-5 py-3 rounded-full border border-gray-200">Bảng giá</Link>
          <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
