import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { getSupabase } from '../../../lib/supabase'
import { FaCheck, FaEdit, FaEye, FaTrash, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import UpgradePlanModal from '../../../components/shared/UpgradePlanModal'
import Toast from '../../../components/shared/Toast'
import type { CreatorProfile } from '../../../types/profile'

// Type guard to check if profile is a CreatorProfile
function isCreatorProfile(profile: any): profile is CreatorProfile {
  return profile?.role === 'creator'
}

interface Service {
  id: string
  user_id: string
  name: string
  price: number
  description: string
  deliverables: string[]
  estimated_timeline: string
  status: 'active' | 'draft' | 'hidden'
  created_at: string
  updated_at: string
}

type ServiceStatus = 'active' | 'draft' | 'hidden'
type PlanType = 'free' | 'pro' | 'business'

const FREE_PLAN_MAX_SERVICES = 3
const PRO_PLAN_MAX_SERVICES = 10

export default function ServicesPage() {
  const { session } = useAuth()
  const { profile } = useProfile(
    session?.user?.id,
    !!(session && session.access_token && session.user.email_confirmed_at)
  )
  const supabase = getSupabase()

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    deliverables: '',
    estimated_timeline: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // TODO: Get from subscription - currently using is_admin as proxy for business plan
  const currentPlan: PlanType = profile?.is_admin ? 'business' : 'free'
  const canShowPricing = currentPlan !== 'free'
  
  // Calculate max services based on plan type
  const getMaxServices = (plan: PlanType): number => {
    if (plan === 'free') return FREE_PLAN_MAX_SERVICES
    if (plan === 'pro') return PRO_PLAN_MAX_SERVICES
    return Infinity // business plan has unlimited services
  }
  const maxServices = getMaxServices(currentPlan)
  const activeServicesCount = services.filter(s => s.status === 'active').length

  useEffect(() => {
    if (session?.user?.id) {
      loadServices()
    }
  }, [session?.user?.id])

  const loadServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creator_services')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error: any) {
      console.error('Error loading services:', error)
      setToast({ message: 'Không thể tải danh sách dịch vụ', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Tên dịch vụ là bắt buộc'
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Tên dịch vụ phải có ít nhất 3 ký tự'
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Tên dịch vụ không được vượt quá 100 ký tự'
    }

    if (!formData.price.trim()) {
      errors.price = 'Giá là bắt buộc'
    } else {
      const priceNum = parseInt(formData.price)
      if (isNaN(priceNum) || priceNum < 1) {
        errors.price = 'Giá phải là số dương tối thiểu $1'
      } else if (priceNum > 999999) {
        errors.price = 'Giá không được vượt quá $999,999'
      }
    }

    if (!formData.description.trim()) {
      errors.description = 'Mô tả là bắt buộc'
    } else if (formData.description.trim().length < 20) {
      errors.description = 'Mô tả phải có ít nhất 20 ký tự'
    } else if (formData.description.trim().length > 1000) {
      errors.description = 'Mô tả không được vượt quá 1000 ký tự'
    }

    if (!formData.deliverables.trim()) {
      errors.deliverables = 'Sản phẩm đầu ra là bắt buộc'
    } else {
      const deliverablesList = formData.deliverables.split('\n').filter(line => line.trim())
      if (deliverablesList.length === 0) {
        errors.deliverables = 'Phải có ít nhất 1 sản phẩm đầu ra'
      } else if (deliverablesList.length > 15) {
        errors.deliverables = 'Không được vượt quá 15 sản phẩm đầu ra'
      }
      deliverablesList.forEach((item, index) => {
        if (item.length > 200) {
          errors.deliverables = `Sản phẩm đầu ra thứ ${index + 1} không được vượt quá 200 ký tự`
        }
      })
    }

    if (!formData.estimated_timeline.trim()) {
      errors.estimated_timeline = 'Thời gian hoàn thành là bắt buộc'
    } else if (formData.estimated_timeline.trim().length < 2) {
      errors.estimated_timeline = 'Thời gian hoàn thành phải có ít nhất 2 ký tự'
    } else if (formData.estimated_timeline.trim().length > 100) {
      errors.estimated_timeline = 'Thời gian hoàn thành không được vượt quá 100 ký tự'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (status: ServiceStatus = 'draft') => {
    if (!validateForm()) {
      return
    }

    // Check service limit
    const totalServicesCount = services.length
    if (!editingService && totalServicesCount >= maxServices) {
      setShowUpgradeModal(true)
      return
    }

    try {
      const deliverablesList = formData.deliverables.split('\n').filter(line => line.trim())
      const serviceData = {
        user_id: session?.user?.id,
        name: formData.name.trim(),
        price: parseInt(formData.price),
        description: formData.description.trim(),
        deliverables: deliverablesList,
        estimated_timeline: formData.estimated_timeline.trim(),
        status,
      }

      if (editingService) {
        const { error } = await supabase
          .from('creator_services')
          .update(serviceData)
          .eq('id', editingService.id)

        if (error) throw error
        setToast({ message: 'Cập nhật dịch vụ thành công', type: 'success' })
      } else {
        const { error } = await supabase
          .from('creator_services')
          .insert([serviceData])

        if (error) throw error
        setToast({ message: 'Tạo dịch vụ thành công', type: 'success' })
      }

      resetForm()
      loadServices()
    } catch (error: any) {
      console.error('Error saving service:', error)
      setToast({ message: error.message || 'Có lỗi xảy ra khi lưu dịch vụ', type: 'error' })
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      price: service.price.toString(),
      description: service.description,
      deliverables: service.deliverables.join('\n'),
      estimated_timeline: service.estimated_timeline,
    })
    setShowForm(true)
    setFormErrors({})
  }

  const handleDelete = async (service: Service) => {
    if (!confirm('Bạn có chắc muốn xóa dịch vụ này? Hành động này không thể hoàn tác.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('creator_services')
        .delete()
        .eq('id', service.id)

      if (error) throw error
      setToast({ message: 'Xóa dịch vụ thành công', type: 'success' })
      loadServices()
    } catch (error: any) {
      console.error('Error deleting service:', error)
      setToast({ message: 'Có lỗi xảy ra khi xóa dịch vụ', type: 'error' })
    }
  }

  const handleStatusChange = async (service: Service, newStatus: ServiceStatus) => {
    // Check active limit when publishing
    if (newStatus === 'active' && activeServicesCount >= maxServices && service.status !== 'active') {
      setShowUpgradeModal(true)
      return
    }

    try {
      const { error } = await supabase
        .from('creator_services')
        .update({ status: newStatus })
        .eq('id', service.id)

      if (error) throw error
      setToast({ message: 'Cập nhật trạng thái thành công', type: 'success' })
      loadServices()
    } catch (error: any) {
      console.error('Error updating status:', error)
      setToast({ message: 'Có lỗi xảy ra khi cập nhật trạng thái', type: 'error' })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      deliverables: '',
      estimated_timeline: '',
    })
    setEditingService(null)
    setShowForm(false)
    setFormErrors({})
  }

  const getStatusLabel = (status: ServiceStatus) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động'
      case 'draft':
        return 'Bản nháp'
      case 'hidden':
        return 'Đã ẩn'
    }
  }

  const getStatusBadgeClass = (status: ServiceStatus) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700'
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'hidden':
        return 'bg-gray-100 text-gray-500'
    }
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('vi-VN')}`
  }

  // Type-safe access to creator profile properties using proper type narrowing
  const getCreatorProfileBio = (): string => {
    if (isCreatorProfile(profile)) {
      // TypeScript narrows to CreatorProfile here
      // Check if bio exists using 'in' operator for runtime safety
      if ('bio' in profile && typeof profile.bio === 'string') {
        return profile.bio || 'Creator'
      }
    }
    return 'Creator'
  }

  const getCreatorProfileName = (): string | null => {
    if (isCreatorProfile(profile)) {
      // TypeScript narrows to CreatorProfile here, full_name is defined
      return profile.full_name || null
    }
    return null
  }

  const getCreatorProfileAvatar = (): string | null => {
    if (isCreatorProfile(profile)) {
      // TypeScript narrows to CreatorProfile here, avatar_url is defined
      return profile.avatar_url || null
    }
    return null
  }

  const displayName = getCreatorProfileName() || session?.user?.email?.split('@')[0] || 'Creator'
  const avatarUrl = getCreatorProfileAvatar() || session?.user?.user_metadata?.avatar_url

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Create/Edit Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {editingService ? 'Chỉnh sửa dịch vụ' : 'Tạo dịch vụ mới'}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {editingService ? 'Cập nhật thông tin dịch vụ' : 'Định nghĩa chi tiết dịch vụ của bạn'}
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Service Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên dịch vụ *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        setFormErrors({ ...formErrors, name: '' })
                      }}
                      placeholder="Ví dụ: Gói Social Media Cơ bản"
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#6366F1] focus:border-transparent`}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Tên ngắn gọn, rõ ràng giúp thương hiệu dễ hiểu dịch vụ của bạn
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá (USD) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => {
                        setFormData({ ...formData, price: e.target.value })
                        setFormErrors({ ...formErrors, price: '' })
                      }}
                      placeholder="Ví dụ: 250"
                      min="1"
                      max="999999"
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        formErrors.price ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#6366F1] focus:border-transparent`}
                    />
                    {formErrors.price && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.price}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Nhập giá bằng USD. Giá này có thể được ẩn trên hồ sơ công khai tùy theo gói đăng ký của bạn.
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả dịch vụ *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value })
                        setFormErrors({ ...formErrors, description: '' })
                      }}
                      placeholder="Mô tả chi tiết về dịch vụ bạn cung cấp..."
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        formErrors.description ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#6366F1] focus:border-transparent`}
                    />
                    {formErrors.description && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Giải thích rõ ràng giá trị và lợi ích của dịch vụ để thu hút thương hiệu
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sản phẩm đầu ra (mỗi dòng một mục) *
                    </label>
                    <textarea
                      value={formData.deliverables}
                      onChange={(e) => {
                        setFormData({ ...formData, deliverables: e.target.value })
                        setFormErrors({ ...formErrors, deliverables: '' })
                      }}
                      placeholder="Ví dụ:&#10;- 3 bài đăng Instagram&#10;- 1 Story campaign&#10;- Báo cáo tương tác"
                      rows={6}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        formErrors.deliverables ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#6366F1] focus:border-transparent`}
                    />
                    {formErrors.deliverables && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.deliverables}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Liệt kê cụ thể những gì thương hiệu sẽ nhận được. Mỗi dòng là một mục.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian hoàn thành *
                    </label>
                    <input
                      type="text"
                      value={formData.estimated_timeline}
                      onChange={(e) => {
                        setFormData({ ...formData, estimated_timeline: e.target.value })
                        setFormErrors({ ...formErrors, estimated_timeline: '' })
                      }}
                      placeholder="Ví dụ: 5-7 ngày làm việc"
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        formErrors.estimated_timeline ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#6366F1] focus:border-transparent`}
                    />
                    {formErrors.estimated_timeline && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.estimated_timeline}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Thời gian từ khi bắt đầu đến khi hoàn thành dịch vụ
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 px-4 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    {!editingService && (
                      <button
                        onClick={() => handleSubmit('draft')}
                        className="flex-1 px-4 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Lưu bản nháp
                      </button>
                    )}
                    <button
                      onClick={() => handleSubmit(editingService?.status || 'active')}
                      className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 transition-opacity"
                    >
                      {editingService ? 'Cập nhật' : 'Thêm dịch vụ'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Services List & Preview */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="space-y-6">
              {/* Services Table */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Gói dịch vụ của tôi</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Quản lý các dịch vụ đang hoạt động và bản nháp của bạn.
                  </p>
                </div>

                {services.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-2">Bạn chưa có dịch vụ nào</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Tạo dịch vụ đầu tiên để bắt đầu nhận hợp tác từ thương hiệu.
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Tạo dịch vụ mới
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tên</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Giá</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thời gian</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="font-medium text-gray-900">{service.name}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-gray-700">{formatPrice(service.price)}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-gray-700">{service.estimated_timeline}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(service.status)}`}>
                                {getStatusLabel(service.status)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(service)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Sửa"
                                >
                                  <FaEdit className="w-4 h-4 text-gray-600" />
                                </button>
                                {service.status === 'active' && (
                                  <button
                                    onClick={() => handleStatusChange(service, 'hidden')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Ẩn"
                                  >
                                    <FaEye className="w-4 h-4 text-gray-600" />
                                  </button>
                                )}
                                {(service.status === 'draft' || service.status === 'hidden') && (
                                  <button
                                    onClick={() => handleStatusChange(service, 'active')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Công khai"
                                  >
                                    <FaCheck className="w-4 h-4 text-green-600" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(service)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Xóa"
                                >
                                  <FaTrash className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Public Profile Preview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Hồ sơ công khai của bạn</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Đây là cách thương hiệu nhìn thấy dịch vụ của bạn.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Profile Card */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white font-medium">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{displayName}</div>
                      <div className="text-sm text-gray-600">{getCreatorProfileBio()}</div>
                    </div>
                  </div>

                  {/* Services List */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Dịch vụ ({services.filter(s => s.status === 'active').length})</h3>
                    {services.filter(s => s.status === 'active').length === 0 ? (
                      <p className="text-sm text-gray-500">Chưa có dịch vụ công khai</p>
                    ) : (
                      <>
                        <ul className="space-y-4">
                          {services.filter(s => s.status === 'active').map((service) => (
                            <li key={service.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{service.name}</div>
                                  <div className="text-sm text-gray-600 mt-1">{service.description.substring(0, 150)}...</div>
                                  {canShowPricing && (
                                    <div className="text-sm font-medium text-gray-900 mt-2">{formatPrice(service.price)}</div>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        
                        {!canShowPricing && services.filter(s => s.status === 'active').length > 0 && (
                          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                            <div className="font-semibold text-gray-900 mb-1">Pricing Hidden</div>
                            <p className="text-sm text-gray-600 mb-3">
                              Nâng cấp gói của bạn để hiển thị giá trên hồ sơ công khai và nhận nhiều cơ hội hợp tác hơn.
                            </p>
                            <button
                              onClick={() => setShowUpgradeModal(true)}
                              className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                            >
                              Nâng cấp để mở khóa
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-3">Hiển thị công khai trên hồ sơ của bạn.</p>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#6366F1] hover:text-[#EC4899] transition-colors">
                      Xem hồ sơ
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan}
      />
    </div>
  )
}

