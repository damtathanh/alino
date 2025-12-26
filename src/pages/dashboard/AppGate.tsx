import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile, updateProfile } from '@/lib/supabase/profile';
import type { Role } from '@/shared/types';
import { ROUTES } from '@/shared/routes';
import { supabase } from '@/lib/supabase/client';

const AppGate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const run = async () => {
            if (!user) {
                setChecking(false);
                return;
            }

            try {
                let profile = await getProfile(user.id);

                // Tạo profile nếu chưa có
                if (!profile) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        email: user.email,
                    });
                    profile = await getProfile(user.id);
                }

                // Gán role từ pendingRole
                if (profile && !profile.role) {
                    const pendingRole = localStorage.getItem('pendingRole') as Role | null;
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        profile = await updateProfile(user.id, { role: pendingRole });
                        localStorage.removeItem('pendingRole');
                    }
                }

                // Chưa có role → chọn role
                if (!profile?.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                // ❗ ĐIỀU KIỆN ONBOARDING CHUẨN, KHÔNG DÙNG isProfileComplete
                if (profile.onboarding_completed !== true) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                // Đã hoàn tất
                navigate(
                    profile.role === 'creator'
                        ? ROUTES.APP_CREATOR
                        : ROUTES.APP_BRAND,
                    { replace: true }
                );
            } catch (e) {
                console.error('AppGate error:', e);
                navigate(ROUTES.ONBOARDING, { replace: true });
            } finally {
                setChecking(false);
            }
        };

        run();
    }, [user, navigate]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    return null;
};

export default AppGate;
