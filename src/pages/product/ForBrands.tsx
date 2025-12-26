import { Link } from "react-router-dom";

export default function ForBrands() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Sản phẩm</div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Cho Brands</h1>
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            Chạy campaign gọn: brief chuẩn, checklist deliver, theo dõi tiến độ và tổng hợp kết quả.
                        </p>
                    </div>
                    <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Tìm đúng creator</div>
                        <div className="mt-2 text-sm text-gray-600">Shortlist theo ngành hàng, nền tảng, style nội dung.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Vận hành ít sai</div>
                        <div className="mt-2 text-sm text-gray-600">Checklist, deadline, trạng thái rõ ràng.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Minh bạch deliver</div>
                        <div className="mt-2 text-sm text-gray-600">Dễ kiểm soát thứ đã nhận/chưa nhận.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Có số liệu để tối ưu</div>
                        <div className="mt-2 text-sm text-gray-600">Tổng hợp theo chiến dịch để ra quyết định.</div>
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
