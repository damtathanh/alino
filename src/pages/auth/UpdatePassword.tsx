import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';
import { updateProfile } from '@/lib/supabase/profile';
import { ROUTES } from '@/shared/routes';
import Toast from '@/components/ui/Toast';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password });

            if (error) {
                if (error.message.includes('different from the old password')) {
                    setError('Mật khẩu mới phải khác mật khẩu cũ');
                } else {
                    setError('Không thể cập nhật mật khẩu. Vui lòng thử lại.');
                }
                return;
            }

            // ✅ Đánh dấu đã có mật khẩu
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                await updateProfile(data.user.id, { has_password: true });
            }

            setShowToast(true);

            // ⏳ Redirect sau khi toast hiện
            setTimeout(() => {
                navigate(ROUTES.APP, { replace: true });
            }, 2000);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            {showToast && (
                <Toast
                    message="Đặt mật khẩu mới thành công"
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
                <h1 className="text-2xl font-bold text-primary mb-6 text-center">
                    Đặt mật khẩu mới
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand hover:bg-brandHover text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
