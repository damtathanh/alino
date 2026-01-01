import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithCookies } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const supabase = createServerClientWithCookies()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({
    message: 'Check email để verify',
    user: data.user,
  })
}
