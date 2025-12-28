import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile } from '@/lib/supabase/profile';
import { supabase } from '@/lib/supabase/client';
import { ROUTES } from '@/shared/routes';
import AppLogo from '@/shared/components/AppLogo';
import LandingNav from './LandingNav';

type AppHeaderProps = {
    onSignupClick?: () => void;
    isModalOpen?: boolean;
};

const AppHeader = ({ onSignupClick, isModalOpen }: AppHeaderProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isMarketingPage =
        !location.pathname.startsWith('/app') &&
        !location.pathname.startsWith('/onboarding') &&
        !location.pathname.startsWith('/settings') &&
        !location.pathname.startsWith('/profile');

    const isOnboarding = location.pathname.startsWith('/onboarding');

    const [displayName, setDisplayName] = useState('User');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;

        getProfile(user.id).then((profile) => {
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
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setMenuOpen(false);
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
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-16 border-b border-border
        ${isModalOpen ? 'bg-white' : 'bg-white/95 backdrop-blur'}
        `}
        >
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-10">
                    <AppLogo />

                    {/* 👉 Navigation chỉ hiện ở Marketing & chưa login */}
                    {isMarketingPage && <LandingNav />}
                </div>

                {/* RIGHT */}
                {user ? (
                    <div ref={ref} className="relative">
                        <button
                            onClick={() => setMenuOpen(v => !v)}
                            className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-bgAlt transition"
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
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
                            className={`absolute right-0 mt-2 w-52 bg-white border border-border
                        rounded-xl shadow-card overflow-hidden transition
                        ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                        `}
                        >
                            <button
                                disabled={isOnboarding}
                                onClick={() => navigate(ROUTES.APP)}
                                className="w-full px-4 py-2.5 text-sm text-left hover:bg-bgAlt disabled:text-gray-400"
                            >
                                Quản lý dự án
                            </button>

                            <button
                                disabled={isOnboarding}
                                onClick={() => navigate(ROUTES.PROFILE)}
                                className="w-full px-4 py-2.5 text-sm text-left hover:bg-bgAlt disabled:text-gray-400"
                            >
                                Trang cá nhân
                            </button>

                            <button
                                disabled={isOnboarding}
                                onClick={() => navigate(ROUTES.SETTINGS)}
                                className="w-full px-4 py-2.5 text-sm text-left hover:bg-bgAlt disabled:text-gray-400"
                            >
                                Cài đặt
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
                ) : (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className="text-sm font-medium text-secondary hover:text-primary"
                        >
                            Đăng nhập
                        </button>

                        <button
                            onClick={onSignupClick}
                            className="bg-brand hover:bg-brandHover text-white px-4 py-2 rounded-full text-sm font-semibold"
                        >
                            Tạo trang miễn phí
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default AppHeader;
