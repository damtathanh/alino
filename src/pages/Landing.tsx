import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../features/landing/components/Header';
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
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    // Handlers
    const openRoleModal = () => setIsRoleModalOpen(true);

    const handleRoleSelect = (role: Role) => {
        setIsRoleModalOpen(false);
        navigate(`${ROUTES.SIGNUP}?role=${role}`);
    };

    // Specific handler for Audience card
    const handleSignup = (role?: Role) => {
        if (role) {
            navigate(`${ROUTES.SIGNUP}?role=${role}`);
        } else {
            openRoleModal();
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-brand/20 selection:text-brand">
            <Header onSignupClick={openRoleModal} />

            <main className="flex flex-col pt-16">
                <Hero onSignupClick={openRoleModal} />
                <ProblemSolution />
                <HowItWorks />
                <div className="bg-gray-50/50">
                    <Features />
                </div>
                <Audience onSignupClick={handleSignup} />
                <PricingUnlock onSignupClick={openRoleModal} />
                <FAQ />

                <section className="py-24 bg-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
                            Sẵn sàng chuyên nghiệp hóa công việc?
                        </h2>
                        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                            Tham gia cùng hàng ngàn Creator đang sử dụng Alino để quản lý booking và phát triển sự nghiệp.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={openRoleModal}
                                className="w-full sm:w-auto px-10 py-4 bg-brand hover:bg-brandHover text-white rounded-full text-lg font-bold shadow-xl shadow-brand/20 hover:shadow-brand/30 transition-all transform hover:-translate-y-1 block sm:inline-block"
                            >
                                Tạo trang Alino miễn phí
                            </button>
                            <button className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-full text-lg font-semibold transition-all">
                                Liên hệ tư vấn
                            </button>
                        </div>
                    </div>
                </section>
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
