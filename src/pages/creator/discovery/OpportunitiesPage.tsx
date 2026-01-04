import { useNavigate } from 'react-router-dom'
import { FaDollarSign, FaCalendarAlt } from 'react-icons/fa'

interface Opportunity {
  id: string
  brandName: string
  industry: string
  budgetMin: number
  budgetMax: number
  deadline: string
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    brandName: 'Echo Marketing',
    industry: 'Digital Marketing',
    budgetMin: 1500,
    budgetMax: 3000,
    deadline: '2024-08-15',
  },
  {
    id: '2',
    brandName: 'Aqua Lifestyle',
    industry: 'Health & Wellness',
    budgetMin: 1000,
    budgetMax: 2500,
    deadline: '2024-08-20',
  },
  {
    id: '3',
    brandName: 'Pixel Studios',
    industry: 'Software & Tech',
    budgetMin: 2000,
    budgetMax: 4000,
    deadline: '2024-08-22',
  },
  {
    id: '4',
    brandName: 'Green Harvest Organics',
    industry: 'Food & Beverage',
    budgetMin: 800,
    budgetMax: 1800,
    deadline: '2024-08-25',
  },
  {
    id: '5',
    brandName: 'Urban Chic Boutique',
    industry: 'Fashion',
    budgetMin: 1200,
    budgetMax: 2800,
    deadline: '2024-08-28',
  },
  {
    id: '6',
    brandName: 'Global Connect Telecom',
    industry: 'Telecommunications',
    budgetMin: 2500,
    budgetMax: 5000,
    deadline: '2024-09-01',
  },
]

export default function OpportunitiesPage() {
  const navigate = useNavigate()

  const handlePropose = (opportunityId: string) => {
    navigate(`/creator/proposals/new?opportunityId=${opportunityId}`)
  }

  const formatBudget = (min: number, max: number) => {
    return `$${min.toLocaleString('en-US')} - $${max.toLocaleString('en-US')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cơ hội hợp tác</h1>
          <p className="text-gray-600">
            Khám phá các chiến dịch thú vị từ các thương hiệu hàng đầu và gửi đề xuất của bạn để mở rộng mạng lưới và thu nhập.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_OPPORTUNITIES.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{opportunity.brandName}</h3>
                <p className="text-sm text-gray-600">{opportunity.industry}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{formatBudget(opportunity.budgetMin, opportunity.budgetMax)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{formatDate(opportunity.deadline)}</span>
                </div>
              </div>

              <button
                onClick={() => handlePropose(opportunity.id)}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Gửi đề xuất
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

