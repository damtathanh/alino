import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import AvatarCropper from '@/components/AvatarCropper';

type Mode = 'view' | 'crop';

interface Props {
    open: boolean;
    mode: Mode;
    avatarUrl?: string | null;
    imageToCrop?: string | null;
    onClose: () => void;
    onCropComplete: (blob: Blob) => void;
}

const AvatarModal = ({
    open,
    mode,
    avatarUrl,
    imageToCrop,
    onClose,
    onCropComplete,
}: Props) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 w-full max-w-[600px]"
            >
                {/* VIEW MODE */}
                {mode === 'view' && avatarUrl && (
                    <img
                        src={avatarUrl}
                        className="w-full max-h-[75vh] object-contain rounded-xl"
                    />
                )}

                {/* CROP MODE */}
                {mode === 'crop' && imageToCrop && (
                    <AvatarCropper
                        image={imageToCrop}
                        onCancel={onClose}
                        onComplete={onCropComplete}
                    />
                )}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default AvatarModal;
