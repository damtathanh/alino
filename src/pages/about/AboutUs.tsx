import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("About")}</title>
        <meta
          name="description"
          content="Alino giúp brands và creators làm việc rõ ràng, chuyên nghiệp và đo lường được kết quả."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-sm font-semibold text-indigo-600">Về chúng tôi</span>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Alino – Nền tảng kết nối Brand và Creator</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Alino được xây dựng cho thị trường Việt Nam, giúp đội ngũ marketing và các nhà sáng tạo
              hợp tác hiệu quả hơn: rõ ràng về mục tiêu, minh bạch về phạm vi công việc, đo lường được
              tác động. Chúng tôi tập trung vào thực thi, thay vì ồn ào về kênh và định dạng.
            </p>
          </div>

          {/* Two-column: For Brands / For Creators */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">Dành cho Brand</h2>
              <p className="mt-3 text-gray-600">
                Alino giúp đội marketing xác định nhu cầu, tìm kiếm Creator phù hợp, quản lý chiến dịch và theo dõi kết quả.
                Mục tiêu là rút ngắn thời gian chuẩn bị, giảm sai lệch kỳ vọng, và tăng tỷ lệ hoàn thành đúng chất lượng.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Quy trình rõ ràng từ brief đến nghiệm thu.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Theo dõi tiến độ, kiểm soát phạm vi công việc.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tập trung vào kết quả thay vì chỉ số hư danh.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Dành cho Creator</h2>
              <p className="mt-3 text-gray-600">
                Alino hỗ trợ Creator quản lý hồ sơ, làm việc có cấu trúc với Brand, và thể hiện giá trị lao động sáng tạo một cách
                chuyên nghiệp. Công việc rõ ràng hơn, giao tiếp ít ma sát, và tập trung vào chất lượng nội dung.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Hồ sơ nhất quán, dễ hiểu, tập trung vào năng lực.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Quy trình làm việc minh bạch; ít đổi brief phút cuối.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tích lũy uy tín qua hợp tác chất lượng.</li>
              </ul>
            </section>
          </div>

          {/* Principles */}
          <div className="mt-12 border-t border-indigo-50 pt-10">
            <h2 className="text-xl font-semibold text-gray-900">Nguyên tắc sản phẩm</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-indigo-600">Rõ ràng</h3>
                <p className="mt-2 text-sm text-gray-600">Mỗi bước đều có mục đích và đầu ra cụ thể. Ít lựa chọn hơn, chất lượng cao hơn.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-indigo-600">Minh bạch</h3>
                <p className="mt-2 text-sm text-gray-600">Kỳ vọng, phạm vi, tiến độ và nghiệm thu được ghi nhận rõ ràng để tránh sai lệch.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-indigo-600">Tập trung kết quả</h3>
                <p className="mt-2 text-sm text-gray-600">Ưu tiên tác động thực tế lên mục tiêu truyền thông, thay vì chỉ số bề nổi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
