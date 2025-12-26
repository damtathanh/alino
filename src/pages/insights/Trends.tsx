import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

const QUICK_LINKS = [
    {
        title: "Tin tức",
        desc: "Cập nhật sản phẩm, release notes, thay đổi quan trọng.",
        to: "/news",
    },
    {
        title: "Blog",
        desc: "Bài viết chia sẻ về creator marketing, vận hành và growth.",
        to: "/blog",
    },
    {
        title: "Sự kiện",
        desc: "Webinar, workshop, talkshow và hoạt động cộng đồng.",
        to: "/events",
    },
];

export default function Trends() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Xu hướng")}</title>
                <meta
                    name="description"
                    content="Xu hướng tại Alino: tin tức, blog và sự kiện xoay quanh creator marketing."
                />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Xu hướng</div>
                            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
                                Tin tức, bài viết & sự kiện về{" "}
                                <span className="underline">Creator Marketing</span>
                            </h1>
                            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                                Nơi tổng hợp cập nhật từ Alino: release notes, góc nhìn thị trường và các hoạt động
                                cộng đồng để brands & creators tăng trưởng bền vững.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/news"
                                    className="px-5 py-3 rounded-full bg-black text-white inline-flex items-center justify-center"
                                >
                                    Xem Tin tức
                                </Link>
                                <Link
                                    to="/blog"
                                    className="px-5 py-3 rounded-full border border-gray-200 text-gray-900 inline-flex items-center justify-center"
                                >
                                    Đọc Blog
                                </Link>
                            </div>

                            <div className="mt-10 text-sm text-gray-600">
                                <Link className="underline" to="/">
                                    ← Về trang chủ
                                </Link>
                            </div>
                        </div>

                        {/* Right highlight */}
                        <div className="hidden lg:block w-[360px] rounded-3xl border border-gray-200 p-6">
                            <div className="text-sm text-gray-500">Mới nhất</div>
                            <div className="mt-2 font-semibold">Alino 2.0</div>
                            <p className="mt-2 text-sm text-gray-600">
                                Cải thiện trải nghiệm matching + workflow deliver, hướng tới vận hành ít sai sót hơn.
                            </p>
                            <Link to="/news" className="mt-4 inline-block text-sm underline">
                                Xem bản tin gần nhất →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {QUICK_LINKS.map((x) => (
                            <Link
                                key={x.title}
                                to={x.to}
                                className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition"
                            >
                                <div className="font-semibold">{x.title}</div>
                                <div className="mt-2 text-sm text-gray-600">{x.desc}</div>
                                <div className="mt-4 text-sm underline">Mở trang →</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
