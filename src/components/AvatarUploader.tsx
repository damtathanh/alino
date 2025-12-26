import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import AvatarModal from '@/components/avatar/AvatarModal';

interface Props {
    userId: string;
    onUploaded: (url: string) => void;
    children: React.ReactNode;
    // When true, this component will not render the internal crop modal
    // and will delegate image selection upward.
    disableModal?: boolean;
    onRawImageSelected?: (imageUrl: string) => void;
}

const AvatarUploader = ({ userId, onUploaded, children, disableModal, onRawImageSelected }: Props) => {
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

        const freshUrl = `${data.publicUrl}?t=${Date.now()}`;
        onUploaded(freshUrl);
        setUploading(false);
    };

    return (
        <>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={uploading}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = URL.createObjectURL(file);
                        if (disableModal && onRawImageSelected) {
                            onRawImageSelected(url);
                            return;
                        }
                        setRawImage(url);
                    }}
                />

                {children}
            </label>

            {!disableModal && rawImage && (
                <AvatarModal
                    open={true}
                    mode="crop"
                    imageToCrop={rawImage}
                    onClose={() => {
                        if (!uploading) setRawImage(null);
                    }}
                    onCropComplete={async (blob) => {
                        await uploadAvatar(blob);
                        // Only close after successful upload
                        setRawImage(null);
                    }}
                />
            )}

        </>
    );
};

export default AvatarUploader;
