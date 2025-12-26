import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function News() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Tin tức")}</title>
        <meta
          name="description"
          content="Chủ đề tin tức quan trọng cho hợp tác Brand–Creator: thuật toán, monetization, chính sách nền tảng."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-indigo-600">Insights</span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">Tin tức theo chủ đề</h1>
              <p className="mt-3 text-gray-600">
                Tổng hợp những chủ đề ảnh hưởng tới cách làm việc của Brand và Creator. Mang tính định hướng, không
                phải đưa tin thời sự.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link className="underline" to="/trends">
                ← Xu hướng
              </Link>
              <Link className="underline" to="/">
                Trang chủ
              </Link>
            </div>
          </div>

          {/* Themed sections */}
          <div className="space-y-8">
            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Thuật toán & phân phối nội dung</h2>
              <p className="mt-2 text-sm text-gray-700">
                Thay đổi thuật toán có thể làm lệch reach đột ngột. Điều quan trọng là duy trì chất lượng nội dung và
                lịch đăng nhất quán.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Tối ưu theo mục tiêu thay vì chạy theo trend ngắn hạn.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Chuẩn bị phương án A/B khi reach dao động.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Giữ tiêu chuẩn nghiệm thu ổn định giữa các đợt thay đổi.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Monetization & mô hình hợp tác</h2>
              <p className="mt-2 text-sm text-gray-700">
                Khi nền tảng thay đổi chính sách monetization, cách định giá và phạm vi công việc cần được cập nhật
                tương ứng.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Gắn fee với kết quả/đầu ra cụ thể (khi hợp lý).</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Làm rõ phạm vi deliverables theo từng nền tảng.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Dự phòng phương án nếu chính sách đổi giữa campaign.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Chính sách nền tảng & tuân thủ</h2>
              <p className="mt-2 text-sm text-gray-700">
                Tuân thủ guideline (quảng cáo, disclosure, nhạc/bản quyền) là bắt buộc. Vi phạm dẫn đến hạ phân phối hoặc
                gỡ nội dung.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Checklist tuân thủ theo kênh và loại nội dung.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Phê duyệt nội dung nhạy cảm trước khi đăng.</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"/>Lưu trữ bằng chứng nghiệm thu để đối soát.</li>
              </ul>
            </section>
          </div>

          {/* Footer links */}
          <div className="mt-10 flex gap-3">
            <Link to="/blog" className="px-5 py-3 rounded-full border border-gray-200">
              Đọc Blog
            </Link>
            <Link to="/events" className="px-5 py-3 rounded-full border border-gray-200">
              Xem Sự kiện
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
