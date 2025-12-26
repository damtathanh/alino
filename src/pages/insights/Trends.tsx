import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

const QUICK_LINKS = [
  { title: "Tin tức", desc: "Chủ đề cập nhật có tác động tới hợp tác Brand–Creator.", to: "/news" },
  { title: "Blog", desc: "Góc nhìn quy trình, tiêu chuẩn và cách làm thực tế.", to: "/blog" },
  { title: "Sự kiện", desc: "Webinar, workshop, cộng đồng để học và kết nối.", to: "/events" },
];

export default function Trends() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Xu hướng")}</title>
        <meta
          name="description"
          content="Phân tích xu hướng Creator Economy và tác động tới quy trình Brand–Creator."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-10 flex items-start justify-between gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-indigo-600">Insights</span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">Xu hướng Creator Economy</h1>
              <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
                Tổng hợp các chuyển dịch có ảnh hưởng trực tiếp tới cách Brand và Creator hợp tác. Tập trung vào điều
                có thể hành động: chuẩn hoá quy trình, rõ đầu ra, và đo lường được kết quả.
              </p>
            </div>
            <div className="hidden lg:block w-[360px] rounded-3xl border border-gray-200 p-6">
              <div className="text-sm font-semibold text-indigo-600">Gợi ý đọc</div>
              <div className="mt-2 font-semibold">Chuẩn hoá workflow để scale</div>
              <p className="mt-2 text-sm text-gray-600">
                Vì sao chuẩn hoá giúp giảm vòng lặp feedback và tăng tỷ lệ nghiệm thu.
              </p>
              <Link to="/blog" className="mt-4 inline-block text-sm underline">
                Đọc Blog →
              </Link>
            </div>
          </div>

          {/* Trends */}
          <div className="space-y-8">
            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">1) Từ reach sang thực thi có thể kiểm soát</h2>
              <p className="mt-2 text-sm text-gray-700">
                Thay vì chạy theo chỉ số bề nổi, đội marketing chuyển sang theo dõi tiến độ, phạm vi, và nghiệm thu rõ
                ràng. Điều này yêu cầu brief có cấu trúc và checklist deliver cụ thể.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Brief chuẩn ngay từ đầu.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Trạng thái deliver minh bạch, dễ nghiệm thu.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Báo cáo để tối ưu, không chỉ để tổng kết.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">2) Hợp tác dài hạn thay cho one-off</h2>
              <p className="mt-2 text-sm text-gray-700">
                Creator nghiêm túc ưu tiên quan hệ dài hạn với Brand phù hợp. Điều này đòi hỏi hồ sơ nhất quán và tiêu
                chuẩn làm việc chuyên nghiệp từ cả hai phía.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Hồ sơ rõ ràng, tập trung vào năng lực.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tiêu chí nghiệm thu nhất quán giữa các campaign.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Lịch và kỳ vọng được ghi nhận từ đầu.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">3) Tối giản công cụ, thống nhất luồng</h2>
              <p className="mt-2 text-sm text-gray-700">
                Thay vì dùng nhiều công cụ rời rạc, các đội chọn một luồng thống nhất để giảm trễ thông tin và thất lạc
                deliver. Kết quả: bớt vòng lặp, tăng rõ ràng trách nhiệm.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Một nơi cho brief, deal, deliver, report.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Quy trình có thể nhân rộng khi scale.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Ít nhầm lẫn, ít sai lệch kỳ vọng.</li>
              </ul>
            </section>
          </div>

          {/* Links */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {QUICK_LINKS.map((x) => (
              <Link key={x.title} to={x.to} className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="text-sm font-semibold text-indigo-600">{x.title}</div>
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
