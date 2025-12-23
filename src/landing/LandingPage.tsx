import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Audience from './components/Audience';
import PricingUnlock from './components/PricingUnlock';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-brand/20 selection:text-brand">
            <Header />

            <main className="flex flex-col pt-18">
                {/* Hero section handles its own spacing */}
                <Hero />

                {/* Problem & Solution Flow */}
                <ProblemSolution />

                {/* Visual Break - Workflow */}
                <HowItWorks />

                {/* Feature Deep Dive */}
                <div className="bg-gray-50/50">
                    <Features />
                </div>

                {/* Target Audience Split */}
                <Audience />

                {/* Trust/Pricing Gate */}
                <PricingUnlock />

                {/* Objection Handling */}
                <FAQ />

                {/* Final Call to Action - Distinct from Footer */}
                <section className="py-24 bg-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
                            Sẵn sàng chuyên nghiệp hóa công việc?
                        </h2>
                        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                            Tham gia cùng hàng ngàn Creator đang sử dụng Alino để quản lý booking và phát triển sự nghiệp.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-10 py-4 bg-brand hover:bg-brandHover text-white rounded-full text-lg font-bold shadow-xl shadow-brand/20 hover:shadow-brand/30 transition-all transform hover:-translate-y-1">
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
        </div>
    );
};

export default LandingPage;
