import { createContext, useContext, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useAuthState } from '../hooks/useAuthState'
import { useAuthOperations } from '../hooks/useAuthOperations'
import { getUserFromSession, isUserAuthenticated } from '../utils/authHelpers'

/**
 * AuthContextType: Public API for authentication state and operations
 * 
 * This interface defines what components can access from the auth context.
 * All external code should depend only on this interface.
 */
export interface AuthContextType {
  session: Session | null
  user: Session['user'] | null
  loading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider: Wires auth state and operations, exposes public API
 * 
 * Responsibilities:
 * - Composes useAuthState and useAuthOperations
 * - Derives computed values (user, isAuthenticated)
 * - Provides context value to children
 * - Does NOT handle routing/navigation (that's handled by components)
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, loading } = useAuthState()
  const { signOut } = useAuthOperations()

  const value: AuthContextType = {
    session,
    user: getUserFromSession(session),
    loading,
    isAuthenticated: isUserAuthenticated(session),
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth: Hook to access auth context
 * 
 * Rules:
 * - ONLY reads from AuthContext
 * - NEVER manages its own state
 * - NEVER calls useNavigate() or handles routing
 * - Returns stable session state from context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

