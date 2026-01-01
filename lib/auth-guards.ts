// Auth guard utilities for route-level protection
import { createServerClientWithCookies } from './supabase-server';
import { redirect } from 'next/navigation';

export interface ProfileCheckResult {
  hasSession: boolean;
  hasProfile: boolean;
  profile?: {
    id: string;
    role: string | null;
    onboarding_completed: boolean;
  } | null;
}

/**
 * Check if user has valid session and profile from database
 * This is the source of truth - checks database, not just cookies
 */
export async function checkAuthAndProfile(): Promise<ProfileCheckResult> {
  const supabase = createServerClientWithCookies();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      hasSession: false,
      hasProfile: false,
    };
  }

  // Check profile from database (source of truth)
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role, onboarding_completed')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    // Session exists but no profile - invalid state
    // Sign out and clear auth state
    await supabase.auth.signOut();
    return {
      hasSession: false,
      hasProfile: false,
    };
  }

  return {
    hasSession: true,
    hasProfile: true,
    profile,
  };
}

/**
 * Guard for protected routes - redirects to landing if not authenticated
 * Use this in protected page components
 */
export async function requireAuth(): Promise<ProfileCheckResult> {
  const result = await checkAuthAndProfile();

  if (!result.hasSession || !result.hasProfile) {
    redirect('/');
  }

  return result;
}

/**
 * Guard for role selection page - redirects if already has role
 */
export async function requireNoRole(): Promise<ProfileCheckResult> {
  const result = await checkAuthAndProfile();

  if (!result.hasSession || !result.hasProfile) {
    redirect('/');
  }

  if (result.profile?.role) {
    // Already has role, redirect to next step
    if (!result.profile.onboarding_completed) {
      redirect('/onboarding');
    } else {
      redirect(`/${result.profile.role}`);
    }
  }

  return result;
}

/**
 * Guard for onboarding page - redirects if not ready for onboarding
 */
export async function requireRoleButNoOnboarding(): Promise<ProfileCheckResult> {
  const result = await checkAuthAndProfile();

  if (!result.hasSession || !result.hasProfile) {
    redirect('/');
  }

  if (!result.profile?.role) {
    // No role yet, redirect to role selection
    redirect('/role');
  }

  if (result.profile.onboarding_completed) {
    // Already completed onboarding, redirect to dashboard
    redirect(`/${result.profile.role}`);
  }

  return result;
}

/**
 * Guard for dashboard pages - requires complete profile
 */
export async function requireCompleteProfile(expectedRole?: string): Promise<ProfileCheckResult> {
  const result = await checkAuthAndProfile();

  if (!result.hasSession || !result.hasProfile) {
    redirect('/');
  }

  if (!result.profile?.role) {
    redirect('/role');
  }

  if (!result.profile.onboarding_completed) {
    redirect('/onboarding');
  }

  if (expectedRole && result.profile.role !== expectedRole) {
    redirect(`/${result.profile.role}`);
  }

  return result;
}

