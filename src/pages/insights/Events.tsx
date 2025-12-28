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
    date: "10 Jan 2026",
    type: "Webinar",
    location: "Online",
    desc: "Chia sẻ template brief và checklist nghiệm thu giúp giảm sai sót vận hành.",
    status: "upcoming",
  },
  {
    title: "Workshop: Đo lường campaign creator cho team marketing",
    date: "20 Jan 2026",
    type: "Workshop",
    location: "HCM (TBA)",
    desc: "Thực hành set KPI, tracking và báo cáo cho stakeholder.",
    status: "upcoming",
  },
  {
    title: "Community meetup: Creator & Brand matching night",
    date: "05 Dec 2025",
    type: "Community",
    location: "Hà Nội",
    desc: "Kết nối, chia sẻ case study và networking.",
    status: "past",
  },
];

function EventBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

export default function Events() {
  const upcoming = EVENTS.filter(e => e.status === "upcoming");
  const past = EVENTS.filter(e => e.status === "past");

  return (
    <>
      <Helmet>
        <title>{buildTitle("Sự kiện & học hỏi")}</title>
        <meta
          name="description"
          content="Webinar, workshop và community event giúp Brand & Creator nâng chuẩn vận hành Influencer Marketing."
        />
      </Helmet>

      <div className="bg-white overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative pt-44 pb-32 bg-white">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Insights & Community
              </span>

              <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
                Học hỏi từ <br />
                thực tiễn <br />
                triển khai
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                Webinar, workshop và community event
                giúp Brand & Creator cập nhật tư duy,
                chuẩn hoá quy trình và kết nối đúng người.
              </p>
            </div>
            {/* Hero Visual – Event Format */}
            <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">

                <div className="text-sm font-semibold text-indigo-600">
                  CẤU TRÚC SỰ KIỆN
                </div>

                <div className="space-y-4">

                  {/* Session 1 */}
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      01
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Chia sẻ case thực tế
                      </div>
                      <div className="text-sm text-gray-500">
                        Workflow • KPI • Deliverables
                      </div>
                    </div>
                  </div>

                  {/* Session 2 */}
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      02
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Thực hành & phân tích
                      </div>
                      <div className="text-sm text-gray-500">
                        Brief • Checklist • Báo cáo
                      </div>
                    </div>
                  </div>

                  {/* Session 3 */}
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      03
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Kết nối & thảo luận
                      </div>
                      <div className="text-sm text-gray-500">
                        Brand • Creator • Agency
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-3 text-xs text-gray-500">
                  Nội dung tập trung vào vận hành & triển khai thực tế
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY EVENTS ================= */}
        <section className="py-28 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
              Vì sao chúng tôi tổ chức sự kiện
            </h2>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in-up">
              Influencer Marketing thay đổi nhanh,
              nhưng quy trình và chuẩn mực không thể học qua lý thuyết.
            </p>

            <div className="mt-14 grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Chia sẻ case thực tế",
                  desc: "Không nói lý thuyết suông, tập trung vào bài học triển khai."
                },
                {
                  title: "Tối ưu quy trình",
                  desc: "Giữ những gì đang tốt và cải thiện điểm nghẽn."
                },
                {
                  title: "Kết nối cộng đồng",
                  desc: "Tạo cơ hội hợp tác giữa Brand, Creator và Agency."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition animate-fade-in-up"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= UPCOMING ================= */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
              Sắp diễn ra
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-10">
              {upcoming.map(e => (
                <div
                  key={e.title}
                  className="group rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition animate-fade-in-up"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <EventBadge>{e.type}</EventBadge>
                    <span className="text-sm text-gray-500">{e.date}</span>
                    <span className="text-sm text-gray-500">• {e.location}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold group-hover:text-indigo-600 transition">
                    {e.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {e.desc}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition">
                      Đăng ký tham gia
                    </button>
                    <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition">
                      Nhắc tôi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PAST EVENTS ================= */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
              Sự kiện đã diễn ra
            </h2>

            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {past.map(e => (
                <div
                  key={e.title}
                  className="rounded-3xl border border-gray-200 p-6 hover:shadow-lg transition animate-fade-in-up"
                >
                  <div className="text-sm text-gray-500">
                    {e.date} • {e.location}
                  </div>

                  <h3 className="mt-3 font-semibold text-gray-900">
                    {e.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {e.desc}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
                    Xem recap →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-36 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
            Tham gia cộng đồng <br />
            xây chuẩn Influencer Marketing
          </h2>

          <p className="mt-6 text-xl text-white/80">
            Theo dõi Alino để không bỏ lỡ webinar,
            workshop và community event tiếp theo.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/blog"
              className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
            >
              Đọc Blog
            </Link>
            <Link
              to="/features"
              className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Xem sản phẩm
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
