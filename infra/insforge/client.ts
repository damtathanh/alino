import { createClient as createInsForgeClient } from '@insforge/sdk';

/**
 * InsForge API endpoint path for getting current user
 * Adjust this constant if the actual endpoint path differs
 */
const INSFORGE_ME_PATH = '/auth/user';

/**
 * InsForge client configuration
 */
export interface InsForgeClientConfig {
  accessToken?: string;
}

/**
 * Get InsForge API base URL from environment variables
 * @returns Base URL
 * @throws Error if required environment variables are missing
 */
function getInsforgeBaseUrl(): string {
  const baseUrl =
    process.env.INSFORGE_API_BASE_URL ||
    process.env.NEXT_PUBLIC_INSFORGE_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      'INSFORGE_API_BASE_URL or NEXT_PUBLIC_INSFORGE_BASE_URL environment variable is required'
    );
  }

  return baseUrl;
}

/**
 * Make a fetch request to InsForge API
 * @param path API path (e.g., '/auth/user')
 * @param options Fetch options
 * @param accessToken Optional access token for authenticated requests
 * @returns Fetch response
 */
export async function insforgeFetch(
  path: string,
  options: RequestInit = {},
  accessToken?: string
): Promise<Response> {
  const baseUrl = getInsforgeBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Get current user from InsForge API using access token
 * @param accessToken The access token
 * @returns User data object or null if not authenticated
 */
export async function getInsforgeCurrentUser(
  accessToken: string
): Promise<{
  id: string;
  email?: string | null;
  name?: string | null;
  [key: string]: unknown;
} | null> {
  try {
    const response = await insforgeFetch(INSFORGE_ME_PATH, {
      method: 'GET',
    }, accessToken);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Not authenticated
        return null;
      }
      // Other errors - log and return null
      console.error(`InsForge API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Normalize the response - handle different possible structures
    // Common patterns: { user: {...} }, { data: {...} }, or direct user object
    const userData = data.user || data.data || data;

    if (!userData || !userData.id) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email ?? null,
      name: userData.name ?? userData.user_metadata?.name ?? userData.profile?.name ?? null,
      ...userData,
    };
  } catch (error) {
    console.error('Error fetching current user from InsForge:', error);
    return null;
  }
}

/**
 * Get InsForge client instance
 * Reads INSFORGE_API_BASE_URL from environment variables
 * @param config Optional configuration (e.g., accessToken for authenticated requests)
 * @returns InsForge client instance
 * @throws Error if required environment variables are missing
 */
export function getInsforgeClient(config?: InsForgeClientConfig) {
  const baseUrl = getInsforgeBaseUrl();

  const clientConfig: Parameters<typeof createInsForgeClient>[0] = {
    baseUrl,
  };

  // Use accessToken if provided (for authenticated requests)
  if (config?.accessToken) {
    clientConfig.edgeFunctionToken = config.accessToken;
  } else {
    // Fallback to environment variable for anonymous access
    const anonKey =
      process.env.INSFORGE_API_KEY || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
    if (anonKey) {
      clientConfig.anonKey = anonKey;
    }
  }

  return createInsForgeClient(clientConfig);
}
