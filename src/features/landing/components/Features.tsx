const Features = () => {
    const features = [
        {
            title: "Hồ sơ cá nhân",
            desc: "Hồ sơ chuyên nghiệp, thể hiện phong cách riêng với tùy chỉnh URL.",
            icon: "👤"
        },
        {
            title: "Bảng giá dịch vụ",
            desc: "Niêm yết giá rõ ràng hoặc ẩn giá (Booking Only) tuỳ nhu cầu.",
            icon: "🏷️"
        },
        {
            title: "Form Booking chuẩn",
            desc: "Giúp Brand gửi yêu cầu đầy đủ thông tin, tránh hỏi đi hỏi lại.",
            icon: "📝"
        },
        {
            title: "Quản lý hợp đồng",
            desc: "Theo dõi trạng thái từng deal: Mới, Đang làm, Chờ duyệt, Hoàn tất.",
            icon: "📊"
        },
        {
            title: "Duyệt nội dung",
            desc: "Phản hồi tập trung ngay trên từng phiên bản nội dung video/ảnh.",
            icon: "👀"
        },
        {
            title: "Thanh toán & QR",
            desc: "Lưu lịch sử giao dịch, hỗ trợ tạo QR thanh toán và nhắc nợ tự động.",
            icon: "💸"
        }
    ];

    return (
        <section className="py-20 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Mọi công cụ bạn cần để làm nghề</h2>
                    <p className="text-lg text-secondary">
                        Không còn dùng Excel, Note hay Chat để quản lý công việc. Alino gom tất cả về một chỗ.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-24">
                    {features.map((item, idx) => (
                        <div key={idx} className="flex gap-5 group">
                            <div className="w-12 h-12 rounded-xl bg-bgAlt border border-border flex items-center justify-center text-2xl shadow-sm group-hover:border-brand/50 group-hover:bg-brandSoft transition-colors">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-brand transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-secondary leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Review Mockup Section */}
                <div className="bg-bgAlt rounded-3xl p-8 lg:p-12 border border-border">
                    <div className="lg:grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-2 mb-8 lg:mb-0">
                            <h3 className="text-2xl font-bold text-primary mb-4">Duyệt nội dung & Phản hồi tập trung</h3>
                            <p className="text-secondary mb-6 leading-relaxed">
                                Không còn cơn ác mộng phản hồi trôi trong tin nhắn. Brand có thể bình luận trực tiếp lên từng video, hình ảnh. Creator biết chính xác cần sửa gì.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium text-primary">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                    Bình luận theo thời gian thực
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium text-primary">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                    Lịch sử phiên bản (V1, V2, Final)
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium text-primary">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                    Nút "Duyệt" chính thức từ Brand
                                </li>
                            </ul>
                        </div>

                        {/* Mockup */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col md:flex-row h-[400px]">
                                {/* Left: Content Preview */}
                                <div className="flex-1 bg-black relative flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <span className="text-white/50 font-bold text-xl tracking-widest">PREVIEW VIDEO</span>

                                    {/* Play Button */}
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center absolute hover:scale-110 transition-transform cursor-pointer">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>

                                    {/* Version Label */}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                        Version 2.0
                                    </div>
                                </div>

                                {/* Right: Comments Panel */}
                                <div className="w-full md:w-80 bg-white border-l border-border flex flex-col">
                                    <div className="p-4 border-b border-border flex justify-between items-center bg-bgAlt">
                                        <span className="font-bold text-sm">Comments (3)</span>
                                        <div className="flex gap-2">
                                            <button className="text-xs bg-white border border-border px-2 py-1 rounded hover:bg-gray-50">Upload New</button>
                                            <button className="text-xs bg-brand text-white px-3 py-1 rounded font-medium shadow hover:bg-brandHover">Approve</button>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {/* Comment 1 */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">BM</div>
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs font-bold text-primary">Brand Manager</span>
                                                    <span className="text-[10px] text-muted">10:30 AM</span>
                                                </div>
                                                <p className="text-xs text-secondary mt-1 bg-gray-50 p-2 rounded-lg border border-border">
                                                    Đoạn intro hơi dài, em cắt ngắn bớt 3s nhé. Logo brand cần hiện rõ hơn ở giây thứ 5.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Comment 2 */}
                                        <div className="flex gap-3 flex-row-reverse">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-brand flex items-center justify-center text-xs font-bold shrink-0">ME</div>
                                            <div className="text-right">
                                                <div className="flex items-baseline gap-2 justify-end">
                                                    <span className="text-[10px] text-muted">10:45 AM</span>
                                                    <span className="text-xs font-bold text-primary">Me</span>
                                                </div>
                                                <p className="text-xs text-white bg-brand p-2 rounded-lg mt-1 text-left">
                                                    Dạ vâng, em sẽ chỉnh lại ánh sáng chỗ đó luôn ạ.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Comment 3 */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">BM</div>
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs font-bold text-primary">Brand Manager</span>
                                                    <span className="text-[10px] text-muted">Now</span>
                                                </div>
                                                <p className="text-xs text-secondary mt-1 bg-gray-50 p-2 rounded-lg border border-border">
                                                    Màu áo này lên hình đẹp đó! 👍
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Input */}
                                    <div className="p-3 border-t border-border">
                                        <div className="relative">
                                            <input type="text" placeholder="Write a comment..." className="w-full pl-3 pr-8 py-2 text-xs border border-border rounded-md focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                                            <button className="absolute right-2 top-2 text-brand hover:text-brandHover">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
