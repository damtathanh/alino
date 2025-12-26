import { Link } from "react-router-dom";


export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Tính năng theo từng giai đoạn</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Tổ chức theo luồng làm việc để đội ngũ tập trung vào điều quan trọng.</p>
          </div>
          <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
        </div>

        {/* Stages */}
        <div className="space-y-8">
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">1) Xác định & tìm kiếm</h2>
            <p className="mt-2 text-sm text-gray-600">Bắt đầu đúng: rõ mục tiêu, shortlist creator liên quan.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Creator Matching</div>
                <div className="mt-1 text-sm text-gray-700">Lọc theo nền tảng, ngành và phong cách nội dung.</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Hồ sơ rõ ràng</div>
                <div className="mt-1 text-sm text-gray-700">Thông tin nhất quán, giúp ra quyết định nhanh.</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">2) Brief & thỏa thuận</h2>
            <p className="mt-2 text-sm text-gray-600">Chuẩn hoá đầu vào để giảm sai lệch kỳ vọng.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Brief Template</div>
                <div className="mt-1 text-sm text-gray-700">Đủ nội dung cần thiết, tránh vòng feedback kéo dài.</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Deal rõ ràng</div>
                <div className="mt-1 text-sm text-gray-700">Phạm vi công việc, timeline, tiêu chí nghiệm thu.</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">3) Thực thi & nghiệm thu</h2>
            <p className="mt-2 text-sm text-gray-600">Giảm sai sót vận hành, theo dõi tiến độ minh bạch.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Checklist Deliver</div>
                <div className="mt-1 text-sm text-gray-700">Rõ từng hạng mục để nghiệm thu chính xác.</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Tracking</div>
                <div className="mt-1 text-sm text-gray-700">Theo dõi trạng thái và deadline của từng deliver.</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">4) Tổng hợp & cải tiến</h2>
            <p className="mt-2 text-sm text-gray-600">Đo lường để tối ưu, thay vì chỉ báo cáo để hoàn tất.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Report theo chiến dịch</div>
                <div className="mt-1 text-sm text-gray-700">Nhìn tổng quan để rút kinh nghiệm và phân bổ lại.</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Chuẩn hoá để scale</div>
                <div className="mt-1 text-sm text-gray-700">Giữ chất lượng khi chạy nhiều chiến dịch song song.</div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/pricing" className="px-5 py-3 rounded-full border border-gray-200">Xem bảng giá</Link>
          <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
