import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile, useUpdateProfile } from '@/lib/queries/useProfile';
import type { Role } from '@/shared/types';
import { ROUTES } from '@/shared/routes';
import { supabase } from '@/lib/supabase/client';
import { handleError } from '@/lib/errors/errorHandler';
import { AppError, ErrorCode } from '@/lib/errors/AppError';

const AppGate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);
    
    const { data: profile, isLoading, refetch } = useProfile(user?.id);
    const updateProfileMutation = useUpdateProfile(user?.id || '');

    useEffect(() => {
        const run = async () => {
            if (!user) {
                setChecking(false);
                return;
            }

            // Wait for profile query to complete
            if (isLoading) return;

            try {
                // ROOT FIX 3: LUÔN refetch để đảm bảo data fresh
                const { data: freshProfile } = await refetch();
                let currentProfile = freshProfile || profile;

                // Tạo profile nếu chưa có
                if (!currentProfile) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        email: user.email,
                    });
                    
                    // ROOT FIX 3: Refetch NGAY sau khi create
                    await new Promise(resolve => setTimeout(resolve, 150));
                    const { data: newProfile } = await refetch();
                    currentProfile = newProfile || null;
                }

                // Gán role từ pendingRole
                if (currentProfile && !currentProfile.role) {
                    const pendingRole = localStorage.getItem('pendingRole') as Role | null;
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        await updateProfileMutation.mutateAsync({ role: pendingRole });
                        localStorage.removeItem('pendingRole');
                        
                        // ROOT FIX 3: Refetch NGAY sau khi update role
                        await new Promise(resolve => setTimeout(resolve, 150));
                        const { data: updatedProfile } = await refetch();
                        currentProfile = updatedProfile || currentProfile;
                    }
                }

                // ROOT FIX 4: Dùng onboarding_completed từ server (KHÔNG infer)
                const hasRole = !!currentProfile?.role;
                const onboardingComplete = currentProfile?.onboarding_completed === true;

                // Chưa có role → chọn role
                if (!hasRole) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                // Chưa hoàn tất onboarding
                if (!onboardingComplete) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                // Đã hoàn tất → redirect to dashboard
                if (currentProfile) {
                    navigate(
                        currentProfile.role === 'creator'
                            ? ROUTES.APP_CREATOR
                            : ROUTES.APP_BRAND,
                        { replace: true }
                    );
                }
            } catch (err) {
                const appError = new AppError(
                    'Failed to process app gate',
                    ErrorCode.DATA_FETCH_FAILED,
                    undefined,
                    err instanceof Error ? err : undefined
                );
                console.error('[AppGate Error]', handleError(appError));
                navigate(ROUTES.ONBOARDING, { replace: true });
            } finally {
                setChecking(false);
            }
        };

        run();
    }, [user, profile, isLoading, navigate, refetch, updateProfileMutation]);

    if (checking || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    return null;
};

export default AppGate;
