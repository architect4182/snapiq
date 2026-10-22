'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Formats', href: '/formats' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Creators', href: '/creators' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand Logo */}
        <Link href="/" className="site-logo" aria-label="Snapiq Home">
          <Logo size={32} showText textClassName="site-logo-text" />
        </Link>

        {/* Navigation Links */}
        <nav className="site-nav" aria-label="Main Navigation">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <React.Fragment key={link.href}>
                {idx > 0 && <span className="site-nav-sep" aria-hidden="true">·</span>}
                <Link
                  href={link.href}
                  className={`site-nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {link.name}
                  {isActive && <span className="active-pill-dot" aria-hidden="true" />}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="site-header-actions">
          <Link href="/login" className="site-btn-login">
            Log in
          </Link>
          <Link href="/pricing" className="site-btn-cta">
            Make a Reel
          </Link>
        </div>
      </div>
    </header>
  );
}
