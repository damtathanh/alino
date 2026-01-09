import { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { LoadingState } from '../components/shared/LoadingState'
import type { RouteRole } from './routeConfig'

/**
 * routeGuards: Permission and validation logic for routes
 * 
 * These components handle authentication and role validation.
 * Route definitions are separate from permission logic.
 */

/**
 * DashboardRouteGuard: Validates authentication and role for dashboard routes
 * 
 * Responsibilities:
 * - Checks if user is authenticated
 * - Validates role matches URL parameter
 * - Redirects to /app if role mismatch (AppGate will handle routing)
 */
export function DashboardRouteGuard({ children }: { children: ReactNode }) {
  const { role } = useParams<{ role: RouteRole }>()
  const { session, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )

  if (authLoading || profileLoading) {
    return <LoadingState />
  }

  if (!session || !profile) {
    return <Navigate to="/login" replace />
  }

  // Validate role in URL matches profile role
  if (!role || (role !== 'creator' && role !== 'brand') || profile.role !== role) {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}
