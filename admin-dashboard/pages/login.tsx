import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Nav from '../components/Nav';
import Link from 'next/link';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
      <Nav />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem',
      }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
            Welcome Back
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Sign in to your MobiBiz AI account
          </p>

          <form onSubmit={submit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid var(--danger)',
                color: '#7f1d1d',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading ? 'var(--gray-300)' : 'var(--primary-light)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
            <p style={{ color: 'var(--gray-600)' }}>Don't have an account?</p>
            <Link href="/register" style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              color: 'var(--primary-light)',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              Create an account
            </Link>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/forgot-password" style={{
              color: 'var(--gray-600)',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}>
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
