import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const AuthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { error } = await supabase.auth.exchangeCodeForSession(
                window.location.href
            );

            if (error) {
                console.error('OAuth exchange error:', error.message);
                navigate('/login', { replace: true });
                return;
            }

            navigate('/app', { replace: true });
        })();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
        </div>
    );
};

export default AuthCallbackPage;
