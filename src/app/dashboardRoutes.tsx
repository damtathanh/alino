import { Routes, Route, useParams } from 'react-router-dom'
import CreatorDashboardLayout from '../components/creator/CreatorDashboardLayout'
import BrandDashboardLayout from '../components/brand/BrandDashboardLayout'
import { DashboardRouteGuard } from './routeGuards'
import { getRoutesForRole, fallbackRoute, type RouteRole } from './routeConfig'

/**
 * DashboardRoutes: Stable final destination routes
 * 
 * IMPORTANT: These routes are OUTSIDE AppGate and should NEVER redirect.
 * They are the final destination after onboarding is completed.
 * 
 * If user needs to complete onboarding or select role, they should go through /app
 * (which is handled by AppGate), not through dashboard redirects.
 * 
 * This component:
 * 1. Uses DashboardRouteGuard for authentication and role validation
 * 2. Renders routes from centralized route configuration
 * 3. Applies appropriate layout based on role
 * 
 * No onboarding checks, no role selection redirects - those are handled by AppGate at /app
 */
function DashboardRoutes() {
  const { role } = useParams<{ role: RouteRole }>()
  const routes = role ? getRoutesForRole(role) : []
  const Layout = role === 'creator' ? CreatorDashboardLayout : BrandDashboardLayout

  if (!role || routes.length === 0) {
    return null // Guard will handle redirect
  }

  return (
    <DashboardRouteGuard>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => {
            // Index route (empty path) should use index prop
            if (route.path === '' || route.exact) {
              return (
                <Route
                  key={route.path || 'index'}
                  index
                  element={route.element}
                />
              )
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          })}
          <Route path={fallbackRoute.path} element={fallbackRoute.element} />
        </Route>
      </Routes>
    </DashboardRouteGuard>
  )
}

export default DashboardRoutes

