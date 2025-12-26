import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile } from '@/lib/queries/useProfile';
import { supabase } from '@/lib/supabase/client';
import Toast from '@/components/ui/Toast';
import { Skeleton } from '@/components/ui/Skeleton';

const SettingsPage = () => {
    const { user, session } = useAuth();
    const { data: profile, isLoading } = useProfile(user?.id);

    const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Cài đặt</h1>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex">
                    <aside className="w-56 border-r border-gray-200 p-4">
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                                    ${activeTab === 'account'
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Tài khoản
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                                    ${activeTab === 'security'
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Bảo mật
                            </button>
                        </nav>
                    </aside>

                    <main className="flex-1 p-6">
                        {activeTab === 'account' && profile && (
                            <AccountTab profile={profile} session={session} />
                        )}

                        {activeTab === 'security' && (
                            <SecurityTab />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

/* ================= ACCOUNT TAB ================= */

const AccountTab = ({
    profile,
    session,
}: {
    profile: any;
    session: any;
}) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold mb-1">Thông tin tài khoản</h2>
            <p className="text-sm text-gray-500">
                Thông tin liên quan đến đăng nhập và trạng thái tài khoản của bạn.
            </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 space-y-5 max-w-xl">
            <InfoRow label="Email đăng nhập" value={profile.email ?? '—'} />
            <InfoRow
                label="Phương thức đăng nhập"
                value={
                    session?.user.app_metadata?.provider === 'google'
                        ? 'Google'
                        : 'Email & Mật khẩu'
                }
            />
            <InfoRow
                label="Trạng thái email"
                value={
                    session?.user.email_confirmed_at
                        ? 'Đã xác thực'
                        : 'Chưa xác thực'
                }
            />
            <InfoRow
                label="Ngày tạo tài khoản"
                value={
                    profile.created_at
                        ? new Date(profile.created_at).toLocaleDateString('vi-VN')
                        : '—'
                }
            />
        </div>
    </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-start">
        <div>
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-sm text-gray-500">{value}</p>
        </div>
    </div>
);

/* ================= SECURITY TAB ================= */

const SecurityTab = () => {
    const { user, session } = useAuth();

    const providers = session?.user?.app_metadata?.providers as string[] | undefined;
    const hasPassword = Array.isArray(providers) ? providers.includes('email') : (session?.user?.app_metadata?.provider === 'email');
    const provider = session?.user?.app_metadata?.provider;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleChangePassword = async () => {
        setError('');

        if (hasPassword && !currentPassword) {
            setError('Vui lòng nhập mật khẩu hiện tại');
            return;
        }

        if (newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);

        try {
            // Không cần re-auth cho Google; Supabase cho phép đổi/thiết lập mật khẩu khi đã đăng nhập
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                if (error.message.includes('different from the old password')) {
                    setError('Mật khẩu mới phải khác mật khẩu cũ');
                } else {
                    setError('Không thể cập nhật mật khẩu. Vui lòng thử lại.');
                }
                return;
            }

            setShowToast(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-xl">
            {showToast && (
                <Toast
                    message="Cập nhật mật khẩu thành công"
                    onClose={() => setShowToast(false)}
                />
            )}

            <div>
                <h2 className="text-xl font-semibold mb-1">Bảo mật</h2>
                <p className="text-sm text-gray-500">
                    Quản lý phương thức đăng nhập và mật khẩu.
                </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
                <p className="text-sm text-gray-500">
                    {hasPassword
                        ? 'Bạn có thể thay đổi mật khẩu tại đây.'
                        : 'Tài khoản của bạn được tạo bằng Google. Hãy thiết lập mật khẩu để đăng nhập bằng email.'}
                </p>

                {hasPassword && (
                    <input
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="input"
                    />
                )}

                <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="input"
                />

                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="input"
                />

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="w-full py-3 bg-black text-white rounded-xl font-semibold disabled:opacity-50"
                >
                    {loading
                        ? 'Đang lưu...'
                        : hasPassword
                            ? 'Đổi mật khẩu'
                            : 'Thiết lập mật khẩu'}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
