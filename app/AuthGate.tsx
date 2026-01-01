'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/verify-email', '/auth/callback'];
const AUTH_ROUTES = ['/login', '/signup', '/verify-email'];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!session && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/login');
      return;
    }

    if (session) {
      fetch('/api/auth/profile-check')
        .then(res => res.json())
        .then(({ hasSession, hasProfile, profile }) => {
          if (!hasSession || !hasProfile) {
            router.replace('/login');
            return;
          }

          if (!profile.role) {
            router.replace('/role');
            return;
          }

          if (!profile.onboarding_completed) {
            router.replace('/onboarding');
            return;
          }

          if (pathname === '/' || AUTH_ROUTES.includes(pathname)) {
            router.replace(`/${profile.role}`);
          }
        })
        .catch(() => {
          router.replace('/login');
        });
    }
  }, [session, loading, pathname, router]);

  return <>{children}</>;
}
