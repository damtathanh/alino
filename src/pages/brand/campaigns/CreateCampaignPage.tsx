import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandDashboardLayout from '../../../components/brand/BrandDashboardLayout'

export default function CreateCampaignPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    campaignName: 'Influencer Marketing Initiative',
    campaignGoal: 'Increase brand awareness by 20% over 3 months',
    budgetRange: '',
    deadline: '',
    visibility: 'open',
    collaborators: ['collaborator@example.com'],
  })
  const [newCollaborator, setNewCollaborator] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.campaignName.trim()) {
      newErrors.campaignName = 'Campaign name is required'
    }
    if (!formData.campaignGoal.trim()) {
      newErrors.campaignGoal = 'Campaign goal is required'
    }
    if (!formData.budgetRange.trim()) {
      newErrors.budgetRange = 'Budget range is required'
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddCollaborator = () => {
    if (newCollaborator.trim() && !formData.collaborators.includes(newCollaborator.trim())) {
      setFormData({
        ...formData,
        collaborators: [...formData.collaborators, newCollaborator.trim()],
      })
      setNewCollaborator('')
    }
  }

  const handleRemoveCollaborator = (email: string) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter(c => c !== email),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setTimeout(() => {
        navigate('/brand/dashboard')
      }, 500)
    }
  }

  return (
    <BrandDashboardLayout>
      <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
            <p className="text-gray-600">
              Define your campaign details, budget, and target audience to launch a successful initiative.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      value={formData.campaignName}
                      onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent ${
                        errors.campaignName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.campaignName && (
                      <p className="mt-1 text-sm text-red-600">{errors.campaignName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Goal *
                    </label>
                    <textarea
                      value={formData.campaignGoal}
                      onChange={(e) => setFormData({ ...formData, campaignGoal: e.target.value })}
                      rows={4}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-y ${
                        errors.campaignGoal ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.campaignGoal && (
                      <p className="mt-1 text-sm text-red-600">{errors.campaignGoal}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget & Schedule</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range *
                    </label>
                    <input
                      type="text"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      placeholder="$ e.g., $1,000 - $5,000"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent ${
                        errors.budgetRange ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.budgetRange && (
                      <p className="mt-1 text-sm text-red-600">{errors.budgetRange}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent ${
                        errors.deadline ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.deadline && (
                      <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Visibility & Collaborators</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Campaign Visibility
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          value="open"
                          checked={formData.visibility === 'open'}
                          onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                          className="w-4 h-4 text-[#6366F1] border-gray-300 focus:ring-[#6366F1]"
                        />
                        <span className="text-sm text-gray-700">Open for Proposal (visible to all creators)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          checked={formData.visibility === 'private'}
                          onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                          className="w-4 h-4 text-[#6366F1] border-gray-300 focus:ring-[#6366F1]"
                        />
                        <span className="text-sm text-gray-700">Private Campaign (invite-only)</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invite Collaborators
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="email"
                        value={newCollaborator}
                        onChange={(e) => setNewCollaborator(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddCollaborator()
                          }
                        }}
                        placeholder="Enter email address"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleAddCollaborator}
                        className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    {formData.collaborators.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.collaborators.map((email) => (
                          <div
                            key={email}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">{email}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCollaborator(email)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/brand/dashboard')}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </BrandDashboardLayout>
  )
}

