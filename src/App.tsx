import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'
import LandingPage from './landing/LandingPage'

function App() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showLogin, setShowLogin] = useState(false)

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                Loading...
            </div>
        )
    }

    if (session) {
        return (
            <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
                <h1>Alino MVP</h1>
                <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9', color: '#333' }}>
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
                </div>
            </div>
        )
    }

    // Simple Auth View Toggle for demo purposes
    if (showLogin) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                    <button onClick={() => setShowLogin(false)} style={{ marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>← Back to Home</button>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Login to Alino</h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-divider)' }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-divider)' }}
                        />
                        <button
                            type="submit"
                            style={{ padding: '0.75rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <LandingPage />
        </>
    )
}

export default App
