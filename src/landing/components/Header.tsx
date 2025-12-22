
import styles from '../landing.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                fill="#4F46E5"
                                stroke="#4F46E5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="#4F46E5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="#4F46E5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>ALINO</span>
                    </div>

                    <nav className={styles.nav}>
                        <a href="#features" className={styles.navLink}>
                            Features
                        </a>
                        <a href="#how-it-works" className={styles.navLink}>
                            How it works
                        </a>
                        <a href="#for-brands" className={styles.navLink}>
                            For Brands
                        </a>
                        <a href="#faq" className={styles.navLink}>
                            FAQ
                        </a>
                    </nav>

                    <button className={styles.btnPrimary}>
                        Tạo trang Alino miễn phí
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
