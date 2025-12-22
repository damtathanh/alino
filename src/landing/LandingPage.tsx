
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Audience from './components/Audience';
import Footer from './components/Footer';

const LandingPage = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
            <Header />
            <main>
                <Hero />
                <ProblemSolution />
                <Features />
                <HowItWorks />
                <Audience />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
