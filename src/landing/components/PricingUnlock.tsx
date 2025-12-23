import { useState } from 'react';

const PricingUnlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-24 bg-white" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Bảng giá minh bạch</h2>
                    <p className="text-lg text-secondary">
                        Chọn gói phù hợp với nhu cầu phát triển của bạn.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
                    {/* Plan 1: Content Creator (Visible) */}
                    <div className="border border-border rounded-2xl p-8 bg-white shadow-sm hover:shadow-lg transition-shadow relative z-10 flex flex-col">
                        <div className="mb-6">
                            <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Phổ biến nhất
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-2">Content Creator</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-primary">0đ</span>
                            <span className="text-secondary font-medium">/ trọn đời</span>
                        </div>
                        <p className="text-secondary mb-8 text-sm leading-relaxed">
                            Dành cho cá nhân muốn xây dựng hồ sơ chuyên nghiệp và quản lý công việc hiệu quả.
                        </p>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Tạo Profile & Hồ sơ chuyên nghiệp",
                                "Quản lý Booking & Hợp đồng",
                                "Đăng bài viết & Blog cá nhân",
                                "Nhận thanh toán qua QR Code",
                                "Kho template hợp đồng mẫu"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-4 bg-brand hover:bg-brandHover text-white rounded-xl font-bold shadow-lg shadow-brand/20 transition-all transform hover:-translate-y-0.5">
                            Tạo trang Alino miễn phí
                        </button>
                    </div>

                    {/* Plan 2: Brand / Agency (Blurred Content) */}
                    <div className="border border-border rounded-2xl p-8 bg-gray-50 relative overflow-hidden flex flex-col">

                        {/* The Actual Content (Blurred) */}
                        <div className="filter blur-sm select-none opacity-50 flex flex-col h-full pointer-events-none">
                            <div className="mb-6 h-6"></div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Brand & Agency</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-extrabold text-gray-900">$$$</span>
                                <span className="text-gray-500 font-medium">/ tháng</span>
                            </div>
                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                                Giải pháp toàn diện cho doanh nghiệp quản lý chiến dịch Influencer Marketing quy mô lớn.
                            </p>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Tìm kiếm & Booking Creator không giới hạn",
                                    "Hệ thống báo cáo & Analytics chuyên sâu",
                                    "Quản lý thanh toán tập trung",
                                    "API Integration & Export dữ liệu",
                                    "Support 1:1 từ Alino Team"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        <span className="text-sm text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-gray-300 text-gray-500 rounded-xl font-bold cursor-not-allowed">
                                Liên hệ tư vấn
                            </button>
                        </div>

                        {/* Overlay Content (Clear) */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-[2px]">
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs w-full text-center">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Dành cho Brand / Agency?</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Để xem bảng giá chi tiết cho doanh nghiệp, vui lòng để lại thông tin.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full py-3 bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl font-bold transition-all"
                                >
                                    Xem chi tiết bảng giá
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        ></div>
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-lg text-gray-900">Nhận báo giá Enterprise</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm."); setIsModalOpen(false); }}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email doanh nghiệp</label>
                                        <input type="email" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="name@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên Brand / Agency</label>
                                        <input type="text" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="VD: Alino Media" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                        <input type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="090..." />
                                    </div>
                                    <button className="w-full py-3 bg-brand hover:bg-brandHover text-white rounded-lg font-bold shadow-lg mt-2">
                                        Gửi yêu cầu
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PricingUnlock;
