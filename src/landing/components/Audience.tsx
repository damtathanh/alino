const Audience = () => {
    return (
        <section className="py-24 bg-white" id="for-brands">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* For Creators */}
                    <div className="relative group bg-bgAlt rounded-3xl p-8 sm:p-12 border border-border overflow-hidden hover:border-brand/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand/10 transition-colors"></div>

                        <div className="relative z-10">
                            <span className="inline-block text-brand font-bold tracking-wider text-sm uppercase mb-4 bg-brandSoft px-3 py-1 rounded-full">For Creators</span>
                            <h3 className="text-3xl font-bold text-primary mb-6">Làm việc chuyên nghiệp hơn</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Hồ sơ đẹp, load nhanh, chuẩn SEO</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Media Kit & Báo giá rõ ràng, chuyên nghiệp</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    <span className="text-secondary text-lg">Workflow quản lý deadline tự động nhắc nhở</span>
                                </li>
                            </ul>

                            <div className="mt-10">
                                <a href="#" className="inline-flex items-center font-semibold text-brand hover:underline">
                                    Tạo hồ sơ Creator
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* For Brands */}
                    <div className="relative group bg-primary text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
                        {/* Abstract shapes */}
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

                        <div className="relative z-10">
                            <span className="inline-block text-indigo-300 font-bold tracking-wider text-sm uppercase mb-4 bg-white/10 px-3 py-1 rounded-full">For Brands</span>
                            <h3 className="text-3xl font-bold text-white mb-6">Booking dễ dàng & minh bạch</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Xem hồ sơ & báo giá chuẩn (đã xác thực)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Gửi request theo mẫu, không thiếu info</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span className="text-indigo-100 text-lg">Duyệt nội dung & lịch sử phản hồi tập trung</span>
                                </li>
                            </ul>

                            <div className="mt-10">
                                <a href="#" className="inline-flex items-center font-semibold text-white hover:text-indigo-200 transition-colors">
                                    Tìm hiểu cho Brand
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Audience;
