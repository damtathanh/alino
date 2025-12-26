import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

type Post = {
  title: string;
  readingTime: string;
  reason: string;
  summary: string;
};

const POSTS: Post[] = [
  {
    title: "Viết brief có cấu trúc để giảm vòng feedback",
    readingTime: "5 phút đọc",
    summary:
      "Một brief tốt xác định rõ mục tiêu, audience, yêu cầu nội dung và tiêu chí nghiệm thu. Khi đầu vào đủ, cả Brand và Creator giảm đáng kể vòng lặp không cần thiết.",
    reason: "Giúp đội ngũ rút ngắn thời gian chuẩn bị và nâng tỷ lệ nghiệm thu ngay lần đầu.",
  },
  {
    title: "Checklist nghiệm thu theo nền tảng",
    readingTime: "4 phút đọc",
    summary:
      "Checklist giúp đảm bảo mọi deliver đều được soát theo đúng định dạng và guideline từng nền tảng trước khi xuất bản hoặc bàn giao.",
    reason: "Tăng độ nhất quán và hạn chế sai sót khi chạy nhiều campaign song song.",
  },
  {
    title: "Đo lường để tối ưu, không chỉ để báo cáo",
    readingTime: "6 phút đọc",
    summary:
      "Thay vì tổng hợp số liệu sau cùng, hãy theo dõi các chỉ số có thể hành động để điều chỉnh sớm và phân bổ nguồn lực hợp lý.",
    reason: "Giúp ra quyết định thực tế hơn về ngân sách và nội dung trong các vòng tiếp theo.",
  },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Blog")}</title>
        <meta
          name="description"
          content="Thought leadership của Alino: quy trình, vận hành, và tiêu chuẩn làm việc Brand–Creator."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-indigo-600">Insights</span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">Blog / Góc nhìn sản phẩm</h1>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Những bài viết ngắn, thực tế về cách chuẩn hoá quy trình Brand–Creator và nâng chuẩn vận hành.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link className="underline" to="/trends">← Xu hướng</Link>
              <Link className="underline" to="/">Trang chủ</Link>
            </div>
          </div>

          {/* Featured */}
          <div className="rounded-3xl border border-gray-200 p-8">
            <div className="text-sm font-semibold text-indigo-600">Bài nổi bật</div>
            <div className="mt-2 text-2xl font-semibold">“Matching đúng tệp” bắt đầu từ tiêu chí hợp tác</div>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Thay vì chọn theo lượng view, hãy bắt đầu từ mục tiêu truyền thông, audience và tiêu chí nội dung. Khi tiêu chuẩn
              rõ ràng, shortlist creator sẽ tự gọn lại.
            </p>
          </div>

          {/* Posts */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {POSTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-200 p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>~ {p.readingTime}</span>
                </div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.summary}</p>
                <div className="mt-3 text-xs font-medium text-indigo-600">Vì sao đáng đọc</div>
                <p className="mt-1 text-sm text-gray-700">{p.reason}</p>
                <div className="mt-4 text-sm underline text-gray-800">Đọc tiếp →</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-3">
            <Link to="/news" className="px-5 py-3 rounded-full border border-gray-200">Xem Tin tức</Link>
            <Link to="/events" className="px-5 py-3 rounded-full border border-gray-200">Xem Sự kiện</Link>
          </div>
        </div>
      </div>
    </>
  );
}
