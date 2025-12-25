import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { ROUTES } from '../../shared/routes';
import {
    getProfile,
    upsertProfile,
    updateProfile,
} from '../../lib/supabase/profile';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            // 1. Exchange OAuth code → session
            const { error } =
                await supabase.auth.exchangeCodeForSession(
                    window.location.href
                );

            if (error) {
                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            // 2. Get user
            const { data } = await supabase.auth.getUser();
            const user = data.user;

            if (!user) {
                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            // 3. Lấy dữ liệu từ Google
            const googleName =
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                null;

            const googleAvatar =
                user.user_metadata?.picture ||
                user.user_metadata?.avatar_url ||
                null;

            // 4. Sync sang profiles
            const profile = await getProfile(user.id);

            if (!profile) {
                // ✅ User mới hoàn toàn
                await upsertProfile({
                    id: user.id,
                    email: user.email,
                    full_name: googleName,
                    avatar_url: googleAvatar,
                });
            } else {
                // ✅ User cũ → chỉ fill nếu còn trống
                const patch: any = {};

                if (!profile.full_name && googleName) {
                    patch.full_name = googleName;
                }

                if (!profile.avatar_url && googleAvatar) {
                    patch.avatar_url = googleAvatar;
                }

                if (Object.keys(patch).length > 0) {
                    await updateProfile(user.id, patch);
                }
            }

            // 5. Giao quyền quyết định cho AppGate
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
