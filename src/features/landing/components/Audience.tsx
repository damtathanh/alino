interface AudienceProps {
    onSignupClick: (role?: 'creator' | 'brand') => void;
}

const Audience = ({ onSignupClick }: AudienceProps) => {
    return (
        <section className="py-24 bg-white" id="audience">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Dành cho ai?</h2>
                    <p className="text-lg text-secondary">Hệ sinh thái kết nối nhu cầu thực tế của cả hai phía.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* For Creators */}
                    <div className="group relative rounded-3xl p-8 lg:p-10 bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-6 text-green-600">
                                🎨
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2">Nhà sáng tạo nội dung</h3>
                            <p className="text-secondary mb-8 leading-relaxed">
                                Bạn muốn chuyên nghiệp hóa hình ảnh, quản lý công việc khoa học và không muốn bị cuốn vào quy trình thủ công.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Hồ sơ đẹp, load nhanh, chuẩn SEO</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Báo giá dịch vụ minh bạch</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Quản lý Booking & Hợp đồng online</span>
                                </li>
                            </ul>

                            <button onClick={() => onSignupClick('creator')} className="inline-block mt-8 text-green-600 font-bold hover:underline cursor-pointer">
                                Tạo hồ sơ Creator &rarr;
                            </button>
                        </div>
                    </div>

                    {/* For Brands */}
                    <div className="group relative rounded-3xl p-8 lg:p-10 bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-2xl mb-6 text-white shadow-lg">
                                🏢
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Nhãn hàng / Agency</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                Bạn cần tìm kiếm KOL/KOC chất lượng, quản lý chiến dịch hiệu quả và minh bạch hóa quy trình thanh toán.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Tìm kiếm Creator theo filter chuyên sâu</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Quản lý Campaign Real-time</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Duyệt nội dung & lịch sử phản hồi tập trung</span>
                                </li>
                            </ul>

                            <a href="#brands" className="inline-block mt-8 text-white font-bold hover:underline">
                                Tìm hiểu cho Brand &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Audience;
