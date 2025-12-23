import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import RoleSelectModal from '../../landing/components/RoleSelectModal';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    const handleSignupClick = () => {
        setIsRoleModalOpen(true);
    };

    const handleRoleSelect = (role: 'creator' | 'brand') => {
        setIsRoleModalOpen(false);
        navigate(`/signup?role=${role}`);
    };

    return (
        <>
            <AuthPage
                view="sign_in"
                title="Đăng nhập Alino"
                subtitle="Quản lý công việc Creator chuyên nghiệp"
                onSignupClick={handleSignupClick}
            />

            {/* Role Selection Modal */}
            <RoleSelectModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onSelect={handleRoleSelect}
            />
        </>
    );
};

export default LoginPage;
