const Hero = () => {
    return (
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
            {/* Background Gradients - Softer & More Modern */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1440px] pointer-events-none z-0">
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-50/80 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-50/80 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">

                        {/* Notify Badge - Pill Shape */}
                        <a href="#" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold mb-8 hover:border-brand/30 hover:text-brand transition-colors group">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                            </span>
                            Phiên bản mới Alino 2.0 đã ra mắt
                            <svg className="w-3 h-3 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>

                        <h1 className="text-5xl lg:text-[4rem] leading-[1.1] font-extrabold tracking-tight text-slate-900 mb-8">
                            Hệ điều hành cho <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-600">Creator Economy</span>
                        </h1>

                        <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light lg:max-w-xl">
                            Nền tảng tất cả-trong-một giúp Creator tạo hồ sơ chuyên nghiệp, quản lý booking, hợp đồng và nhận thanh toán minh bạch.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                            <button className="w-full sm:w-auto h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold shadow-xl shadow-slate-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                Tạo trang miễn phí
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                            </button>
                            <button className="w-full sm:w-auto h-12 px-8 bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400"><path d="M8 5v14l11-7z" /></svg>
                                Xem Video Demo
                            </button>
                        </div>

                        {/* Social Proof / Trusted By */}
                        <div className="border-t border-slate-100 pt-8">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Được tin dùng bởi 1,000+ Creator</p>
                            <div className="flex items-center justify-center lg:justify-start gap-6 grayscale opacity-60">
                                {/* Simple text logos for now */}
                                <span className="font-bold text-lg text-slate-400">Schannel</span>
                                <span className="font-bold text-lg text-slate-400">VCCorp</span>
                                <span className="font-bold text-lg text-slate-400">Yeah1</span>
                                <span className="font-bold text-lg text-slate-400">BoxStudio</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Hero Visual (App Shell Mockup) */}
                    <div className="flex-1 w-full relative">
                        {/* Decorative blob behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-100/50 to-white rounded-full blur-3xl -z-10"></div>

                        {/* Glassmorphism Card Stack */}
                        <div className="relative z-10 perspective-1000">
                            {/* Main Card: Profile/Dashboard Hybrid */}
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform rotate-y-n5 rotate-x-5 hover:rotate-0 transition-transform duration-700 ease-out">

                                {/* Fake Browser Bar */}
                                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                    </div>
                                    <div className="flex-1 bg-white border border-slate-200 rounded-md h-6 w-full max-w-[200px] mx-auto shadow-sm"></div>
                                </div>

                                {/* App Content */}
                                <div className="p-6">
                                    {/* Header Part */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg">
                                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                                    <span className="text-xl">👩‍🎨</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Sarah Mitchell</h3>
                                                <p className="text-slate-500 text-sm">Nhà thiết kế nội dung</p>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Đang tìm việc</span>
                                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">Top Rated</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Doanh thu</p>
                                            <p className="text-2xl font-bold text-slate-900">200.000.000 VND</p>
                                            <p className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                12% vs last month
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active Deals List */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold text-slate-900 mb-2">Dự án đang chạy</h4>

                                        {[
                                            { brand: "Nike Air Campaign", status: "Đang chạy", color: "bg-blue-50 text-blue-600", amount: "2.500.000 VND" },
                                            { brand: "Spotify Playlist Reel", status: "Đánh giá", color: "bg-yellow-50 text-yellow-600", amount: "800.000 VND" },
                                            { brand: "Uniqlo Lookbook", status: "Yêu cầu mới", color: "bg-purple-50 text-purple-600", amount: "1.200.000 VND" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand/30 hover:bg-white transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm">
                                                        ⚡️
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors">{item.brand}</p>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${item.color}`}>{item.status}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-slate-700">{item.amount}</p>
                                                    <p className="text-[10px] text-slate-400">Hạn chót</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Notification Element - Decoration */}
                            <div className="absolute -right-8 top-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce-slow hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Thanh toán</p>
                                        <p className="text-[10px] text-slate-500">Bạn nhận được 2.500.000 VND từ Nike</p>
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

export default Hero;
