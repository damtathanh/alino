import { useLocation } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import DashboardHome from './DashboardHome'
import ComingSoonPage from './ComingSoonPage'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'

/**
 * Unified Dashboard component that works for both Creator and Brand roles.
 * Routes to appropriate page based on current pathname.
 */
export default function Dashboard() {
  const location = useLocation()
  
  // Dashboard home - show greeting
  if (location.pathname === '/dashboard') {
    return (
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    )
  }
  
  // Profile page
  if (location.pathname === '/dashboard/profile') {
    return (
      <DashboardLayout>
        <ProfilePage />
      </DashboardLayout>
    )
  }
  
  // Settings page
  if (location.pathname === '/dashboard/settings') {
    return (
      <DashboardLayout>
        <SettingsPage />
      </DashboardLayout>
    )
  }
  
  // All other dashboard routes show coming soon
  return (
    <DashboardLayout>
      <ComingSoonPage />
    </DashboardLayout>
  )
}

