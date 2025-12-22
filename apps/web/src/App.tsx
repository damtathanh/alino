import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
    const [session, setSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
            <h1>Alino MVP</h1>
            <p>Status: {session ? 'Logged In' : 'Logged Out'}</p>

            {session ? (
                <div>
                    <p>Welcome, {session.user.email}</p>
                    <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <p>Please log in (Auth UI needs to be implemented or use Supabase UI helper)</p>
                    {/* Simple placeholder for logic */}
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
                        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
                        const { error } = await supabase.auth.signInWithPassword({ email, password });
                        if (error) alert(error.message);
                    }}>
                        <input type="email" placeholder="Email" required style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
                        <input type="password" placeholder="Password" required style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
                        <button type="submit" style={{ padding: '8px 16px' }}>Log In</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default App
