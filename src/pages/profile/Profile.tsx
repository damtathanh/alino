import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile } from '@/lib/supabase/profile';
import type { Profile } from '@/shared/types';

import CreatorProfile from './CreatorProfile';
import BrandProfile from './BrandProfile';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        if (!user) return;
        getProfile(user.id).then(setProfile);
    }, [user]);

    if (!user || !profile) {
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
