import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useProfile } from './hooks/useProfile'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import AppGate from './pages/AppGate'
import RolePage from './pages/RolePage'
import OnboardingPage from './pages/OnboardingPage'
import CreatorDashboard from './pages/CreatorDashboard'
import BrandDashboard from './pages/BrandDashboard'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import ComingSoonPage from './pages/ComingSoonPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

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
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/profile"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/services"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/opportunities"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/proposals"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/workspace"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/analytics"
        element={<DashboardEntry />}
      />

      <Route
        path="/dashboard/settings"
        element={<DashboardEntry />}
      />

      <Route
        path="/projects"
        element={<DashboardEntry />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function DashboardEntry() {
  const { session, loading: authLoading, user, isAuthenticated } = useAuth()
  const { profile, loading: profileLoading, error: profileError } = useProfile(user?.id, isAuthenticated)

  // a) If not authenticated → do nothing (let AppGate handle it)
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  // b) If profile is loading → do nothing (show loading)
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  // c) If profile error or missing → let AppGate handle redirect (don't redirect here)
  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B7280]">Đang tải...</div>
      </div>
    )
  }

  // Profile loaded successfully, render unified dashboard
  return <Dashboard />
}
