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
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Sản phẩm</div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Bảng giá</h1>
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            Hiện tại chưa public launch nên để “Liên hệ”. Sau này m thay số liệu thật vào.
                        </p>
                    </div>
                    <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {TIERS.map((t) => (
                        <div key={t.name} className="rounded-2xl border border-gray-200 p-6">
                            <div className="text-sm text-gray-500">{t.name}</div>
                            <div className="mt-2 text-2xl font-bold">{t.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                {t.bullets.map((b) => <li key={b}>• {b}</li>)}
                            </ul>
                            <button className="mt-6 w-full rounded-full bg-black text-white py-3">
                                Nhận demo / báo giá
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex gap-3">
                    <Link to="/features" className="px-5 py-3 rounded-full border border-gray-200">Xem tính năng</Link>
                    <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
                </div>
            </div>
        </div>
    );
}
