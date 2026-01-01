import { redirect } from 'next/navigation';
import HomePageClient from './components/home/HomePageClient';

export default function HomePage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  // 🔥 Intercept email verification code from Supabase
  // Supabase always redirects to Site URL (/) with ?code=...
  if (searchParams?.code) {
    redirect(`/auth/callback?code=${searchParams.code}`);
  }

  return <HomePageClient />;
}