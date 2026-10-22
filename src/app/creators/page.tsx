'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  tags: string[];
  hookRate: string;
  completed: string;
  gear: string;
  bio: string;
}

export default function CreatorsPage() {
  useEffect(() => {
    document.title = 'Top Creators Network & Auditions | Snapiq';
  }, []);
  const creators: CreatorProfile[] = [
    {
      name: 'Sarah Lin',
      handle: '@sarahshoots',
      avatar: '🌸',
      niche: 'Beauty & Wellness',
      tags: ['Skincare ASMR', 'Texture Macro', 'Aesthetic Lighting'],
      hookRate: '79.4%',
      completed: '142 Reels',
      gear: 'Sony FX3 + 90mm Macro G-Master',
      bio: 'Former Vogue social video producer specializing in tactile sensory clips, clean packaging peels, and glass-skin lighting setups.',
    },
    {
      name: 'Marcus Vance',
      handle: '@vancestudio',
      avatar: '⚡',
      niche: 'Tech & Everyday Carry',
      tags: ['Kinetic Cuts', 'Torture Testing', 'Product Rigs'],
      hookRate: '83.2%',
      completed: '218 Reels',
      gear: 'RED Komodo 6K + DJI Ronin 4D',
      bio: 'Industrial designer turned short-form filmmaker. Obsessed with mechanical snaps, durability drops, and seamless loop transitions.',
    },
    {
      name: 'Elena Rostova',
      handle: '@elenacooks',
      avatar: '🍳',
      niche: 'Culinary & Beverage',
      tags: ['Binaural Foley', 'Liquid Pour 120fps', 'Sizzle Macro'],
      hookRate: '84.8%',
      completed: '189 Reels',
      gear: 'Sony A7S III + Sennheiser MKH 416',
      bio: 'Sound designer & food stylist. Every video features binaural 3D audio foley that triggers instant sensory cravings in the first 2 seconds.',
    },
    {
      name: 'Kai Tanaka',
      handle: '@kaicreative',
      avatar: '💻',
      niche: 'SaaS & Digital Apps',
      tags: ['Pattern Interrupt', 'Founder Confessions', '3D UI Motion'],
      hookRate: '72.6%',
      completed: '94 Reels',
      gear: 'Blackmagic 6K Pro + Shure SM7B',
      bio: 'Creator for developers & software founders. Turns complex dev tools and dashboards into viral, digestible 25-second walkthroughs.',
    },
  ];

  const testimonials = [
    {
      quote:
        '“Snapiq creators understand retention in a way traditional ad agencies simply cannot. We swapped our $6k agency for Snapiq and our Meta ROAS jumped from 1.6x to 3.4x in 3 weeks.”',
      author: 'Sophia Chen',
      role: 'Head of Growth, Solara Botanicals',
      avatar: '🌿',
    },
    {
      quote:
        '“Getting 4 custom reels with multiple testable hooks within 48 hours feels like magic. We scale winners into paid ads and use the rest organically on TikTok.”',
      author: 'Liam O’Connor',
      role: 'Founder, Lumina EDC',
      avatar: '🎒',
    },
    {
      quote:
        '“The ASMR packaging reel Elena shot hit 1.8M organic views on Instagram Reels in 48 hours without spending a dime on ads. The ROI is undeniable.”',
      author: 'Maya Lin',
      role: 'CMO, Aura Glow Skincare',
      avatar: '✨',
    },
  ];

  return (
    <div className="page-wrapper">
      <Header />

      <main className="subpage-main">
        {/* Hero Section */}
        <section className="subpage-hero">
          <div className="subpage-badge">
            <span className="badge-dot" style={{ width: 7, height: 7 }} />
            <span>The Top 1.4% Creator Network</span>
          </div>
          <h1 className="subpage-title">
            Meet the Makers Behind the Internet&apos;s Highest-Converting Reels
          </h1>
          <p className="subpage-subtitle">
            Every creator in our roster passes a rigorous 4-stage audit for camera lighting,
            sound design, pacing rhythm, and thumb-stop retention metrics.
          </p>
        </section>

        {/* Creators Roster Grid */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="creators-roster-grid">
            {creators.map((c, idx) => (
              <div key={idx} className="creator-card-pro">
                <div className="creator-card-top">
                  <div className="creator-avatar-bubble">{c.avatar}</div>
                  <div>
                    <h3 className="creator-name-bold">{c.name}</h3>
                    <div className="creator-handle">{c.handle}</div>
                    <span className="creator-badge-verified">✓ Vetted Master</span>
                  </div>
                </div>

                <div className="creator-stat-strip">
                  <div className="creator-stat-item">
                    <span className="creator-stat-val">{c.hookRate}</span>
                    <span className="creator-stat-lbl">Avg Hook Rate</span>
                  </div>
                  <div className="creator-stat-item">
                    <span className="creator-stat-val">{c.completed}</span>
                    <span className="creator-stat-lbl">Delivered</span>
                  </div>
                </div>

                <div className="creator-niche-tags">
                  {c.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="creator-tag-item">
                      {tag}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--subline-ink)', marginBottom: '16px', flexGrow: 1 }}>
                  {c.bio}
                </p>

                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(8, 72, 45, 0.08)', fontSize: '12.5px', color: '#526052' }}>
                  🎥 <strong>Kit:</strong> {c.gear}
                </div>
              </div>
            ))}
          </div>

          {/* Audition Callout for Creators */}
          <div className="audition-card">
            <div>
              <div className="section-badge" style={{ marginBottom: '12px' }}>Creator Auditions Open</div>
              <h2 style={{ fontFamily: 'var(--font-inter-tight)', fontSize: '28px', fontWeight: 700, color: 'var(--headline-ink)', marginBottom: '12px' }}>
                Are You a Short-Form Filmmaker?
              </h2>
              <p style={{ color: 'var(--subline-ink)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                Join our paid roster of vetted short-form filmmakers. Receive consistent brand briefs on Snapiq,
                free physical products, and guaranteed weekly payouts without chasing clients or unpaid invoices.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/signup" className="site-btn-cta" style={{ display: 'inline-flex', padding: '12px 26px' }}>
                  Apply as a Creator
                </Link>
                <Link href="/how-it-works" className="site-btn-login" style={{ border: '1px solid rgba(8, 72, 45, 0.16)' }}>
                  How Creator Matching Works
                </Link>
              </div>
            </div>

            <div style={{ background: 'rgba(245, 248, 239, 0.8)', border: '1px solid rgba(8, 72, 45, 0.12)', borderRadius: '20px', padding: '24px' }}>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--headline-ink)', marginBottom: '12px' }}>
                Creator Acceptance Standards:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#414f41' }}>
                <li>✓ 4K 10-bit vertical capture capability</li>
                <li>✓ Dedicated sound recording (Foley/Binaural/Lavalier)</li>
                <li>✓ Minimum 65%+ 3-second hook rate track record</li>
                <li>✓ Dependable 48-hour delivery timeline adherence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Wall of Love Testimonials */}
        <section className="content-section">
          <div className="section-header">
            <div className="section-badge">Client Testimonials</div>
            <h2 className="section-title">Loved by High-Growth Brands</h2>
            <p className="section-description">
              Real feedback from founders and growth leads scaling with Snapiq.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{t.avatar}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#2d382d', fontStyle: 'italic', marginBottom: '20px' }}>
                  {t.quote}
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--headline-ink)' }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--subline-ink)' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="content-section" style={{ paddingBottom: 0 }}>
          <div className="pre-footer-banner">
            <div className="banner-badge">Get Matched</div>
            <h2 className="banner-title">
              Ready to Match with Your<br />Dedicated Creator?
            </h2>
            <p className="banner-sub">
              Brief our team in 2 minutes. We will pair your product with the perfect creator within 4 hours.
            </p>
            <div className="banner-cta-wrap">
              <Link href="/pricing" className="banner-cta-btn">
                Browse Packages & Start
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
