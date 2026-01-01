// API endpoint to check profile from database (for client-side checks)
import { NextResponse } from 'next/server';
import { createServerClientWithCookies } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createServerClientWithCookies();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({
        hasSession: false,
        hasProfile: false,
      });
    }

    // Check profile from database (source of truth)
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, role, onboarding_completed')
      .eq('id', session.user.id)
      .single();

    if (error || !profile) {
      // Session exists but no profile - invalid state
      await supabase.auth.signOut();
      return NextResponse.json({
        hasSession: false,
        hasProfile: false,
      });
    }

    return NextResponse.json({
      hasSession: true,
      hasProfile: true,
      profile,
    });
  } catch (error) {
    console.error('Profile check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
