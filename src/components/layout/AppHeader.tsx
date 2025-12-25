import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile } from '@/lib/supabase/profile';
import { supabase } from '@/lib/supabase/client';
import { ROUTES } from '@/shared/routes';
import AppLogo from '@/shared/components/AppLogo';

const AppHeader = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [displayName, setDisplayName] = useState('User');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const isBrand = location.pathname.startsWith('/app/brand');
    const isCreator = location.pathname.startsWith('/app/creator');

    useEffect(() => {
        if (!user) return;
        getProfile(user.id).then(profile => {
            setDisplayName(
                profile?.full_name ||
                profile?.company_name ||
                'User'
            );
            setAvatarUrl(profile?.avatar_url ?? null);
        });
    }, [user]);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        navigate(ROUTES.HOME, { replace: true });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur border-b border-border">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                {/* LOGO */}
                <AppLogo
                    subtitle={
                        isBrand ? 'For Brands' :
                            isCreator ? 'For Creators' :
                                undefined
                    }
                />

                {/* USER MENU */}
                {user && (
                    <div ref={dropdownRef} className="relative group">
                        <button
                            onClick={() => setOpen(v => !v)}
                            className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-bgAlt transition"
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="hidden sm:block text-sm font-medium text-primary max-w-[140px] truncate">
                                {displayName}
                            </span>
                        </button>

                        {/* DROPDOWN */}
                        <div
                            className={`
                                absolute right-0 mt-2 w-52 bg-white border border-border
                                rounded-xl shadow-card overflow-hidden
                                transition-all duration-150
                                ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                group-hover:opacity-100 group-hover:visible
                            `}
                        >
                            <button
                                onClick={() => navigate(ROUTES.APP)}
                                className="w-full px-4 py-2.5 text-sm text-primary hover:bg-bgAlt text-left"
                            >
                                Quản lý dự án
                            </button>

                            <button
                                onClick={() => navigate(ROUTES.PROFILE)}
                                className="w-full px-4 py-2.5 text-sm text-primary hover:bg-bgAlt text-left"
                            >
                                Hồ sơ
                            </button>

                            <div className="border-t border-border my-1" />

                            <button
                                onClick={logout}
                                className="w-full px-4 py-2.5 text-sm text-error hover:bg-red-50 text-left"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default AppHeader;
