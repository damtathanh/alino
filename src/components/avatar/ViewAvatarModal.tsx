import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    open: boolean;
    avatarUrl?: string | null;
    onClose: () => void;
}

const ViewAvatarModal = ({ open, avatarUrl, onClose }: Props) => {
    // ESC to close
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    if (!open || !avatarUrl) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
            onClick={onClose} // click outside
        >
            <div
                onClick={(e) => e.stopPropagation()} // prevent close when click inside
                className="relative bg-white rounded-xl p-4 max-w-[520px] w-full"
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {/* Image */}
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full max-h-[75vh] object-contain rounded-lg"
                />
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default ViewAvatarModal;
