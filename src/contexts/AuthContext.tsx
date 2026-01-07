import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  user: Session['user'] | null
  loading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider: Single source of truth for authentication state
 * 
 * Responsibilities:
 * - Fetches initial session on mount
 * - Listens to auth state changes from Supabase
 * - Provides stable session state to all components
 * - Does NOT handle routing/navigation (that's handled by components)
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabase()

  useEffect(() => {
    let mounted = true

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      setSession(session)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
    // Session will be cleared by onAuthStateChange listener
  }

  const value: AuthContextType = {
    session,
    user: session?.user ?? null,
    loading,
    isAuthenticated: !!session,
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

