import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { supabase } from '@/lib/supabase/client';
import { ROUTES } from '@/shared/routes';

const VerifyEmailPending = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { session } = useAuth();

    const email = location.state?.email as string | undefined;
    const source = (location.state?.source || location.state?.from) as
        | string
        | undefined;

    const autoSentRef = useRef(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // 1. Nếu đã có session → email đã verify → vào AppGate
    useEffect(() => {
        if (!session) return;

        navigate(ROUTES.APP, { replace: true });
    }, [session, navigate]);

    // 2. Handle confirm link lỗi / hết hạn (user quay lại site)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const errorCode = params.get('error_code');

        if (errorCode === 'otp_expired' || errorCode === 'access_denied') {
            setError('Link xác thực đã hết hạn. Vui lòng gửi lại email.');
        }
    }, [location.search]);

    useEffect(() => {
        if (!email && !session) {
            navigate(ROUTES.LOGIN, { replace: true });
        }
    }, [email, session, navigate]);

    // 3. Auto resend ONLY khi đến từ login
    useEffect(() => {
        if (!location.state) return;
        if (!email) return;
        if (source !== 'login') return;
        if (autoSentRef.current) return;

        autoSentRef.current = true;

        (async () => {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/app`,
                },
            });

            console.log('RESEND ERROR:', error);

            if (error) {
                if (error.message.includes('after')) {
                    setError(
                        'Vui lòng đợi 60 giây trước khi gửi lại email xác thực.'
                    );
                } else {
                    setError('Không thể gửi lại email. Vui lòng thử lại.');
                }
            } else {
                setMessage('Email xác thực đã được gửi.');
            }
        })();
    }, [email, source]);

    const handleResend = async () => {
        if (!email) return;

        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/app`,
            },
        });

        if (error) {
            if (error.message.includes('after')) {
                setError(
                    'Vui lòng đợi 60 giây trước khi gửi lại email xác thực.'
                );
            } else {
                setError('Không thể gửi lại email. Vui lòng thử lại.');
            }
        } else {
            setMessage('Email xác thực đã được gửi lại.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                    📧
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Kiểm tra email của bạn
                </h1>

                <p className="text-gray-600 text-sm mb-6">
                    Chúng tôi đã gửi email xác thực đến:
                </p>

                <div className="font-semibold text-indigo-600 mb-6 break-all">
                    {email}
                </div>

                {message && (
                    <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Mở Gmail
                    </a>

                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Đang gửi lại...' : 'Gửi lại email'}
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    Sau khi xác thực email, bạn sẽ được tự động chuyển tiếp.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPending;
