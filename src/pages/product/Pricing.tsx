import { Link } from "react-router-dom";

const TIERS = [
    { name: "Starter", price: "Liên hệ", bullets: ["1–3 campaigns/tháng", "Brief + checklist", "Report cơ bản"] },
    { name: "Growth", price: "Liên hệ", bullets: ["Nhiều campaigns", "Tracking tiến độ", "Report theo chiến dịch"] },
    { name: "Scale", price: "Liên hệ", bullets: ["Team & phân quyền", "Template nâng cao", "Tuỳ biến workflow"] },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Bảng giá</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Chúng tôi định giá theo mức độ sử dụng và giai đoạn trưởng thành của đội ngũ. Không ép buộc nâng gói, ưu tiên phù hợp.</p>
          </div>
          <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-200 p-6">
              <div className="text-sm font-semibold text-indigo-600">{t.name}</div>
              <div className="mt-2 text-2xl font-bold">{t.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>{b}</li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-full bg-black text-white py-3">Nhận demo / báo giá</button>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-10 rounded-2xl bg-indigo-50 p-6">
          <div className="text-sm font-semibold text-gray-900">Triết lý định giá</div>
          <p className="mt-2 text-sm text-gray-700">Bắt đầu từ nhu cầu thực tế của đội bạn. Khi tăng quy mô hoặc độ phức tạp, chúng tôi điều chỉnh theo khối lượng sử dụng.</p>
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/features" className="px-5 py-3 rounded-full border border-gray-200">Xem tính năng</Link>
          <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
