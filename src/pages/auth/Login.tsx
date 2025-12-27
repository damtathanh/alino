import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import AuthWrapper from '../../features/auth/components/AuthWrapper';
import RoleSelectModal from '../../features/auth/components/RoleSelectModal';
import { ROUTES } from '../../shared/routes';
import type { Role } from '../../shared/types';

const Login = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const navigate = useNavigate();
    const { session } = useAuth();

    // Nếu có session nhưng email chưa xác nhận → chuyển sang VerifyEmailPending
    useEffect(() => {
        if (session) {
            if (session.user.app_metadata?.provider === 'email' && !session.user.email_confirmed_at) {
                navigate(ROUTES.VERIFY_EMAIL_PENDING, { replace: true, state: { email: session.user.email } });
                return;
            }
            navigate(ROUTES.APP, { replace: true });
        }
    }, [session, navigate]);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    const handleSignupClick = () => {
        setIsRoleModalOpen(true);
    };

    const handleRoleSelect = (role: Role) => {
        setIsRoleModalOpen(false);
        navigate(`${ROUTES.SIGNUP}?role=${role}`);
    };

    return (
        <>
            <AuthWrapper
                view="sign_in"
                title="Đăng nhập Alino"
                subtitle="Quản lý công việc Creator chuyên nghiệp"
                onSignupClick={handleSignupClick}
            />

            <RoleSelectModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onSelect={handleRoleSelect}
            />
        </>
    );
};

export default Login;
