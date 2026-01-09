import { useState } from 'react'
import { FaEdit, FaCheck, FaRedo, FaFileAlt, FaDownload, FaPaperPlane, FaEllipsisV } from 'react-icons/fa'

interface Creator {
  id: string
  name: string
  avatar: string
  status: string
  progress: number
}

interface FeedbackMessage {
  id: string
  sender: string
  senderAvatar: string
  message: string
  timestamp: string
}

const MOCK_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Ella Creative',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    status: 'Final Review',
    progress: 100,
  },
  {
    id: '2',
    name: 'Mark Media',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'Drafting Content',
    progress: 75,
  },
  {
    id: '3',
    name: 'Sophia Social',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'Awaiting Feedback',
    progress: 50,
  },
  {
    id: '4',
    name: 'Liam Lens',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'Planning Phase',
    progress: 25,
  },
]

const MOCK_FEEDBACK: FeedbackMessage[] = [
  {
    id: '1',
    sender: 'Jane Smith',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    message: 'Great work on the visuals! Just a small tweak needed: could we adjust the color palette slightly to better align with our brand guidelines? Also, the call-to-action buttons could be more prominent.',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    sender: 'Ella Creative',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    message: 'Thanks for the feedback! I can definitely adjust the colors. For the CTA buttons, would you prefer a lighter blue variant for the primary actions?',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    sender: 'Jane Smith',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    message: 'Yes, the lighter blue variant would be perfect! Also, let\'s make sure the text contrast is strong enough for accessibility.',
    timestamp: '30 minutes ago',
  },
]

export default function CampaignWorkspacePage() {
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedback, setFeedback] = useState<FeedbackMessage[]>(MOCK_FEEDBACK)

  const handleSendFeedback = () => {
    if (feedbackMessage.trim()) {
      const newMessage: FeedbackMessage = {
        id: Date.now().toString(),
        sender: 'Jane Smith',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        message: feedbackMessage,
        timestamp: 'Just now',
      }
      setFeedback([...feedback, newMessage])
      setFeedbackMessage('')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Summer Influencer Outreach 2024</h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FaEdit className="w-4 h-4" />
                <span>Edit Campaign</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity">
                <span>Invite Creator</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FaEllipsisV className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Timeline</h2>
                <div className="flex items-center gap-4">
                  {MOCK_CREATORS.slice(0, 2).map((creator) => (
                    <div key={creator.id} className="flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {creator.progress === 100 && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-2">{creator.name}</p>
                      <p className="text-xs text-gray-500">{creator.progress}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Creator Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {MOCK_CREATORS.map((creator) => (
                    <div key={creator.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-12 h-12 rounded-full object-cover mb-2"
                        />
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{creator.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{creator.status}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] h-2 rounded-full"
                            style={{ width: `${creator.progress}%` }}
                          />
                        </div>
                        <button className="text-xs text-[#6366F1] hover:text-[#EC4899] transition-colors">
                          View Deal Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Draft from Ella Creative</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop"
                    alt="Draft preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Summer_Campaign_Visuals_v3.png</span>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaDownload className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h2>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <p className="text-sm font-medium text-gray-900">Active</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Brand:</span>
                    <p className="text-sm font-medium text-gray-900">ForgeCo Brands</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Campaign ID:</span>
                    <p className="text-sm font-medium text-gray-900">CAMP-7890</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Budget:</span>
                    <p className="text-sm font-medium text-gray-900">$15,000</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Deadline:</span>
                    <p className="text-sm font-medium text-gray-900">2024-08-31</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity">
                    <FaCheck className="w-4 h-4" />
                    <span>Approve Final Deliverables</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <FaRedo className="w-4 h-4" />
                    <span>Request Revisions</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaFileAlt className="w-4 h-4" />
                    <span>View Campaign Brief</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback Thread</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {feedback.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <img
                    src={message.senderAvatar}
                    alt={message.sender}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendFeedback()
                  }
                }}
                placeholder="Write your feedback..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
              />
              <button
                onClick={handleSendFeedback}
                className="px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

