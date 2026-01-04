import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import SignupPage from '../pages/public/SignupPage'
import VerifyEmailPage from '../pages/public/VerifyEmailPage'
import AppGate from './AppGate'
import RolePage from '../pages/onboarding/RolePage'
import OnboardingPage from '../pages/onboarding/OnboardingPage'
import TermsPage from '../pages/public/TermsPage'
import PrivacyPage from '../pages/public/PrivacyPage'
import { CreatorRoutes } from './creatorRoutes'
import { BrandRoutes } from './brandRoutes'
import DashboardRoutes from './dashboardRoutes'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (session) {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}

function RoleBasedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole: 'creator' | 'brand' }) {
  const { session, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile(session?.user?.id, !!session)

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!session || !profile) {
    return <Navigate to="/app" replace />
  }

  if (profile.role !== requiredRole) {
    if (profile.role === 'creator') {
      return <Navigate to="/dashboard/creator" replace />
    } else if (profile.role === 'brand') {
      return <Navigate to="/dashboard/brand" replace />
    }
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      <Route path="/app" element={<AppGate />} />

      <Route
        path="/role"
        element={
          <ProtectedRoute>
            <RolePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/:role?"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/:role/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/creator/*"
        element={
          <RoleBasedRoute requiredRole="creator">
            <CreatorRoutes />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/brand/*"
        element={
          <RoleBasedRoute requiredRole="brand">
            <BrandRoutes />
          </RoleBasedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

