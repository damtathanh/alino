import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 * GET /api/health
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Hệ thống hoạt động',
  });
}
