import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'

/**
 * StartCollaborationPage: Creates a new deal and redirects to Deal Workspace
 *
 * Route: /dashboard/brand/start-collaboration?creator_id=xxx
 * - Requires logged-in brand
 * - Creates deal (campaign_id: null, brand_id: current user, creator_id, status: 'invited')
 * - Redirects to /dashboard/brand/workspace/deal/:dealId
 */

export default function StartCollaborationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session } = useAuth()
  const { profile, loading: profileLoading } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const [error, setError] = useState<string | null>(null)

  const creatorId = searchParams.get('creator_id')

  useEffect(() => {
    if (!session || profileLoading) return
    if (!session.user?.id) {
      navigate('/login', { replace: true })
      return
    }
    if (profile && profile.role !== 'brand') {
      setError('Only brands can start a collaboration')
      return
    }
    if (!creatorId) {
      setError('Creator is required')
      return
    }

    async function createDealAndRedirect() {
      const supabase = getSupabase()

      try {
        const { data: deal, error: insertError } = await supabase
          .from('deals')
          .insert({
            campaign_id: null,
            brand_id: session!.user.id,
            creator_id: creatorId,
            status: 'invited',
          })
          .select('id')
          .single()

        if (insertError) {
          setError(insertError.message || 'Failed to create deal')
          return
        }
        if (!deal?.id) {
          setError('Failed to create deal')
          return
        }

        navigate(`/dashboard/brand/workspace/deal/${deal.id}`, { replace: true })
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      }
    }

    createDealAndRedirect()
  }, [session, profile, profileLoading, creatorId, navigate])

  if (!session) {
    return (
      <Navigate
        to="/login"
        state={{ from: `/dashboard/brand/start-collaboration?creator_id=${creatorId || ''}` }}
        replace
      />
    )
  }

  if (profileLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <ErrorState message={error} />
          <button
            onClick={() => navigate('/dashboard/brand')}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <LoadingState />
    </div>
  )
}
