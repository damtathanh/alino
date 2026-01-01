import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server'
;

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();

    if (!provider || (provider !== 'google' && provider !== 'apple')) {
      return NextResponse.json(
        { error: 'Provider không hợp lệ' },
        { status: 400 }
      );
    }

    const supabase = createServerClientWithCookies()
;
    const origin = request.nextUrl.origin;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'apple',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng nhập' },
      { status: 500 }
    );
  }
}

