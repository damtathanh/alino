import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile } from '@/lib/supabase/profile';
import { ROUTES } from '@/shared/routes';
import type { Profile } from '@/shared/types';
import CreatorOnboarding from './CreatorOnboarding';
import BrandOnboarding from './BrandOnboarding';

/**
 * Onboarding Router Component
 * 
 * Responsibilities:
 * - Fetch user profile
 * - Check if user has role
 * - Route to appropriate onboarding form based on role
 * - Show loading state while fetching
 */
const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const loadProfile = async () => {
            try {
                const p = await getProfile(user.id);
                
                // If no role assigned, redirect to role selection
                if (!p?.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                setProfile(p);
            } catch (error) {
                console.error('Error loading profile:', error);
                // On error, redirect to role selection as fallback
                navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user, navigate]);

    // Loading state
    if (!user || loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    // No profile or no role - should not reach here due to useEffect redirect
    if (!profile || !profile.role) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    // Route to appropriate onboarding form
    if (profile.role === 'creator') {
        return <CreatorOnboarding profile={profile} />;
    }

    if (profile.role === 'brand') {
        return <BrandOnboarding profile={profile} />;
    }

    // Fallback (should never reach here)
    return null;
};

export default Onboarding;
