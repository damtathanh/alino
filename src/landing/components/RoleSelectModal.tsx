import { useRef, useEffect } from "react";

interface RoleSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (role: 'creator' | 'brand') => void;
}

const RoleSelectModal = ({ isOpen, onClose, onSelect }: RoleSelectModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

            {/* Modal Card */}
            <div
                ref={modalRef}
                className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden animate-fade-in-up"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Bạn muốn bắt đầu với vai trò gì?</h2>
                    <p className="text-gray-500 mb-10 max-w-lg mx-auto">Chọn vai trò phù hợp nhất để chúng tôi tối ưu trải nghiệm cho bạn.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Creator Option */}
                        <button
                            onClick={() => onSelect('creator')}
                            className="group relative flex flex-col items-center p-8 rounded-2xl border-2 border-gray-100 hover:border-brand bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-20 h-20 rounded-full bg-indigo-100 text-brand flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                🎨
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nhà sáng tạo nội dung</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                Tạo hồ sơ chuyên nghiệp, quản lý booking, hợp đồng và nhận thanh toán.
                            </p>
                            <span className="mt-auto inline-flex items-center text-brand font-bold group-hover:gap-2 transition-all">
                                Chọn Creator <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">&rarr;</span>
                            </span>
                        </button>

                        {/* Brand Option */}
                        <button
                            onClick={() => onSelect('brand')}
                            className="group relative flex flex-col items-center p-8 rounded-2xl border-2 border-gray-100 hover:border-purple-500 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                🏢
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nhãn hàng / Agency</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                Tìm kiếm Influencer, quản lý chiến dịch và thanh toán tập trung.
                            </p>
                            <span className="mt-auto inline-flex items-center text-purple-600 font-bold group-hover:gap-2 transition-all">
                                Chọn Brand <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">&rarr;</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectModal;
