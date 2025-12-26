import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Careers")}</title>
        <meta name="description" content="Tuyển dụng tại Alino." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-sm font-semibold text-indigo-600">Tuyển dụng</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Cùng xây dựng trải nghiệm hợp tác chuyên nghiệp</h1>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Chúng tôi tìm kiếm những người nghiêm túc với sản phẩm, giao tiếp rõ ràng và có trách nhiệm với chất lượng công việc.
              Nhịp làm việc gọn, ưu tiên kết quả và tính kỷ luật.
            </p>
          </div>

          {/* What we value */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Điều chúng tôi đánh giá cao</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold text-indigo-600">Tư duy sản phẩm</div>
                <div className="mt-1 text-sm text-gray-700">Biết nói không, giữ luồng đơn giản, tối ưu cho người dùng thực tế.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-600">Trách nhiệm</div>
                <div className="mt-1 text-sm text-gray-700">Chủ động, đáng tin cậy, cam kết với chất lượng và thời hạn.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-600">Giao tiếp gọn</div>
                <div className="mt-1 text-sm text-gray-700">Rõ ràng, thẳng thắn, tôn trọng và tập trung vào giải pháp.</div>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900">Sản phẩm & Kỹ thuật</h3>
              <p className="mt-2 text-sm text-gray-600">Ưu tiên những người hiểu trade-off và thiết kế hệ thống gọn, dễ bảo trì. Làm đúng việc quan trọng trước, đo lường tác động sau.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900">Vận hành & Hỗ trợ</h3>
              <p className="mt-2 text-sm text-gray-600">Đảm bảo quy trình rõ ràng, chăm sóc người dùng nhanh, tử tế và hiệu quả.</p>
            </div>
          </div>

          {/* Process */}
          <div className="mt-12 border-t border-indigo-50 pt-10">
            <h2 className="text-lg font-semibold text-gray-900">Quy trình tuyển chọn</h2>
            <ol className="mt-4 space-y-3 text-gray-700">
              <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>Sàng lọc hồ sơ ngắn gọn (kinh nghiệm, sản phẩm, cách làm việc).</li>
              <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>Trao đổi chuyên môn và tư duy sản phẩm.</li>
              <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">3</span>Bài tập nhỏ (nếu cần) tập trung vào tính thực tế.</li>
              <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">4</span>Thảo luận offer và cách phối hợp công việc.</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">Nếu quan tâm, vui lòng gửi hồ sơ và giới thiệu ngắn gọn về kinh nghiệm của bạn.</p>
          </div>
        </div>
      </div>
    </>
  );
}
