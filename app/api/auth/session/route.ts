import { NextResponse } from 'next/server'
import { createServerClientWithCookies } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createServerClientWithCookies()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return NextResponse.json({ session })
}
