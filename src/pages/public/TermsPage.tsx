import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-200">
            <h1 className="text-4xl font-bold mb-4">Điều khoản sử dụng</h1>
            <p className="text-sm text-gray-500 mb-8">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Chấp nhận điều khoản</h2>
                <p className="text-gray-700 mb-4">
                  Bằng việc truy cập và sử dụng dịch vụ ALINO, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản sử dụng này. 
                  Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép sử dụng dịch vụ.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Mô tả dịch vụ</h2>
                <p className="text-gray-700 mb-4">
                  ALINO là một nền tảng kết nối giữa các nhà sáng tạo nội dung (Creators) và các thương hiệu (Brands) 
                  để tạo điều kiện cho các chiến dịch hợp tác và tiếp thị. Dịch vụ bao gồm nhưng không giới hạn ở việc 
                  quản lý hồ sơ, tìm kiếm đối tác, và quản lý các dự án hợp tác.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Tài khoản người dùng</h2>
                <p className="text-gray-700 mb-4">
                  Để sử dụng một số tính năng của dịch vụ, bạn cần tạo tài khoản. Bạn có trách nhiệm:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Bảo mật thông tin đăng nhập của bạn</li>
                  <li>Cung cấp thông tin chính xác và cập nhật</li>
                  <li>Thông báo ngay cho chúng tôi về bất kỳ hoạt động đáng ngờ nào</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Quyền và trách nhiệm</h2>
                <p className="text-gray-700 mb-4">
                  Người dùng có quyền sử dụng dịch vụ theo đúng mục đích và không được sử dụng dịch vụ cho các hoạt động 
                  bất hợp pháp hoặc vi phạm quyền của người khác.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Sở hữu trí tuệ</h2>
                <p className="text-gray-700 mb-4">
                  Tất cả nội dung trên nền tảng ALINO, bao gồm logo, thiết kế, văn bản, và phần mềm, đều thuộc quyền sở hữu 
                  của ALINO hoặc các bên cấp phép. Bạn không được phép sao chép, phân phối, hoặc sử dụng nội dung này mà không 
                  có sự cho phép bằng văn bản.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Giới hạn trách nhiệm</h2>
                <p className="text-gray-700 mb-4">
                  ALINO không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, hoặc hậu quả nào phát sinh 
                  từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Thay đổi điều khoản</h2>
                <p className="text-gray-700 mb-4">
                  Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi 
                  được coi là bạn đã chấp nhận các điều khoản mới.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Liên hệ</h2>
                <p className="text-gray-700 mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua email hoặc các kênh hỗ trợ 
                  được cung cấp trên nền tảng.
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

