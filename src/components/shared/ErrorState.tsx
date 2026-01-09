/**
 * ErrorState: Shared error component
 * 
 * Used for consistent error UI across the application.
 */

interface ErrorStateProps {
  message?: string
}

export function ErrorState({ message = 'Có lỗi xảy ra' }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-[#6B7280]">{message}</div>
    </div>
  )
}
