import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { getProfile, upsertProfile, updateProfile } from '../../lib/supabase/profile';
import { isProfileComplete } from '../../lib/profileCompleteness';
import type { Role } from '../../shared/types';
import { ROUTES } from '../../shared/routes';

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
                // 1) Fetch profile
                let profile = await getProfile(user.id);

                // 2) If not exists, create minimal
                if (!profile) {
                    profile = await upsertProfile({ id: user.id, email: user.email });
                }

                // 3) Check pending role from localStorage (from OAuth flow)
                // Only if profile exists but role is null
                if (profile && !profile.role) {
                    const pendingRole = localStorage.getItem('pendingRole') as Role | null;
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        profile = await updateProfile(user.id, { role: pendingRole });
                        localStorage.removeItem('pendingRole');
                    }
                }

                // 4) Gate Role
                if (!profile.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                // 5) Gate Onboarding Completion
                if (!isProfileComplete(profile)) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                // 6) Route to Home
                if (profile.role === 'creator') {
                    navigate(ROUTES.APP_CREATOR, { replace: true });
                } else {
                    navigate(ROUTES.APP_BRAND, { replace: true });
                }

            } catch (e) {
                console.error('AppGate error:', e);
                // Fallback to onboarding if something is critically wrong but user is auth
                navigate(ROUTES.ONBOARDING, { replace: true });
            } finally {
                setChecking(false);
            }
        };

        run();
    }, [user, navigate]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
        );
    }

    return null;
};

export default AppGate;
