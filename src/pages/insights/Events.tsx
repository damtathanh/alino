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
          content="Cơ hội học hỏi cho Brand và Creator: webinar, workshop, cộng đồng."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-indigo-600">Insights</span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">Sự kiện & học hỏi</h1>
              <p className="mt-3 text-gray-600">
                Sự kiện giúp đội ngũ cập nhật tư duy và quy trình. Chọn đúng nội dung, giá trị lớn hơn thời gian bỏ ra.
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

          {/* Why events matter */}
          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Vì sao sự kiện quan trọng</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Cập nhật xu hướng, cách làm mới và case thực tế.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tối ưu quy trình hiện tại thay vì “đập đi xây lại”.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Kết nối đồng nghiệp, hợp tác để nâng chuẩn vận hành.</li>
            </ul>
          </section>

          {/* How to choose */}
          <section className="mt-8 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Cách chọn sự kiện phù hợp</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Rõ mục tiêu học (ví dụ: chuẩn hoá brief, đo lường chiến dịch).</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Diễn giả có kinh nghiệm thực thi, không chỉ lý thuyết.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tài liệu kèm theo (template, checklist, guideline).</li>
            </ul>
          </section>

          {/* Categories */}
          <section className="mt-8 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Nhóm sự kiện điển hình</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Webinar</div>
                <div className="mt-1 text-sm text-gray-700">Tập trung vào một chủ đề hẹp, thời lượng ngắn, cập nhật nhanh.</div>
              </div>
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Workshop</div>
                <div className="mt-1 text-sm text-gray-700">Thực hành theo template, có bài tập/feedback.</div>
              </div>
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Community</div>
                <div className="mt-1 text-sm text-gray-700">Kết nối, chia sẻ case study, khai thác cơ hội hợp tác.</div>
              </div>
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Roundtable</div>
                <div className="mt-1 text-sm text-gray-700">Thảo luận mở cho nhóm nhỏ về quy trình và tiêu chuẩn.</div>
              </div>
            </div>
          </section>

          {/* Listings */}
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
                    <button className="px-5 py-3 rounded-full bg-black text-white">Đăng ký tham gia</button>
                    <button className="px-5 py-3 rounded-full border border-gray-200">Nhắc tôi</button>
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
            <Link to="/news" className="px-5 py-3 rounded-full border border-gray-200">Xem Tin tức</Link>
            <Link to="/blog" className="px-5 py-3 rounded-full border border-gray-200">Đọc Blog</Link>
          </div>
        </div>
      </div>
    </>
  );
}
