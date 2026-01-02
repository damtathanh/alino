import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useProfile } from './hooks/useProfile'
import AuthGate from './components/AuthGate'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import RolePage from './pages/RolePage'
import OnboardingPage from './pages/OnboardingPage'
import CreatorDashboard from './pages/CreatorDashboard'
import BrandDashboard from './pages/BrandDashboard'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

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
    return <Navigate to="/dashboard" replace />
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

      <Route
        path="/role"
        element={
          <ProtectedRoute>
            <RolePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AuthGate>
            <DashboardRouter />
          </AuthGate>
        }
      />

      <Route
        path="/creator"
        element={
          <AuthGate>
            <CreatorDashboard />
          </AuthGate>
        }
      />

      <Route
        path="/brand"
        element={
          <AuthGate>
            <BrandDashboard />
          </AuthGate>
        }
      />

      <Route
        path="/profile"
        element={
          <AuthGate>
            <ProfilePage />
          </AuthGate>
        }
      />

      <Route
        path="/settings"
        element={
          <AuthGate>
            <SettingsPage />
          </AuthGate>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function DashboardRouter() {
  const { user } = useAuth()
  const { profile } = useProfile(user?.id)

  if (!profile) return null

  if (profile.role === 'creator') {
    return <CreatorDashboard />
  }

  return <BrandDashboard />
}
