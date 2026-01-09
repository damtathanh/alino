type TabType = 'overview' | 'services' | 'portfolio' | 'reviews'

interface TabbedContentProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  displayName: string
}

const TABS: { value: TabType; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'services', label: 'Services & Pricing' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'reviews', label: 'Reviews' },
]

export function TabbedContent({ activeTab, onTabChange, displayName }: TabbedContentProps) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.value
                    ? 'border-[#6366F1] text-[#6366F1]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && <OverviewTab displayName={displayName} />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'portfolio' && <PortfolioTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ displayName }: { displayName: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Overview</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        This is your public profile that brands will see. Use the summary card on the left to edit your basic
        information, and explore the tabs above to manage your services, portfolio, and reviews.
      </p>
    </div>
  )
}

function ServicesTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Services & Pricing</h3>
          <p className="text-sm text-gray-600">Set up service packages and pricing tiers</p>
        </div>
        <button className="px-3 py-1.5 text-sm font-medium text-[#6366F1] border border-[#6366F1] rounded-lg hover:bg-[#6366F1]/10 transition-colors">
          Manage Services
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Service packages will be displayed here</p>
          <p className="text-xs text-gray-400 mt-2">Coming soon</p>
        </div>
      </div>
    </div>
  )
}

function PortfolioTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Portfolio</h3>
      <p className="text-gray-600 text-sm">Showcase your best work here. Portfolio items will be displayed here.</p>
    </div>
  )
}

function ReviewsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviews</h3>
      <p className="text-gray-600 text-sm">
        Reviews and testimonials from brands you've worked with will appear here.
      </p>
    </div>
  )
}
