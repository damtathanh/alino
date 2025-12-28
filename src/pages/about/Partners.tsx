import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaLinkedin
} from "react-icons/fa";


export default function Partners() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Đối tác")}</title>
        <meta
          name="description"
          content="Hợp tác cùng Alino — xây dựng hệ sinh thái Influencer Marketing minh bạch và bền vững."
        />
      </Helmet>

      <div className="bg-white text-gray-900 overflow-hidden">

        {/* ===== HERO ===== */}
        <section className="pt-36 pb-20 bg-indigo-50/40">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            {/* Text block */}
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
                Hợp tác cùng Alino <br />
                để mở rộng hệ sinh thái
              </h1>
              <p className="mt-6 text-xl text-gray-700 leading-relaxed">
                Alino hợp tác với Agency, Tech Platform và Đơn vị đào tạo
                để cùng tạo ra chuẩn mực vận hành Influencer Marketing
                rõ ràng, minh bạch và có thể đo lường.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition">
                  Bắt đầu hợp tác
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>

            {/* Visual / Partner Logos */}
            <div className="relative h-[380px] rounded-3xl bg-indigo-50 flex items-center justify-center animate-slow-zoom">

              {/* cluster */}
              <div className="grid grid-cols-3 grid-rows-2 gap-x-16 gap-y-12 place-items-center">
                <FaYoutube className="text-red-600 text-7xl" />
                <FaInstagram className="text-pink-500 text-7xl" />
                <FaTiktok className="text-black text-7xl" />

                <FaFacebook className="text-blue-600 text-7xl" />
                <FaLinkedin className="text-blue-700 text-7xl" />
                <div />
              </div>

            </div>
          </div>
        </section>

        {/* ===== WHY PARTNER ===== */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Vì sao nên hợp tác với Alino?
            </h2>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Alino đem đến mô hình hợp tác có cấu trúc, giúp đối tác
              tối ưu quy trình, mở rộng năng lực & ghi nhận giá trị thực.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Quy trình rõ ràng",
                  desc: "Từ brief đến nghiệm thu — mọi bước đều minh bạch và có tiêu chuẩn."
                },
                {
                  title: "Mở rộng tầm ảnh hưởng",
                  desc: "Hợp tác giúp gia tăng khả năng kết nối với Brand & Creator."
                },
                {
                  title: "Giá trị thật",
                  desc: "Đánh giá hiệu quả dựa trên kết quả thực tế chứ không chỉ số bề nổi."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-gray-200 p-8 hover:shadow-lg transition animate-fade-in-up"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-28 bg-indigo-50/40">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Cách thức hợp tác đơn giản
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Chúng tôi thiết kế quy trình hợp tác rõ ràng theo 3 bước dễ hiểu.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "01",
                  title: "Liên hệ & trao đổi",
                  desc: "Giới thiệu năng lực và mục tiêu hợp tác."
                },
                {
                  step: "02",
                  title: "Thảo luận chi tiết",
                  desc: "Xác định phạm vi, tiêu chuẩn & kế hoạch chung."
                },
                {
                  step: "03",
                  title: "Triển khai & đánh giá",
                  desc: "Làm việc cùng nhau và đo lường kết quả."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border border-gray-200 rounded-2xl text-left animate-fade-in-up"
                >
                  <div className="text-indigo-600 font-bold text-3xl">
                    {item.step}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SUCCESS STORIES ===== */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Câu chuyện đối tác tiêu biểu
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Những đối tác cùng tầm nhìn đã đồng hành với Alino để tạo nên
              giá trị lâu dài cho cộng đồng Brand & Creator.
            </p>

            <div className="mt-12 space-y-8">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl p-10 hover:shadow-lg transition animate-fade-in-up"
                >
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Đối tác #{i + 1}
                  </h3>
                  <p className="mt-4 text-gray-700">
                    Đang cập nhật...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-36 bg-indigo-600 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Sẵn sàng hợp tác cùng Alino?
          </h2>
          <p className="mt-6 text-xl leading-relaxed">
            Chia sẻ ngắn về năng lực và mong muốn hợp tác — chúng tôi sẽ
            phản hồi trong thời gian sớm nhất.
          </p>
          <div className="mt-10 inline-flex px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition">
            Bắt đầu trao đổi
          </div>
        </section>

      </div>
    </>
  );
}
