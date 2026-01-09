/**
 * LoadingState: Shared loading component
 * 
 * Used across the application for consistent loading UI.
 */
export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-[#6B7280]">Đang tải...</div>
    </div>
  )
}

/**
 * LoadingStateCompact: Compact loading state for smaller areas
 */
export function LoadingStateCompact() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-[#6B7280] text-sm">Đang tải...</div>
    </div>
  )
}

/**
 * NotFoundState: Shared not found component
 * 
 * Used for consistent "not found" UI across the application.
 */
export function NotFoundState({ message = 'Không tìm thấy' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-[#6B7280]">{message}</div>
    </div>
  )
}
