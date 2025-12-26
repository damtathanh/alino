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
            /* 1. Exchange OAuth code → session */
            const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

            if (error) {
                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            /* 2. Get user */
            const { data } = await supabase.auth.getUser();
            const user = data.user;

            if (!user || !user.email) {
                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            /* Helper: find profile by email */
            const getProfileByEmail = async (email: string) => {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', email)
                    .maybeSingle();

                return data;
            };

            /* 3. Google metadata */
            const googleName =
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                null;

            const googleAvatar =
                user.user_metadata?.picture ||
                user.user_metadata?.avatar_url ||
                null;

            /* 4. Check existing profile */
            const profile = await getProfile(user.id);
            const existingProfileByEmail = await getProfileByEmail(user.email);

            /**
             * CASE 1: Email đã tồn tại với profile KHÁC user.id
             * → chặn, logout, ép login đúng cách
             */
            if (
                existingProfileByEmail &&
                existingProfileByEmail.id !== user.id
            ) {
                await supabase.auth.signOut();

                alert(
                    'Email này đã được đăng ký trước đó. ' +
                    'Vui lòng đăng nhập bằng email & mật khẩu.'
                );

                navigate(ROUTES.LOGIN, { replace: true });
                return;
            }

            /**
             * CASE 2: Chưa có profile → tạo mới
             */
            if (!profile) {
                await upsertProfile({
                    id: user.id,
                    email: user.email,
                    full_name: googleName,
                    avatar_url: googleAvatar,
                });

                navigate(ROUTES.APP, { replace: true });
                return;
            }

            /**
             * CASE 3: Có profile → update field còn thiếu
             */
            const patch: Record<string, any> = {};

            if (!profile.full_name && googleName) {
                patch.full_name = googleName;
            }

            if (!profile.avatar_url && googleAvatar) {
                patch.avatar_url = googleAvatar;
            }

            if (Object.keys(patch).length > 0) {
                await updateProfile(user.id, patch);
            }

            /* 5. Giao quyền cho AppGate */
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
