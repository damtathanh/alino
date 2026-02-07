/**
 * Base URL for public-facing links (profile shares, etc.).
 * Never use localhost for links shared with users.
 */
export const PUBLIC_APP_BASE_URL = 'https://alino-navy.vercel.app'

export function publicProfileUrl(creatorId: string): string {
  return `${PUBLIC_APP_BASE_URL}/c/${creatorId}`
}
