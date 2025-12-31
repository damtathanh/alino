import { NextResponse } from 'next/server';
import { getServices } from '@/lib/container';

/**
 * Get current session endpoint
 * GET /api/auth/session
 */
export async function GET() {
  try {
    const { authRepository } = getServices();
    const session = await authRepository.getSession();

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json(
      {
        session: null,
        message: 'Có lỗi xảy ra khi lấy phiên đăng nhập',
      },
      { status: 500 }
    );
  }
}
