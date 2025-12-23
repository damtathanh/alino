import { useAuth } from '../../auth/AuthProvider';

const BrandHome = () => {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-purple-600 text-xl">ALINO <span className="text-gray-400 text-sm font-normal">for Brands</span></div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{user?.email}</span>
                    <button onClick={signOut} className="text-sm text-red-600 hover:text-red-700 font-medium">Đăng xuất</button>
                </div>
            </nav>
            <main className="p-8 max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center py-20">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🏢</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Brand Dashboard</h1>
                    <p className="text-gray-500">Quản lý chiến dịch của bạn tại đây.</p>
                </div>
            </main>
        </div>
    );
};

export default BrandHome;
