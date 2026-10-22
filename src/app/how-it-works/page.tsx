'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HowItWorksPage() {
  const timelineStages = [
    {
      time: '00:00',
      title: 'Submit Brief & Product Link',
      desc: 'Paste your website link, choose your preferred reel formats (ASMR, Problem & Solve, Founder Journey), and set target platforms.',
      badge: '2 Min Brief',
    },
    {
      time: '04:00',
      title: 'Matched with Vetted Creator',
      desc: 'Our matching algorithm pairs your brand with a verified creator specialized in your niche. Creator receives product or digital access.',
      badge: 'Top 1.4% Match',
    },
    {
      time: '24:00',
      title: 'Production & Cinematic B-Roll',
      desc: 'The creator shoots 4K vertical footage using studio-grade lighting, dynamic camera movements, and hyper-sensory audio.',
      badge: '4K Master Cut',
    },
    {
      time: '48:00',
      title: 'Final Delivery & Variations',
      desc: 'Receive ready-to-run 9:16 videos with burned-in dynamic captions, multiple hook intros for A/B testing, and commercial audio licensing.',
      badge: 'Ready to Run',
    },
  ];

  return (
    <div className="page-wrapper">
      <Header />

      <main className="subpage-main">
        {/* Hero Banner */}
        <section className="subpage-hero">
          <div className="subpage-badge">
            <span className="badge-dot" style={{ width: 7, height: 7 }} />
            <span>Streamlined 48-Hour Production</span>
          </div>
          <h1 className="subpage-title">
            From Product Brief to Viral Reel in 48 Hours
          </h1>
          <p className="subpage-subtitle">
            Skip the 4-week agency retainer cycle. Our handpicked creator network shoots,
            edits, and delivers snackable reels engineered to stop thumbs and drive conversions.
          </p>
        </section>

        {/* 3 Step Interactive Workflow */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num-pill">01</div>
              <h3 className="step-title">Pitch Your Angle</h3>
              <p className="step-text">
                Drop your product link, select target platforms (TikTok, IG Reels, Shorts),
                and choose your visual tone or let our creative team script high-converting hooks.
              </p>
              <div className="step-tag">⚡ 2-Minute Briefing</div>
            </div>

            <div className="step-card">
              <div className="step-num-pill">02</div>
              <h3 className="step-title">Matched with Top 1% Makers</h3>
              <p className="step-text">
                We pair your product with vetted short-form video creators specializing in your
                exact vertical—from macro texture ASMR to dynamic 3D lifestyle demonstrations.
              </p>
              <div className="step-tag">🎯 99.4% Match Accuracy</div>
            </div>

            <div className="step-card">
              <div className="step-num-pill">03</div>
              <h3 className="step-title">Download & Scale</h3>
              <p className="step-text">
                Receive ready-to-publish 9:16 vertical 4K edits with burned-in dynamic captions,
                A/B testable hook variations, and 100% perpetual commercial audio rights.
              </p>
              <div className="step-tag">🚀 Ready to Run Organic & Paid</div>
            </div>
          </div>
        </section>

        {/* Hour-by-Hour Timeline */}
        <section className="content-section">
          <div className="section-header">
            <div className="section-badge">Hour by Hour</div>
            <h2 className="section-title">The 48-Hour Turnaround Breakdown</h2>
            <p className="section-description">
              How we take your campaign from brief to published reel without missing a beat.
            </p>
          </div>

          <div className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {timelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="step-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(8, 72, 45, 0.12)',
                  borderRadius: '20px',
                  padding: '28px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700, fontSize: '24px', color: 'var(--forest-green)' }}>
                    Hour {stage.time}
                  </span>
                  <span className="step-tag" style={{ margin: 0 }}>{stage.badge}</span>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--headline-ink)', marginBottom: '8px' }}>
                  {stage.title}
                </h4>
                <p style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'var(--subline-ink)' }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Rush Delivery Guarantee Card */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="stats-bar-card" style={{ flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '36px' }}>
            <span style={{ fontSize: '32px' }}>🛡️</span>
            <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--headline-ink)' }}>
              The 100% On-Time & Re-Shoot Guarantee
            </h3>
            <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6, color: 'var(--subline-ink)' }}>
              If your reel is not delivered within 48 hours of creator match, your order is completely free.
              And if the final reel doesn&apos;t match your creative brief, we will re-shoot with an alternate creator at zero extra cost.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link href="/pricing" className="cta-button" style={{ display: 'inline-flex', padding: '12px 32px' }}>
                Start Your Order
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="content-section" style={{ paddingBottom: 0 }}>
          <div className="pre-footer-banner">
            <div className="banner-badge">Ready in 48 Hours</div>
            <h2 className="banner-title">
              Ready to Captivate Crowds<br />with Snackable Reels?
            </h2>
            <p className="banner-sub">
              Join 120,000+ indie makers and fast-moving brands turning short-form attention into revenue.
            </p>
            <div className="banner-cta-wrap">
              <Link href="/pricing" className="banner-cta-btn">
                Make Your First Reel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
