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
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            // 👉 Supabase tự gửi email verify
            navigate(ROUTES.VERIFY_EMAIL_PENDING, { state: { email } });
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border px-3 py-2 rounded"
            />

            <button disabled={loading} className="bg-black text-white py-2 rounded">
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
        </form>
    );
};
