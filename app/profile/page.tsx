import { requireAuth } from '@/lib/auth-guards';
import ProfilePageClient from './ProfilePageClient';

export default async function ProfilePage() {
  // Server-side guard: requires authentication
  const { profile } = await requireAuth();

  return <ProfilePageClient profile={profile!} />;
}
