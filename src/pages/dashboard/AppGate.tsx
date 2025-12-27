import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile, useUpdateProfile } from '@/lib/queries/useProfile';
import type { Role } from '@/shared/types';
import { ROUTES } from '@/shared/routes';
import { supabase } from '@/lib/supabase/client';

const AppGate = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    const { data: profile, isLoading, refetch } = useProfile(user?.id);
    const updateProfileMutation = useUpdateProfile(user?.id || '');

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            if (authLoading) return;

            if (!user) {
                setChecking(false);
                return;
            }

            if (isLoading) return;

            try {
                // 1. Email/password chưa verify
                if (
                    user.app_metadata?.provider === 'email' &&
                    !user.email_confirmed_at
                ) {
                    navigate(ROUTES.VERIFY_EMAIL_PENDING, {
                        replace: true,
                        state: {
                            email: user.email,
                            source: 'login',
                        },
                    });
                    return;
                }

                let currentProfile = profile ?? null;

                // 2. Ensure profile exists
                if (!currentProfile) {
                    const { error } = await supabase
                        .from('profiles')
                        .upsert(
                            { id: user.id, email: user.email },
                            { onConflict: 'id' }
                        );

                    if (error) throw error;

                    const { data } = await refetch();
                    currentProfile = data ?? null;
                }

                if (!currentProfile) {
                    // defensive guard – tránh TS + logic lỗi
                    setChecking(false);
                    return;
                }

                // 3. Apply pendingRole (Google signup / pre-select)
                if (!currentProfile.role) {
                    const pendingRole = localStorage.getItem(
                        'pendingRole'
                    ) as Role | null;

                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        await updateProfileMutation.mutateAsync({
                            role: pendingRole,
                        });

                        localStorage.removeItem('pendingRole');

                        currentProfile = {
                            ...currentProfile,
                            role: pendingRole,
                        };
                    }
                }

                // 4. Routing quyết định
                if (!currentProfile.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                if (currentProfile.onboarding_completed !== true) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                // 5. Done → dashboard
                navigate(
                    currentProfile.role === 'creator'
                        ? ROUTES.APP_CREATOR
                        : ROUTES.APP_BRAND,
                    { replace: true }
                );
            } catch (err) {
                console.error('[AppGate Error]', err);
                navigate(ROUTES.ONBOARDING, { replace: true });
            } finally {
                if (!cancelled) setChecking(false);
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, [user, authLoading, isLoading, profile, refetch, updateProfileMutation, navigate]);

    if (authLoading || checking || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    return null;
};

export default AppGate;
