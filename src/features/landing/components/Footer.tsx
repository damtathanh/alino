import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-16">
                    {/* Column 1: Brand (Span 2 columns) */}
                    <div className="col-span-2 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                                    <path d="M2 17L12 22L22 17"></path>
                                    <path d="M2 12L12 17L22 12"></path>
                                </svg>
                            </div>
                            <span className="font-extrabold text-xl text-gray-900 tracking-tight">ALINO</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                            Hệ điều hành tích hợp "All-in-one" dành cho cộng đồng Nhà sáng tạo nội dung tại Việt Nam.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-pink-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                                <FaLinkedinIn className="w-4 h-4" />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                                <FaTiktok className="w-4 h-4" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300">
                                <FaYoutube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Sản phẩm */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Sản phẩm</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#features" className="hover:text-brand transition-colors">Tính năng</a></li>
                            <li><a href="#pricing" className="hover:text-brand transition-colors">Bảng giá</a></li>
                            <li><a href="#creators" className="hover:text-brand transition-colors">Cho Creators</a></li>
                            <li><a href="#brands" className="hover:text-brand transition-colors">Cho Brands</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Tải ứng dụng</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Công ty */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Công ty</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-brand transition-colors">Tuyển dụng</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Đối tác</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Hỗ trợ (Contact) */}
                    <div className="col-span-2 md:col-span-1 min-w-[160px]">
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Liên hệ</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li>
                                <a href="tel:0707970216" className="flex items-center gap-2 hover:text-brand transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <span className="font-medium">0707 970 216</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:contact@alino.net" className="flex items-center gap-2 hover:text-brand transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <span className="font-medium">contact@alino.net</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © 2025 Alino All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-gray-900 transition-colors">Điều khoản</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Bảo mật</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Cookie</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
