import { requireNoRole } from '@/lib/auth-guards';
import RolePageClient from './RolePageClient';

export default async function RolePage() {
  // Server-side guard: redirects if not authenticated or already has role
  await requireNoRole();

  return <RolePageClient />;
}