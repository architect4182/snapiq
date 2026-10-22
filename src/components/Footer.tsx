'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  return (
    <footer className="footer-wrap">
      <div className="footer-inner">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Newsletter */}
          <div className="footer-brand-col">
            <Link href="/" className="brand-logo" style={{ position: 'static' }}>
              <Logo size={28} showText textClassName="brand-logo-text" />
            </Link>
            <p>
              The creator marketplace for short-form product video clips.
              High-converting reels for TikTok, Instagram & YouTube Shorts in 48 hours.
            </p>
            <div className="footer-newsletter-wrap">
              <span className="footer-newsletter-label">
                Get our weekly Viral Hook Playbook:
              </span>
              {newsletterSubmitted ? (
                <div style={{ color: 'var(--forest-green)', fontWeight: 600, fontSize: 14 }}>
                  ✓ You&apos;re subscribed! Check your inbox.
                </div>
              ) : (
                <form
                  className="newsletter-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubmitted(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="founder@yourbrand.com"
                    className="newsletter-input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" className="newsletter-btn">
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="footer-col-title">Pages</h4>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">Home / Hero</Link></li>
              <li><Link href="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link href="/formats" className="footer-link">Viral Hook Formats</Link></li>
              <li><Link href="/pricing" className="footer-link">Pricing & Bundles</Link></li>
              <li><Link href="/creators" className="footer-link">Creator Showcase</Link></li>
              <li><Link href="/faq" className="footer-link">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 3: Creators */}
          <div>
            <h4 className="footer-col-title">Creators</h4>
            <ul className="footer-links-list">
              <li><Link href="/creators" className="footer-link">Apply as Creator</Link></li>
              <li><Link href="/login" className="footer-link">Creator Portal</Link></li>
              <li><Link href="/pricing" className="footer-link">Payout Rates</Link></li>
              <li><Link href="/formats" className="footer-link">Equipment Standards</Link></li>
              <li><Link href="/signup" className="footer-link">Creator Community</Link></li>
            </ul>
          </div>

          {/* Column 4: Account */}
          <div>
            <h4 className="footer-col-title">Account</h4>
            <ul className="footer-links-list">
              <li><Link href="/login" className="footer-link">Log in to Dashboard</Link></li>
              <li><Link href="/signup" className="footer-link">Create Account</Link></li>
              <li><Link href="/pricing" className="footer-link">Compare Plans</Link></li>
              <li><Link href="/how-it-works" className="footer-link">48h Delivery Guarantee</Link></li>
              <li><Link href="/faq" className="footer-link">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li><Link href="/how-it-works" className="footer-link">About Snapiq</Link></li>
              <li><Link href="/creators" className="footer-link">Careers <span className="discount-pill" style={{ marginLeft: 4 }}>We&apos;re Hiring</span></Link></li>
              <li><Link href="/faq" className="footer-link">Press & Media</Link></li>
              <li><Link href="/faq" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/faq" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 Snapiq Inc. All rights reserved. Built with precision for indie makers.
          </div>

          <div className="footer-status-pill">
            <span className="badge-dot" style={{ width: 6, height: 6 }}></span>
            <span>All Systems Operational · 48h Turnaround Active</span>
          </div>

          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.31 6.31 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.47a8.28 8.28 0 0 0 4.77 1.52v-3.3z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
