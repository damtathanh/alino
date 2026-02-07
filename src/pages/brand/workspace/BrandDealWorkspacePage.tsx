import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { getSupabase } from '../../../lib/supabase'
import type { Deal } from '../../../types/deal'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'
import { FaUsers, FaHandshake } from 'react-icons/fa'

/**
 * BrandDealWorkspacePage: Shared workspace for one deal
 *
 * Route: /dashboard/brand/workspace/deal/:dealId
 * - Brand sees this after clicking "Start collaboration"
 * - Communicates: shared workspace, where collaboration happens
 */

interface CreatorInfo {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export default function BrandDealWorkspacePage() {
  const { dealId } = useParams<{ dealId: string }>()
  const { session } = useAuth()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [creator, setCreator] = useState<CreatorInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!dealId || !session?.user?.id) {
      setLoading(false)
      if (!session?.user?.id) return
      setError('Deal not found')
      return
    }

    async function fetchDealAndCreator() {
      const supabase = getSupabase()

      try {
        const { data: dealData, error: dealError } = await supabase
          .from('deals')
          .select('*')
          .eq('id', dealId)
          .eq('brand_id', session.user.id)
          .single()

        if (dealError || !dealData) {
          setError('Deal not found')
          setLoading(false)
          return
        }

        setDeal(dealData as Deal)

        const { data: creatorProfile } = await supabase
          .from('creator_profiles')
          .select('user_id, full_name, avatar_url')
          .eq('user_id', dealData.creator_id)
          .single()

        if (creatorProfile) {
          setCreator({
            id: creatorProfile.user_id,
            full_name: creatorProfile.full_name ?? null,
            avatar_url: creatorProfile.avatar_url ?? null,
          })
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchDealAndCreator()
  }, [dealId, session?.user?.id])

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )
  }

  if (error || !deal) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <ErrorState message={error || 'Deal not found'} />
          <Link
            to="/dashboard/brand/workspace"
            className="mt-4 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center"
          >
            Back to Workspace
          </Link>
        </div>
      </div>
    )
  }

  const creatorName = creator?.full_name || 'Creator'
  const statusLabel = deal.status.replace('_', ' ')

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/dashboard/brand/workspace"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Workspace
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white">
                <FaUsers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Shared Workspace</h1>
                <p className="text-sm text-gray-600">
                  This is where your collaboration will happen
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              You and the creator will use this space to coordinate deliverables, share feedback, and complete the collaboration.
            </p>
          </div>

          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Collaboration with
            </h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {creator?.avatar_url ? (
                <img
                  src={creator.avatar_url}
                  alt={creatorName}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-lg font-bold">
                  {creatorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{creatorName}</p>
                <p className="text-sm text-gray-600 capitalize">Status: {statusLabel}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaHandshake className="w-4 h-4" />
              <span>Deal created. The creator can see this collaboration in their My Deals.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
