import { Link } from "react-router-dom";

export default function Product() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Sản phẩm</div>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight">
                            Alino giúp chạy creator campaign nhanh, rõ ràng, đo lường được
                        </h1>
                        <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                            Từ matching → brief/deal → checklist deliver → report hiệu quả. Mục tiêu là giảm sai sót vận hành và ra quyết định dựa trên dữ liệu.
                        </p>
                    </div>

                    <Link to="/" className="underline text-sm text-gray-700">Trang chủ</Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link to="/features" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
                        <div className="text-sm text-gray-500">Tính năng</div>
                        <div className="mt-1 font-semibold">Workflow end-to-end</div>
                        <div className="mt-2 text-sm text-gray-600">Matching, brief, deal, deliver, report.</div>
                    </Link>

                    <Link to="/pricing" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
                        <div className="text-sm text-gray-500">Bảng giá</div>
                        <div className="mt-1 font-semibold">Gói linh hoạt</div>
                        <div className="mt-2 text-sm text-gray-600">Starter, Growth, Scale.</div>
                    </Link>

                    <Link to="/creators" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
                        <div className="text-sm text-gray-500">Cho Creators</div>
                        <div className="mt-1 font-semibold">Nhận job phù hợp</div>
                        <div className="mt-2 text-sm text-gray-600">Brief rõ ràng, dễ deliver.</div>
                    </Link>

                    <Link to="/brands" className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
                        <div className="text-sm text-gray-500">Cho Brands</div>
                        <div className="mt-1 font-semibold">Chạy campaign gọn</div>
                        <div className="mt-2 text-sm text-gray-600">Checklist + tracking + report.</div>
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
