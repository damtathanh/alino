import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './components/RequireAuth';

// Pages
import LandingPage from './landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage';
import RoleOnboardingPage from './pages/onboarding/RoleOnboardingPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import AppGate from './pages/app/AppGate';
import CreatorHome from './pages/app/CreatorHome';
import BrandHome from './pages/app/BrandHome';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />
                    <Route path="/auth/callback" element={<AuthCallbackPage />} />

                    {/* Private Routes */}
                    <Route
                        path="/app"
                        element={
                            <RequireAuth>
                                <AppGate />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/onboarding/role"
                        element={
                            <RequireAuth>
                                <RoleOnboardingPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/app/creator"
                        element={
                            <RequireAuth>
                                <CreatorHome />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/app/brand"
                        element={
                            <RequireAuth>
                                <BrandHome />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
