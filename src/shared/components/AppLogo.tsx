import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routes';

type AppLogoProps = {
    subtitle?: string;
};

const AppLogo = ({ subtitle }: AppLogoProps) => {
    return (
        <Link
            to={ROUTES.HOME}
            className="flex items-center gap-3 hover:opacity-80 transition"
        >
            {/* LOGO IMAGE – TO HƠN */}
            <img
                src="/logo/logo.png"
                alt="Alino Logo"
                className="w-10 h-10 object-contain"
            />

            {/* TEXT */}
            <div className="flex flex-col leading-tight">
                {/* ALINO – TO + ĐẬM HƠN */}
                <span
                    className="
                        text-[20px] font-extrabold
                        bg-gradient-to-r from-brand to-indigo-600
                        bg-clip-text text-transparent
                        transition-all
                        group-hover:from-indigo-600 group-hover:to-brand
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
        </Link>
    );
};

export default AppLogo;
