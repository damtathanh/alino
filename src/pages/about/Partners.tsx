import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Partners() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Partners")}</title>
        <meta name="description" content="Thông tin hợp tác cùng Alino." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-sm font-semibold text-indigo-600">Đối tác</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Hợp tác để nâng chuẩn trải nghiệm Brand × Creator</h1>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Chúng tôi tìm kiếm đối tác cùng tầm nhìn: ưu tiên chất lượng và trải nghiệm làm việc chuyên nghiệp. Mục tiêu là tạo ra
              quy trình rõ ràng, hiệu quả cho cả Brand và Creator.
            </p>
          </div>

          {/* Partnership models */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6">
              <div className="text-sm font-semibold text-indigo-600">Đồng xây dựng</div>
              <p className="mt-2 text-sm text-gray-700">Cùng phát triển tính năng hoặc quy trình nhằm gia tăng trải nghiệm sử dụng.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <div className="text-sm font-semibold text-indigo-600">Tích hợp</div>
              <p className="mt-2 text-sm text-gray-700">Kết nối hệ thống/luồng dữ liệu theo nhu cầu thực tế và chuẩn bảo mật hiện hành.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <div className="text-sm font-semibold text-indigo-600">Dịch vụ</div>
              <p className="mt-2 text-sm text-gray-700">Hợp tác cung cấp dịch vụ bổ trợ (đào tạo, vận hành) theo tiêu chuẩn của Alino.</p>
            </div>
          </div>

          {/* Fit & Getting started */}
          <div className="mt-12 border-t border-indigo-50 pt-10">
            <h2 className="text-lg font-semibold text-gray-900">Tiêu chí phù hợp</h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tôn trọng người dùng; ưu tiên chất lượng và tính bền vững.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Giao tiếp rõ ràng; cam kết với thời hạn và kết quả.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Bảo mật và tuân thủ là mặc định.</li>
            </ul>

            <div className="mt-8 rounded-2xl bg-indigo-50 p-6">
              <h3 className="text-base font-semibold text-gray-900">Bắt đầu trao đổi</h3>
              <p className="mt-2 text-sm text-gray-700">Vui lòng giới thiệu ngắn về năng lực, lý do hợp tác, và phạm vi quan tâm.</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Liên hệ đội ngũ Alino</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
