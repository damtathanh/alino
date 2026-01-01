import { NextRequest, NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { onboardingData } = await request.json();

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

    // Get current profile to preserve role
    const { data: currentProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (fetchError || !currentProfile) {
      console.error('Error fetching profile:', fetchError);
      return NextResponse.json(
        { error: 'Profile không tồn tại. Vui lòng chọn vai trò trước.' },
        { status: 400 }
      );
    }

    // Update profile with onboarding_completed = true and onboarding_data as JSON
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        onboarding_data: onboardingData || {},
      })
      .eq('id', userId);

    if (profileError) {
      console.error('Error updating profile onboarding:', profileError);
      return NextResponse.json(
        { error: profileError.message || 'Không thể hoàn tất onboarding' },
        { status: 400 }
      );
    }

    // Also update user_metadata for AuthGate compatibility
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        role: currentProfile.role,
        onboardingCompleted: true,
      },
    });

    if (metadataError) {
      // Log but don't fail - profiles is source of truth
      console.error('Failed to update user_metadata:', metadataError);
    }

    return NextResponse.json({
      message: 'Onboarding đã được hoàn tất thành công',
    });
  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi hoàn tất onboarding' },
      { status: 500 }
    );
  }
}
