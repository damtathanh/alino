import { Navigate } from 'react-router-dom'

/**
 * BrandRoutes: Legacy route component
 * 
 * All old /brand/* routes must go through AppGate at /app.
 * This component redirects to /app which handles authentication,
 * role selection, and onboarding before routing to the correct dashboard.
 */
export function BrandRoutes() {
  // Guard: All old /brand/* routes must go through AppGate
  return <Navigate to="/app" replace />
}

