import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
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

    /**
     * ✅ QUY TẮC CHUẨN:
     * Có session thì KHÔNG ở lại /login
     * → đẩy sang /app để AppGate xử lý role + onboarding
     */
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

        if (error) setErrorMsg(error.message);
        setLoadingGoogle(false);
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary mb-2">
                        {title || 'Chào mừng trở lại'}
                    </h1>
                    {subtitle && (
                        <p className="text-secondary text-sm">{subtitle}</p>
                    )}
                </div>

                <ErrorBanner
                    message={errorMsg}
                    onClose={() => setErrorMsg('')}
                />

                {/* Google Login */}
                <button
                    onClick={handleGoogle}
                    disabled={loadingGoogle}
                    className="w-full border border-gray-300 hover:bg-gray-50 bg-white text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-3 transition-all disabled:opacity-60"
                >
                    {loadingGoogle ? (
                        <span>Đang mở Google...</span>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Tiếp tục với Google</span>
                        </>
                    )}
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px bg-gray-200 flex-1" />
                    <div className="text-sm text-gray-500">hoặc</div>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>

                {/* Email / Password */}
                {customContent ? (
                    customContent
                ) : (
                    <Auth
                        supabaseClient={supabase}
                        view={view}
                        showLinks={false}
                        providers={[]}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#000000', // Black CTA
                                        brandAccent: '#333333',
                                        inputBorder: '#E5E7EB',
                                        inputText: '#1F2937',
                                    },
                                },
                            },
                            className: {
                                button: 'rounded-lg font-semibold h-11',
                                input: 'rounded-lg border-gray-300 h-11',
                                label: 'text-sm font-medium text-gray-700',
                            },
                        }}
                        localization={{
                            variables: {
                                sign_in: {
                                    email_label: 'Email',
                                    password_label: 'Mật khẩu',
                                    button_label: 'Đăng nhập',
                                    loading_button_label: 'Đang đăng nhập...',
                                },
                                sign_up: {
                                    email_label: 'Email',
                                    password_label: 'Mật khẩu',
                                    button_label: 'Đăng ký',
                                    loading_button_label: 'Đang đăng ký...',
                                },
                            },
                        }}
                    />
                )}

                <div className="mt-4 flex flex-col gap-2 text-center text-sm">
                    {view === 'sign_in' ? (
                        <>
                            {onSignupClick ? (
                                <button
                                    onClick={onSignupClick}
                                    className="text-secondary hover:text-brand hover:underline bg-transparent border-none p-0 cursor-pointer w-full"
                                >
                                    Chưa có tài khoản? Đăng ký
                                </button>
                            ) : (
                                <Link
                                    to={ROUTES.SIGNUP}
                                    className="text-secondary hover:text-brand hover:underline"
                                >
                                    Chưa có tài khoản? Đăng ký
                                </Link>
                            )}
                            <Link
                                to={ROUTES.RESET_PASSWORD}
                                className="text-secondary hover:text-brand hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-secondary hover:text-brand hover:underline"
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
