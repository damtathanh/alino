import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AppHeader from './AppHeader';
import { ROUTES } from '@/shared/routes';
import RoleSelectModal from '@/features/auth/components/RoleSelectModal';
import type { Role } from '@/shared/types';

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = location.pathname === ROUTES.HOME;

    // ===== MODAL STATE (Ở LAYOUT) =====
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    const openRoleModal = () => setIsRoleModalOpen(true);
    const closeRoleModal = () => setIsRoleModalOpen(false);

    const handleRoleSelect = (role: Role) => {
        closeRoleModal();
        navigate(`${ROUTES.SIGNUP}?role=${role}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header luôn nằm dưới modal */}
            <AppHeader
                onSignupClick={openRoleModal}
                isModalOpen={isRoleModalOpen}
            />

            <main className={isLanding ? '' : 'pt-16'}>
                <Outlet />
            </main>

            {/* ===== MODAL Ở ĐÂY (QUAN TRỌNG) ===== */}
            <RoleSelectModal
                isOpen={isRoleModalOpen}
                onClose={closeRoleModal}
                onSelect={handleRoleSelect}
            />
        </div>
    );
};

export default AppLayout;
