'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function SignupPage() {
  const [role, setRole] = useState<'brand' | 'creator'>('brand');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Sign Up & Get Started | Snapiq';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
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
        <div className="auth-card auth-card-signup">
          {/* Logo Mark */}
          <div className="auth-logo-center">
            <Link href="/" className="auth-brand-logo" aria-label="Snapiq Home">
              <Logo size={36} showText textClassName="auth-logo-text" />
            </Link>
          </div>

          <div className="auth-header">
            <div className="badge-pill auth-pill-badge" style={{ position: 'relative', top: 'auto', left: 'auto', margin: '0 auto 12px auto' }}>
              <span className="badge-dot" aria-hidden="true" />
              <span className="badge-text">Join 120,000+ indie makers</span>
            </div>
            <h1 className="auth-title">Get started with Snapiq</h1>
            <p className="auth-subtitle">
              Order your first batch of snackable reels or get hired as a verified creator.
            </p>
          </div>

          {/* Role Segment Toggle */}
          <div className="auth-role-toggle" role="tablist" aria-label="Select Account Type">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'brand'}
              className={`auth-role-btn ${role === 'brand' ? 'is-active' : ''}`}
              onClick={() => setRole('brand')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="role-icon">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>I&apos;m a Brand / DTC</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'creator'}
              className={`auth-role-btn ${role === 'creator' ? 'is-active' : ''}`}
              onClick={() => setRole('creator')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="role-icon">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              <span>I&apos;m a Creator</span>
            </button>
          </div>

          {submitted ? (
            <div className="auth-success-state">
              <div className="auth-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--forest-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="auth-success-title">Welcome aboard, {name}!</h3>
              <p className="auth-success-desc">
                Your Snapiq {role === 'brand' ? 'brand account' : 'creator studio profile'} is ready. Check <strong>{email}</strong> for your onboarding walkthrough and complimentary brief template.
              </p>
              <Link href="/" className="auth-btn-primary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                <span>Enter Workspace</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="signup-name" className="form-label">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                  {role === 'brand' ? 'Work Email' : 'Contact Email'}
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  placeholder="alex@lumina.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-handle" className="form-label">
                  {role === 'brand' ? 'Brand Website or Product URL' : 'Portfolio or TikTok Handle'}
                </label>
                <input
                  id="signup-handle"
                  type="text"
                  placeholder={role === 'brand' ? 'https://lumina.com' : '@alexreels'}
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
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
                    <span>Create {role === 'brand' ? 'Brand' : 'Creator'} Account</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="btn-arrow-icon">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer switch */}
          <div className="auth-card-footer">
            <span>Already have an account?</span>{' '}
            <Link href="/login" className="auth-footer-link">
              Sign in
            </Link>
          </div>
        </div>

        {/* Trust badge */}
        <div className="auth-bottom-trust">
          <span className="badge-dot" style={{ width: 6, height: 6 }} />
          <span>Zero upfront cost · 48h turnaround · 100% money-back guarantee</span>
        </div>
      </div>
    </main>
  );
}
