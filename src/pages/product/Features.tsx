import { Link } from "react-router-dom";

const FEATURES = [
    { title: "Creator Matching", desc: "Lọc theo nền tảng/ngành/insight để ra shortlist nhanh." },
    { title: "Brief Template", desc: "Chuẩn hoá brief để giảm thiếu thông tin và vòng feedback." },
    { title: "Deal & Checklist Deliver", desc: "Checklist rõ ràng để vận hành ít sai sót." },
    { title: "Tracking & Report", desc: "Tổng hợp deliver và kết quả theo chiến dịch." },
];

export default function Features() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Sản phẩm</div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Tính năng</h1>
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            Workflow để team marketing chạy campaign nhanh, minh bạch và có số liệu để tối ưu.
                        </p>
                    </div>
                    <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="rounded-2xl border border-gray-200 p-6">
                            <div className="font-semibold">{f.title}</div>
                            <div className="mt-2 text-sm text-gray-600">{f.desc}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex gap-3">
                    <Link to="/pricing" className="px-5 py-3 rounded-full border border-gray-200">Xem bảng giá</Link>
                    <Link to="/" className="px-5 py-3 rounded-full border border-gray-200">Trang chủ</Link>
                </div>
            </div>
        </div>
    );
}
