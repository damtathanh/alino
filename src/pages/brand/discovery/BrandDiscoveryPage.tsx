import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../../../lib/supabase'
import type { CreatorProfile } from '../../../types/profile'
import { LoadingState } from '../../../components/shared/LoadingState'
import { ErrorState } from '../../../components/shared/ErrorState'
import { FaStar, FaRegStar } from 'react-icons/fa'

/**
 * BrandDiscoveryPage: Lightweight discovery funnel for brands
 * 
 * Route: /dashboard/brand/discovery
 * - Fetch creators from profiles + creator_profiles
 * - Client-side filters (platform, category, country)
 * - Local shortlist (localStorage)
 * - Link to creator profiles
 * - Book creator button
 */

const SHORTLIST_STORAGE_KEY = 'alino_creator_shortlist'

interface FilterState {
  platforms: string[]
  categories: string[]
  country: string
}

export default function BrandDiscoveryPage() {
  const [creators, setCreators] = useState<CreatorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shortlist, setShortlist] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    categories: [],
    country: '',
  })

  // Load shortlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHORTLIST_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setShortlist(new Set(parsed))
      }
    } catch (err) {
      console.error('Failed to load shortlist:', err)
    }
  }, [])

  // Save shortlist to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(Array.from(shortlist)))
    } catch (err) {
      console.error('Failed to save shortlist:', err)
    }
  }, [shortlist])

  // Fetch creators
  useEffect(() => {
    async function fetchCreators() {
      const supabase = getSupabase()

      try {
        // Fetch profiles with role = 'creator'
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('role', 'creator')

        if (profilesError) {
          throw new Error(`Failed to fetch profiles: ${profilesError.message}`)
        }

        if (!profiles || profiles.length === 0) {
          setCreators([])
          setLoading(false)
          return
        }

        // Fetch creator_profiles for all creator IDs
        const creatorIds = profiles.map(p => p.id)
        const { data: creatorProfiles, error: creatorError } = await supabase
          .from('creator_profiles')
          .select('*')
          .in('user_id', creatorIds)

        if (creatorError) {
          throw new Error(`Failed to fetch creator profiles: ${creatorError.message}`)
        }

        // Merge profiles with creator_profiles
        const merged: CreatorProfile[] = profiles
          .map(profile => {
            const creatorProfile = creatorProfiles?.find(cp => cp.user_id === profile.id)
            if (!creatorProfile) return null

            return {
              ...profile,
              ...creatorProfile,
              role: 'creator',
            } as CreatorProfile
          })
          .filter((p): p is CreatorProfile => p !== null)

        setCreators(merged)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Failed to load creators')
        setLoading(false)
      }
    }

    fetchCreators()
  }, [])

  // Get unique values for filters
  const availablePlatforms = useMemo(() => {
    const platforms = new Set<string>()
    creators.forEach(creator => {
      creator.creator_platforms?.forEach(p => platforms.add(p))
    })
    return Array.from(platforms).sort()
  }, [creators])

  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    creators.forEach(creator => {
      creator.content_categories?.forEach(c => categories.add(c))
    })
    return Array.from(categories).sort()
  }, [creators])

  const availableCountries = useMemo(() => {
    const countries = new Set<string>()
    creators.forEach(creator => {
      if (creator.country) countries.add(creator.country)
    })
    return Array.from(countries).sort()
  }, [creators])

  // Filter creators
  const filteredCreators = useMemo(() => {
    return creators.filter(creator => {
      // Platform filter
      if (filters.platforms.length > 0) {
        const creatorPlatforms = creator.creator_platforms || []
        const hasMatchingPlatform = filters.platforms.some(filterPlatform =>
          creatorPlatforms.includes(filterPlatform)
        )
        if (!hasMatchingPlatform) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        const creatorCategories = creator.content_categories || []
        const hasMatchingCategory = filters.categories.some(filterCategory =>
          creatorCategories.includes(filterCategory)
        )
        if (!hasMatchingCategory) return false
      }

      // Country filter
      if (filters.country) {
        if (creator.country !== filters.country) return false
      }

      return true
    })
  }, [creators, filters])

  const toggleShortlist = (creatorId: string) => {
    setShortlist(prev => {
      const next = new Set(prev)
      if (next.has(creatorId)) {
        next.delete(creatorId)
      } else {
        next.add(creatorId)
      }
      return next
    })
  }

  const handlePlatformToggle = (platform: string) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }))
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Khám phá Creator</h1>
          <p className="text-gray-600">
            Tìm kiếm creator phù hợp cho chiến dịch của bạn
          </p>
          {shortlist.size > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Đã lưu {shortlist.size} creator vào shortlist
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h2>

              {/* Platform Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Platform
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availablePlatforms.map(platform => (
                    <label
                      key={platform}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.platforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                        className="w-4 h-4 text-[#6366F1] border-gray-300 rounded focus:ring-[#6366F1]"
                      />
                      <span className="text-sm text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableCategories.map(category => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-[#6366F1] border-gray-300 rounded focus:ring-[#6366F1]"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-sm"
                >
                  <option value="">All Countries</option>
                  {availableCountries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.platforms.length > 0 || filters.categories.length > 0 || filters.country) && (
                <button
                  onClick={() => setFilters({ platforms: [], categories: [], country: '' })}
                  className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Creators Grid */}
          <div className="lg:col-span-3">
            {filteredCreators.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-600 mb-2">No creators found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCreators.map(creator => {
                  const isShortlisted = shortlist.has(creator.id)
                  const displayName = creator.full_name || 'Creator'
                  const location = [creator.city, creator.country].filter(Boolean).join(', ') || 'Location not specified'
                  const platforms = creator.creator_platforms || []
                  const categories = creator.content_categories || []

                  return (
                    <div
                      key={creator.id}
                      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {creator.avatar_url ? (
                            <img
                              src={creator.avatar_url}
                              alt={displayName}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-lg font-bold">
                              {displayName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">{displayName}</h3>
                            <p className="text-sm text-gray-600">{location}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleShortlist(creator.id)}
                          className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors"
                          title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                        >
                          {isShortlisted ? (
                            <FaStar className="text-yellow-500" />
                          ) : (
                            <FaRegStar />
                          )}
                        </button>
                      </div>

                      {/* Platforms */}
                      {platforms.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {platforms.slice(0, 3).map((platform, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                              >
                                {platform}
                              </span>
                            ))}
                            {platforms.length > 3 && (
                              <span className="px-2 py-1 text-gray-500 text-xs">
                                +{platforms.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Categories */}
                      {categories.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {categories.slice(0, 3).map((category, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                              >
                                {category}
                              </span>
                            ))}
                            {categories.length > 3 && (
                              <span className="px-2 py-1 text-gray-500 text-xs">
                                +{categories.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                        <Link
                          to={`/creator/${creator.id}`}
                          className="flex-1 px-4 py-2 text-sm text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Profile
                        </Link>
                        <Link
                          to={`/dashboard/brand/campaigns/new/private?creator_id=${creator.id}`}
                          className="flex-1 px-4 py-2 text-sm text-center bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Book Creator
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
