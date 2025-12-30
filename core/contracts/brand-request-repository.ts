import type { BrandRequest } from '@/core/domain/brand-request';

export interface BrandRequestRepository {
  /**
   * List all brand requests for a creator
   * @param creatorId The creator ID
   * @returns Array of brand requests
   */
  listByCreatorId(creatorId: string): Promise<BrandRequest[]>;

  /**
   * Get a brand request by ID
   * @param id The brand request ID
   * @returns Brand request or null if not found
   */
  getById(id: string): Promise<BrandRequest | null>;
}

