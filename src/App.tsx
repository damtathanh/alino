import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider';
import RequireAuth from '@/features/auth/components/RequireAuth';
import { ROUTES } from '@/shared/routes';

// Public pages
import Landing from '@/pages/Landing';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ResetPassword from '@/pages/auth/ResetPassword';
import UpdatePassword from '@/pages/auth/UpdatePassword';
import AuthCallback from '@/pages/auth/AuthCallback';

// Onboarding
import Onboarding from '@/pages/onboarding/Onboarding';
import RoleSelection from '@/pages/onboarding/RoleSelection';

// App / Dashboard
import AppGate from '@/pages/dashboard/AppGate';
import CreatorDashboard from '@/pages/dashboard/CreatorDashboard';
import BrandDashboard from '@/pages/dashboard/BrandDashboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path={ROUTES.HOME} element={<Landing />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGNUP} element={<Signup />} />
                    <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                    <Route path={ROUTES.UPDATE_PASSWORD} element={<UpdatePassword />} />
                    <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />

                    {/* App Gate */}
                    <Route
                        path={ROUTES.APP}
                        element={
                            <RequireAuth>
                                <AppGate />
                            </RequireAuth>
                        }
                    />

                    {/* Onboarding */}
                    <Route
                        path={ROUTES.ONBOARDING}
                        element={
                            <RequireAuth>
                                <Onboarding />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={ROUTES.ONBOARDING_ROLE}
                        element={
                            <RequireAuth>
                                <RoleSelection />
                            </RequireAuth>
                        }
                    />

                    {/* Dashboards */}
                    <Route
                        path={ROUTES.APP_CREATOR}
                        element={
                            <RequireAuth>
                                <CreatorDashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={ROUTES.APP_BRAND}
                        element={
                            <RequireAuth>
                                <BrandDashboard />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
