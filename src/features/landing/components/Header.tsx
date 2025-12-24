import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/routes';

interface HeaderProps {
    onSignupClick: () => void;
}

const Header = ({ onSignupClick }: HeaderProps) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full pt-4 pb-4">
                    {/* Logo & Brand */}
                    <Link to={ROUTES.HOME} className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                                <path d="M2 17L12 22L22 17"></path>
                                <path d="M2 12L12 17L22 12"></path>
                            </svg>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-brand transition-colors">ALINO</span>
                    </Link>

                    {/* Centered Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        <a href="#about" className="text-[15px] font-medium text-gray-600 hover:text-brand transition-colors relative group py-2">
                            Giới thiệu
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#features" className="text-[15px] font-medium text-gray-600 hover:text-brand transition-colors relative group py-2">
                            Giải pháp
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#careers" className="text-[15px] font-medium text-gray-600 hover:text-brand transition-colors relative group py-2">
                            Tuyển dụng
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#blog" className="text-[15px] font-medium text-gray-600 hover:text-brand transition-colors relative group py-2">
                            Tin tức
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </nav>

                    {/* Right CTA */}
                    <div className="flex items-center gap-4">
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-[15px] font-medium text-gray-600 hover:text-brand transition-colors hidden sm:block"
                        >
                            Đăng nhập
                        </Link>
                        <button
                            onClick={onSignupClick}
                            className="bg-brand hover:bg-brandHover active:bg-brandActive text-white px-5 py-2.5 rounded-full text-[15px] font-semibold shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer ring-offset-2 focus:ring-2 ring-brand inline-block text-center"
                        >
                            Tạo trang miễn phí
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
