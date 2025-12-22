import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'

function App() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert(error.message)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Alino MVP</h1>
            <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', background: '#333' }}>
                {session ? (
                    <div>
                        <h2>Dashboard</h2>
                        <p><strong>Status:</strong> Authenticated</p>
                        <p><strong>Email:</strong> {session.user.email}</p>
                        <p><strong>User ID:</strong> {session.user.id}</p>
                        <button
                            onClick={handleLogout}
                            style={{ padding: '8px 16px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>Login</h2>
                        <p>Please log in to continue.</p>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #666' }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #666' }}
                            />
                            <button
                                type="submit"
                                style={{ padding: '8px 16px', background: '#4444ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
