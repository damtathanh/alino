import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { ROUTES } from '../../shared/routes';
import RoleSelectModal from '../../features/auth/components/RoleSelectModal';
import type { Role } from '../../shared/types';
import { updateProfile } from '../../lib/supabase/profile';

const RoleSelection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSelect = async (role: Role) => {
        if (!user) return;
        setLoading(true);

        try {
            await updateProfile(user.id, { role });
            navigate(ROUTES.APP, { replace: true });
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
            isOpen={true}
            onClose={() => { }} // Block closing
            onSelect={handleSelect}
        />
    );
};

export default RoleSelection;
