import { requireCompleteProfile } from '@/lib/auth-guards';
import BrandDashboard from './BrandDashboard';

export default async function BrandPage() {
  // Server-side guard: requires complete profile with brand role
  await requireCompleteProfile('brand');

  return <BrandDashboard />;
}