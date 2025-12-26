import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function AboutAlino() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Về Alino")}</title>
        <meta name="description" content="Cách Alino chuẩn hoá quy trình Brand–Creator để làm việc rõ ràng, minh bạch và hiệu quả." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-sm font-semibold text-indigo-600">Sản phẩm</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Về Alino</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Alino giúp chuẩn hoá quy trình làm việc giữa Brand và Creator: từ hồ sơ, brief, trao đổi đến nghiệm thu.
              Mục tiêu là giảm ma sát giao tiếp, thống nhất kỳ vọng và đo lường được tác động thực tế.
            </p>
          </div>

          {/* Problem / Approach */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Vấn đề thường gặp</h2>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Brief thiếu hoặc thay đổi nhiều, khó thống nhất kỳ vọng.</li>
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Tiến độ và phạm vi không tập trung, dễ lệch chất lượng.</li>
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Nghiệm thu mơ hồ, khó đo lường tác động.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Cách tiếp cận của Alino</h2>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Chuẩn hoá thông tin ngay từ đầu: hồ sơ rõ ràng, brief có cấu trúc.</li>
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Một nơi để làm việc: theo dõi tiến độ, trao đổi, nghiệm thu.</li>
                <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"/>Tập trung chất lượng nội dung và mục tiêu truyền thông cụ thể.</li>
              </ul>
            </section>
          </div>

          {/* Commitment */}
          <div className="mt-12 border-t border-indigo-50 pt-10">
            <h2 className="text-lg font-semibold text-gray-900">Cam kết trải nghiệm</h2>
            <p className="mt-3 text-gray-600">Ưu tiên sự rõ ràng và tính chuyên nghiệp. Tối giản luồng làm việc để đội ngũ thực thi nhanh và đúng.</p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Đơn giản</div>
                <div className="mt-1 text-sm text-gray-700">Ít thao tác, rõ bước, giảm sai lệch kỳ vọng.</div>
              </div>
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Tin cậy</div>
                <div className="mt-1 text-sm text-gray-700">Hồ sơ, trao đổi, nghiệm thu tập trung và minh bạch.</div>
              </div>
              <div className="rounded-xl bg-indigo-50 p-5">
                <div className="text-sm font-semibold text-indigo-600">Hiệu quả</div>
                <div className="mt-1 text-sm text-gray-700">Tối ưu cho kết quả thay vì chỉ số hư danh.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
