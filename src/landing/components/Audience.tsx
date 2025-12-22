
import styles from '../landing.module.css';

const Audience = () => {
    return (
        <section className={styles.section} id="for-brands">
            <div className={styles.container}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                    {/* For Creators */}
                    <div className={styles.card} style={{ borderColor: 'var(--brand-primary)', backgroundColor: '#F8FAFC' }}>
                        <div style={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--brand-primary)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            marginBottom: '1rem'
                        }}>
                            For Creators
                        </div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Làm việc chuyên nghiệp hơn</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success)' }}>✔</span> Portfolio đẹp, load nhanh
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success)' }}>✔</span> Media Kit & Báo giá rõ ràng
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success)' }}>✔</span> Workflow quản lý deadline tự động
                            </li>
                        </ul>
                    </div>

                    {/* For Brands */}
                    <div className={styles.card} style={{ borderColor: 'var(--text-secondary)' }}>
                        <div style={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            marginBottom: '1rem'
                        }}>
                            For Brands
                        </div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Booking dễ dàng & minh bạch</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--brand-primary)' }}>✔</span> Xem hồ sơ & báo giá chuẩn
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--brand-primary)' }}>✔</span> Gửi request theo mẫu, không thiếu info
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--brand-primary)' }}>✔</span> Duyệt nội dung & lịch sử feedback
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Audience;
