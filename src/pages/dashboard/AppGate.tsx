import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { getProfile, updateProfile } from '../../lib/supabase/profile';
import { isProfileComplete } from '../../lib/profileCompleteness';
import type { Role } from '../../shared/types';
import { ROUTES } from '../../shared/routes';
import { supabase } from '../../lib/supabase/client';

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

                if (!profile) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        email: user.email,
                    });

                    profile = await getProfile(user.id);
                }

                if (profile && !profile.role) {
                    const pendingRole = localStorage.getItem('pendingRole') as Role | null;
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        profile = await updateProfile(user.id, { role: pendingRole });
                        localStorage.removeItem('pendingRole');
                    }
                }

                if (!profile || !profile.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                if (!isProfileComplete(profile)) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                navigate(profile.role === 'creator' ? ROUTES.APP_CREATOR : ROUTES.APP_BRAND, { replace: true });
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
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
        );
    }

    return null;
};

export default AppGate;
