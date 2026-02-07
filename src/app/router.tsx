import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { LoadingState } from '../components/shared/LoadingState'
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import SignupPage from '../pages/public/SignupPage'
import VerifyEmailPage from '../pages/public/VerifyEmailPage'
import AppGate from './AppGate'
import RolePage from '../pages/onboarding/RolePage'
import OnboardingPage from '../pages/onboarding/OnboardingPage'
import TermsPage from '../pages/public/TermsPage'
import PrivacyPage from '../pages/public/PrivacyPage'
import PublicCreatorProfilePage from '../pages/public/PublicCreatorProfilePage'
import CreatorProfileLandingPage from '../pages/public/CreatorProfileLandingPage'
import { CreatorRoutes } from './creatorRoutes'
import { BrandRoutes } from './brandRoutes'
import DashboardRoutes from './dashboardRoutes'
import type { RouteRole } from './routeConfig'

/**
 * ProtectedRoute: Simple auth check - redirects to login if not authenticated
 * Used for routes that require authentication but don't need role/onboarding checks
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingState />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

/**
 * RoleBasedRoute: Protects routes that require a specific role
 * Only checks role match - no redirects to /app or dashboards
 */
function RoleBasedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole: RouteRole }) {
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

  if (profile.role !== requiredRole) {
    // Role mismatch - redirect to login (user should go through /app to get to correct route)
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

/**
 * CatchAllRoute: Simple 404 handler
 * Just redirects to login if not authenticated, otherwise shows 404
 */
function CatchAllRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingState />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Authenticated but unknown route - show 404
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-[#6B7280] mb-4">Trang không tồn tại</p>
        <Navigate to="/" replace />
      </div>
    </div>
  )
}

export function Router() {
  return (
    <Routes>
      {/* Public routes - no AppGate, always accessible */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/creator/:id" element={<PublicCreatorProfilePage />} />
      <Route path="/c/:creatorId" element={<CreatorProfileLandingPage />} />

      {/* AppGate routes - /app is the ONLY decision gate */}
      {/* AppGate handles: auth check, role check, onboarding check, and redirects */}
      <Route
        path="/app"
        element={
          <AppGate>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-[#6B7280]">Đang tải...</div>
            </div>
          </AppGate>
        }
      />

      <Route
        path="/role"
        element={
          <AppGate>
            <ProtectedRoute>
              <RolePage />
            </ProtectedRoute>
          </AppGate>
        }
      />

      <Route
        path="/onboarding/:role?"
        element={
          <AppGate>
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          </AppGate>
        }
      />

      {/* Dashboard routes - OUTSIDE AppGate, stable final destinations */}
      {/* These routes never redirect on their own - they are the final destination */}
      <Route
        path="/dashboard/:role/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />

      {/* Legacy routes - keep for backward compatibility */}
      {/* Redirect-only components used as terminal route elements (not wrapped) */}
      {/* They redirect to /app which handles auth, role, and onboarding checks */}
      <Route
        path="/creator/*"
        element={<CreatorRoutes />}
      />

      <Route
        path="/brand/*"
        element={<BrandRoutes />}
      />

      {/* 404 handler */}
      <Route path="*" element={<CatchAllRoute />} />
    </Routes>
  )
}

