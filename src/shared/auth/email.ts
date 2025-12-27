import type { User } from '@supabase/supabase-js';

export const isEmailNotVerified = (user: User | null) => {
    return !!(
        user &&
        user.app_metadata?.provider === 'email' &&
        !user.email_confirmed_at
    );
};
