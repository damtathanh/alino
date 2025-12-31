import type { AuthRepository } from '@/core/contracts/auth-repository';
import type { CreatorRepository } from '@/core/contracts/creator-repository';
import type { BrandRequestRepository } from '@/core/contracts/brand-request-repository';
import { SupabaseAuthRepository } from '@/infra/supabase/auth/SupabaseAuthRepository';

export function getServices(): {
  authRepository: AuthRepository;
  creatorRepository: CreatorRepository;
  brandRequestRepository: BrandRequestRepository;
} {
  return {
    authRepository: new SupabaseAuthRepository(),
    creatorRepository: null as any,
    brandRequestRepository: null as any,
  };
}

