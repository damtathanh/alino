import { useState } from 'react'
import { FaCloudUploadAlt, FaPaperPlane, FaCheck, FaFile, FaFilePdf, FaFileImage } from 'react-icons/fa'

interface FileItem {
  id: string
  name: string
  size: string
  status: 'draft' | 'submitted' | 'approved' | 'final'
  type: string
}

interface Message {
  id: string
  sender: 'creator' | 'brand'
  senderName: string
  timestamp: string
  content: string
}

interface Milestone {
  id: string
  title: string
  date: string
  completed: boolean
}

interface Task {
  id: string
  name: string
  dueDate: string
  completed: boolean
}

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'Initial_Moodboard.pdf', size: '2.3 MB', status: 'approved', type: 'pdf' },
  { id: '2', name: 'Draft_Concepts_v1.psd', size: '15.1 MB', status: 'submitted', type: 'psd' },
  { id: '3', name: 'Revised_Concepts_v2.png', size: '7.8 MB', status: 'draft', type: 'image' },
  { id: '4', name: 'Final_Deliverable.zip', size: '32.5 MB', status: 'final', type: 'zip' },
]

const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'brand', senderName: 'Brand Contact', timestamp: '10:30 AM', content: 'Hi John, I love the initial concepts! Could we explore a slightly warmer color palette for the key visuals?' },
  { id: '2', sender: 'creator', senderName: 'You', timestamp: '10:45 AM', content: 'Absolutely! I\'ll prepare some revisions with a warmer palette and send them over by tomorrow evening. 😊' },
  { id: '3', sender: 'brand', senderName: 'Brand Contact', timestamp: '10:50 AM', content: 'Great, looking forward to seeing them! Thanks for the quick turnaround.' },
]

const MOCK_MILESTONES: Milestone[] = [
  { id: '1', title: 'Proposal Accepted', date: 'Jan 10, 2024', completed: true },
  { id: '2', title: 'Initial Concepts Submitted', date: 'Jan 15, 2024', completed: true },
  { id: '3', title: 'Feedback Received', date: 'Jan 17, 2024', completed: true },
  { id: '4', title: 'Revised Concepts Submitted', date: 'Jan 18, 2024', completed: true },
  { id: '5', title: 'Final Approval', date: 'Jan 25, 2024', completed: true },
  { id: '6', title: 'Deliverables Finalized', date: 'Jan 28, 2024', completed: true },
]

const MOCK_TASKS: Task[] = [
  { id: '1', name: 'Review brand guidelines', dueDate: 'Jan 12, 2024', completed: true },
  { id: '2', name: 'Develop initial concept drafts', dueDate: 'Jan 14, 2024', completed: true },
  { id: '3', name: 'Incorporate feedback on color palette', dueDate: 'Jan 19, 2024', completed: false },
  { id: '4', name: 'Prepare final high-resolution deliverables', dueDate: 'Jan 24, 2024', completed: false },
  { id: '5', name: 'Submit deliverables for final approval', dueDate: 'Jan 25, 2024', completed: false },
]

export default function DealWorkspacePage() {
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES)
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)

  const handleFileUpload = () => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: `New_File_${files.length + 1}.pdf`,
      size: '1.2 MB',
      status: 'draft',
      type: 'pdf',
    }
    setFiles([...files, newFile])
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const message: Message = {
      id: Date.now().toString(),
      sender: 'creator',
      senderName: 'You',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: newMessage,
    }
    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task))
  }

  const getStatusBadgeClass = (status: FileItem['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'submitted':
        return 'bg-purple-100 text-purple-700'
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'final':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: FileItem['status']) => {
    switch (status) {
      case 'draft':
        return 'Draft'
      case 'submitted':
        return 'Submitted'
      case 'approved':
        return 'Approved'
      case 'final':
        return 'Final'
      default:
        return status
    }
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return <FaFilePdf className="w-5 h-5 text-red-600" />
    if (type === 'image' || type === 'png' || type === 'psd') return <FaFileImage className="w-5 h-5 text-blue-600" />
    return <FaFile className="w-5 h-5 text-gray-600" />
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Campaign Header Card */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Spring Collection Launch</h1>
              <p className="text-lg text-gray-600">FashionNova</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Đang thực hiện
              </span>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Xem chi tiết chiến dịch
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity">
                Liên hệ thương hiệu
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Quản lý tệp</h2>
              <p className="text-sm text-gray-600 mb-6">
                Tải lên bản nháp và xem các sản phẩm đầu ra.
              </p>

              <div
                onClick={handleFileUpload}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6 cursor-pointer hover:border-purple-400 transition-colors"
              >
                <FaCloudUploadAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">Kéo thả tệp vào đây hoặc nhấp để duyệt</p>
                <p className="text-sm text-gray-500">Kích thước tệp tối đa: 25MB</p>
              </div>

              <div className="space-y-3 mb-6">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(file.status)}`}>
                      {getStatusLabel(file.status)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Lưu bản nháp
                </button>
                <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity">
                  Gửi để xem xét
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Luồng phản hồi</h2>
              <p className="text-sm text-gray-600 mb-6">
                Cộng tác với thương hiệu về thỏa thuận này.
              </p>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'creator' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'creator'
                        ? 'bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.senderName.charAt(0)}
                    </div>
                    <div className={`flex-1 ${message.sender === 'creator' ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{message.senderName}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-lg ${
                        message.sender === 'creator'
                          ? 'bg-purple-100 text-gray-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Viết tin nhắn của bạn..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Lịch sử trạng thái thỏa thuận</h2>
              <p className="text-sm text-gray-600 mb-6">
                Theo dõi các cột mốc quan trọng và tiến độ.
              </p>

              <div className="space-y-4">
                {MOCK_MILESTONES.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {milestone.completed && <FaCheck className="w-4 h-4" />}
                      </div>
                      {index < MOCK_MILESTONES.length - 1 && (
                        <div className={`w-0.5 flex-1 ${milestone.completed ? 'bg-purple-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`font-medium ${milestone.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-sm text-gray-500">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Danh sách công việc</h2>
              <p className="text-sm text-gray-600 mb-6">
                Các công việc còn lại của bạn cho thỏa thuận này.
              </p>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {task.name}
                      </p>
                      <p className="text-sm text-gray-500">Đến hạn: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

