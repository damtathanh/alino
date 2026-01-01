import { requireAuth } from '@/lib/auth-guards';
import SettingsPageClient from './SettingsPageClient';

export default async function SettingsPage() {
  // Server-side guard: requires authentication
  await requireAuth();

  return <SettingsPageClient />;
}
