/**
 * Custom Application Error Class
 * 
 * Provides structured error handling with error codes and severity levels.
 */

export enum ErrorSeverity {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical',
}

export enum ErrorCode {
    // Auth errors
    AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
    AUTH_SESSION_EXPIRED = 'AUTH_SESSION_EXPIRED',
    AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
    
    // Profile errors
    PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND',
    PROFILE_UPDATE_FAILED = 'PROFILE_UPDATE_FAILED',
    PROFILE_VALIDATION_FAILED = 'PROFILE_VALIDATION_FAILED',
    
    // Data errors
    DATA_FETCH_FAILED = 'DATA_FETCH_FAILED',
    DATA_SAVE_FAILED = 'DATA_SAVE_FAILED',
    
    // Network errors
    NETWORK_ERROR = 'NETWORK_ERROR',
    
    // Unknown errors
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly severity: ErrorSeverity;
    public readonly timestamp: Date;
    public readonly originalError?: Error;

    constructor(
        message: string,
        code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
        severity: ErrorSeverity = ErrorSeverity.ERROR,
        originalError?: Error
    ) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.severity = severity;
        this.timestamp = new Date();
        this.originalError = originalError;

        // Maintains proper stack trace for where error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}
