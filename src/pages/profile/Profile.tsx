import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile } from '@/lib/queries/useProfile';

import CreatorProfile from './CreatorProfile';
import BrandProfile from './BrandProfile';

const ProfilePage = () => {
    const { user } = useAuth();
    const { data: profile, isLoading, error } = useProfile(user?.id);

    if (!user || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-brand rounded-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Không thể tải thông tin profile</p>
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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-brand rounded-full" />
            </div>
        );
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
