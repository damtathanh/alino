import type { Session } from '@supabase/supabase-js'

/**
 * authHelpers: Utility functions for authentication-related computations
 * 
 * All functions are pure (no side effects) and can be safely reused across components.
 */

/**
 * Extracts user object from session
 * 
 * @param session - Supabase session object or null
 * @returns User object if session exists, null otherwise
 */
export function getUserFromSession(session: Session | null): Session['user'] | null {
  return session?.user ?? null
}

/**
 * Checks if a user is authenticated based on session
 * 
 * @param session - Supabase session object or null
 * @returns true if session exists (user is authenticated), false otherwise
 */
export function isUserAuthenticated(session: Session | null): boolean {
  return !!session
}
