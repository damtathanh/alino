import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../auth/AuthProvider';

interface AuthPageProps {
    view: "sign_in" | "sign_up";
    title?: string;
    subtitle?: string;
    onSignupClick?: () => void; // Add this prop
}

const AuthPage = ({ view, title, subtitle, onSignupClick }: AuthPageProps) => {
    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/app');
        }
    }, [session, navigate]);

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-2">{title || "Chào mừng trở lại"}</h1>
                    {subtitle && <p className="text-secondary text-sm">{subtitle}</p>}
                </div>

                <Auth
                    supabaseClient={supabase}
                    view={view}
                    showLinks={false}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#4F46E5',
                                    brandAccent: '#4338CA',
                                },
                            },
                        },
                        className: {
                            button: 'rounded-lg font-semibold',
                            input: 'rounded-lg border-gray-300',
                        }
                    }}
                    providers={['google']}
                    redirectTo={`${window.location.origin}/auth/callback`}
                    onlyThirdPartyProviders={false}
                    localization={{
                        variables: {
                            sign_in: {
                                email_label: 'Địa chỉ Email',
                                password_label: 'Mật khẩu',
                                button_label: 'Đăng nhập',
                                loading_button_label: 'Đang đăng nhập...',
                            },
                            sign_up: {
                                email_label: 'Địa chỉ Email',
                                password_label: 'Mật khẩu',
                                button_label: 'Đăng ký',
                                loading_button_label: 'Đang đăng ký...',
                            }
                        }
                    }}
                />

                <div className="mt-4 flex flex-col gap-2 text-center text-sm">
                    {/* Manual Links Replacement */}
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
                                <Link to="/signup" className="text-secondary hover:text-brand hover:underline">
                                    Chưa có tài khoản? Đăng ký
                                </Link>
                            )}

                            <Link to="/reset-password" className="text-secondary hover:text-brand hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="text-secondary hover:text-brand hover:underline">
                            Đã có tài khoản? Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
