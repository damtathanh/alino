import { getSupabase } from '../lib/supabase'

/**
 * useAuthOperations: Provides authentication operations (signOut, etc.)
 * 
 * Responsibilities:
 * - Encapsulates Supabase auth operations
 * - Does NOT manage state (that's handled by useAuthState)
 */
export function useAuthOperations() {
  const supabase = getSupabase()

  const signOut = async () => {
    await supabase.auth.signOut()
    // Session will be cleared by onAuthStateChange listener in useAuthState
  }

  return { signOut }
}
