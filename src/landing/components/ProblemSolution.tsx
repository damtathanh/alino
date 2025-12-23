const ProblemSolution = () => {
    const problems = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: "Gửi hồ sơ rải rác",
            desc: "Hồ sơ, bảng giá, file nằm lung tung trên Drive, Notion, Chat... Brand khó tìm, dễ trôi tin."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
            title: "Yêu cầu thiếu thông tin",
            desc: "Trao đổi qua lại hàng chục lần mới chốt được quy cách, deadline, ngân sách. Mất thời gian đôi bên."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            title: "Phản hồi bị trôi",
            desc: "Góp ý sửa đổi nằm lộn xộn trong các đoạn chat dài dằng dặc, rất dễ sót hoặc làm sai ý."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            title: "Ngại nhắc thanh toán",
            desc: "Không có quy trình nhắc hẹn tự động, Creator thường xuyên phải tự đi đòi tiền rất ngại."
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-bgAlt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">
                        Sự chuyên nghiệp bắt đầu từ cách bạn <br /> <span className="text-brand">tiếp nhận và xử lý yêu cầu</span>
                    </h2>
                    <p className="text-lg text-secondary">
                        Những vấn đề "nhỏ nhặt" đang âm thầm ngốn hàng giờ đồng hồ quản lý mỗi ngày của bạn.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-card transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2 min-h-[56px] flex items-center">{item.title}</h3>
                            <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
