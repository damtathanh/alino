import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routes';

type AppLogoProps = {
    subtitle?: string;
};

const AppLogo = ({ subtitle }: AppLogoProps) => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate(ROUTES.HOME);
        // 👇 ÉP scroll lên đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={goHome}
            className="flex items-center gap-3 hover:opacity-80 transition"
        >
            {/* LOGO */}
            <img
                src="/logo/logo.png"
                alt="Alino Logo"
                className="w-10 h-10 object-contain"
            />

            {/* TEXT */}
            <div className="flex flex-col leading-tight text-left">
                <span
                    className="
            text-[20px] font-extrabold
            bg-gradient-to-r from-brand to-indigo-600
            bg-clip-text text-transparent
          "
                >
                    ALINO
                </span>

                {subtitle && (
                    <span className="text-[12px] font-semibold text-muted uppercase tracking-wide">
                        {subtitle}
                    </span>
                )}
            </div>
        </button>
    );
};

export default AppLogo;
