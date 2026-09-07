import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export default function Nav() {
  const { user, signOut } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid var(--gray-200)',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    }}>
      <Link href="/" style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-light)' }}>
        MobiBiz AI
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {!user ? (
          <>
            <Link href="/login" style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>
              Login
            </Link>
            <Link href="/register" style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--primary-light)',
              color: 'white',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: '500',
            }}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--gray-600)' }}>{user.email}</span>
            <Link href="/dashboard" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--danger)',
                cursor: 'pointer',
                padding: 0,
                fontSize: '1rem',
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
