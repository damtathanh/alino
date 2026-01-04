import { useState, useEffect } from 'react'
import { FaTimes, FaCheck } from 'react-icons/fa'

interface UpgradePlanModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan?: 'free' | 'pro' | 'business'
}

interface Plan {
  id: 'free' | 'pro' | 'business'
  name: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  ctaText: string
  isCurrent?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Miễn phí',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Tạo chiến dịch cơ bản',
      'Tối đa 1 hợp tác đang diễn ra',
      'Hiển thị hồ sơ công khai',
      'Phân tích cơ bản',
      'Nhắn tin trực tiếp với thương hiệu',
      'Hỗ trợ tiêu chuẩn',
    ],
    ctaText: 'Gói hiện tại',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 20,
    yearlyPrice: 192,
    features: [
      'Tạo chiến dịch không giới hạn',
      'Tối đa 10 hợp tác đang diễn ra',
      'Tùy chỉnh hồ sơ nâng cao',
      'Phân tích & báo cáo nâng cao',
      'Nhắn tin trực tiếp với thương hiệu',
      'Ưu tiên hỗ trợ qua email',
    ],
    ctaText: 'Nâng cấp lên Pro',
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 79,
    yearlyPrice: 758,
    features: [
      'Tạo chiến dịch không giới hạn',
      'Hợp tác đang diễn ra không giới hạn',
      'Quản lý tài khoản chuyên dụng',
      'Truy cập API & tích hợp',
      'Công cụ cộng tác nhóm',
      'Hỗ trợ 24/7 qua điện thoại & chat',
    ],
    ctaText: 'Nâng cấp lên Business',
  },
]

export default function UpgradePlanModal({ isOpen, onClose, currentPlan = 'free' }: UpgradePlanModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    if (!isOpen) return

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  const handleUpgrade = (planId: 'pro' | 'business') => {
    // TODO: Implement upgrade flow
    console.log(`Upgrade to ${planId} - ${billingCycle}`)
    onClose()
  }

  const formatPrice = (price: number) => {
    if (price === 0) return '0₫'
    return `${price.toLocaleString('vi-VN')}$`
  }

  const getYearlySavings = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0
    const yearlyTotal = monthlyPrice * 12
    const yearlyPrice = yearlyTotal * 0.8
    return Math.round(yearlyTotal - yearlyPrice)
  }

  const getYearlySavingsText = (monthlyPrice: number) => {
    const savings = getYearlySavings(monthlyPrice)
    if (savings === 0) return ''
    return `Tiết kiệm ${savings.toLocaleString('vi-VN')}$`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nâng cấp gói đăng ký</h2>
            <p className="text-sm text-gray-600 mt-1">
              Mở khóa các tính năng mạnh mẽ và mở rộng cơ hội hợp tác với ALINO.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Thanh toán:</span>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Theo tháng
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Theo năm
                {billingCycle === 'yearly' && (
                  <span className="ml-1 text-xs text-green-600">(Tiết kiệm 20%)</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlan
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
              const savings = billingCycle === 'yearly' && plan.monthlyPrice > 0
                ? getYearlySavings(plan.monthlyPrice)
                : 0

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl border-2 p-6 ${
                    isCurrent
                      ? 'border-[#6366F1] bg-purple-50/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Current Plan Badge */}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Gói hiện tại
                      </span>
                    </div>
                  )}

                  {/* Plan Name & Price Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(price)}
                        </span>
                        <span className="text-xs text-gray-600">
                          / {billingCycle === 'monthly' ? 'tháng' : 'năm'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && savings > 0 && (
                        <p className="text-xs text-green-600 mt-0.5">
                          {getYearlySavingsText(plan.monthlyPrice)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg font-medium text-[#6366F1] border-2 border-[#6366F1] bg-white opacity-50 cursor-not-allowed"
                    >
                      {plan.ctaText}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.id as 'pro' | 'business')}
                      className="w-full px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 transition-opacity"
                    >
                      {plan.ctaText}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Tất cả gói đều có thể hủy bất cứ lúc nào. Thanh toán được xử lý an toàn.
          </p>
        </div>
      </div>
    </div>
  )
}

