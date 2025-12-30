import type { AuthRepository } from '@/core/contracts/auth-repository';
import type { Session, User } from '@/core/domain/auth';
import { getInsforgeClient } from '../client';

/**
 * InsForge implementation of AuthRepository
 * Handles authentication using InsForge backend
 */
export class InsforgeAuthRepository implements AuthRepository {
  private accessToken?: string;

  /**
   * Set the access token for authenticated requests
   * @param token The access token
   */
  setAccessToken(token: string | undefined): void {
    this.accessToken = token;
  }

  /**
   * Get the current session from InsForge
   * Uses the access token set via setAccessToken()
   * @returns The current session or null if not authenticated
   */
  async getSession(): Promise<Session | null> {
    try {
      // If no token is available, cannot get authenticated session
      if (!this.accessToken) {
        return null;
      }

      // Create client with accessToken for authenticated requests
      const client = getInsforgeClient({ accessToken: this.accessToken });

      // Use InsForge SDK auth.getCurrentUser() to get current user
      // This method requires the token to be set via edgeFunctionToken in client config
      const { data, error } = await client.auth.getCurrentUser();

      if (error || !data || !data.user) {
        return null;
      }

      const insforgeUser = data.user;

      // Map InsForge user to domain User type
      // UserSchema has: id, email, emailVerified, profile (with name, avatar_url), metadata
      const user: User = {
        id: insforgeUser.id,
        email: insforgeUser.email ?? null,
        name: insforgeUser.profile?.name ?? null,
      };

      const session: Session = {
        user,
        accessToken: this.accessToken,
      };

      return session;
    } catch (error) {
      // If auth fails, user is not authenticated
      console.error('Error getting session:', error);
      return null;
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      if (this.accessToken) {
        const client = getInsforgeClient({ accessToken: this.accessToken });
        await client.auth.signOut();
      }
      // Clear the token after sign out
      this.accessToken = undefined;
    } catch (error) {
      // Silently fail - sign out might already be completed
      console.error('Error during sign out:', error);
    }
  }
}
