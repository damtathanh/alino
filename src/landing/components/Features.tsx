
import styles from '../landing.module.css';

const Features = () => {
    const features = [
        {
            title: "Hồ sơ cá nhân",
            desc: "Portfolio chuyên nghiệp, thể hiện phong cách riêng với custom URL.",
            icon: "👤"
        },
        {
            title: "Bảng giá dịch vụ",
            desc: "Niêm yết giá rõ ràng hoặc ẩn giá (Booking Only) tuỳ nhu cầu.",
            icon: "🏷️"
        },
        {
            title: "Đặt dịch vụ",
            desc: "Form đặt hàng chuẩn hoá, giúp Brand gửi yêu cầu đầy đủ thông tin.",
            icon: "🛒"
        },
        {
            title: "Quản lý hợp đồng",
            desc: "Theo dõi trạng thái từng deal: Mới, Đang làm, Chờ duyệt, Hoàn tất.",
            icon: "📝"
        },
        {
            title: "Duyệt nội dung",
            desc: "Feedback tập trung ngay trên từng phiên bản nội dung.",
            icon: "👀"
        },
        {
            title: "Thanh toán",
            desc: "Lưu lịch sử giao dịch, hỗ trợ tạo QR thanh toán và nhắc nợ.",
            icon: "💸"
        }
    ];

    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <div className={styles.sectionTitle}>
                    <h2>Alino gom tất cả về một chỗ</h2>
                    <p>Mọi công cụ bạn cần để vận hành công việc sáng tạo nội dung.</p>
                </div>

                <div className={styles.featureGrid}>
                    {features.map((item, idx) => (
                        <div key={idx} className={styles.card}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
