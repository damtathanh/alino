
import styles from '../landing.module.css';

const ProblemSolution = () => {
    const problems = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: "Gửi hồ sơ qua tin nhắn",
            desc: "Nội dung & file nằm rải rác khắp nơi, brand khó tìm lại, dễ bị trôi tin."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
            title: "Yêu cầu thiếu thông tin",
            desc: "Phải hỏi đi hỏi lại quy cách, deadline, ngân sách... mất thời gian đôi bên."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            title: "Góp ý bị trôi",
            desc: "Comment qua lại trên Zalo/Messenger/Email khiến việc tổng hợp sửa đổi thành ác mộng."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            title: "Tới lúc thanh toán ngại nhắc tiền",
            desc: "Không có workflow nhắc nhở tự động, Creator thường phải tự đi đòi thanh toán."
        }
    ];

    return (
        <section className={`${styles.section} ${styles.problemSection}`}>
            <div className={styles.container}>
                <div className={styles.sectionTitle}>
                    <h2>Làm việc chuyên nghiệp không nên bắt đầu bằng "Check ib em nhé"</h2>
                    <p>Những vấn đề khiến bạn mất nhiều thời gian quản lý hơn là sáng tạo.</p>
                </div>

                <div className={styles.grid4}>
                    {problems.map((item, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.iconBox} style={{ color: 'var(--error)', background: '#FEF2F2' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.95rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
