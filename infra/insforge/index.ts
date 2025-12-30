import { InsforgeAuthRepository } from './auth/InsforgeAuthRepository';
import { InsforgeCreatorRepository } from './creator/InsforgeCreatorRepository';
import { InsforgeBrandRequestRepository } from './brand-request/InsforgeBrandRequestRepository';
import type { AuthRepository } from '@/core/contracts/auth-repository';
import type { CreatorRepository } from '@/core/contracts/creator-repository';
import type { BrandRequestRepository } from '@/core/contracts/brand-request-repository';

/**
 * Factory function to create an InsForge AuthRepository instance
 * @returns AuthRepository implementation using InsForge
 */
export function createAuthRepository(): AuthRepository {
  return new InsforgeAuthRepository();
}

/**
 * Factory function to create an InsForge CreatorRepository instance
 * @returns CreatorRepository implementation using InsForge
 */
export function createCreatorRepository(): CreatorRepository {
  return new InsforgeCreatorRepository();
}

/**
 * Factory function to create an InsForge BrandRequestRepository instance
 * @returns BrandRequestRepository implementation using InsForge
 */
export function createBrandRequestRepository(): BrandRequestRepository {
  return new InsforgeBrandRequestRepository();
}
