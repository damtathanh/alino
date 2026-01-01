import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json();

    if (!role || (role !== 'creator' && role !== 'brand')) {
      return NextResponse.json(
        { error: 'Vai trò không hợp lệ' },
        { status: 400 }
      );
    }

    const supabase = createServerClientWithCookies();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Chưa đăng nhập' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        role,
        onboarding_completed: false,
        onboarding_data: {},
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
