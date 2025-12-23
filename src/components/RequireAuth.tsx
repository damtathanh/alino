import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { session, loading } = useAuth();
    const location = useLocation();

    // Trong lúc AuthProvider đang sync session (hoặc vừa login callback),
    // đừng redirect vội.
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
