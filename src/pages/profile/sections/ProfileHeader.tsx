import { useEffect, useRef, useState } from 'react';
import AvatarUploader from '@/components/AvatarUploader';
import ViewAvatarModal from '@/components/avatar/ViewAvatarModal';

interface Props {
    userId: string;
    avatarUrl?: string | null;
    name: string;
    subtitle?: string;
    onAvatarChange: (url: string) => void;
}

const ProfileHeader = ({
    userId,
    avatarUrl,
    name,
    subtitle,
    onAvatarChange,
}: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close menu when click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-6">
            {/* AVATAR + MENU */}
            <div ref={wrapperRef} className="relative">

                {/* AVATAR */}
                <div
                    className="
            relative w-24 h-24 rounded-full overflow-hidden
            cursor-pointer group
          "
                    onClick={() => setMenuOpen(v => !v)}
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                            {name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* POPOVER MENU */}
                {menuOpen && (
                    <div
                        className="
              absolute top-full mt-3 left-1/2 -translate-x-1/2
              w-72 bg-white rounded-xl shadow-xl border z-50
            "
                    >
                        {/* VIEW AVATAR */}
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                setViewOpen(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                        >
                            <img src="/Image/user.png" className="w-5 h-5" />
                            <span>Xem ảnh đại diện</span>
                        </button>

                        {/* CHANGE AVATAR */}
                        <AvatarUploader
                            userId={userId}
                            onUploaded={(url) => {
                                onAvatarChange(url);
                                setMenuOpen(false);
                            }}
                        >
                            <div className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                <img src="/Image/image.png" className="w-5 h-5" />
                                <span>Thay ảnh đại diện</span>
                            </div>
                        </AvatarUploader>
                    </div>
                )}
            </div>

            {/* TEXT */}
            <div>
                <h1 className="text-2xl font-bold text-primary">
                    {name || 'Chưa đặt tên'}
                </h1>
                {subtitle && (
                    <p className="text-sm text-secondary mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* VIEW AVATAR MODAL */}
            <ViewAvatarModal
                open={viewOpen}
                avatarUrl={avatarUrl}
                onClose={() => setViewOpen(false)}
            />
        </div>
    );
};

export default ProfileHeader;
