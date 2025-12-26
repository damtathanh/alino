import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { ROUTES } from '../../shared/routes';
import { getSiteUrl } from '../../lib/siteUrl';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Helper: lấy profile theo email
     */
    const getProfileByEmail = async (email: string) => {
        const { data } = await supabase
            .from('profiles')
            .select('id, has_password')
            .eq('email', email)
            .maybeSingle();

        return data;
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        /**
         * 🔒 GUARD 1:
         * Kiểm tra email có tồn tại trong profiles không
         */
        const profile = await getProfileByEmail(email);

        if (!profile) {
            setError('Email này chưa được đăng ký.');
            setLoading(false);
            return;
        }

        /**
         * 🔒 GUARD 2:
         * Google user chưa set password → KHÔNG cho reset
         */
        if (profile.has_password === false) {
            setError(
                'Tài khoản này được tạo bằng Google. ' +
                'Vui lòng đăng nhập bằng Google và thiết lập mật khẩu trong Cài đặt.'
            );
            setLoading(false);
            return;
        }

        /**
         * ✅ OK → cho reset password
         */
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${getSiteUrl()}${ROUTES.UPDATE_PASSWORD}`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Vui lòng kiểm tra email để đặt lại mật khẩu.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
                <h1 className="text-2xl font-bold text-primary mb-2 text-center">
                    Quên mật khẩu
                </h1>

                <p className="text-secondary text-sm text-center mb-6">
                    Nhập email để nhận link đặt lại mật khẩu
                </p>

                {message && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleReset} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand hover:bg-brandHover text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Đang gửi...' : 'Gửi link reset'}
                    </button>

                    <a
                        href={ROUTES.LOGIN}
                        className="text-center text-sm text-brand hover:underline mt-2"
                    >
                        Quay lại Đăng nhập
                    </a>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
