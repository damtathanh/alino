import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider';
import RequireAuth from '@/features/auth/components/RequireAuth';
import { ROUTES } from '@/shared/routes';
import AppLayout from '@/components/layout/AppLayout';

// Public pages
import Landing from '@/pages/Landing';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ResetPassword from '@/pages/auth/ResetPassword';
import UpdatePassword from '@/pages/auth/UpdatePassword';
import AuthCallback from '@/pages/auth/AuthCallback';
import VerifyEmailPending from '@/pages/auth/VerifyEmailPending';

// About pages
import AboutUs from "@/pages/about/AboutUs";
import AboutAlino from "@/pages/about/AboutAlino";
import Partners from "@/pages/about/Partners";
import Careers from "@/pages/about/Careers";

// Product pages
import Product from "@/pages/product/Product";
import Features from "@/pages/product/Features";
import Pricing from "@/pages/product/Pricing";
import ForCreators from "@/pages/product/ForCreators";
import ForBrands from "@/pages/product/ForBrands";

// Insights pages
import Trends from "@/pages/insights/Trends";
import News from "@/pages/insights/News";
import Blog from "@/pages/insights/Blog";
import Events from "@/pages/insights/Events";

// Onboarding
import Onboarding from '@/pages/onboarding/Onboarding';
import RoleSelection from '@/pages/onboarding/RoleSelection';
import ProfilePage from '@/pages/profile/Profile';
import SettingsPage from '@/pages/setting/Settings';

// App / Dashboard
import AppGate from '@/pages/dashboard/AppGate';
import CreatorDashboard from '@/pages/dashboard/CreatorDashboard';
import BrandDashboard from '@/pages/dashboard/BrandDashboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Shared Layout Routes */}
                    <Route element={<AppLayout />}>
                        {/* Public Route - Landing */}
                        <Route path={ROUTES.HOME} element={<Landing />} />

                        {/* About public routes */}
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/about-alino" element={<AboutAlino />} />
                        <Route path="/partners" element={<Partners />} />
                        <Route path="/careers" element={<Careers />} />

                        {/* Product public routes */}
                        <Route path="/product" element={<Product />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/creators" element={<ForCreators />} />
                        <Route path="/brands" element={<ForBrands />} />

                        {/* Insights public routes */}
                        <Route path="/trends" element={<Trends />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/events" element={<Events />} />

                        {/* Auth Pages */}
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.SIGNUP} element={<Signup />} />
                        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                        <Route path={ROUTES.UPDATE_PASSWORD} element={<UpdatePassword />} />
                        <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
                        <Route path={ROUTES.VERIFY_EMAIL_PENDING} element={<VerifyEmailPending />} />

                        {/* Protected Routes */}
                        <Route path={ROUTES.APP} element={<RequireAuth><AppGate /></RequireAuth>} />
                        <Route path={ROUTES.PROFILE} element={<RequireAuth><ProfilePage /></RequireAuth>} />
                        <Route path={ROUTES.SETTINGS} element={<RequireAuth><SettingsPage /></RequireAuth>} />

                        {/* Onboarding */}
                        <Route path={ROUTES.ONBOARDING} element={<RequireAuth><Onboarding /></RequireAuth>} />
                        <Route path={ROUTES.ONBOARDING_ROLE} element={<RequireAuth><RoleSelection /></RequireAuth>} />

                        {/* Dashboards */}
                        <Route path={ROUTES.APP_CREATOR} element={<RequireAuth><CreatorDashboard /></RequireAuth>} />
                        <Route path={ROUTES.APP_BRAND} element={<RequireAuth><BrandDashboard /></RequireAuth>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
