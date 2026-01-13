import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { getSupabase } from '../../../lib/supabase'
import type { Proposal } from '../../../types/proposal'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'

export default function MyProposalsPage() {
  const { session } = useAuth()
  const userId = session?.user?.id ?? null

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      setProposals([])
      return
    }

    async function fetchProposals() {
      const supabase = getSupabase()

      try {
        const { data, error: fetchError, status } = await supabase
          .from('proposals')
          .select('*')
          .eq('creator_id', userId)
          .order('created_at', { ascending: false })

        // 🔑 UX FIX:
        // 403 (RLS) = empty state, not failure
        if (fetchError) {
          if (status === 403) {
            setProposals([])
            setError(null)
          } else {
            setError('Không thể tải danh sách proposal')
          }
          setLoading(false)
          return
        }

        setProposals(data ?? [])
        setError(null)
        setLoading(false)
      } catch (err) {
        console.error('Fetch proposals failed:', err)
        setError('Không thể tải danh sách proposal')
        setLoading(false)
      }
    }

    fetchProposals()
  }, [userId])

  const getStatusBadge = (status: Proposal['status']) => {
    const statusConfig: Record<
      Proposal['status'],
      { label: string; className: string }
    > = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-700' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
    }

    const config = statusConfig[status]

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number | null) => {
    if (price === null) return 'N/A'
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <LoadingState />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <ErrorState message={error} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Proposals</h1>
          <p className="text-gray-600">
            View all your proposals submitted to brands
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-2">You don't have any proposals yet</p>
            <p className="text-sm text-gray-500">
              Proposals will appear here once you submit them
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Proposal ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Campaign ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {proposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {proposal.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {proposal.campaign_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatPrice(proposal.price)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(proposal.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(proposal.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
