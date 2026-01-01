import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithCookies } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const supabase = createServerClientWithCookies()

  const code = url.searchParams.get('code')

  // ✅ OAuth login (Google) or Email verification
  if (code) {
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        new URL('/verify-email?error=expired', url.origin)
      )
    }

    // 🔥 SESSION ĐÃ ĐƯỢC SET COOKIE
    // After email verification/OAuth, check profile and redirect accordingly
    if (authData?.user?.id) {
      const userId = authData.user.id;

      await supabase
  .from('profiles')
  .upsert({
    id: userId,
    onboarding_completed: false,
    onboarding_data: {},
  });
      
      // Check profile from database (source of truth)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, onboarding_completed')
        .eq('id', userId)
        .single();

      if (!profile) {
        // No profile yet - redirect to role selection
        return NextResponse.redirect(new URL('/role', url.origin));
      }

      if (!profile.role) {
        // Profile exists but no role - redirect to role selection
        return NextResponse.redirect(new URL('/role', url.origin));
      }

      if (!profile.onboarding_completed) {
        // Has role but not completed onboarding - redirect to onboarding
        return NextResponse.redirect(new URL('/onboarding', url.origin));
      }

      // Complete profile - redirect to dashboard
      return NextResponse.redirect(new URL(`/${profile.role}`, url.origin));
    }

    // Fallback: redirect to home
    return NextResponse.redirect(new URL('/', url.origin))
  }

  // ✅ Email confirm (KHÔNG login)
  return NextResponse.redirect(
    new URL('/login?verified=1', url.origin)
  )
}
