import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { ROUTES } from '../../shared/routes';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const { error } = await supabase.auth.exchangeCodeForSession(
                window.location.href
            );

            if (error) {
                console.error('OAuth exchange error:', error.message);
                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            // Always go to AppGate for routing decision
            navigate(ROUTES.APP, { replace: true });
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
        </div>
    );
};

export default AuthCallback;
