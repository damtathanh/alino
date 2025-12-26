import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function AboutAlino() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Về Alino")}</title>
                <meta name="description" content="Tổng quan cách Alino giúp brands và creators làm việc nhanh, minh bạch và đo lường được." />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-4xl font-bold tracking-tight">Về Alino</h1>
                        <div className="flex gap-4 text-sm">
                            <Link className="underline" to="/about">← About</Link>
                            <Link className="underline" to="/">Trang chủ</Link>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Alino là workflow để brands tìm creator phù hợp, chốt deal rõ ràng, theo dõi deliver và tổng hợp kết quả.
                        Mục tiêu: giảm sai sót vận hành và ra quyết định dựa trên dữ liệu.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-gray-200 p-6">
                            <div className="font-semibold">1) Matching</div>
                            <div className="mt-2 text-sm text-gray-600">
                                Lọc theo nền tảng/ngành/insight để ra shortlist creator.
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6">
                            <div className="font-semibold">2) Deal & Deliver</div>
                            <div className="mt-2 text-sm text-gray-600">
                                Brief chuẩn + checklist giúp duyệt nhanh, hạn chế thiếu deliver.
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6">
                            <div className="font-semibold">3) Measurement</div>
                            <div className="mt-2 text-sm text-gray-600">
                                Tổng hợp kết quả theo chiến dịch để tối ưu ngân sách.
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6">
                            <div className="font-semibold">4) Scale</div>
                            <div className="mt-2 text-sm text-gray-600">
                                Chuẩn hoá quy trình để chạy nhiều campaign mà vẫn kiểm soát được.
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <Link className="px-5 py-3 rounded-full border border-gray-200" to="/partners">
                            Xem Partners
                        </Link>
                        <Link className="px-5 py-3 rounded-full border border-gray-200" to="/careers">
                            Careers
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
