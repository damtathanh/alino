'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/verify-email', '/auth/callback'];
const AUTH_ROUTES = ['/login', '/signup', '/verify-email'];
// Routes that only require authentication (not full profile completion)
const AUTH_ONLY_ROUTES = ['/profile', '/settings'];
// Routes that require complete profile (role + onboarding)
const COMPLETE_PROFILE_ROUTES = ['/creator', '/brand'];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const profileCheckDone = useRef(false);
  const profileDataRef = useRef<{ role: string; onboarding_completed: boolean } | null>(null);
  const checkingRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    // Handle unauthenticated users
    if (!session) {
      profileCheckDone.current = false;
      profileDataRef.current = null;
      if (!PUBLIC_ROUTES.includes(pathname)) {
        router.replace('/login');
      }
      return;
    }

    // For auth-only routes (profile, settings), allow access if authenticated
    if (AUTH_ONLY_ROUTES.includes(pathname)) {
      return;
    }

    // If profile check already done, handle redirects based on cached profile
    if (profileCheckDone.current && profileDataRef.current) {
      const profile = profileDataRef.current;
      const currentPath = pathname;
      
      // Allow access to role/onboarding pages if user is in those states
      if (!profile.role && currentPath === '/role') {
        return;
      }
      if (!profile.onboarding_completed && currentPath === '/onboarding') {
        return;
      }
      
      // Redirect if user doesn't have role but trying to access other pages
      if (!profile.role && currentPath !== '/role' && !AUTH_ONLY_ROUTES.includes(currentPath)) {
        router.replace('/role');
        return;
      }
      
      // Redirect if user hasn't completed onboarding but trying to access dashboard
      if (!profile.onboarding_completed && COMPLETE_PROFILE_ROUTES.includes(currentPath)) {
        router.replace('/onboarding');
        return;
      }
      
      // Redirect landing/auth pages to dashboard if profile is complete
      if (currentPath === '/' || AUTH_ROUTES.includes(currentPath)) {
        router.replace(`/${profile.role}`);
        return;
      }
      
      // Allow navigation to other routes
      return;
    }

    // Perform initial profile check (only once per session)
    if (checkingRef.current) return;

    checkingRef.current = true;
    let cancelled = false;

    fetch('/api/auth/profile-check', {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(({ hasSession, hasProfile, profile }) => {
        if (cancelled) return;
        checkingRef.current = false;

        if (!hasSession || !hasProfile) {
          profileCheckDone.current = false;
          profileDataRef.current = null;
          router.replace('/login');
          return;
        }

        profileCheckDone.current = true;
        profileDataRef.current = {
          role: profile.role,
          onboarding_completed: profile.onboarding_completed,
        };

        const currentPath = pathname;

        // Don't redirect from auth-only routes
        if (AUTH_ONLY_ROUTES.includes(currentPath)) {
          return;
        }

        if (!profile.role) {
          if (currentPath !== '/role') {
            router.replace('/role');
          }
          return;
        }

        if (!profile.onboarding_completed) {
          // Allow access to onboarding page, redirect from dashboard pages
          if (currentPath !== '/onboarding' && COMPLETE_PROFILE_ROUTES.includes(currentPath)) {
            router.replace('/onboarding');
          }
          return;
        }

        // Redirect landing/auth pages to dashboard
        if (currentPath === '/' || AUTH_ROUTES.includes(currentPath)) {
          router.replace(`/${profile.role}`);
        }
      })
      .catch(() => {
        if (!cancelled) {
          checkingRef.current = false;
          profileCheckDone.current = false;
          profileDataRef.current = null;
          router.replace('/login');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [session, loading, pathname, router]);

  if (loading) return null;

  return <>{children}</>;
}
