import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../features/auth/components/AuthWrapper';
import { useAuth } from '../../app/providers/AuthProvider';
import { upsertProfile } from '../../lib/supabase/profile';
import { ROUTES } from '../../shared/routes';
import type { Role } from '../../shared/types';

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { session } = useAuth(); // We just need to check if user is logged in
    const [subtitle, setSubtitle] = useState("Bắt đầu hành trình Creator chuyên nghiệp cùng Alino");

    // Parse role
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    const role = (roleParam === 'creator' || roleParam === 'brand') ? (roleParam as Role) : null;

    useEffect(() => {
        // Dynamically set subtitle
        if (role === 'brand') {
            setSubtitle("Giải pháp Influencer Marketing toàn diện cho doanh nghiệp");
        } else if (role === 'creator') {
            setSubtitle("Xây dựng Profile chuyên nghiệp & Gia tăng thu nhập");
        }

        // Store pending role for OAuth
        if (role) {
            localStorage.setItem('pendingRole', role);
        }
    }, [role]);

    // Handle immediate update if session becomes available (Email/Password signup success)
    useEffect(() => {
        const handlePostSignup = async () => {
            if (session?.user) {
                if (role) {
                    try {
                        await upsertProfile({ id: session.user.id, email: session.user.email, role });
                        localStorage.removeItem('pendingRole');
                    } catch (err) {
                        console.error('Error setting initial role:', err);
                    }
                }
                // Always go to AppGate for routing
                navigate(ROUTES.APP, { replace: true });
            }
        };

        handlePostSignup();
    }, [session, role, navigate]);

    return (
        <AuthWrapper
            view="sign_up"
            title="Đăng ký tài khoản"
            subtitle={subtitle}
        />
    );
};

export default Signup;
