import { NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server'
;

export async function POST() {
  try {
    const supabase = createServerClientWithCookies()
;
    await supabase.auth.signOut();

    return NextResponse.json({ message: 'Đã đăng xuất' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng xuất' },
      { status: 500 }
    );
  }
}

