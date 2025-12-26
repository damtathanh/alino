import { useEffect } from 'react';

const Toast = ({
    message,
    onClose,
}: {
    message: string;
    onClose: () => void;
}) => {
    useEffect(() => {
        const t = setTimeout(onClose, 2600);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className="fixed top-6 right-6 z-[9999]">
            <div
                className="
                    flex items-center gap-4
                    px-5 py-4
                    rounded-2xl
                    shadow-xl
                    border
                    bg-green-50
                    border-green-200
                    text-green-800
                    animate-toast-in
                "
            >
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-lg">
                    ✓
                </div>

                {/* Text */}
                <span className="text-base font-semibold">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Toast;
