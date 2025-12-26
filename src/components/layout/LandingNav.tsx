import { useState } from "react";
import { Link } from "react-router-dom";

type NavLeafItem =
    | { label: string; to: string }
    | { label: string; href: string };

type NavGroup = {
    label: string;
    // tab cha click đi đâu (ví dụ: Về chúng tôi -> /about)
    to?: string;
    items: NavLeafItem[];
};

const NAV_ITEMS: NavGroup[] = [
    {
        label: "Về chúng tôi", to: "/about",
        items: [
            { label: "Về Alino", to: "/about-alino" },
            { label: "Đối tác", to: "/partners" },
            { label: "Tuyển dụng", to: "/careers" },
        ],
    },
    {
        label: "Sản phẩm", to: "/product",
        items: [
            { label: "Tính năng", to: "/features" },
            { label: "Bảng giá", to: "/pricing" },
            { label: "Cho Creators", to: "/creators" },
            { label: "Cho Brands", to: "/brands" },
        ],
    },
    {
        label: "Xu hướng", to: "/trends",
        items: [
            { label: "Tin tức", href: "/news" },
            { label: "Sự kiện", href: "/events" },
            { label: "Blog", href: "/blog" },
        ],
    },
];

export default function LandingNav() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((nav, idx) => {
                const tabClass =
                    "text-sm font-medium text-secondary hover:text-primary transition";

                return (
                    <div
                        key={nav.label}
                        className="relative"
                        onMouseEnter={() => setOpenIndex(idx)}
                        onMouseLeave={() => setOpenIndex(null)}
                    >
                        {/* TAB CHA: có to thì click đi route */}
                        {nav.to ? (
                            <Link
                                to={nav.to}
                                className={tabClass}
                                onClick={() => setOpenIndex(null)}
                            >
                                {nav.label}
                            </Link>
                        ) : (
                            <button type="button" className={tabClass}>
                                {nav.label}
                            </button>
                        )}

                        {/* DROPDOWN */}
                        {openIndex === idx && (
                            <div className="absolute top-full left-0">
                                <div className="h-3" />

                                <div className="w-56 bg-white rounded-xl border border-border shadow-card py-2 animate-fade-in-up">
                                    {nav.items.map((item) => {
                                        const itemClass =
                                            "block px-4 py-2.5 text-sm text-secondary hover:bg-bgAlt hover:text-primary transition";

                                        if ("to" in item) {
                                            return (
                                                <Link
                                                    key={item.label}
                                                    to={item.to}
                                                    className={itemClass}
                                                    onClick={() => setOpenIndex(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        }

                                        return (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                className={itemClass}
                                                onClick={() => setOpenIndex(null)}
                                            >
                                                {item.label}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
