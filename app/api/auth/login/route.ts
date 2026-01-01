import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }

    const supabase = createServerClientWithCookies();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // ✅ ENSURE PROFILE EXISTS (IDEMPOTENT)
    const userId = data.user.id;

    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        onboarding_completed: false,
        onboarding_data: {},
      });

    if (upsertError) {
      console.error('Error upserting profile after login:', upsertError);
      // Không fail request – profile sẽ được sửa ở bước sau
    }

    return NextResponse.json({
      message: 'Đăng nhập thành công',
      user: data.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng nhập' },
      { status: 500 }
    );
  }
}
