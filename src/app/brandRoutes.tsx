import { Navigate } from 'react-router-dom'

/**
 * BrandRoutes: Legacy route component - redirect-only
 * 
 * All old /brand/* routes must go through AppGate at /app.
 * This component redirects to /app which handles authentication,
 * role selection, and onboarding before routing to the correct dashboard.
 * 
 * Architecture: This is a redirect-only component that MUST NOT accept children.
 * It should only be used as a terminal route element: element={<BrandRoutes />}
 * Using it as a child of wrapper components violates the architectural contract.
 */
export function BrandRoutes(): JSX.Element {
  // Guard: All old /brand/* routes must go through AppGate
  return <Navigate to="/app" replace />
}

