import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaPaperPlane, FaEye, FaCheck, FaTimes, FaChevronDown } from 'react-icons/fa'

interface ProposalFormData {
  campaignId: string
  campaignName: string
  customMessage: string
  serviceId: string
  serviceName: string
  price: string
  notes: string
  timeline: string
  deliverables: string
  attachments: File[]
}

const MOCK_CAMPAIGNS = [
  { id: '1', name: 'Echo Marketing - Digital Marketing Campaign' },
  { id: '2', name: 'Aqua Lifestyle - Health & Wellness Promotion' },
  { id: '3', name: 'Pixel Studios - Software Launch Campaign' },
  { id: '4', name: 'Green Harvest Organics - Product Launch' },
]

const MOCK_SERVICES = [
  { id: '1', name: 'Basic Social Media Kit', basePrice: 250 },
  { id: '2', name: 'Premium Content Creation', basePrice: 750 },
  { id: '3', name: 'Influencer Campaign Management', basePrice: 1500 },
]

export default function SubmitProposalPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const opportunityId = searchParams.get('opportunityId')

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProposalFormData>({
    campaignId: opportunityId || '',
    campaignName: '',
    customMessage: '',
    serviceId: '',
    serviceName: '',
    price: '',
    notes: '',
    timeline: '',
    deliverables: '',
    attachments: [],
  })

  const [campaignDropdownOpen, setCampaignDropdownOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)

  const steps = [
    { number: 1, label: 'Chi tiết đề xuất' },
    { number: 2, label: 'Dịch vụ & Giá' },
    { number: 3, label: 'Giao hàng & Đính kèm' },
    { number: 4, label: 'Xem lại & Gửi' },
  ]

  const handleCampaignSelect = (campaign: { id: string; name: string }) => {
    setFormData({ ...formData, campaignId: campaign.id, campaignName: campaign.name })
    setCampaignDropdownOpen(false)
  }

  const handleServiceSelect = (service: { id: string; name: string; basePrice: number }) => {
    setFormData({
      ...formData,
      serviceId: service.id,
      serviceName: service.name,
      price: service.basePrice.toString(),
    })
    setServiceDropdownOpen(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData({ ...formData, attachments: [...formData.attachments, ...files] })
    }
  }

  const handleRemoveFile = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    })
  }

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return formData.campaignId && formData.customMessage.trim()
    }
    if (currentStep === 2) {
      return formData.serviceId && formData.price.trim()
    }
    if (currentStep === 3) {
      return formData.timeline.trim()
    }
    return true
  }

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    navigate('/dashboard/creator/proposals')
  }

  const selectedCampaign = MOCK_CAMPAIGNS.find(c => c.id === formData.campaignId)
  const selectedService = MOCK_SERVICES.find(s => s.id === formData.serviceId)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCampaignDropdownOpen(false)
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setServiceDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gửi đề xuất của bạn</h1>
            <p className="text-gray-600 mb-6">
              Tạo một đề xuất chiến thắng để được các thương hiệu chú ý.
            </p>

            <div className="flex items-center gap-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center">
                  <FaPaperPlane className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Đã gửi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaEye className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">Đã xem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaCheck className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">Đã chấp nhận</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaTimes className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">Đã từ chối</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Các bước đề xuất</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Làm theo các bước để hoàn thành đề xuất của bạn
                </p>
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`px-4 py-3 rounded-lg ${
                        currentStep === step.number
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{step.number}</span>
                        <span className="text-sm font-medium">{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. Chi tiết đề xuất</h2>
                    <p className="text-gray-600 mb-6">
                      Chọn chiến dịch và thêm thông điệp tùy chỉnh.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chiến dịch *
                        </label>
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => setCampaignDropdownOpen(!campaignDropdownOpen)}
                            className="w-full px-4 py-2.5 text-left border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 transition-colors"
                          >
                            <span className={selectedCampaign ? 'text-gray-900' : 'text-gray-500'}>
                              {selectedCampaign?.name || 'Chọn chiến dịch'}
                            </span>
                            <FaChevronDown className="w-4 h-4 text-gray-500" />
                          </button>
                          {campaignDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {MOCK_CAMPAIGNS.map((campaign) => (
                                <button
                                  key={campaign.id}
                                  type="button"
                                  onClick={() => handleCampaignSelect(campaign)}
                                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                                >
                                  {campaign.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thông điệp tùy chỉnh *
                        </label>
                        <textarea
                          value={formData.customMessage}
                          onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                          placeholder="Giới thiệu bản thân và giải thích tại sao bạn phù hợp với chiến dịch này."
                          rows={8}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">2. Dịch vụ & Giá</h2>
                    <p className="text-gray-600 mb-6">
                      Chọn dịch vụ và đặt giá cho đề xuất này.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dịch vụ *
                        </label>
                        <div className="relative" ref={serviceDropdownRef}>
                          <button
                            type="button"
                            onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                            className="w-full px-4 py-2.5 text-left border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 transition-colors"
                          >
                            <span className={selectedService ? 'text-gray-900' : 'text-gray-500'}>
                              {selectedService?.name || 'Chọn dịch vụ'}
                            </span>
                            <FaChevronDown className="w-4 h-4 text-gray-500" />
                          </button>
                          {serviceDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {MOCK_SERVICES.map((service) => (
                                <button
                                  key={service.id}
                                  type="button"
                                  onClick={() => handleServiceSelect(service)}
                                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900">{service.name}</div>
                                  <div className="text-sm text-gray-500">Giá cơ bản: ${service.basePrice}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giá (USD) *
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="Nhập giá"
                          min="1"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ghi chú (tùy chọn)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Thêm ghi chú về dịch vụ hoặc giá"
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">3. Giao hàng & Đính kèm</h2>
                    <p className="text-gray-600 mb-6">
                      Chỉ định thời gian giao hàng và đính kèm các tệp liên quan.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thời gian ước tính *
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="Ví dụ: 5-7 ngày làm việc"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đính kèm (tùy chọn)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Chọn tệp
                          </label>
                          {formData.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {formData.attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                                >
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <FaTimes className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sản phẩm đầu ra (tùy chọn)
                        </label>
                        <textarea
                          value={formData.deliverables}
                          onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                          placeholder="Mô tả các sản phẩm đầu ra cụ thể"
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">4. Xem lại & Gửi</h2>
                    <p className="text-gray-600 mb-6">
                      Xem lại thông tin đề xuất của bạn trước khi gửi.
                    </p>

                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Chi tiết đề xuất</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-600">Chiến dịch:</span>
                            <p className="text-gray-900">{formData.campaignName || '-'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Thông điệp:</span>
                            <p className="text-gray-900 whitespace-pre-wrap">{formData.customMessage || '-'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Dịch vụ & Giá</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-600">Dịch vụ:</span>
                            <p className="text-gray-900">{formData.serviceName || '-'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Giá:</span>
                            <p className="text-gray-900">${formData.price || '-'}</p>
                          </div>
                          {formData.notes && (
                            <div>
                              <span className="text-sm text-gray-600">Ghi chú:</span>
                              <p className="text-gray-900">{formData.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Giao hàng & Đính kèm</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-600">Thời gian ước tính:</span>
                            <p className="text-gray-900">{formData.timeline || '-'}</p>
                          </div>
                          {formData.deliverables && (
                            <div>
                              <span className="text-sm text-gray-600">Sản phẩm đầu ra:</span>
                              <p className="text-gray-900 whitespace-pre-wrap">{formData.deliverables}</p>
                            </div>
                          )}
                          {formData.attachments.length > 0 && (
                            <div>
                              <span className="text-sm text-gray-600">Tệp đính kèm:</span>
                              <div className="mt-2 space-y-1">
                                {formData.attachments.map((file, index) => (
                                  <p key={index} className="text-gray-900 text-sm">{file.name}</p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Trước
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button
                      onClick={handleNext}
                      disabled={!canProceedToNextStep()}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tiếp theo
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Gửi đề xuất
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
