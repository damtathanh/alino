import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

type NewsItem = {
    title: string;
    date: string;
    tag: "Product" | "Release" | "Ops";
    summary: string;
};

const NEWS: NewsItem[] = [
    {
        title: "Alino 2.0 ra mắt",
        date: "2025-12-26",
        tag: "Release",
        summary:
            "Cải thiện trải nghiệm matching, rõ ràng workflow brief → deal → deliver, và tối ưu trang landing.",
    },
    {
        title: "Cập nhật dashboard: theo dõi deliver rõ hơn",
        date: "2025-12-20",
        tag: "Product",
        summary:
            "Bổ sung trạng thái deliver + checklist để giảm missed deliver và giúp team kiểm soát tiến độ.",
    },
    {
        title: "Chuẩn hoá template brief & nghiệm thu",
        date: "2025-12-10",
        tag: "Ops",
        summary:
            "Template brief, acceptance checklist và guideline để vận hành campaign ít sai sót hơn.",
    },
];

function Tag({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
            {children}
        </span>
    );
}

export default function News() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Tin tức")}</title>
                <meta
                    name="description"
                    content="Tin tức và cập nhật từ Alino: release notes, cập nhật sản phẩm và vận hành."
                />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Xu hướng</div>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight">Tin tức</h1>
                            <p className="mt-3 text-gray-600 leading-relaxed">
                                Cập nhật ngắn gọn về sản phẩm, release notes và thay đổi quan trọng.
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

                    <div className="mt-10 space-y-4">
                        {NEWS.map((n) => (
                            <div key={n.title} className="rounded-2xl border border-gray-200 p-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="font-semibold">{n.title}</div>
                                    <Tag>{n.tag}</Tag>
                                    <span className="text-sm text-gray-500">{n.date}</span>
                                </div>

                                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{n.summary}</p>

                                <div className="mt-4 text-sm text-gray-600">
                                    *Placeholder — sau này có thể link sang bài chi tiết / changelog.
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex gap-3">
                        <Link to="/blog" className="px-5 py-3 rounded-full border border-gray-200">
                            Đọc Blog
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
