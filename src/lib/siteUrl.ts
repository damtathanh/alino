import { ENV } from './env';

export function getSiteUrl(): string {
    // ưu tiên env để tránh mismatch khi chạy sau proxy / preview domain
    if (ENV.SITE_URL) return ENV.SITE_URL.replace(/\/$/, '');
    return window.location.origin;
}
