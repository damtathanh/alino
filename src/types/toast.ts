/**
 * toast: Shared types for toast notifications
 * 
 * Centralized type definitions for toast state across the application.
 */

export type ToastType = 'success' | 'error'

export interface ToastState {
  message: string
  type: ToastType
}
