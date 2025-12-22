
import styles from '../landing.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: 'var(--brand-soft-bg)',
                            color: 'var(--brand-primary)',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem'
                        }}>
                            MVP Release 1.0
                        </div>
                        <h1>
                            Chốt hợp đồng quảng cáo <span style={{ color: 'var(--brand-primary)' }}>gọn trong một nơi</span>
                        </h1>
                        <p className={styles.sub}>
                            Nền tảng “tất cả trong một” giúp Content Creator và Brand làm việc chuyên nghiệp.
                            Từ yêu cầu tới thanh toán — không trôi tin nhắn, không thất lạc tập tin.
                        </p>

                        <div className={styles.heroBullets}>
                            <div className={styles.bullet}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Không trôi tin nhắn
                            </div>
                            <div className={styles.bullet}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Không thất lạc tập tin
                            </div>
                            <div className={styles.bullet}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Minh bạch tiến độ
                            </div>
                        </div>

                        <div className={styles.ctaGroup}>
                            <button className={styles.btnPrimary}>
                                Tạo trang Alino miễn phí
                            </button>
                            <button className={styles.btnSecondary}>
                                Xem Alino hoạt động
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        {/* Mockup Placeholder - Replacing with pure CSS structure for now */}
                        <div style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '1rem',
                            border: '1px solid var(--border-divider)',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--border-divider)', paddingBottom: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                                <div>
                                    <div style={{ width: '120px', height: '12px', background: '#eee', marginBottom: '4px', borderRadius: '4px' }}></div>
                                    <div style={{ width: '80px', height: '10px', background: '#f5f5f5', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ marginLeft: 'auto', padding: '4px 12px', background: 'var(--brand-primary)', color: 'white', borderRadius: '4px', fontSize: '12px' }}>Hire Me</div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ flex: 1, padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                    <div style={{ width: '100%', height: '8px', background: '#e5e5e5', marginBottom: '8px', borderRadius: '4px' }}></div>
                                    <div style={{ width: '60%', height: '8px', background: '#e5e5e5', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ flex: 1, padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                    <div style={{ width: '100%', height: '8px', background: '#e5e5e5', marginBottom: '8px', borderRadius: '4px' }}></div>
                                    <div style={{ width: '60%', height: '8px', background: '#e5e5e5', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                            {/* Deal Pipeline Mini-Mockup */}
                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Deal Pipeline</div>
                                <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden' }}>
                                    <div style={{ flex: 1, padding: '8px', background: 'var(--status-new)', borderRadius: '4px', fontSize: '10px' }}>
                                        New Request
                                    </div>
                                    <div style={{ flex: 1, padding: '8px', background: 'var(--status-progress)', borderRadius: '4px', fontSize: '10px' }}>
                                        Processing
                                    </div>
                                    <div style={{ flex: 1, padding: '8px', background: 'var(--status-awaiting)', borderRadius: '4px', fontSize: '10px' }}>
                                        Review
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
