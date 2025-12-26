import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile } from '@/lib/queries/useProfile';
import { SkeletonProfile } from '@/components/ui/Skeleton';
import { handleError } from '@/lib/errors/errorHandler';

import CreatorProfile from './CreatorProfile';
import BrandProfile from './BrandProfile';

const ProfilePage = () => {
    const { user } = useAuth();
    const { data: profile, isLoading, error } = useProfile(user?.id);

    if (!user || isLoading) {
        return <SkeletonProfile />;
    }

    if (error) {
        const errorMessage = handleError(error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        Tải lại
                    </button>
                </div>
            </div>
        );
    }

    if (!profile) {
        return <SkeletonProfile />;
    }

    if (profile.role === 'creator') {
        return <CreatorProfile profile={profile} />;
    }

    if (profile.role === 'brand') {
        return <BrandProfile profile={profile} />;
    }

    return null;
};

export default ProfilePage;
