import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import { ROUTES } from '@/shared/routes';

const AppLayout = () => {
    const location = useLocation();
    const isLanding = location.pathname === ROUTES.HOME;

    return (
        <div className="min-h-screen bg-gray-50">
            <AppHeader />

            <main className={isLanding ? '' : 'pt-16'}>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
