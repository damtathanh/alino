import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { getSupabase } from '../../../lib/supabase'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'

/**
 * PrivateCampaignBookingPage: Create private campaign and book creator
 * 
 * Route: /dashboard/brand/campaigns/new/private?creator_id=xxx
 * - Creates a private campaign (status: draft)
 * - Immediately creates a deal (status: invited)
 */

interface BookingFormData {
  title: string
  description: string
  budget_min: string
  budget_max: string
  creator_id: string
}

export default function PrivateCampaignBookingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const creatorIdFromUrl = searchParams.get('creator_id') || ''

  const [formData, setFormData] = useState<BookingFormData>({
    title: '',
    description: '',
    budget_min: '',
    budget_max: '',
    creator_id: creatorIdFromUrl,
  })

  // Update creator_id when URL param changes
  useEffect(() => {
    if (creatorIdFromUrl) {
      setFormData(prev => ({ ...prev, creator_id: creatorIdFromUrl }))
    }
  }, [creatorIdFromUrl])

  const validate = (): boolean => {
    if (!formData.title.trim()) {
      setError('Campaign title is required')
      return false
    }
    if (!formData.creator_id.trim()) {
      setError('Creator ID is required')
      return false
    }
    if (formData.budget_min && isNaN(Number(formData.budget_min))) {
      setError('Minimum budget must be a valid number')
      return false
    }
    if (formData.budget_max && isNaN(Number(formData.budget_max))) {
      setError('Maximum budget must be a valid number')
      return false
    }
    if (formData.budget_min && formData.budget_max) {
      const min = Number(formData.budget_min)
      const max = Number(formData.budget_max)
      if (min > max) {
        setError('Minimum budget cannot be greater than maximum budget')
        return false
      }
    }
    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    if (!session?.user?.id) {
      setError('You must be logged in to create a campaign')
      return
    }

    setSubmitting(true)
    setError(null)

    const supabase = getSupabase()

    try {
      // Step 1: Create campaign
      const campaignData = {
        brand_id: session.user.id,
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        status: 'draft' as const,
        budget_min: formData.budget_min ? Number(formData.budget_min) : null,
        budget_max: formData.budget_max ? Number(formData.budget_max) : null,
      }

      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert(campaignData)
        .select()
        .single()

      if (campaignError) {
        throw new Error(`Failed to create campaign: ${campaignError.message}`)
      }

      if (!campaign) {
        throw new Error('Campaign creation failed - no data returned')
      }

      // Step 2: Create deal immediately
      const dealData = {
        campaign_id: campaign.id,
        brand_id: session.user.id,
        creator_id: formData.creator_id.trim(),
        status: 'invited' as const,
      }

      const { error: dealError } = await supabase
        .from('deals')
        .insert(dealData)

      if (dealError) {
        // If deal creation fails, we should ideally rollback the campaign
        // For now, just show the error
        throw new Error(`Failed to create deal: ${dealError.message}`)
      }

      // Success - navigate to campaigns list
      navigate('/dashboard/brand/campaigns')
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign and deal')
      setSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <ErrorState message="You must be logged in to create a campaign" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Private Campaign & Book Creator</h1>
          <p className="text-gray-600">
            Create a private campaign and immediately invite a creator to collaborate
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="Enter campaign title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-y"
                    placeholder="Enter campaign description (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Budget
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.budget_min}
                    onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Budget
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Creator Selection</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creator ID *
                </label>
                <input
                  type="text"
                  value={formData.creator_id}
                  onChange={(e) => setFormData({ ...formData, creator_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="Enter creator ID (UUID)"
                  readOnly={!!creatorIdFromUrl}
                />
                {creatorIdFromUrl && (
                  <p className="mt-1 text-sm text-gray-500">
                    Creator ID pre-filled from URL
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/dashboard/brand/campaigns')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Campaign & Book Creator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
