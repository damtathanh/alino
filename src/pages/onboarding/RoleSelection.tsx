import { useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { ROUTES } from '../../shared/routes';
import RoleSelectModal from '../../features/auth/components/RoleSelectModal';
import type { Role } from '../../shared/types';
import { updateProfile } from '../../lib/supabase/profile';

const RoleSelection = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [open] = useState(true);

    const handleSelect = async (role: Role) => {
        if (!user) return;
        setLoading(true);

        try {
            await updateProfile(user.id, { role });
            window.location.href = ROUTES.APP;

        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <RoleSelectModal
            isOpen={open}
            onClose={() => { }}
            onSelect={handleSelect}
        />
    );
};

export default RoleSelection;
