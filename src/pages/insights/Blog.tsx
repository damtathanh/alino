import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

type Post = {
    title: string;
    readingTime: string;
    category: string;
    summary: string;
};

const POSTS: Post[] = [
    {
        title: "Cách viết brief creator để giảm 50% vòng feedback",
        readingTime: "5 phút đọc",
        category: "Operations",
        summary:
            "Một brief tốt giúp deliver rõ ràng, hạn chế hiểu nhầm và tiết kiệm thời gian cho cả brand & creator.",
    },
    {
        title: "Checklist nghiệm thu nội dung: tránh thiếu deliver",
        readingTime: "4 phút đọc",
        category: "Workflow",
        summary:
            "Tạo checklist nghiệm thu theo format platform để team kiểm soát chất lượng trước khi thanh toán.",
    },
    {
        title: "3 chỉ số giúp đo hiệu quả campaign creator",
        readingTime: "6 phút đọc",
        category: "Measurement",
        summary:
            "Tổng hợp 3 nhóm chỉ số để ra quyết định: reach/engagement, conversion, và brand lift (nếu có).",
    },
];

export default function Blog() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Blog")}</title>
                <meta
                    name="description"
                    content="Blog Alino: chia sẻ về creator marketing, vận hành chiến dịch và đo lường."
                />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Xu hướng</div>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight">Blog</h1>
                            <p className="mt-3 text-gray-600 leading-relaxed">
                                Bài viết chia sẻ về creator marketing, workflow, và đo lường hiệu quả.
                            </p>
                        </div>

                        <div className="flex gap-4 text-sm">
                            <Link className="underline" to="/trends">
                                ← Xu hướng
                            </Link>
                            <Link className="underline" to="/">
                                Trang chủ
                            </Link>
                        </div>
                    </div>

                    {/* Featured */}
                    <div className="mt-12 rounded-3xl border border-gray-200 p-8">
                        <div className="text-sm text-gray-500">Bài nổi bật</div>
                        <div className="mt-2 text-2xl font-semibold">
                            “Matching đúng tệp” trong creator marketing: bắt đầu từ đâu?
                        </div>
                        <p className="mt-3 text-gray-600 leading-relaxed">
                            Khung tư duy để chọn creator theo objective, audience và insight — thay vì chọn theo view.
                        </p>
                        <div className="mt-5 text-sm text-gray-600">
                            *Placeholder — sau này connect CMS/Notion để render bài thật.
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {POSTS.map((p) => (
                            <div key={p.title} className="rounded-2xl border border-gray-200 p-6">
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <span>{p.category}</span>
                                    <span>•</span>
                                    <span>{p.readingTime}</span>
                                </div>
                                <div className="mt-2 font-semibold">{p.title}</div>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.summary}</p>
                                <div className="mt-4 text-sm underline text-gray-800">Đọc tiếp →</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex gap-3">
                        <Link to="/news" className="px-5 py-3 rounded-full border border-gray-200">
                            Xem Tin tức
                        </Link>
                        <Link to="/events" className="px-5 py-3 rounded-full border border-gray-200">
                            Xem Sự kiện
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
