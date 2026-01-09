import { useState, useMemo } from 'react'
import { FaSearch, FaYoutube, FaInstagram, FaFilter, FaTh, FaList, FaUser } from 'react-icons/fa'
import { SiTiktok, SiTwitch } from 'react-icons/si'

interface Creator {
  id: string
  name: string
  niche: string
  followers: number
  avgPrice: number
  platforms: string[]
  avatar: string
  location: string
  shortlisted: boolean
}

const MOCK_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    niche: 'Gaming & Tech',
    followers: 1200000,
    avgPrice: 1500,
    platforms: ['youtube', 'instagram', 'tiktok'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    location: 'New York, USA',
    shortlisted: true,
  },
  {
    id: '2',
    name: 'Bob The Builder',
    niche: 'DIY & Home',
    followers: 500000,
    avgPrice: 800,
    platforms: ['youtube', 'instagram'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    location: 'Los Angeles, USA',
    shortlisted: false,
  },
  {
    id: '3',
    name: 'Charlie Chef',
    niche: 'Food & Cooking',
    followers: 750000,
    avgPrice: 1200,
    platforms: ['youtube', 'instagram', 'tiktok'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    location: 'Chicago, USA',
    shortlisted: true,
  },
  {
    id: '4',
    name: 'Diana Designer',
    niche: 'Fashion & Lifestyle',
    followers: 2100000,
    avgPrice: 2000,
    platforms: ['instagram', 'tiktok'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    location: 'Miami, USA',
    shortlisted: false,
  },
  {
    id: '5',
    name: 'Eve Explorer',
    niche: 'Travel & Adventure',
    followers: 900000,
    avgPrice: 1000,
    platforms: ['youtube', 'instagram'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    location: 'Seattle, USA',
    shortlisted: false,
  },
  {
    id: '6',
    name: 'Frank Fitness',
    niche: 'Health & Fitness',
    followers: 1500000,
    avgPrice: 1800,
    platforms: ['youtube', 'instagram', 'tiktok', 'twitch'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    location: 'Austin, USA',
    shortlisted: false,
  },
  {
    id: '7',
    name: 'Grace Green',
    niche: 'Sustainability',
    followers: 300000,
    avgPrice: 700,
    platforms: ['instagram', 'blog'],
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face',
    location: 'Portland, USA',
    shortlisted: false,
  },
  {
    id: '8',
    name: 'Henry History',
    niche: 'Education & History',
    followers: 600000,
    avgPrice: 950,
    platforms: ['youtube', 'blog'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    location: 'Boston, USA',
    shortlisted: false,
  },
]

const NICHE_OPTIONS = [
  'All Niches',
  'Gaming & Tech',
  'DIY & Home',
  'Food & Cooking',
  'Fashion & Lifestyle',
  'Travel & Adventure',
  'Health & Fitness',
  'Sustainability',
  'Education & History',
]

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  youtube: <FaYoutube className="w-4 h-4 text-red-600" />,
  instagram: <FaInstagram className="w-4 h-4 text-pink-600" />,
  tiktok: <SiTiktok className="w-4 h-4 text-black" />,
  twitch: <SiTwitch className="w-4 h-4 text-purple-600" />,
  blog: <span className="text-xs font-semibold text-gray-600">Blog</span>,
}

export default function CreatorDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['youtube', 'instagram'])
  const [selectedNiche, setSelectedNiche] = useState('All Niches')
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [followerRange, setFollowerRange] = useState([10000, 500000])
  const [location, setLocation] = useState('')
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(MOCK_CREATORS.filter(c => c.shortlisted).map(c => c.id))
  const [sortBy, setSortBy] = useState('Most Relevant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreators(prev =>
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const handleShortlist = (creatorId: string) => {
    setShortlistedIds(prev =>
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedPlatforms(['youtube', 'instagram'])
    setSelectedNiche('All Niches')
    setPriceRange([500, 5000])
    setFollowerRange([10000, 500000])
    setLocation('')
  }

  const filteredCreators = useMemo(() => {
    let filtered = MOCK_CREATORS.filter(creator => {
      if (searchQuery && !creator.name.toLowerCase().includes(searchQuery.toLowerCase()) && !creator.niche.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedPlatforms.length > 0 && !selectedPlatforms.some(platform => creator.platforms.includes(platform))) {
        return false
      }
      if (selectedNiche !== 'All Niches' && creator.niche !== selectedNiche) {
        return false
      }
      if (creator.avgPrice < priceRange[0] || creator.avgPrice > priceRange[1]) {
        return false
      }
      if (creator.followers < followerRange[0] || creator.followers > followerRange[1]) {
        return false
      }
      if (location && !creator.location.toLowerCase().includes(location.toLowerCase())) {
        return false
      }
      return true
    })

    if (sortBy === 'Most Relevant') {
      filtered = filtered.sort((a, b) => b.followers - a.followers)
    } else if (sortBy === 'Price: Low to High') {
      filtered = filtered.sort((a, b) => a.avgPrice - b.avgPrice)
    } else if (sortBy === 'Price: High to Low') {
      filtered = filtered.sort((a, b) => b.avgPrice - a.avgPrice)
    } else if (sortBy === 'Followers: High to Low') {
      filtered = filtered.sort((a, b) => b.followers - a.followers)
    }

    return filtered
  }, [searchQuery, selectedPlatforms, selectedNiche, priceRange, followerRange, location, sortBy])

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`
    }
    return count.toString()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              >
                <option>Most Relevant</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Followers: High to Low</option>
              </select>
              <button
                disabled={selectedCreators.length < 2}
                className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Selected ({selectedCreators.length})
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              >
                <FaTh className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              >
                <FaList className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-white border border-gray-300">
                <FaFilter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#6366F1] hover:text-[#EC4899] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Creator</label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or key"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                    <div className="space-y-2">
                      {['youtube', 'instagram', 'tiktok', 'twitch', 'blog'].map((platform) => (
                        <label key={platform} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() => handlePlatformToggle(platform)}
                            className="w-4 h-4 text-[#6366F1] border-gray-300 rounded focus:ring-[#6366F1]"
                          />
                          <span className="text-sm text-gray-700 capitalize">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                    <select
                      value={selectedNiche}
                      onChange={(e) => setSelectedNiche(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    >
                      {NICHE_OPTIONS.map((niche) => (
                        <option key={niche} value={niche}>{niche}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follower Count: {formatFollowers(followerRange[0])} - {formatFollowers(followerRange[1])}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="10000"
                        value={followerRange[0]}
                        onChange={(e) => setFollowerRange([parseInt(e.target.value), followerRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="10000"
                        value={followerRange[1]}
                        onChange={(e) => setFollowerRange([followerRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., New York, USA"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.map((creator) => (
                  <div key={creator.id} className="bg-white rounded-xl border border-gray-200 p-6 relative">
                    <input
                      type="checkbox"
                      checked={selectedCreators.includes(creator.id)}
                      onChange={() => handleCreatorSelect(creator.id)}
                      className="absolute top-4 right-4 w-5 h-5 text-[#6366F1] border-gray-300 rounded focus:ring-[#6366F1]"
                    />
                    <div className="flex flex-col items-center text-center mb-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 mb-1">{creator.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{creator.niche}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaUser className="w-4 h-4" />
                          <span>{formatFollowers(creator.followers)} Followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">$</span>
                          <span>Avg. ${creator.avgPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {creator.platforms.map((platform) => (
                          <div key={platform}>
                            {PLATFORM_ICONS[platform]}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleShortlist(creator.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          shortlistedIds.includes(creator.id)
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {shortlistedIds.includes(creator.id) ? 'Shortlisted' : 'Shortlist'}
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

