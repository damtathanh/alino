import { Link } from "react-router-dom";

export default function ForCreators() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Sản phẩm</div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Cho Creators</h1>
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            Nhận job phù hợp, brief rõ ràng, checklist deliver để làm nhanh và ít bị đổi kèo.
                        </p>
                    </div>
                    <Link className="underline text-sm" to="/product">← Sản phẩm</Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Brief rõ ràng</div>
                        <div className="mt-2 text-sm text-gray-600">Thông tin đầu vào đủ để m biết phải làm gì và deadline.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Checklist deliver</div>
                        <div className="mt-2 text-sm text-gray-600">Giảm thiếu deliver, dễ nghiệm thu.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Tracking tiến độ</div>
                        <div className="mt-2 text-sm text-gray-600">Biết mình đang ở bước nào, hạn chế miss timeline.</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <div className="font-semibold">Thanh toán & report</div>
                        <div className="mt-2 text-sm text-gray-600">Sau này có thể bổ sung flow thanh toán/đối soát.</div>
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
