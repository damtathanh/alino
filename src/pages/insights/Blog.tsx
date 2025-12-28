import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

type Post = {
  title: string;
  readingTime: string;
  summary: string;
  reason: string;
};

const POSTS: Post[] = [
  {
    title: "Viết brief có cấu trúc để giảm vòng feedback",
    readingTime: "5 phút đọc",
    summary:
      "Một brief tốt xác định rõ mục tiêu, audience, yêu cầu nội dung và tiêu chí nghiệm thu. Khi đầu vào đủ, cả Brand và Creator giảm đáng kể vòng lặp không cần thiết.",
    reason:
      "Giúp đội ngũ rút ngắn thời gian chuẩn bị và nâng tỷ lệ nghiệm thu ngay lần đầu.",
  },
  {
    title: "Checklist nghiệm thu theo nền tảng",
    readingTime: "4 phút đọc",
    summary:
      "Checklist giúp đảm bảo mọi deliver đều được soát theo đúng định dạng và guideline từng nền tảng trước khi xuất bản hoặc bàn giao.",
    reason:
      "Tăng độ nhất quán và hạn chế sai sót khi chạy nhiều campaign song song.",
  },
  {
    title: "Đo lường để tối ưu, không chỉ để báo cáo",
    readingTime: "6 phút đọc",
    summary:
      "Thay vì tổng hợp số liệu sau cùng, hãy theo dõi các chỉ số có thể hành động để điều chỉnh sớm và phân bổ nguồn lực hợp lý.",
    reason:
      "Giúp ra quyết định thực tế hơn về ngân sách và nội dung trong các vòng tiếp theo.",
  },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Blog & Insights")}</title>
        <meta
          name="description"
          content="Thought leadership của Alino về Influencer Marketing, vận hành Brand–Creator và chuẩn hoá quy trình làm việc."
        />
      </Helmet>

      <div className="bg-white overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative pt-44 pb-32 bg-white">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div className="animate-fade-in-up">
              <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Insights
              </span>

              <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
                Góc nhìn <br />
                từ người <br />
                xây hệ thống
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                Những bài viết ngắn, thực tế về cách
                <strong> chuẩn hoá Influencer Marketing</strong>,
                cải thiện vận hành và làm việc hiệu quả
                giữa Brand và Creator.
              </p>
            </div>

            {/* Hero Visual – Knowledge Framework */}
            <div className="rounded-3xl bg-indigo-50 p-6 animate-slow-zoom">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <div className="font-semibold text-gray-900">
                  Khung tư duy bài viết
                </div>
                {["Vấn đề vận hành", "Cấu trúc giải quyết", "Tác động thực tế"].map(
                  (i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      {i}
                    </div>
                  )
                )}
                <div className="pt-2 text-xs text-gray-500">
                  Không chạy theo trend, tập trung vào cách làm
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div className="animate-fade-in-up">
                <span className="text-sm font-semibold text-indigo-600">
                  Bài viết nổi bật
                </span>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                  “Matching đúng tệp” <br />
                  bắt đầu từ tiêu chí hợp tác
                </h2>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Thay vì chọn Creator theo lượng view,
                  hãy bắt đầu từ mục tiêu truyền thông,
                  audience và tiêu chí nội dung.
                </p>

                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Khi tiêu chuẩn rõ ràng, shortlist Creator
                  sẽ tự gọn lại — và chất lượng hợp tác tăng lên.
                </p>

                <div className="mt-8 inline-flex items-center gap-3 text-indigo-600 font-semibold hover:underline">
                  Đọc bài viết →
                </div>
              </div>

              {/* Featured Visual – Article Structure */}
              <div className="rounded-3xl bg-white border border-gray-200 p-6 animate-slow-zoom">
                <div className="space-y-4">
                  <div className="font-semibold text-gray-900">
                    Cấu trúc bài viết
                  </div>
                  {[
                    "Bối cảnh & vấn đề",
                    "Tiêu chí hợp tác",
                    "Ví dụ thực tế",
                    "Kết luận & áp dụng",
                  ].map((s, i) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      <span className="text-indigo-600 font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= POSTS ================= */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16 max-w-3xl animate-fade-in-up">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Bài viết mới nhất
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Tập trung vào quy trình, vận hành và
                cách làm việc bền vững — không chạy theo trend ngắn hạn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {POSTS.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition animate-fade-in-up"
                >
                  <div className="text-sm text-gray-500">
                    ~ {p.readingTime}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                    {p.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {p.summary}
                  </p>

                  <div className="mt-6 text-sm font-semibold text-indigo-600">
                    Vì sao đáng đọc
                  </div>
                  <p className="mt-2 text-gray-700">
                    {p.reason}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-800 group-hover:underline">
                    Đọc tiếp →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-32 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight animate-fade-in-up">
            Muốn làm Influencer Marketing <br />
            bài bản hơn?
          </h2>

          <p className="mt-6 text-xl text-white/80 leading-relaxed">
            Theo dõi Alino để cập nhật góc nhìn thực tế
            từ đội ngũ xây dựng sản phẩm.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/features"
              className="px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition"
            >
              Xem sản phẩm
            </Link>
            <Link
              to="/"
              className="px-10 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Trang chủ
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
