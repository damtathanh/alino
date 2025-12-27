import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client';
import { useAuth } from '../../../app/providers/AuthProvider';
import { ROUTES } from '../../../shared/routes';
import { ErrorBanner } from '../../../components/ui/ErrorBanner';
import { getSiteUrl } from '../../../lib/siteUrl';

interface AuthWrapperProps {
    view: 'sign_in' | 'sign_up';
    title?: string;
    subtitle?: string;
    onSignupClick?: () => void;
    customContent?: React.ReactNode;
}

const AuthWrapper = ({
    view,
    title,
    subtitle,
    onSignupClick,
    customContent,
}: AuthWrapperProps) => {
    const { session } = useAuth();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('');
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    useEffect(() => {
        if (session) {
            navigate(ROUTES.APP, { replace: true });
        }
    }, [session, navigate]);

    const callbackUrl = `${getSiteUrl()}${ROUTES.AUTH_CALLBACK}`;

    const handleGoogle = async () => {
        setErrorMsg('');
        setLoadingGoogle(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: callbackUrl,
                queryParams: { prompt: 'select_account' },
            },
        });

        if (error) {
            setErrorMsg('Có lỗi xảy ra, vui lòng thử lại');
        }

        setLoadingGoogle(false);
    };

    return (
        <div className="min-h-screen bg-bg flex justify-center pt-8 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8 h-fit">
                {/* TITLE */}
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold mb-2">
                        {title || 'Đăng nhập'}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    )}
                </div>

                {/* GOOGLE */}
                <button
                    onClick={handleGoogle}
                    disabled={loadingGoogle}
                    className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-3 disabled:opacity-60">
                    {!loadingGoogle && (
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                    )}
                    <span>
                        {loadingGoogle ? 'Đang mở Google...' : 'Tiếp tục với Google'}
                    </span>
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-sm text-gray-500">hoặc</span>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>

                {/* EMAIL / PASSWORD */}
                {customContent ? (
                    customContent
                ) : (
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrorMsg('');

                            const form = e.currentTarget;
                            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                            const password = (form.elements.namedItem('password') as HTMLInputElement).value;

                            const { error } = await supabase.auth.signInWithPassword({
                                email,
                                password,
                            });

                            if (error) {
                                const msg = String(error.message || '').toLowerCase();
                                const isUnconfirmed = msg.includes('confirm') || msg.includes('not confirmed');
                                if (isUnconfirmed) {
                                    navigate(ROUTES.VERIFY_EMAIL_PENDING, { state: { email }, replace: true });
                                    return;
                                }
                                setErrorMsg('Email hoặc mật khẩu không đúng');
                            }
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Nhập email của bạn"
                                required
                                className="w-full h-11 rounded-lg border border-gray-300 px-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Mật khẩu
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                required
                                className="w-full h-11 rounded-lg border border-gray-300 px-3"
                            />
                        </div>

                        <ErrorBanner
                            message={errorMsg}
                            onClose={() => setErrorMsg('')}
                        />

                        <button
                            type="submit"
                            className="w-full h-11 rounded-lg bg-black text-white font-semibold"
                        >
                            Đăng nhập
                        </button>
                    </form>
                )}

                {/* LINKS */}
                <div className="mt-4 flex flex-col gap-2 text-center text-sm">
                    {view === 'sign_in' ? (
                        <>
                            {onSignupClick ? (
                                <button
                                    onClick={onSignupClick}
                                    className="text-gray-500 hover:underline bg-transparent border-none"
                                >
                                    Chưa có tài khoản? Đăng ký
                                </button>
                            ) : (
                                <Link
                                    to={ROUTES.SIGNUP}
                                    className="text-gray-500 hover:underline"
                                >
                                    Chưa có tài khoản? Đăng ký
                                </Link>
                            )}
                            <Link
                                to={ROUTES.RESET_PASSWORD}
                                className="text-gray-500 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-gray-500 hover:underline"
                        >
                            Đã có tài khoản? Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthWrapper;
