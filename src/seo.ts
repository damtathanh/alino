export type SeoConfig = {
    title: string;
    description?: string;
    canonical?: string;
};

export const DEFAULT_SEO: SeoConfig = {
    title: "Alino",
    description: "Kết nối Creators & Brands để tạo tăng trưởng thật.",
};

export function buildTitle(pageTitle?: string) {
    if (!pageTitle) return DEFAULT_SEO.title;
    if (pageTitle.toLowerCase().includes("alino")) return pageTitle;
    return `${pageTitle} • ${DEFAULT_SEO.title}`;
}
