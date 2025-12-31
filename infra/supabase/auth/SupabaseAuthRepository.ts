import type { AuthRepository } from '@/core/contracts/auth-repository';
import type { Session } from '@/core/domain/auth';
import { supabase } from '../client';

export class SupabaseAuthRepository implements AuthRepository {
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return null;
    }

    const { session } = data;

    return {
      user: {
        id: session.user.id,
        email: session.user.email ?? null,
        name: session.user.user_metadata?.name ?? session.user.user_metadata?.full_name ?? null,
      },
      accessToken: session.access_token,
      expiresAt: new Date(session.expires_at! * 1000).toISOString(),
    };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
}

