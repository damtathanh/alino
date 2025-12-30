import type { Creator } from '@/core/domain/creator';

export interface CreatorRepository {
  /**
   * Get creator by user ID
   * @param userId The user ID
   * @returns Creator or null if not found
   */
  getByUserId(userId: string): Promise<Creator | null>;

  /**
   * Create or update creator profile by user ID
   * @param userId The user ID
   * @param input Creator profile data
   * @returns Updated creator
   */
  upsertByUserId(
    userId: string,
    input: { displayName: string; bio?: string | null; niche?: string | null }
  ): Promise<Creator>;
}

