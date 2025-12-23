import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { supabase } from '../../lib/supabaseClient';

const AppGate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            if (!user) {
                setChecking(false);
                return;
            }

            try {
                let { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .maybeSingle();

                if (!profile) {
                    const { data: newProfile, error: upsertError } = await supabase
                        .from('profiles')
                        .upsert({ id: user.id, email: user.email }, { onConflict: 'id' })
                        .select('role')
                        .single();

                    if (upsertError) throw upsertError;
                    profile = newProfile;
                }

                if (!profile.role) {
                    const pendingRole = localStorage.getItem('pendingRole');
                    if (pendingRole === 'creator' || pendingRole === 'brand') {
                        const { error: updateError } = await supabase
                            .from('profiles')
                            .update({ role: pendingRole })
                            .eq('id', user.id);

                        if (!updateError) {
                            profile.role = pendingRole;
                            localStorage.removeItem('pendingRole');
                        }
                    }
                }

                if (profile.role === 'creator') navigate('/app/creator', { replace: true });
                else if (profile.role === 'brand') navigate('/app/brand', { replace: true });
                else navigate('/onboarding/role', { replace: true });
            } catch (err) {
                console.error('Error checking role:', err);
                navigate('/onboarding/role', { replace: true });
            } finally {
                setChecking(false);
            }
        };

        checkRole();
    }, [user, navigate]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
        );
    }

    return null;
};

export default AppGate;
