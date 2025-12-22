import { useState } from 'react';
import styles from '../landing.module.css';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ borderBottom: '1px solid var(--border-divider)', padding: '1rem 0' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500,
                    padding: 0
                }}
            >
                {question}
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
            </button>
            {isOpen && <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{answer}</p>}
        </div>
    );
};

const Footer = () => {
    return (
        <footer className={styles.footer} id="faq">
            <div className={styles.container}>

                {/* FAQ */}
                <div style={{ maxWidth: '800px', margin: '0 auto 5rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Câu hỏi thường gặp</h2>
                    <FAQItem
                        question="Alino có miễn phí không?"
                        answer="Có, Alino miễn phí trọn đời cho các tính năng cơ bản giúp bạn tạo hồ sơ và quản lý công việc."
                    />
                    <FAQItem
                        question="Brand có cần tạo tài khoản để xem hồ sơ không?"
                        answer="Không. Brand có thể xem hồ sơ public và gửi yêu cầu mà không cần đăng nhập."
                    />
                    <FAQItem
                        question="Dữ liệu của tôi có được bảo mật không?"
                        answer="Chắc chắn. Alino cam kết bảo mật thông tin hợp đồng và báo giá của bạn."
                    />
                </div>

                {/* Final CTA */}
                <div className={styles.ctaBand}>
                    <h2>Bắt đầu làm việc chuyên nghiệp hơn với Alino</h2>
                    <p>Thiết lập trong 5 phút · Không cần biết thiết kế · Dùng ngay</p>
                    <button className={styles.btnWhite}>
                        Tạo trang Alino miễn phí
                    </button>
                </div>

                {/* Links */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>© 2024 Alino. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#">Terms</a>
                        <a href="#">Privacy</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
