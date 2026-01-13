import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { getSupabase } from '../../../lib/supabase'
import type { Deal } from '../../../types/deal'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'

export default function MyDealsPage() {
  const { session } = useAuth()
  const userId = session?.user?.id ?? null

  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      setDeals([])
      return
    }

    async function fetchDeals() {
      const supabase = getSupabase()

      try {
        const { data, error: fetchError, status } = await supabase
          .from('deals')
          .select('*')
          .eq('creator_id', userId)
          .order('created_at', { ascending: false })

        // 🔑 IMPORTANT UX FIX:
        // 403 (RLS) is treated as empty state, not error
        if (fetchError) {
          if (status === 403) {
            setDeals([])
            setError(null)
          } else {
            setError('Không thể tải danh sách deal')
          }
          setLoading(false)
          return
        }

        setDeals(data ?? [])
        setError(null)
        setLoading(false)
      } catch (err) {
        console.error('Fetch deals failed:', err)
        setError('Không thể tải danh sách deal')
        setLoading(false)
      }
    }

    fetchDeals()
  }, [userId])

  const getStatusBadge = (status: Deal['status']) => {
    const statusConfig: Record<Deal['status'], { label: string; className: string }> = {
      invited: { label: 'Invited', className: 'bg-blue-100 text-blue-700' },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-700' },
      in_progress: { label: 'In Progress', className: 'bg-yellow-100 text-yellow-700' },
      delivered: { label: 'Delivered', className: 'bg-purple-100 text-purple-700' },
      approved: { label: 'Approved', className: 'bg-indigo-100 text-indigo-700' },
      completed: { label: 'Completed', className: 'bg-gray-100 text-gray-700' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700' },
    }

    const config = statusConfig[status] || statusConfig.invited

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Deals</h1>
          <p className="text-gray-600">
            View all your deals and collaborations with brands
          </p>
        </div>

        {deals.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-2">You don't have any deals yet</p>
            <p className="text-sm text-gray-500">
              Deals will appear here once brands book you
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Deal ID
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
                  {deals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {deal.id}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(deal.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(deal.created_at)}
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
