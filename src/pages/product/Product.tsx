import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Product() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Sản phẩm")}</title>
        <meta
          name="description"
          content="Alino giúp Brand và Creator làm việc rõ ràng, minh bạch và đo lường được kết quả Influencer Marketing."
        />
      </Helmet>

      <div className="bg-white overflow-hidden">
        {/* HERO */}
        <section className="relative pt-44 pb-32 bg-white">
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-indigo-100/40 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 text-center animate-fade-in-up">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              Sản phẩm
            </span>

            <h1 className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
              Một nền tảng <br />
              để Brand & Creator <br />
              làm việc đúng cách
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Alino chuẩn hoá toàn bộ quy trình Influencer Marketing —
              từ hồ sơ, brief, trao đổi đến nghiệm thu —
              giúp hai bên tập trung vào kết quả thay vì xử lý ma sát.
            </p>
          </div>
        </section>

        {/* VALUE */}
        <section className="py-28 bg-indigo-50/40">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Rõ ràng ngay từ đầu",
                desc: "Hồ sơ, brief và phạm vi công việc được chuẩn hoá để tránh hiểu nhầm."
              },
              {
                title: "Một luồng làm việc duy nhất",
                desc: "Trao đổi, tiến độ và nghiệm thu nằm trong cùng một hệ thống."
              },
              {
                title: "Đo lường được kết quả",
                desc: "Đánh giá dựa trên mục tiêu truyền thông, không chỉ số bề nổi."
              }
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-8 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition animate-fade-in-up"
              >
                <h3 className="text-xl font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-4 text-gray-600 text-lg">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-6 space-y-24">

            <div className="max-w-3xl animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Những khối chức năng cốt lõi
              </h2>
              <p className="mt-6 text-xl text-gray-600">
                Mỗi tính năng đều được thiết kế để giảm ma sát
                và tăng chất lượng hợp tác.
              </p>
            </div>

            {/* FEATURE 1 */}
            <div className="grid md:grid-cols-2 gap-14 items-center animate-fade-in-up">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Hồ sơ Creator & Brand có cấu trúc
                </h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  Thông tin năng lực, phong cách, ngân sách và kỳ vọng
                  được chuẩn hoá để hai bên hiểu nhau ngay từ đầu.
                </p>
              </div>

              {/* Profile Mock */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      C
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Linh Nguyen
                      </div>
                      <div className="text-sm text-gray-500">
                        Fashion • Lifestyle
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    Ngân sách kỳ vọng: <span className="font-medium">5–10 triệu / post</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 2 */}
            <div className="grid md:grid-cols-2 gap-14 items-center animate-fade-in-up">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Brief & phạm vi công việc rõ ràng
                </h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  Mỗi chiến dịch đều có mục tiêu, yêu cầu nội dung
                  và tiêu chí nghiệm thu cụ thể.
                </p>
              </div>

              {/* Brief Mock */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
                  <div className="text-sm font-semibold text-indigo-600">
                    CHIẾN DỊCH
                  </div>
                  <div className="text-gray-900 font-medium">
                    Ra mắt BST mùa hè
                  </div>
                  <div className="text-sm text-gray-600">
                    1 video TikTok • 1 post Instagram
                  </div>
                  <div className="inline-flex px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                    Deadline: 30/06
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 3 */}
            <div className="grid md:grid-cols-2 gap-14 items-center animate-fade-in-up">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Theo dõi tiến độ & trao đổi tập trung
                </h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  Toàn bộ trao đổi, chỉnh sửa và trạng thái
                  nằm trong cùng một luồng làm việc.
                </p>
              </div>

              {/* Progress Mock */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-3">
                    Tiến độ chiến dịch
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo-600" />
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Đang chờ duyệt nội dung
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 4 */}
            <div className="grid md:grid-cols-2 gap-14 items-center animate-fade-in-up">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Nghiệm thu & đánh giá minh bạch
                </h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  Đánh giá dựa trên những gì đã thống nhất,
                  không phát sinh mơ hồ sau cùng.
                </p>
              </div>

              {/* Approval Mock */}
              <div className="rounded-3xl bg-indigo-50 p-6">
                <div className="bg-white rounded-2xl border p-6 shadow-sm text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Đã nghiệm thu
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Thanh toán được mở khoá
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* WORKFLOW */}
        <section className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Cách Alino vận hành
            </h2>

            <div className="mt-20 grid md:grid-cols-4 gap-10">
              {[
                "Tạo hồ sơ",
                "Xác định nhu cầu",
                "Làm việc & theo dõi",
                "Nghiệm thu & đánh giá"
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 p-6 text-center hover:-translate-y-1 hover:shadow-lg transition"
                >
                  <div className="text-sm text-indigo-600 font-semibold">
                    Bước {i + 1}
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENCE */}
        <section className="py-32 bg-indigo-50/40">
          <div className="max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Điều tạo nên sự khác biệt
            </h2>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed">
              Alino không chạy theo số lượng Creator hay chiến dịch,
              mà tập trung xây dựng chuẩn mực làm việc bền vững.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-36 bg-white text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 animate-fade-in-up">
            Bắt đầu làm việc <br /> một cách rõ ràng hơn
          </h2>
          <p className="mt-8 text-xl text-gray-600">
            Tạo tài khoản miễn phí và trải nghiệm quy trình của Alino.
          </p>
          <div className="mt-12 inline-flex px-10 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:scale-105 transition">
            Bắt đầu ngay
          </div>
        </section>
      </div>
    </>
  );
}
