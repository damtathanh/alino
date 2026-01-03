import { useLocation } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import DashboardHome from './DashboardHome'
import ComingSoonPage from './ComingSoonPage'

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
  
  // All other dashboard routes show coming soon
  return (
    <DashboardLayout>
      <ComingSoonPage />
    </DashboardLayout>
  )
}

