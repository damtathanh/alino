import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import AuthWrapper from '../../features/auth/components/AuthWrapper';
import { ROUTES } from '../../shared/routes';
import type { Role } from '../../shared/types';

import { SignupForm } from '../../features/auth/components/SignupForm';

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { session } = useAuth();
    
    // Nếu có session nhưng email chưa xác nhận → giữ user ở VerifyEmailPending
    useEffect(() => {
        if (session) {
            if (session.user.app_metadata?.provider === 'email' && !session.user.email_confirmed_at) {
                navigate(ROUTES.VERIFY_EMAIL_PENDING, { replace: true, state: { email: session.user.email } });
                return;
            }
            navigate(ROUTES.APP, { replace: true });
        }
    }, [session, navigate]);
    const [subtitle, setSubtitle] = useState('Bắt đầu hành trình Creator chuyên nghiệp cùng Alino');

    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    const role = (roleParam === 'creator' || roleParam === 'brand') ? (roleParam as Role) : null;

    useEffect(() => {
        if (role === 'brand') setSubtitle('Giải pháp Influencer Marketing toàn diện cho doanh nghiệp');
        else if (role === 'creator') setSubtitle('Xây dựng Profile chuyên nghiệp & Gia tăng thu nhập');

        if (role) localStorage.setItem('pendingRole', role);
    }, [role]);

    return <AuthWrapper view="sign_up" title="Đăng ký tài khoản" subtitle={subtitle} customContent={<SignupForm />} />;
};

export default Signup;
