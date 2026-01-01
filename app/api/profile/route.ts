import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';
import { isAdmin } from '@/lib/supabase-helpers';

// GET: Get profile(s) - user can get their own, admin can get all
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClientWithCookies();

    // Validate session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Phiên đăng nhập không hợp lệ' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;
    const admin = isAdmin(userEmail);

    // Admin can get all profiles, users can only get their own (enforced by RLS)
    if (admin) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all profiles (admin):', error);
        return NextResponse.json(
          { error: error.message || 'Không thể lấy danh sách profiles' },
          { status: 400 }
        );
      }

      return NextResponse.json({ profiles: data });
    } else {
      // Regular users - RLS will enforce they can only read their own profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
          { error: error.message || 'Không thể lấy profile' },
          { status: 400 }
        );
      }

      return NextResponse.json({ profile: data });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy profile' },
      { status: 500 }
    );
  }
}
