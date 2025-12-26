import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile, useUpdateProfile } from '@/lib/queries/useProfile';
import type { Role } from '@/shared/types';
import { ROUTES } from '@/shared/routes';
import { supabase } from '@/lib/supabase/client';

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
                let currentProfile = profile;

                // Tạo profile nếu chưa có
                if (!currentProfile) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        email: user.email,
                    });
                    
                    // Small delay to ensure database write completes
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    // Refetch profile after creation
                    const { data: newProfile } = await refetch();
                    currentProfile = newProfile || null;
                }

                // Gán role từ pendingRole
                if (currentProfile && !currentProfile.role) {
                    const pendingRole = localStorage.getItem('pendingRole') as Role | null;
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        await updateProfileMutation.mutateAsync({ role: pendingRole });
                        localStorage.removeItem('pendingRole');
                        
                        // Refetch to get updated profile
                        const { data: updatedProfile } = await refetch();
                        currentProfile = updatedProfile || currentProfile;
                    }
                }

                // Chưa có role → chọn role
                if (!currentProfile?.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                // Chưa hoàn tất onboarding
                if (currentProfile.onboarding_completed !== true) {
                    navigate(ROUTES.ONBOARDING, { replace: true });
                    return;
                }

                // Đã hoàn tất → redirect to dashboard
                navigate(
                    currentProfile.role === 'creator'
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
