'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Log in | Snapiq';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="auth-page-wrapper">
      {/* Background Decorative Ambient Blobs */}
      <div className="auth-ambient-blob blob-1" aria-hidden="true" />
      <div className="auth-ambient-blob blob-2" aria-hidden="true" />

      {/* Top Bar with Back Link */}
      <div className="auth-top-nav">
        <Link href="/" className="auth-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Snapiq</span>
        </Link>
      </div>

      {/* Main Glass Card */}
      <div className="auth-card-container">
        <div className="auth-card">
          {/* Logo Mark */}
          <div className="auth-logo-center">
            <Link href="/" className="auth-brand-logo" aria-label="Snapiq Home">
              <Logo size={36} showText textClassName="auth-logo-text" />
            </Link>
          </div>

          <div className="auth-header">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to track orders, review clips, or manage your creator roster.
            </p>
          </div>

          {submitted ? (
            <div className="auth-success-state">
              <div className="auth-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--forest-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="auth-success-title">Check your inbox!</h3>
              <p className="auth-success-desc">
                We sent a secure sign-in magic link to <strong>{email}</strong>. Click the link in your email to log in instantly.
              </p>
              <button
                type="button"
                className="auth-btn-secondary"
                onClick={() => setSubmitted(false)}
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              {/* Google OAuth Button */}
              <button
                type="button"
                className="auth-btn-oauth"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setSubmitted(true);
                    setEmail('creator@google.com');
                  }, 500);
                }}
              >
                <svg className="oauth-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-divider">
                <span className="auth-divider-line" />
                <span className="auth-divider-text">or with email</span>
                <span className="auth-divider-line" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="auth-email" className="form-label">
                    Work or Creator Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="you@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn-primary"
                >
                  {loading ? (
                    <span className="btn-spinner" />
                  ) : (
                    <>
                      <span>Send Magic Link</span>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="btn-arrow-icon">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Footer switch */}
          <div className="auth-card-footer">
            <span>New to Snapiq?</span>{' '}
            <Link href="/signup" className="auth-footer-link">
              Create an account
            </Link>
          </div>
        </div>

        {/* Trust badge */}
        <div className="auth-bottom-trust">
          <span className="badge-dot" style={{ width: 6, height: 6 }} />
          <span>SOC-2 Type II Certified · 256-bit Bank Grade Encryption</span>
        </div>
      </div>
    </main>
  );
}
