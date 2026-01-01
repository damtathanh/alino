import { requireRoleButNoOnboarding } from '@/lib/auth-guards';
import OnboardingPageClient from './OnboardingPageClient';

export default async function OnboardingPage() {
  // Server-side guard: redirects if not authenticated, no role, or already completed
  const { profile } = await requireRoleButNoOnboarding();

  if (!profile?.role) {
    // Guard should have redirected, but just in case
    return null;
  }

  const role = profile.role as 'creator' | 'brand';

  return <OnboardingPageClient role={role} />;
}