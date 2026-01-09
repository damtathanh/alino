import { Navigate } from 'react-router-dom'

/**
 * CreatorRoutes: Legacy route component
 * 
 * All old /creator/* routes must go through AppGate at /app.
 * This component redirects to /app which handles authentication,
 * role selection, and onboarding before routing to the correct dashboard.
 */
export function CreatorRoutes() {
  // Guard: All old /creator/* routes must go through AppGate
  return <Navigate to="/app" replace />
}

