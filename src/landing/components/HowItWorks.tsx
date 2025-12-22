
import styles from '../landing.module.css';

const HowItWorks = () => {
    return (
        <section className={`${styles.section} ${styles.problemSection}`} id="how-it-works">
            <div className={styles.container}>
                <div className={styles.sectionTitle}>
                    <h2>Bắt đầu đơn giản trong 3 bước</h2>
                </div>

                <div className={styles.steps}>
                    <div>
                        <div className={styles.stepNumber}>1</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Tạo trang Alino</h3>
                        <p>Thiết lập hồ sơ, portfolio và bảng giá dịch vụ chỉ trong 5 phút.</p>
                    </div>
                    <div>
                        <div className={styles.stepNumber}>2</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Nhận Booking</h3>
                        <p>Chia sẻ link Alino. Brand xem hồ sơ và gửi yêu cầu theo mẫu chuẩn.</p>
                    </div>
                    <div>
                        <div className={styles.stepNumber}>3</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Quản lý & Thanh toán</h3>
                        <p>Theo dõi tiến độ, duyệt nội dung và nhận thanh toán minh bạch.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
