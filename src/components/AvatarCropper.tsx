import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';

interface Props {
    image: string;
    onCancel: () => void;
    onComplete: (blob: Blob) => void;
}

const AvatarCropper = ({ image, onCancel, onComplete }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = useCallback((_: any, croppedPixels: any) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
        });

    const getCroppedImg = async () => {
        const imageEl = await createImage(image);
        const canvas = document.createElement('canvas');
        const size = 256;

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(
            imageEl,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            size,
            size
        );

        return new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
            }, 'image/png');
        });
    };

    const handleSave = async () => {
        const blob = await getCroppedImg();
        if (blob) onComplete(blob);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-[320px]">
                <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>

                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full mt-4"
                />

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-lg border"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold"
                    >
                        Lưu ảnh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarCropper;
