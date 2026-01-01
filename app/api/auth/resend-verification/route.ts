import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      );
    }

    const supabase = createServerClientWithCookies();

    // Resend verification email (type: signup)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      console.error('Resend verification error:', error);
      return NextResponse.json(
        { error: error.message || 'Không thể gửi lại email xác thực' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Email xác thực đã được gửi lại',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi lại email' },
      { status: 500 }
    );
  }
}
