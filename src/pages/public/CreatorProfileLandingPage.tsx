import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSupabase } from '../../lib/supabase'
import type { CreatorProfile } from '../../types/profile'
import { LoadingState } from '../../components/shared/LoadingState'
import { ErrorState } from '../../components/shared/ErrorState'

/**
 * CreatorProfileLandingPage: Public, action-oriented creator profile
 *
 * Route: /c/:creatorId
 * - No authentication required
 * - Fetches creator by creatorId from URL
 * - One clear CTA to start collaboration
 */

interface CreatorService {
  id: string
  name: string
  price: number
  description: string | null
}

export default function CreatorProfileLandingPage() {
  const { creatorId } = useParams<{ creatorId: string }>()
  const [profile, setProfile] = useState<CreatorProfile | null>(null)
  const [services, setServices] = useState<CreatorService[]>([])
  const [dealsCount, setDealsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!creatorId) {
      setError('Creator not found')
      setLoading(false)
      return
    }

    async function fetchData() {
      const supabase = getSupabase()

      try {
        const { data: coreProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', creatorId)
          .single()

        if (profileError || !coreProfile || coreProfile.role !== 'creator') {
          setError('Creator not found')
          setLoading(false)
          return
        }

        const { data: creatorProfile, error: creatorError } = await supabase
          .from('creator_profiles')
          .select('*')
          .eq('user_id', creatorId)
          .single()

        if (creatorError || !creatorProfile) {
          setError('Creator not found')
          setLoading(false)
          return
        }

        const merged: CreatorProfile = {
          ...coreProfile,
          ...creatorProfile,
          role: 'creator',
        }
        setProfile(merged)

        const { data: servicesData } = await supabase
          .from('creator_services')
          .select('id, name, price, description')
          .eq('user_id', creatorId)
          .eq('status', 'active')
          .order('created_at', { ascending: true })
          .limit(3)

        setServices((servicesData || []) as CreatorService[])

        const { count } = await supabase
          .from('deals')
          .select('*', { count: 'exact', head: true })
          .eq('creator_id', creatorId)

        setDealsCount(count ?? null)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [creatorId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingState />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorState message={error || 'Creator not found'} />
      </div>
    )
  }

  const displayName = profile.full_name || 'Creator'
  const platforms = profile.creator_platforms || []
  const categories = profile.content_categories || []
  const oneLiner = [platforms[0], categories[0]].filter(Boolean).join(' · ') || 'Creator'
  const minPrice = services.length > 0 ? Math.min(...services.map((s) => s.price)) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{displayName}</h1>
          <p className="text-gray-600 text-sm">{oneLiner}</p>
        </header>

        {/* Services & Pricing */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Services & Pricing</h2>
          {services.length === 0 ? (
            <p className="text-gray-500 text-sm">No services listed yet.</p>
          ) : (
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    {service.description && (
                      <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-900 font-semibold whitespace-nowrap">
                    ${service.price.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {minPrice !== null && (
            <p className="text-sm text-gray-500 mt-3">
              Starting from ${minPrice.toLocaleString()}
            </p>
          )}
        </section>

        {/* Credibility */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <p className="text-gray-700 text-sm">
            {dealsCount !== null && dealsCount > 0
              ? `Worked with ${dealsCount} brand${dealsCount === 1 ? '' : 's'}`
              : 'Creator on ALINO'}
          </p>
        </section>

        {/* Single CTA */}
        <div className="text-center">
          <Link
            to={`/dashboard/brand/start-collaboration?creator_id=${profile.id}`}
            className="inline-block w-full max-w-sm px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-semibold rounded-xl hover:opacity-95 transition-opacity shadow-lg"
          >
            Làm việc với tôi / Start collaboration
          </Link>
        </div>
      </div>
    </div>
  )
}
