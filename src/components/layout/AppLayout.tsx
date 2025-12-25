import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <AppHeader />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
