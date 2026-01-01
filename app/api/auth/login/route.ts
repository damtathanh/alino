import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithCookies } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      )
    }

    const supabase = createServerClientWithCookies()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ success: true, user: data.user })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng nhập' },
      { status: 500 }
    )
  }
}
