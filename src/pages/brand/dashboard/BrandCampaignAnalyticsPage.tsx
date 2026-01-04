import { useState, useRef, useEffect } from 'react'
import { FaDownload, FaCalendarAlt, FaChevronDown, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import BrandDashboardLayout from '../../../components/brand/BrandDashboardLayout'

const MOCK_CAMPAIGN_PROGRESS = [
  { month: 'Jan', progress: 65 },
  { month: 'Feb', progress: 70 },
  { month: 'Mar', progress: 75 },
  { month: 'Apr', progress: 82 },
  { month: 'May', progress: 88 },
  { month: 'Jun', progress: 92 },
]

const MOCK_RESPONSE_TIME = [
  { creator: 'Creator A', time: 22 },
  { creator: 'Creator B', time: 18 },
  { creator: 'Creator C', time: 15 },
  { creator: 'Creator D', time: 12 },
  { creator: 'Creator E', time: 20 },
]

const MOCK_APPROVAL_CYCLE = [
  { name: 'Draft Review', value: 50, color: '#1F2937' },
  { name: 'Feedback Rounds', value: 30, color: '#4B5563' },
  { name: 'Final Approval', value: 20, color: '#6B7280' },
]

const MOCK_COMPLETION_TREND = [
  { date: 'Jan 01', rate: 78 },
  { date: 'Feb 01', rate: 80 },
  { date: 'Mar 01', rate: 83 },
  { date: 'Apr 01', rate: 86 },
  { date: 'May 01', rate: 89 },
  { date: 'Jun 01', rate: 92 },
]

export default function BrandCampaignAnalyticsPage() {
  const [dateRange, setDateRange] = useState('Nov 29, 2025 - Dec 29, 2025')
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setDatePickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleExport = () => {
    const csvContent = `Metric,Value
Active Campaigns,4
Avg Creator Response Time,18 hours
Approval Rate,85%
Campaign Completion Rate,92%`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campaign-analytics-report.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <BrandDashboardLayout>
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Analytics</h1>
                <p className="text-gray-600">Overview of your campaign performance and creator engagement.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative" ref={datePickerRef}>
                  <button
                    onClick={() => setDatePickerOpen(!datePickerOpen)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>{dateRange}</span>
                    <FaChevronDown className="w-3 h-3" />
                  </button>
                  {datePickerOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                        onChange={(e) => {
                          const startDate = e.target.value
                          setDateRange(`${startDate} - ${dateRange.split(' - ')[1]}`)
                        }}
                      />
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          const endDate = e.target.value
                          setDateRange(`${dateRange.split(' - ')[0]} - ${endDate}`)
                        }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FaDownload className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Active Campaigns</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <FaArrowUp className="w-3 h-3" />
                <span>+2 since last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Avg. Creator Response Time</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">18 hours</div>
              <div className="text-sm text-red-600 flex items-center gap-1">
                <FaArrowDown className="w-3 h-3" />
                <span>↓10% from previous period</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Approval Rate</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">85%</div>
              <div className="text-sm text-gray-600">Steady over last 30 days</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Campaign Completion Rate</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <FaArrowUp className="w-3 h-3" />
                <span>↑5% this quarter</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Progress Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={MOCK_CAMPAIGN_PROGRESS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis domain={[64, 96]} stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} name="Progress" dot={{ fill: '#3B82F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Average Creator Response Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MOCK_RESPONSE_TIME}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="creator" stroke="#6b7280" />
                  <YAxis domain={[0, 24]} stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="time" fill="#EC4899" name="Avg. Time" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Approval Cycle Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={MOCK_APPROVAL_CYCLE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {MOCK_APPROVAL_CYCLE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {MOCK_APPROVAL_CYCLE.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Completion Rate Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={MOCK_COMPLETION_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis domain={[0, 100]} stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="rate" stroke="#EF4444" fill="#EC4899" fillOpacity={0.6} name="Completion Rate" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </BrandDashboardLayout>
  )
}

