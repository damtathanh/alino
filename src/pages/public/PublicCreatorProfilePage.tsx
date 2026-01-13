import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSupabase } from '../../lib/supabase'
import type { CreatorProfile } from '../../types/profile'
import { LoadingState } from '../../components/shared/LoadingState'
import { ErrorState } from '../../components/shared/ErrorState'

/**
 * PublicCreatorProfilePage: Public read-only creator profile
 * 
 * Route: /creator/:id or /c/:id
 * - No authentication required
 * - Read-only view
 */

interface PublicCreatorData {
  profile: CreatorProfile
  subscription: {
    plan: 'free' | 'pro'
  } | null
}

export default function PublicCreatorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<PublicCreatorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Creator ID is required')
      setLoading(false)
      return
    }

    async function fetchCreatorProfile() {
      const supabase = getSupabase()

      try {
        // Step 1: Fetch core profile to verify it's a creator
        const { data: coreProfile, error: coreError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', id)
          .single()

        if (coreError) {
          if (coreError.code === 'PGRST116') {
            setError('Creator profile not found')
          } else {
            setError('Failed to load creator profile')
          }
          setLoading(false)
          return
        }

        if (!coreProfile || coreProfile.role !== 'creator') {
          setError('Creator profile not found')
          setLoading(false)
          return
        }

        // Step 2: Fetch creator profile data
        const { data: creatorProfile, error: creatorError } = await supabase
          .from('creator_profiles')
          .select('*')
          .eq('user_id', id)
          .single()

        if (creatorError) {
          if (creatorError.code === 'PGRST116') {
            setError('Creator profile not found')
          } else {
            setError('Failed to load creator profile')
          }
          setLoading(false)
          return
        }

        if (!creatorProfile) {
          setError('Creator profile not found')
          setLoading(false)
          return
        }

        // Step 3: Fetch subscription (for future use, no logic yet)
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('plan')
          .eq('user_id', id)
          .maybeSingle()

        // Merge profile data
        const mergedProfile: CreatorProfile = {
          ...coreProfile,
          ...creatorProfile,
          role: 'creator',
        }

        setData({
          profile: mergedProfile,
          subscription: subscription || null,
        })
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Failed to load creator profile')
        setLoading(false)
      }
    }

    fetchCreatorProfile()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <LoadingState />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <ErrorState message={error || 'Creator profile not found'} />
        </div>
      </div>
    )
  }

  const { profile } = data
  const displayName = profile.full_name || 'Creator'
  const location = [profile.city, profile.country].filter(Boolean).join(', ') || null
  const platforms = profile.creator_platforms || []
  const categories = profile.content_categories || []
  const followersCount = profile.followers_count

  const formatFollowers = (count: number | null | undefined): string => {
    if (!count) return 'N/A'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-2xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayName}</h1>
                {location && (
                  <p className="text-gray-600 mb-4">
                    <span className="inline-flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {location}
                    </span>
                  </p>
                )}
                {followersCount !== null && followersCount !== undefined && (
                  <p className="text-gray-600">
                    <span className="font-medium">{formatFollowers(followersCount)}</span> followers
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Book Creator Button (for brands) */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
            <Link
              to={`/dashboard/brand/campaigns/new/private?creator_id=${profile.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Book This Creator
            </Link>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Platforms */}
            {platforms.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Platforms</h2>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Categories */}
            {categories.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {platforms.length === 0 && categories.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No additional information available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
