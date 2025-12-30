import type { Session } from '@/core/domain/auth';

export interface AuthRepository {
  /**
   * Get the current session
   * @returns The current session or null if not authenticated
   */
  getSession(): Promise<Session | null>;

  /**
   * Sign out the current user
   */
  signOut(): Promise<void>;
}
