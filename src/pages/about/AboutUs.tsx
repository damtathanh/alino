import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Về chúng tôi")}</title>
        <meta
          name="description"
          content="Alino – nền tảng hợp tác chuẩn hoá quy trình cho Brand & Creator, minh bạch, rõ ràng và đo lường được."
        />
      </Helmet>

      <div className="bg-white text-gray-900 overflow-hidden">

        {/* ===== HERO ===== */}
        <section className="pt-36 pb-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Nền tảng vận hành <br />
              Influencer Marketing <br />
              dành cho Brand & Creator
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Alino giúp hai bên làm việc cùng nhau một cách rõ ràng, minh bạch
              và đo lường được ROI của mỗi chiến dịch.
            </p>
          </div>
        </section>

        {/* ===== MISSION & VISION ===== */}
        <section className="py-24 bg-indigo-50/30">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-700">
                Trong một thị trường Influencer Marketing đang bùng nổ, nhưng thiếu
                chuẩn hoá trong cách làm việc, chúng tôi xây dựng Alino để giải quyết
                những rào cản lớn nhất giữa Brand và Creator.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">
                Tầm nhìn dài hạn
              </h2>
              <p className="text-lg text-gray-700">
                Trở thành nền tảng vận hành tiêu chuẩn cho Influencer Marketing,
                nơi các thương hiệu và người sáng tạo có thể cộng tác hiệu quả,
                minh bạch và bền vững.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CORE TEAM ===== */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center tracking-tight">
              Đội ngũ dẫn dắt
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  name: "Nguyen Van A",
                  role: "Founder & CEO",
                  bio: "Hơn 10 năm kinh nghiệm trong marketing và xây dựng hệ thống hợp tác giữa Brand & Creator."
                },
                {
                  name: "Tran Thi B",
                  role: "Head of Product",
                  bio: "Định hình trải nghiệm người dùng và logic vận hành sản phẩm."
                },
                {
                  name: "Le Van C",
                  role: "Head of Engineering",
                  bio: "Chịu trách nhiệm xây dựng nền tảng kỹ thuật vững chắc và mở rộng."
                }
              ].map((p, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="h-32 w-32 bg-indigo-100 rounded-full mx-auto" />
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-indigo-600">{p.role}</p>
                    <p className="mt-3 text-gray-700">{p.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY ALINO ===== */}
        <section className="py-24 bg-indigo-50/40">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Tại sao Alino?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Thay vì làm việc rời rạc qua nhiều kênh, Alino cung cấp một luồng
              vận hành tập trung cho tất cả các bước của chiến dịch Influencer
              Marketing — từ brief tới nghiệm thu và đánh giá kết quả.
            </p>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight">
            Cùng thúc đẩy chuẩn mực Influencer Marketing
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Dành cho Brand, Creator và các đối tác đồng hành dài hạn.
          </p>
          <div className="mt-10 inline-flex px-10 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:scale-105 transition">
            Bắt đầu với Alino
          </div>
        </section>
      </div>
    </>
  );
}
