import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';

const VerifyEmailPending = () => {
    const location = useLocation();
    const email = location.state?.email;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResend = async () => {
        if (!email) return;

        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });

        if (error) {
            if (error.message.includes('after')) {
                setError('Vui lòng đợi 60 giây trước khi gửi lại email xác thực.');
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
                    Không thấy email? Hãy kiểm tra thư mục Spam hoặc Promotions.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPending;
