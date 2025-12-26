import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                // ✅ BẮT TOKEN KHI CONFIRM EMAIL
                const { data } = await supabase.auth.getSession();
                if (!mounted) return;

                setSession(data.session ?? null);
                setUser(data.session?.user ?? null);
            } catch (e) {
                console.error('Auth init error:', e);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        init();

        const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            if (!mounted) return;
            setSession(nextSession ?? null);
            setUser(nextSession?.user ?? null);
            setLoading(false);
        });

        return () => {
            mounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const value = useMemo(
        () => ({ session, user, loading, signOut }),
        [session, user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
