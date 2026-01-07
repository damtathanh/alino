/**
 * useAuth: Re-export from AuthContext
 * 
 * This hook now reads from AuthContext (single source of truth).
 * All components should use this hook to access auth state.
 * 
 * IMPORTANT: signOut() does NOT handle navigation.
 * Components must handle redirects after signOut themselves.
 */
export { useAuth } from '../contexts/AuthContext'

