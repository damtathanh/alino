import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { supabase } from '../../lib/supabaseClient';

const RoleOnboardingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSelectRole = async (role: 'creator' | 'brand') => {
        if (!user) return;
        setLoading(true);

        const { error } = await supabase
            .from('profiles')
            .upsert(
                { id: user.id, email: user.email, role },
                { onConflict: 'id' }
            );

        if (error) {
            console.error('Error updating role:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
            setLoading(false);
            return;
        }

        navigate('/app');
    };

    return (
        <div className="min-h-screen bg-bg p-6 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Chào mừng đến với Alino!</h1>
                <p className="text-secondary text-lg mb-12">Bạn muốn sử dụng Alino với vai trò gì?</p>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Creator Card */}
                    <button
                        onClick={() => handleSelectRole('creator')}
                        disabled={loading}
                        className="group relative bg-white rounded-2xl p-8 border-2 border-transparent hover:border-brand shadow-xl hover:shadow-2xl transition-all text-left flex flex-col items-center md:items-start"
                    >
                        <div className="w-16 h-16 rounded-full bg-indigo-50 text-brand flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🎨
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Nhà sáng tạo nội dung</h3>
                        <p className="text-secondary text-sm leading-relaxed mb-6 text-center md:text-left">
                            Tạo hồ sơ, quản lý booking, hợp đồng và nhận thanh toán chuyên nghiệp.
                        </p>
                        <span className="mt-auto text-brand font-semibold group-hover:underline">Tôi là Creator &rarr;</span>
                    </button>

                    {/* Brand Card */}
                    <button
                        onClick={() => handleSelectRole('brand')}
                        disabled={loading}
                        className="group relative bg-white rounded-2xl p-8 border-2 border-transparent hover:border-purple-500 shadow-xl hover:shadow-2xl transition-all text-left flex flex-col items-center md:items-start"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🏢
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Nhãn hàng / Agency</h3>
                        <p className="text-secondary text-sm leading-relaxed mb-6 text-center md:text-left">
                            Tìm kiếm Creator, quản lý chiến dịch và thanh toán tập trung.
                        </p>
                        <span className="mt-auto text-purple-600 font-semibold group-hover:underline">Tôi là Brand &rarr;</span>
                    </button>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
                </div>
            )}
        </div>
    );
};

export default RoleOnboardingPage;
