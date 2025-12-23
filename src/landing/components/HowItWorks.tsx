const HowItWorks = () => {
    return (
        <section className="py-20 lg:py-32 overflow-hidden" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Quy trình làm việc chuẩn SaaS</h2>
                    <p className="text-lg text-secondary">
                        Từ lúc tạo trang đến khi nhận tiền về túi, mọi thứ đều minh bạch.
                    </p>
                </div>

                {/* Steps Timeline - Desktop */}
                <div className="hidden lg:grid grid-cols-4 gap-8 mb-20 relative">
                    {/* Line connector */}
                    <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-border -z-10"></div>

                    {[
                        { title: "Tạo trang", desc: "Thiết lập hồ sơ & Bảng giá" },
                        { title: "Nhận Yêu cầu", desc: "Nhãn hàng gửi kịch bản qua Form" },
                        { title: "Theo dõi", desc: "Cập nhật tiến độ & phản hồi" },
                        { title: "Thanh toán", desc: "Nhận tiền minh bạch" }
                    ].map((step, i) => (
                        <div key={i} className="text-center bg-bg">
                            <div className="w-16 h-16 mx-auto bg-white border-2 border-brand rounded-full flex items-center justify-center text-xl font-bold text-brand shadow-lg mb-4">
                                {i + 1}
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                            <p className="text-sm text-secondary px-4">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mobile Steps (Vertical) */}
                <div className="space-y-6 lg:hidden mb-16">
                    {[
                        { title: "Tạo trang", desc: "Thiết lập Profile & Bảng giá" },
                        { title: "Nhận Yêu cầu", desc: "Brand gửi Brief qua Form chuẩn" },
                        { title: "Theo dõi", desc: "Cập nhật tiến độ & Phản hồi" },
                        { title: "Thanh toán", desc: "Nhận tiền minh bạch" }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-primary">{step.title}</h3>
                                <p className="text-sm text-secondary">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Visual: Kanban Board Mockup */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Background decorations */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

                    <div className="bg-surface rounded-xl border border-border p-4 sm:p-8 shadow-2xl relative">
                        {/* Header Mockup */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-primary">Dự án</h3>
                                <span className="bg-white border border-border px-2 py-0.5 rounded text-xs text-secondary">All deals</span>
                            </div>
                            <button className="bg-brand text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                + Tạo dự án mới
                            </button>
                        </div>

                        {/* Board Columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Column 1: New */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Đã ký</span>
                                    <span className="text-xs bg-gray-200 text-gray-600 px-1.5 rounded">2</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">LV</div>
                                        <span className="px-1.5 py-0.5 bg-dealNew text-brand text-[10px] rounded font-medium">Mới</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-1">Lookbook Campaign</p>
                                    <p className="text-xs text-muted">Hạn chót: 28/12/2025</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">CO</div>
                                        <span className="px-1.5 py-0.5 bg-dealNew text-brand text-[10px] rounded font-medium">Mới</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-1">Coffee Reel Q4</p>
                                    <p className="text-xs text-muted">Hạn chót: 30/12/2025</p>
                                </div>
                            </div>

                            {/* Column 2: In Progress */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Đang làm</span>
                                    <span className="text-xs bg-dealProgress text-blue-700 px-1.5 rounded">1</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-brand">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">SK</div>
                                        <span className="px-1.5 py-0.5 bg-dealProgress text-blue-700 text-[10px] rounded font-medium">Đang làm</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-1">Skincare Review</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                                        <div className="bg-brand h-1.5 rounded-full w-2/3"></div>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white"></div>
                                        <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white -ml-2"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Feedback */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Chờ duyệt</span>
                                    <span className="text-xs bg-dealFeedback text-yellow-700 px-1.5 rounded">1</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">TE</div>
                                        <span className="px-1.5 py-0.5 bg-dealFeedback text-yellow-700 text-[10px] rounded font-medium">Chờ duyệt</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-1">Tech Unboxing</p>
                                    <p className="text-xs text-muted mb-2">Phiên bản 2</p>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                        <span className="text-[10px] text-secondary">1 phản hồi</span>
                                    </div>
                                </div>
                                {/* Placeholder slot */}
                                <div className="h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted">
                                    Trống
                                </div>
                            </div>

                            {/* Column 4: Completed */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Thanh toán</span>
                                    <span className="text-xs bg-dealDone text-green-700 px-1.5 rounded">5</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-border shadow-sm opacity-75">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</div>
                                        <span className="px-1.5 py-0.5 bg-dealDone text-green-700 text-[10px] rounded font-medium">Đã thanh toán</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-1">Fashion Haul</p>
                                    <p className="text-xs text-success font-bold">+15.000.000</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
