
const BrandDashboardView = () => {

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="p-8 max-w-6xl mx-auto pt-10">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-gray-100 text-black rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                        🏢
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Brand Dashboard
                    </h1>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                        Alino For Brands
                    </p>
                    <p className="text-gray-500 text-lg">
                        Quản lý chiến dịch của bạn tại đây.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default BrandDashboardView;
