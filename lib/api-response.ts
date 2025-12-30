import { NextResponse } from 'next/server';

/**
 * Standard API response helper
 * Ensures consistent response format with Vietnamese messages
 */

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  ok: false;
  message: string;
  details?: unknown;
}

/**
 * Create a successful API response
 * @param data Response data
 * @param message Vietnamese message
 * @param status HTTP status code (default: 200)
 */
export function ok<T>(
  data: T,
  message: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      ok: true as const,
      data,
      message,
    },
    { status }
  );
}

/**
 * Create an error API response
 * @param message Vietnamese error message
 * @param status HTTP status code (default: 400)
 * @param details Optional error details
 */
export function fail(
  message: string,
  status: number = 400,
  details?: unknown
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      ok: false as const,
      message,
      ...(details !== undefined && { details }),
    },
    { status }
  );
}

