import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Careers")}</title>
        <meta
          name="description"
          content="Gia nhập Alino — chúng tôi xây dựng nền tảng vận hành Influencer Marketing với tư duy sản phẩm và chất lượng cao."
        />
      </Helmet>

      <div className="bg-white text-gray-900 overflow-hidden">

        {/* HERO */}
        <section className="pt-36 pb-24 text-center">
          <div className="max-w-4xl mx-auto px-6 animate-fade-in-up">
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight">
              Gia nhập Alino <br /> để xây dựng niềm tin <br /> trong Influencer Marketing
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi tìm kiếm những người nghiêm túc, có tư duy hệ thống,
              cam kết với chất lượng và muốn xây dựng sản phẩm có giá trị thật.
            </p>
          </div>
        </section>

        {/* WHY WORK HERE */}
        <section className="py-24 bg-indigo-50/30">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold tracking-tight">
                Vì sao bạn nên cân nhắc
              </h2>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Influencer Marketing đang trở thành một phần cốt lõi của nhiều chiến lược truyền thông,
                nhưng thiếu một nền tảng vận hành chuẩn mực, rõ rệt. Tại Alino, bạn sẽ làm việc với
                những bài toán có chiều sâu, mang tính hệ thống.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Đây là nơi dành cho người không ngại trách nhiệm, hiểu trade-off và cam kết với chất lượng
                đến cùng.
              </p>
            </div>
            {/* Visual / Work Principles */}
            <div className="relative rounded-3xl bg-indigo-50 p-8 animate-slow-zoom">
              <div className="space-y-6">

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-indigo-600 mb-2">
                    CÂN NHẮC KỸ LƯỠNG
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Chúng tôi ưu tiên hiểu đúng vấn đề trước khi tìm lời giải.
                    Mọi quyết định đều dựa trên dữ liệu và tác động đến doanh nghiệp.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-indigo-600 mb-2">
                    TRÁCH NHIỆM VÀ TIÊN PHONG
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Mỗi cá nhân chịu trách nhiệm đến cùng cho quyết định và sản phẩm
                    mình tạo ra. ALINO khuyến khích tinh thần chủ động, minh bạch
                    và dám sai để phát triển.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-indigo-600 mb-2">
                    CHẤT LƯỢNG LÀ TRÊN HẾT
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Chúng tôi cam kết sản phẩm cuối cùng đạt tiêu chuẩn cao nhất và tạo ra giá trị thật cho người dùng.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CULTURE */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center">
              Văn hoá & cách làm việc
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Tư duy sản phẩm",
                  desc: "Chúng tôi ưu tiên giải quyết vấn đề thật hơn là câu chữ đẹp."
                },
                {
                  title: "Minh bạch",
                  desc: "Giao tiếp rõ ràng, trách nhiệm minh bạch và feedback thẳng thắn."
                },
                {
                  title: "Hiệu quả",
                  desc: "Ưu tiên tác động thật đối với user và hệ thống."
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-gray-200 p-8 hover:-translate-y-1 hover:shadow-lg transition animate-fade-in-up"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-4 text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-indigo-50/30">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Những benefit bạn nhận được
            </h2>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi tin rằng môi trường tốt dẫn đến sản phẩm tốt. Vì vậy, đội ngũ sẽ nhận được:
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {[
                "Lương cạnh tranh và thưởng theo hiệu quả",
                "Chế độ nghỉ phép & chăm sóc sức khoẻ",
                "Môi trường làm việc linh hoạt & remote nếu phù hợp"
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-lg transition animate-fade-in-up"
                >
                  <p className="text-lg text-gray-700">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center">
              Vị trí đang tuyển
            </h2>
            <p className="mt-4 text-lg text-gray-700 text-center">
              Nếu không có vị trí phù hợp ngay, bạn vẫn có thể gửi hồ sơ chung!
            </p>

            <div className="mt-12 space-y-6">
              {[
                {
                  title: "Senior Product Manager",
                  team: "Product",
                  desc: "Lãnh đạo roadmap sản phẩm, định nghĩa KPI & success metric."
                },
                {
                  title: "Fullstack Engineer",
                  team: "Engineering",
                  desc: "Xây dựng & mở rộng nền tảng với hiệu năng cao."
                },
                {
                  title: "Brand Marketing Specialist",
                  team: "Marketing",
                  desc: "Phối hợp với Brand để triển khai chiến dịch mẫu hóa."
                }
              ].map((role, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 p-6 hover:-translate-y-1 hover:shadow-lg transition animate-fade-in-up"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">{role.title}</h3>
                    <span className="text-indigo-600 font-semibold text-sm uppercase">
                      {role.team}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-700">{role.desc}</p>
                  <button className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition">
                    Ứng tuyển vị trí này
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 text-center bg-indigo-600 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Không có vị trí phù hợp?
          </h2>
          <p className="mt-6 text-xl leading-relaxed">
            Gửi cho chúng tôi hồ sơ & LinkedIn của bạn —
            chúng tôi sẽ liên hệ khi có cơ hội phù hợp.
          </p>
          <div className="mt-10 inline-flex px-10 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:scale-105 transition">
            Gửi hồ sơ chung
          </div>
        </section>

      </div>
    </>
  );
}
