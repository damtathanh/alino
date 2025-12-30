import { NextRequest, NextResponse } from 'next/server';
import { getServices } from '@/lib/container';

/**
 * Extract access token from request headers or cookies
 */
function extractAccessToken(request: NextRequest): string | undefined {
  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check for token in cookies (common pattern: sb-<project-ref>-auth-token or similar)
  const cookies = request.cookies;
  // Common cookie names for auth tokens
  const tokenCookie = cookies.get('sb-access-token') || cookies.get('access_token') || cookies.get('auth-token');
  if (tokenCookie) {
    return tokenCookie.value;
  }

  return undefined;
}

/**
 * Get current session endpoint
 * GET /api/auth/session
 */
export async function GET(request: NextRequest) {
  try {
    const { authRepository } = getServices();
    
    // Extract token from request
    const accessToken = extractAccessToken(request);
    
    // Set token on repository if available
    // Note: This requires the repository to have setAccessToken method
    // For now, we'll use a type assertion since we know it's InsforgeAuthRepository
    if ('setAccessToken' in authRepository && typeof (authRepository as any).setAccessToken === 'function') {
      (authRepository as any).setAccessToken(accessToken);
    }
    
    const session = await authRepository.getSession();

    return NextResponse.json({
      session,
      message: 'Lấy phiên đăng nhập thành công',
    });
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
