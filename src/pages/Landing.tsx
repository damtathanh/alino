import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthProvider';

import Hero from '../features/landing/components/Hero';
import ProblemSolution from '../features/landing/components/ProblemSolution';
import HowItWorks from '../features/landing/components/HowItWorks';
import Features from '../features/landing/components/Features';
import Audience from '../features/landing/components/Audience';
import PricingUnlock from '../features/landing/components/PricingUnlock';
import FAQ from '../features/landing/components/FAQ';
import Footer from '../features/landing/components/Footer';

import RoleSelectModal from '../features/auth/components/RoleSelectModal';
import { ROUTES } from '../shared/routes';
import type { Role } from '../shared/types';

const Landing = () => {
    const navigate = useNavigate();
    const { session } = useAuth();
    
    // FIX 1: User có session thì redirect về /app
    useEffect(() => {
        if (session) {
            navigate(ROUTES.APP, { replace: true });
        }
    }, [session, navigate]);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    /* ================== SIGNUP HANDLERS ================== */

    const openRoleModal = () => setIsRoleModalOpen(true);

    const handleRoleSelect = (role: Role) => {
        setIsRoleModalOpen(false);
        navigate(`${ROUTES.SIGNUP}?role=${role}`);
    };

    const handleSignup = (role?: Role) => {
        if (role) {
            navigate(`${ROUTES.SIGNUP}?role=${role}`);
        } else {
            openRoleModal();
        }
    };

    /* ================== RENDER ================== */

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-brand/20 selection:text-brand">
            <main className="flex flex-col">
                <Hero onSignupClick={openRoleModal} />
                <ProblemSolution />
                <HowItWorks />
                <div className="bg-gray-50/50">
                    <Features />
                </div>
                <Audience onSignupClick={handleSignup} />
                <PricingUnlock onSignupClick={openRoleModal} />
                <FAQ />
            </main>

            <Footer />

            <RoleSelectModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onSelect={handleRoleSelect}
            />
        </div>
    );
};

export default Landing;
