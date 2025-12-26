import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function AboutUs() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("About")}</title>
                <meta
                    name="description"
                    content="Alino giúp brands tìm đúng creator, quản lý chiến dịch rõ ràng và theo dõi hiệu quả bằng dữ liệu."
                />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
                        {/* Left */}
                        <div>
                            <div className="text-sm text-gray-500">About</div>

                            <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight">
                                Kết nối <span className="underline">Creators</span> &{" "}
                                <span className="underline">Brands</span> để tạo tăng trưởng thật
                            </h1>

                            <p className="mt-5 text-gray-600 leading-relaxed">
                                Alino giúp brands tìm đúng creator, quản lý chiến dịch rõ ràng và theo dõi hiệu quả bằng dữ liệu — để
                                mọi đồng marketing chi đúng chỗ.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button className="px-5 py-3 rounded-full bg-black text-white">
                                    Tôi là Brand — Nhận đề xuất creators
                                </button>
                                <button className="px-5 py-3 rounded-full border border-gray-200 text-gray-900">
                                    Tôi là Creator — Nhận job phù hợp
                                </button>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <div className="text-sm text-gray-500">Matching</div>
                                    <div className="mt-1 font-semibold">Đúng tệp</div>
                                    <div className="mt-1 text-sm text-gray-600">Gợi ý creator theo ngành & mục tiêu</div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <div className="text-sm text-gray-500">Workflow</div>
                                    <div className="mt-1 font-semibold">Minh bạch</div>
                                    <div className="mt-1 text-sm text-gray-600">Brief → deal → deliver rõ ràng</div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <div className="text-sm text-gray-500">Measurement</div>
                                    <div className="mt-1 font-semibold">Đo lường</div>
                                    <div className="mt-1 text-sm text-gray-600">Theo dõi kết quả để tối ưu</div>
                                </div>
                            </div>

                            <div className="mt-10 text-sm text-gray-600">
                                <Link className="underline" to="/">← Về trang chủ</Link>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="rounded-3xl border border-gray-200 p-6 lg:p-8 bg-white">
                            <h2 className="text-xl font-semibold">Alino phù hợp khi bạn muốn</h2>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-2xl bg-gray-50 p-5">
                                    <div className="font-semibold">Chạy campaign nhanh, ít sai sót</div>
                                    <div className="mt-1 text-gray-600 text-sm">
                                        Template brief + checklist deliver giúp team vận hành gọn.
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-5">
                                    <div className="font-semibold">Tìm creator đúng tệp khách hàng</div>
                                    <div className="mt-1 text-gray-600 text-sm">Filter theo nền tảng, ngành hàng, style nội dung.</div>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-5">
                                    <div className="font-semibold">Có số liệu để ra quyết định</div>
                                    <div className="mt-1 text-gray-600 text-sm">Tổng hợp kết quả để tối ưu budget.</div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-gray-200 px-5 py-4">
                                <Link className="text-sm text-gray-800" to="/about-alino">
                                    Tiếp theo: <span className="underline font-medium">Về Alino</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
