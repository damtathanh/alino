import { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-brand/30 hover:shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-start p-5 bg-transparent border-0 cursor-pointer group"
            >
                <span className={`text-[15px] font-semibold pr-4 leading-snug transition-colors ${isOpen ? 'text-brand' : 'text-gray-900 group-hover:text-brand'}`}>
                    {question}
                </span>
                <span className={`shrink-0 transform transition-transform duration-200 text-gray-400 mt-0.5 ${isOpen ? 'rotate-180 text-brand' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50 ${isOpen ? 'max-h-96 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 text-sm leading-relaxed p-5 pt-4">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            q: "Alino có miễn phí không?",
            a: "Có. Alino miễn phí trọn đời cho Creator với các tính năng: Tạo hồ sơ, Bảng giá, Quản lý đơn booking. Chúng tôi chỉ thu phí nhỏ khi bạn phát sinh giao dịch nhận tiền qua nền tảng (nếu dùng)."
        },
        {
            q: "Content Creator có cần trả phí để tạo trang không?",
            a: "Hoàn toàn không. Bạn có thể tạo trang hồ sơ, Hồ sơ và bảng giá dịch vụ miễn phí vĩnh viễn trên Alino."
        },
        {
            q: "Brand có cần tạo tài khoản để gửi booking không?",
            a: "Không bắt buộc. Brand có thể xem hồ sơ và gửi yêu cầu booking thông qua form mà không cần đăng nhập. Tuy nhiên, việc tạo tài khoản sẽ giúp Brand quản lý lịch sử đơn hàng tốt hơn."
        },
        {
            q: "Tiền booking được thanh toán như thế nào?",
            a: "Bạn có thể nhận tiền trực tiếp từ Brand (CK, Momo) hoặc dùng cổng thanh toán an toàn của Alino. Nếu dùng Alino, tiền sẽ được tạm giữ và giải ngân khi công việc hoàn thành."
        },
        {
            q: "Tôi có thể dùng tên miền riêng cho trang Alino không?",
            a: "Có. Với gói nâng cao (sắp ra mắt), bạn có thể trỏ tên miền riêng (ví dụ: booking.minhhoa.com) về trang Alino của mình để tăng tính chuyên nghiệp."
        },
        {
            q: "Alino có hỗ trợ hợp đồng và lưu lịch sử làm việc không?",
            a: "Có. Hệ thống tự động lưu trữ toàn bộ lịch sử trao đổi, file đã gửi và trạng thái công việc. Bạn có thể xuất hợp đồng mẫu điện tử ngay trên nền tảng."
        },
        {
            q: "Nội dung gửi duyệt có bị trôi hoặc mất không?",
            a: "Không. Tính năng Duyệt nội dung của Alino lưu trữ tập trung từng phiên bản (V1, V2...) và comment phản hồi ngay tại chỗ, giúp bạn không bao giờ bị trôi tin nhắn."
        },
        {
            q: "Alino có nhắc thanh toán cho Brand không?",
            a: "Có. Hệ thống có tính năng gửi email nhắc nhở thanh toán tự động tới Brand khi đến hạn, giúp Creator đỡ ngại khi phải đi đòi tiền."
        },
        {
            q: "Dữ liệu hợp đồng và báo giá có được bảo mật không?",
            a: "Tuyệt đối bảo mật. Chỉ có bạn và Brand trong giao dịch đó mới xem được các thông tin nhạy cảm về giá và hợp đồng."
        },
        {
            q: "Tôi có thể sử dụng Alino cho nhiều Brand cùng lúc không?",
            a: "Được chứ. Bạn có thể quản lý không giới hạn số lượng đơn hàng và Brand trên cùng một Dashboard duy nhất."
        }
    ];

    return (
        <section className="py-24 bg-gray-50" id="faq">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Giải đáp những thắc mắc phổ biến nhất để bạn yên tâm sử dụng Alino.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {faqs.slice(0, 5).map((item, idx) => (
                            <FAQItem key={idx} question={item.q} answer={item.a} />
                        ))}
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4">
                        {faqs.slice(5, 10).map((item, idx) => (
                            <FAQItem key={idx + 5} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
