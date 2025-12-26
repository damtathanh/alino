import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile } from '@/lib/queries/useProfile';
import { ROUTES } from '@/shared/routes';
import CreatorOnboarding from './CreatorOnboarding';
import BrandOnboarding from './BrandOnboarding';

/**
 * Onboarding Router Component
 * 
 * Responsibilities:
 * - Fetch user profile using React Query
 * - Check if user has role
 * - Route to appropriate onboarding form based on role
 * - Show loading/error states
 */
const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const { data: profile, isLoading, error } = useProfile(user?.id);

    // Redirect to role selection if no role
    useEffect(() => {
        if (!isLoading && profile && !profile.role) {
            navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
        }
    }, [profile, isLoading, navigate]);

    // Loading state
    if (!user || isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    // Error state
    if (error) {
        console.error('Error loading profile:', error);
        navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
        return null;
    }

    // No profile or no role
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

    // Fallback
    return null;
};

export default Onboarding;
