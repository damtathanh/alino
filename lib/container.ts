import {
  createAuthRepository,
  createCreatorRepository,
  createBrandRequestRepository,
} from '@/infra/insforge';
import type { AuthRepository } from '@/core/contracts/auth-repository';
import type { CreatorRepository } from '@/core/contracts/creator-repository';
import type { BrandRequestRepository } from '@/core/contracts/brand-request-repository';

/**
 * Service container for dependency injection
 * All vendor-specific implementations are wired here
 */
export interface Services {
  authRepository: AuthRepository;
  creatorRepository: CreatorRepository;
  brandRequestRepository: BrandRequestRepository;
}

/**
 * Get service instances
 * This is the single composition root for all services
 * @returns Service instances
 */
export function getServices(): Services {
  return {
    authRepository: createAuthRepository(),
    creatorRepository: createCreatorRepository(),
    brandRequestRepository: createBrandRequestRepository(),
  };
}
