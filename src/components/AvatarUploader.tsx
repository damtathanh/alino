import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import AvatarCropper from '@/components/AvatarCropper';

interface Props {
    userId: string;
    avatarUrl?: string | null;
    onUploaded: (url: string) => void;
}

const AvatarUploader = ({ userId, avatarUrl, onUploaded }: Props) => {
    const [uploading, setUploading] = useState(false);
    const [rawImage, setRawImage] = useState<string | null>(null);

    const uploadAvatar = async (blob: Blob) => {
        setUploading(true);

        const path = `${userId}/avatar.png`;

        const { error } = await supabase.storage
            .from('avatars')
            .upload(path, blob, {
                upsert: true,
                contentType: 'image/png',
            });

        if (error) {
            alert(error.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(path);

        // ✅ cache-busting: LUÔN dùng URL mới
        const freshUrl = `${data.publicUrl}?t=${Date.now()}`;

        onUploaded(freshUrl);
        setUploading(false);
    };

    return (
        <div className="flex items-center gap-4">
            {/* Avatar preview */}
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        className="w-full h-full object-cover"
                        alt="Avatar"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Avatar</span>
                )}
            </div>

            {/* Upload trigger */}
            <label className="text-sm cursor-pointer text-brand font-medium">
                {uploading ? 'Đang tải...' : 'Thay ảnh'}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // mở crop modal
                        setRawImage(URL.createObjectURL(file));
                    }}
                />
            </label>

            {/* Crop modal */}
            {rawImage && (
                <AvatarCropper
                    image={rawImage}
                    onCancel={() => setRawImage(null)}
                    onComplete={async (blob) => {
                        await uploadAvatar(blob);
                        setRawImage(null);
                    }}
                />
            )}
        </div>
    );
};

export default AvatarUploader;
