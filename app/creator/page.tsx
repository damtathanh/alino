import { requireCompleteProfile } from '@/lib/auth-guards';
import CreatorDashboard from './CreatorDashboard';

export default async function CreatorPage() {
  // Server-side guard: requires complete profile with creator role
  await requireCompleteProfile('creator');

  return <CreatorDashboard />;
}