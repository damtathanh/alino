import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-200">
            <h1 className="text-4xl font-bold mb-4">Chính sách bảo mật</h1>
            <p className="text-sm text-gray-500 mb-8">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
                <p className="text-gray-700 mb-4">
                  ALINO cam kết bảo vệ quyền riêng tư của người dùng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, 
                  và bảo vệ thông tin cá nhân của bạn khi sử dụng dịch vụ của chúng tôi.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Thông tin chúng tôi thu thập</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi thu thập các loại thông tin sau:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Thông tin cá nhân:</strong> Tên, email, ngày sinh, địa chỉ</li>
                  <li><strong>Thông tin tài khoản:</strong> Thông tin đăng nhập, lịch sử hoạt động</li>
                  <li><strong>Thông tin hồ sơ:</strong> Thông tin công khai trên hồ sơ của bạn</li>
                  <li><strong>Thông tin kết nối:</strong> Dữ liệu từ các tài khoản mạng xã hội được kết nối (Google, Facebook, Instagram, TikTok)</li>
                  <li><strong>Dữ liệu sử dụng:</strong> Thông tin về cách bạn sử dụng nền tảng</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi sử dụng thông tin của bạn để:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Cung cấp và cải thiện dịch vụ</li>
                  <li>Kết nối bạn với các đối tác phù hợp (Creators với Brands)</li>
                  <li>Gửi thông báo và cập nhật về dịch vụ</li>
                  <li>Phân tích và cải thiện trải nghiệm người dùng</li>
                  <li>Tuân thủ các nghĩa vụ pháp lý</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Kết nối tài khoản mạng xã hội</h2>
                <p className="text-gray-700 mb-4">
                  Khi bạn kết nối tài khoản mạng xã hội (Google, Facebook, Instagram, TikTok) với ALINO, chúng tôi có thể 
                  truy cập và lưu trữ một số thông tin từ các tài khoản đó để cung cấp dịch vụ tốt hơn, bao gồm thông tin hồ sơ 
                  công khai và dữ liệu cần thiết cho các tính năng của nền tảng.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Chia sẻ thông tin</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Với các đối tác phù hợp trên nền tảng (thông tin công khai từ hồ sơ của bạn)</li>
                  <li>Với các nhà cung cấp dịch vụ hỗ trợ hoạt động của chúng tôi</li>
                  <li>Khi được yêu cầu bởi pháp luật</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Bảo mật dữ liệu</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi 
                  truy cập trái phép, mất mát, hoặc phá hủy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Quyền của bạn</h2>
                <p className="text-gray-700 mb-4">
                  Bạn có quyền:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Truy cập và chỉnh sửa thông tin cá nhân của bạn</li>
                  <li>Yêu cầu xóa tài khoản và dữ liệu</li>
                  <li>Ngừng kết nối tài khoản mạng xã hội</li>
                  <li>Yêu cầu xuất dữ liệu của bạn</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Cookie và công nghệ theo dõi</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm người dùng và phân tích cách sử dụng dịch vụ.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Thay đổi chính sách</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi có thể cập nhật chính sách này theo thời gian. Chúng tôi sẽ thông báo cho bạn về các thay đổi quan trọng 
                  qua email hoặc thông báo trên nền tảng.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Liên hệ</h2>
                <p className="text-gray-700 mb-4">
                  Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email hoặc các kênh hỗ trợ được cung cấp.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

