import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

type EventItem = {
    title: string;
    date: string;
    type: "Webinar" | "Workshop" | "Community";
    location: string;
    desc: string;
    status: "upcoming" | "past";
};

const EVENTS: EventItem[] = [
    {
        title: "Webinar: Tối ưu workflow creator campaign (brief → deliver)",
        date: "2026-01-10",
        type: "Webinar",
        location: "Online",
        desc: "Chia sẻ template brief + checklist nghiệm thu để giảm sai sót vận hành.",
        status: "upcoming",
    },
    {
        title: "Workshop: Đo lường campaign creator cho team marketing",
        date: "2026-01-20",
        type: "Workshop",
        location: "HCM (TBA)",
        desc: "Cách set KPI, tracking và báo cáo kết quả dễ hiểu cho stakeholder.",
        status: "upcoming",
    },
    {
        title: "Community meetup: Creator & Brand matching night",
        date: "2025-12-05",
        type: "Community",
        location: "Hà Nội",
        desc: "Kết nối nhanh, chia sẻ case study và networking.",
        status: "past",
    },
];

function Badge({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
            {children}
        </span>
    );
}

export default function Events() {
    const upcoming = EVENTS.filter((e) => e.status === "upcoming");
    const past = EVENTS.filter((e) => e.status === "past");

    return (
        <>
            <Helmet>
                <title>{buildTitle("Sự kiện")}</title>
                <meta
                    name="description"
                    content="Sự kiện Alino: webinar, workshop và hoạt động cộng đồng cho creators & brands."
                />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Xu hướng</div>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight">Sự kiện</h1>
                            <p className="mt-3 text-gray-600 leading-relaxed">
                                Webinar / workshop / cộng đồng — nơi chia sẻ kinh nghiệm thực chiến.
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

                    <div className="mt-10">
                        <div className="text-sm text-gray-500">Sắp diễn ra</div>
                        <div className="mt-3 space-y-4">
                            {upcoming.map((e) => (
                                <div key={e.title} className="rounded-2xl border border-gray-200 p-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="font-semibold">{e.title}</div>
                                        <Badge>{e.type}</Badge>
                                        <span className="text-sm text-gray-500">{e.date}</span>
                                        <span className="text-sm text-gray-500">• {e.location}</span>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{e.desc}</p>

                                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                        <button className="px-5 py-3 rounded-full bg-black text-white">
                                            Đăng ký tham gia (placeholder)
                                        </button>
                                        <button className="px-5 py-3 rounded-full border border-gray-200">
                                            Nhắc tôi (placeholder)
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="text-sm text-gray-500">Đã diễn ra</div>
                        <div className="mt-3 space-y-4">
                            {past.map((e) => (
                                <div key={e.title} className="rounded-2xl border border-gray-200 p-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="font-semibold">{e.title}</div>
                                        <Badge>{e.type}</Badge>
                                        <span className="text-sm text-gray-500">{e.date}</span>
                                        <span className="text-sm text-gray-500">• {e.location}</span>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{e.desc}</p>
                                    <div className="mt-4 text-sm underline">Xem recap →</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <Link to="/news" className="px-5 py-3 rounded-full border border-gray-200">
                            Xem Tin tức
                        </Link>
                        <Link to="/blog" className="px-5 py-3 rounded-full border border-gray-200">
                            Đọc Blog
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
