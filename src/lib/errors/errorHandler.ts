import { AppError, ErrorCode, ErrorSeverity } from './AppError';

/**
 * Error Handler Utility
 * 
 * Provides centralized error handling and user-friendly error messages.
 */

/**
 * User-friendly error messages (Vietnamese)
 */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
    [ErrorCode.AUTH_UNAUTHORIZED]: 'Bạn không có quyền thực hiện thao tác này.',
    [ErrorCode.AUTH_SESSION_EXPIRED]: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    [ErrorCode.AUTH_INVALID_CREDENTIALS]: 'Email hoặc mật khẩu không đúng.',
    
    [ErrorCode.PROFILE_NOT_FOUND]: 'Không tìm thấy thông tin profile.',
    [ErrorCode.PROFILE_UPDATE_FAILED]: 'Không thể cập nhật thông tin. Vui lòng thử lại.',
    [ErrorCode.PROFILE_VALIDATION_FAILED]: 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.',
    
    [ErrorCode.DATA_FETCH_FAILED]: 'Không thể tải dữ liệu. Vui lòng thử lại.',
    [ErrorCode.DATA_SAVE_FAILED]: 'Không thể lưu dữ liệu. Vui lòng thử lại.',
    
    [ErrorCode.NETWORK_ERROR]: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
    
    [ErrorCode.UNKNOWN_ERROR]: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
};

/**
 * Handle error and return user-friendly message
 * 
 * @param error - Error object (can be AppError, Error, or unknown)
 * @returns User-friendly error message
 */
export function handleError(error: unknown): string {
    // Log error to console for debugging
    console.error('[ErrorHandler]', error);

    // Handle AppError
    if (error instanceof AppError) {
        const message = ERROR_MESSAGES[error.code] || error.message;
        
        // Log critical errors with more details
        if (error.severity === ErrorSeverity.CRITICAL) {
            console.error('[CRITICAL ERROR]', {
                code: error.code,
                message: error.message,
                timestamp: error.timestamp,
                originalError: error.originalError,
            });
        }
        
        return message;
    }

    // Handle standard Error
    if (error instanceof Error) {
        // Check for common error patterns
        if (error.message.includes('network') || error.message.includes('fetch')) {
            return ERROR_MESSAGES[ErrorCode.NETWORK_ERROR];
        }
        
        if (error.message.includes('unauthorized') || error.message.includes('forbidden')) {
            return ERROR_MESSAGES[ErrorCode.AUTH_UNAUTHORIZED];
        }
        
        // Return generic error message
        return ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
    }

    // Handle unknown error types
    return ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
}

/**
 * Create AppError from unknown error
 * 
 * @param error - Unknown error
 * @param code - Error code
 * @param severity - Error severity
 * @returns AppError instance
 */
export function createAppError(
    error: unknown,
    code: ErrorCode,
    severity: ErrorSeverity = ErrorSeverity.ERROR
): AppError {
    const message = error instanceof Error ? error.message : String(error);
    const originalError = error instanceof Error ? error : undefined;
    
    return new AppError(message, code, severity, originalError);
}

/**
 * Check if error is AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}
