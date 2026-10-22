'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface HookFormat {
  id: string;
  category: string;
  tag: string;
  title: string;
  hookRate: string;
  completion: string;
  audio: string;
  desc: string;
  exampleScript: string;
  accentColor: string;
}

export default function FormatsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    document.title = 'Viral Formats & Hook Blueprints | Snapiq';
  }, []);

  const categories = [
    { id: 'all', label: 'All Formats' },
    { id: 'dtc', label: 'DTC & Physical Goods' },
    { id: 'beauty', label: 'Beauty & ASMR' },
    { id: 'saas', label: 'SaaS & Apps' },
    { id: 'food', label: 'Food & Beverage' },
  ];

  const formats: HookFormat[] = [
    {
      id: 'asmr',
      category: 'beauty',
      tag: 'Macro Sensory',
      title: 'Hyper-Sensory ASMR Unbox',
      hookRate: '78.4%',
      completion: '44.2%',
      audio: 'Crisp Binaural 3D Audio',
      desc: 'Zero voiceover, extreme macro close-ups, peeling protective film, and tactile packaging clicks that create instant psychological satisfaction.',
      exampleScript: '“*Sound of magnetic lid snapping, crisp paper tear, soft texture tap* (No speech needed).”',
      accentColor: '#105234',
    },
    {
      id: 'problem-solve',
      category: 'dtc',
      tag: 'Pain Anchor',
      title: 'The Relatable Aggravation',
      hookRate: '72.9%',
      completion: '39.8%',
      audio: 'Natural Ambient + Fast Cut',
      desc: 'Opens on the messy, chaotic reality your buyer deals with every day before introducing your product as the effortless remedy in seconds.',
      exampleScript: '“Stop cleaning your blender like this—there is a way faster hack you’re not using.”',
      accentColor: '#12603d',
    },
    {
      id: 'stress-test',
      category: 'dtc',
      tag: 'Extreme Proof',
      title: 'Torture & Durability Test',
      hookRate: '83.1%',
      completion: '51.6%',
      audio: 'High Energy Sub-Bass Hits',
      desc: 'Freeze it, drop it from a ladder, run water over it. High-stakes physical stress tests hook skeptical viewers who refuse to watch standard ads.',
      exampleScript: '“Can a $40 titanium water bottle survive being driven over by a Ford F-150? Let’s find out.”',
      accentColor: '#0a4228',
    },
    {
      id: 'founder-unfiltered',
      category: 'saas',
      tag: 'Raw Authenticity',
      title: 'Founder Behind-The-Curtain',
      hookRate: '68.5%',
      completion: '46.0%',
      audio: 'Lo-Fi Chill Hop Beat',
      desc: 'Raw front-camera confession talking about why corporate tools suck, why you built the alternative, and showing live screen demos.',
      exampleScript: '“I spent 3 years hating Jira, so last month I coded my own minimal alternative.”',
      accentColor: '#0d4a2d',
    },
    {
      id: 'contrarian-take',
      category: 'saas',
      tag: 'Curiosity Gap',
      title: 'The Uncomfortable Truth',
      hookRate: '75.2%',
      completion: '41.5%',
      audio: 'Subtle Tension Drone',
      desc: 'Calls out a universally accepted bad habit in your industry. Triggers debate in the comments and drives viral algorithmic distribution.',
      exampleScript: '“Most marketing agencies are charging you $5k/mo for 2 reels you could shoot on an iPhone.”',
      accentColor: '#146a42',
    },
    {
      id: 'food-macro',
      category: 'food',
      tag: 'Sensory Taste',
      title: 'The Golden Ratio Pour',
      hookRate: '79.6%',
      completion: '48.3%',
      audio: 'Fizz & Pour Foley Audio',
      desc: 'Slow-motion liquid cascades, sizzling grills, and glass condensation droplets that trigger salivary responses within the first 1.2 seconds.',
      exampleScript: '“Watch the cold foam settle into dark roast espresso at 120fps.”',
      accentColor: '#08482d',
    },
  ];

  const filteredFormats =
    activeCategory === 'all'
      ? formats
      : formats.filter((f) => f.category === activeCategory);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="subpage-main">
        {/* Hero Section */}
        <section className="subpage-hero">
          <div className="subpage-badge">
            <span className="badge-dot" style={{ width: 7, height: 7 }} />
            <span>Proven Short-Form Blueprints</span>
          </div>
          <h1 className="subpage-title">
            6 High-Converting Reel Formats Engineered to Stop the Scroll
          </h1>
          <p className="subpage-subtitle">
            Don&apos;t guess what works on TikTok, Instagram, and Shorts. Every creator on Snapiq
            is trained on empirical retention curves and behavioral hook psychology.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="formats-filter-bar" role="tablist" aria-label="Format categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`format-filter-btn ${
                  activeCategory === cat.id ? 'is-active' : ''
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Formats Grid */}
          <div className="formats-grid">
            {filteredFormats.map((fmt) => (
              <div
                key={fmt.id}
                className="format-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className="format-card-preview" style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 50% 40%, rgba(218, 231, 199, 0.45), transparent 70%)`,
                      }}
                    />
                    <div className="format-play-pill">
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                        <path d="M8 5V19L19 12L8 5Z" fill="var(--forest-green)" />
                      </svg>
                      <span>Preview Cut</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="format-tag">{fmt.tag}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--forest-green)' }}>
                      🔊 {fmt.audio}
                    </span>
                  </div>

                  <h3 className="format-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
                    {fmt.title}
                  </h3>
                  <p className="format-desc" style={{ fontSize: '14.5px', marginBottom: '16px' }}>
                    {fmt.desc}
                  </p>

                  <div
                    style={{
                      background: 'rgba(8, 72, 45, 0.04)',
                      borderLeft: '3px solid var(--forest-green)',
                      padding: '10px 14px',
                      borderRadius: '0 8px 8px 0',
                      fontStyle: 'italic',
                      fontSize: '13.5px',
                      color: '#2d382d',
                      marginBottom: '18px',
                    }}
                  >
                    {fmt.exampleScript}
                  </div>
                </div>

                <div
                  className="format-metrics"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(8, 72, 45, 0.08)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11.5px', textTransform: 'uppercase', color: '#738073', fontWeight: 600 }}>
                      Avg Hook Rate
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter-tight)', fontSize: '20px', fontWeight: 700, color: 'var(--forest-green)' }}>
                      {fmt.hookRate}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11.5px', textTransform: 'uppercase', color: '#738073', fontWeight: 600 }}>
                      Full Watch Rate
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter-tight)', fontSize: '20px', fontWeight: 700, color: 'var(--headline-ink)' }}>
                      {fmt.completion}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hook Anatomy Deep Dive */}
          <div className="hook-anatomy-card">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <div className="section-badge">Retention Blueprint</div>
              <h2 style={{ fontFamily: 'var(--font-inter-tight)', fontSize: '28px', fontWeight: 700, color: 'var(--headline-ink)', margin: '12px 0 8px 0' }}>
                Anatomy of a 3-Second Viral Hook
              </h2>
              <p style={{ color: 'var(--subline-ink)', fontSize: '15px' }}>
                How our creators sequence the opening milliseconds so thumb scrollers freeze on your video.
              </p>
            </div>

            <div className="hook-timeline">
              <div className="hook-stage-box">
                <div className="hook-stage-sec">0.0s – 0.8s</div>
                <div className="hook-stage-name">Pattern Interrupt</div>
                <p className="hook-stage-detail">
                  High contrast visual snap or sudden motion that breaks the habitual scrolling cadence. No intro logos.
                </p>
              </div>

              <div className="hook-stage-box">
                <div className="hook-stage-sec">0.8s – 1.8s</div>
                <div className="hook-stage-name">Sensory & Voice Anchor</div>
                <p className="hook-stage-detail">
                  Crisp foley sound or an provocative polarizing question. Bold subtitle keywords highlighted in bright yellow/green.
                </p>
              </div>

              <div className="hook-stage-box">
                <div className="hook-stage-sec">1.8s – 3.0s</div>
                <div className="hook-stage-name">The Open Loop</div>
                <p className="hook-stage-detail">
                  A promise of a payoff (&quot;Watch until the third coat dries&quot;) that commits the viewer through the 15-second mark.
                </p>
              </div>

              <div className="hook-stage-box">
                <div className="hook-stage-sec">3.0s – 20s+</div>
                <div className="hook-stage-name">Rhythmic Pacing</div>
                <p className="hook-stage-detail">
                  Cuts every 1.4 seconds with dynamic zoom-ins, SFX whooshes, and continuous visual progression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="content-section" style={{ paddingBottom: 0 }}>
          <div className="pre-footer-banner">
            <div className="banner-badge">Start Producing</div>
            <h2 className="banner-title">
              Ready to Test These Formats<br />on Your Product?
            </h2>
            <p className="banner-sub">
              Brief our creators in 2 minutes and get ready-to-test hook variants delivered to your dashboard.
            </p>
            <div className="banner-cta-wrap">
              <Link href="/pricing" className="banner-cta-btn">
                Choose a Package
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
