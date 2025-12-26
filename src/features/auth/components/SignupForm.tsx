import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client';
import { ROUTES } from '../../../shared/routes';
import { ErrorBanner } from '../../../components/ui/ErrorBanner';

export const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            /* STEP 1: CHECK EMAIL BẰNG RPC */
            const { data, error: rpcError } = await supabase.rpc(
                'check_email_exists',
                { p_email: email }
            );

            if (rpcError) {
                throw new Error('Không thể kiểm tra email');
            }

            if (data === true) {
                throw new Error(
                    'Email này đã được đăng ký. Vui lòng đăng nhập hoặc xác thực email.'
                );
            }

            /* STEP 2: SIGN UP (CHỈ CHẠY KHI EMAIL CHƯA TỒN TẠI) */
            const { error: signupError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signupError) {
                throw signupError;
            }

            navigate(ROUTES.VERIFY_EMAIL_PENDING, {
                state: { email },
            });
        } catch (err: any) {
            setError(err.message || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <ErrorBanner message={error} onClose={() => setError('')} />

            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border px-3 py-2 rounded"
            />

            <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="border px-3 py-2 rounded"
            />

            <button
                disabled={loading}
                className="bg-black text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
        </form>
    );
};
