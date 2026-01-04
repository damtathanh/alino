import { useState, useEffect, useRef } from 'react'
import { FaEye, FaLock, FaSyncAlt, FaCheckCircle, FaDownload, FaChevronDown } from 'react-icons/fa'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MetricCard {
  id: string
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
}

type DateRange = '7days' | '30days' | '90days'

const MOCK_DATA_7DAYS = {
  profileViews: { value: 12450, change: 15.2 },
  pricingUnlocks: { value: 2300, change: 8.1 },
  proposalConversion: { value: 65, change: 2.5 },
  dealCompletion: { value: 92, change: -0.5 },
  profileViewsOverTime: [
    { month: 'Jan', views: 10000 },
    { month: 'Feb', views: 10500 },
    { month: 'Mar', views: 9800 },
    { month: 'Apr', views: 10200 },
    { month: 'May', views: 11500 },
    { month: 'Jun', views: 12460 },
  ],
  proposalData: [
    { month: 'Jan', proposals: 60, deals: 40 },
    { month: 'Feb', proposals: 65, deals: 42 },
    { month: 'Mar', proposals: 70, deals: 45 },
    { month: 'Apr', proposals: 68, deals: 44 },
    { month: 'May', proposals: 75, deals: 48 },
    { month: 'Jun', proposals: 72, deals: 50 },
  ],
}

const MOCK_DATA_30DAYS = {
  profileViews: { value: 12450, change: 15.2 },
  pricingUnlocks: { value: 2300, change: 8.1 },
  proposalConversion: { value: 65, change: 2.5 },
  dealCompletion: { value: 92, change: -0.5 },
  profileViewsOverTime: [
    { month: 'Jan', views: 10000 },
    { month: 'Feb', views: 10500 },
    { month: 'Mar', views: 9800 },
    { month: 'Apr', views: 10200 },
    { month: 'May', views: 11500 },
    { month: 'Jun', views: 12460 },
  ],
  proposalData: [
    { month: 'Jan', proposals: 60, deals: 40 },
    { month: 'Feb', proposals: 65, deals: 42 },
    { month: 'Mar', proposals: 70, deals: 45 },
    { month: 'Apr', proposals: 68, deals: 44 },
    { month: 'May', proposals: 75, deals: 48 },
    { month: 'Jun', proposals: 72, deals: 50 },
  ],
}

const MOCK_DATA_90DAYS = {
  profileViews: { value: 12450, change: 15.2 },
  pricingUnlocks: { value: 2300, change: 8.1 },
  proposalConversion: { value: 65, change: 2.5 },
  dealCompletion: { value: 92, change: -0.5 },
  profileViewsOverTime: [
    { month: 'Jan', views: 10000 },
    { month: 'Feb', views: 10500 },
    { month: 'Mar', views: 9800 },
    { month: 'Apr', views: 10200 },
    { month: 'May', views: 11500 },
    { month: 'Jun', views: 12460 },
  ],
  proposalData: [
    { month: 'Jan', proposals: 60, deals: 40 },
    { month: 'Feb', proposals: 65, deals: 42 },
    { month: 'Mar', proposals: 70, deals: 45 },
    { month: 'Apr', proposals: 68, deals: 44 },
    { month: 'May', proposals: 75, deals: 48 },
    { month: 'Jun', proposals: 72, deals: 50 },
  ],
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30days')
  const [dateRangeDropdownOpen, setDateRangeDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDateRangeDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getData = () => {
    switch (dateRange) {
      case '7days':
        return MOCK_DATA_7DAYS
      case '30days':
        return MOCK_DATA_30DAYS
      case '90days':
        return MOCK_DATA_90DAYS
      default:
        return MOCK_DATA_30DAYS
    }
  }

  const data = getData()

  const metrics: MetricCard[] = [
    {
      id: '1',
      label: 'Lượt xem hồ sơ',
      value: data.profileViews.value.toLocaleString('vi-VN'),
      change: data.profileViews.change,
      icon: <FaEye className="w-5 h-5 text-gray-400" />,
    },
    {
      id: '2',
      label: 'Lần mở khóa bảng giá',
      value: data.pricingUnlocks.value.toLocaleString('vi-VN'),
      change: data.pricingUnlocks.change,
      icon: <FaLock className="w-5 h-5 text-gray-400" />,
    },
    {
      id: '3',
      label: 'Tỷ lệ chuyển đổi đề xuất',
      value: `${data.proposalConversion.value}%`,
      change: data.proposalConversion.change,
      icon: <FaSyncAlt className="w-5 h-5 text-gray-400" />,
    },
    {
      id: '4',
      label: 'Tỷ lệ hoàn thành thỏa thuận',
      value: `${data.dealCompletion.value}%`,
      change: data.dealCompletion.change,
      icon: <FaCheckCircle className="w-5 h-5 text-gray-400" />,
    },
  ]

  const handleExport = () => {
    const csvContent = `Metric,Value,Change
Profile Views,${data.profileViews.value},${data.profileViews.change}%
Pricing Unlocks,${data.pricingUnlocks.value},${data.pricingUnlocks.change}%
Proposal Conversion,${data.proposalConversion.value}%,${data.proposalConversion.change}%
Deal Completion,${data.dealCompletion.value}%,${data.dealCompletion.change}%`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${dateRange}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case '7days':
        return '7 ngày qua'
      case '30days':
        return '30 ngày qua'
      case '90days':
        return '90 ngày qua'
      default:
        return '30 ngày qua'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Phân tích Creator</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                <span>Xuất báo cáo</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDateRangeDropdownOpen(!dateRangeDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>{getDateRangeLabel()}</span>
                  <FaChevronDown className="w-3 h-3" />
                </button>
                {dateRangeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setDateRange('7days')
                        setDateRangeDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      7 ngày qua
                    </button>
                    <button
                      onClick={() => {
                        setDateRange('30days')
                        setDateRangeDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      30 ngày qua
                    </button>
                    <button
                      onClick={() => {
                        setDateRange('90days')
                        setDateRangeDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      90 ngày qua
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">{metric.label}</div>
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}% so với kỳ trước
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Lượt xem hồ sơ theo thời gian</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.profileViewsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={2} name="Lượt xem hồ sơ" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tỷ lệ chuyển đổi đề xuất & Hoàn thành thỏa thuận</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.proposalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="proposals" fill="#EC4899" name="Đề xuất đã gửi" />
                <Bar dataKey="deals" fill="#14B8A6" name="Thỏa thuận đã hoàn thành" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

