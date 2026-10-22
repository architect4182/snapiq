'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Pilot',
      badge: 'Single Drop',
      desc: 'Ideal for indie brands testing creator-led short-form for the first time.',
      price: isAnnual ? 199 : 249,
      period: 'per reel',
      subnote: isAnnual ? 'Billed annually · Save $50' : 'Single video drop',
      isPopular: false,
      features: [
        '1 High-definition 4K 9:16 reel',
        '2 Alternate hook variations for A/B testing',
        '48-hour production turnaround',
        'Handpicked creator with vertical niche fit',
        'Full perpetual commercial licensing',
        'Dynamic animated burned-in captions',
        '1 round of creative revisions',
      ],
      ctaText: 'Order Starter Reel',
    },
    {
      id: 'growth',
      name: 'Growth Pack',
      badge: 'Most Popular',
      desc: 'Engineered for scaling DTC brands running paid Meta and TikTok ads.',
      price: isAnnual ? 712 : 890,
      period: '4 reels ($178/ea)',
      subnote: isAnnual ? 'Billed annually · Save $178' : 'Complete 4-reel creative pack',
      isPopular: true,
      features: [
        '4 Distinct high-converting 9:16 reels',
        '3 Hook intro variations per reel (12 hooks total)',
        'Rush 48-hour delivery queue',
        'Dedicated creative director review',
        '9:16 Vertical + 1:1 Square cutdowns',
        'Raw footage B-roll pack included',
        'Perpetual ad whitelisting rights',
        'Unlimited revisions within brief scope',
      ],
      ctaText: 'Start Growth Campaign',
    },
    {
      id: 'scale',
      name: 'Scale Retainer',
      badge: 'For Fast Brands',
      desc: 'Continuous creative testing pipeline with multiple creator faces.',
      price: isAnnual ? 1592 : 1990,
      period: '10 reels / mo',
      subnote: isAnnual ? 'Billed annually · Save $398/mo' : '10 reels delivered monthly',
      isPopular: false,
      features: [
        '10 Custom 9:16 reels every month',
        'Multi-creator testing (up to 3 creators)',
        '30 Hook intro variations total',
        'Dedicated Slack channel with team',
        'Bi-weekly viral trend creative briefing',
        'Paid media performance review & tagging',
        'Direct product shipping logistics managed',
        'Priority same-day emergency re-shoots',
      ],
      ctaText: 'Join Scale Retainer',
    },
  ];

  const comparisonRows = [
    {
      feature: 'Production Turnaround',
      agency: '3 – 6 Weeks',
      freelance: '10 – 21 Days',
      snapiq: '⚡ 48 Hours Guaranteed',
    },
    {
      feature: 'Typical Cost',
      agency: '$5,000+/mo Retainer',
      freelance: '$300 – $900 per cut',
      snapiq: 'Flat $178 – $249 / reel',
    },
    {
      feature: 'Creator Vetting',
      agency: 'Agency staff / interns',
      freelance: 'Unverified portfolio',
      snapiq: 'Top 1.4% Acceptance Rate',
    },
    {
      feature: 'A/B Testable Hook Variants',
      agency: 'Extra billable hours',
      freelance: 'Rarely provided',
      snapiq: '2 to 3 Included per Reel',
    },
    {
      feature: 'Commercial Ad Rights',
      agency: '12-month limit or royalties',
      freelance: 'Ambiguous licensing',
      snapiq: '100% Perpetual Worldwide',
    },
    {
      feature: 'Satisfaction Guarantee',
      agency: 'None (billed for hours)',
      freelance: 'Disputed escrow',
      snapiq: '🛡️ 100% On-Time or Free',
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
            <span>Clear & Honest Pricing</span>
          </div>
          <h1 className="subpage-title">
            Flat-Rate Creator Production.<br />Zero Agency Retainers.
          </h1>
          <p className="subpage-subtitle">
            Pay per video or subscribe for monthly high-volume drops.
            Every reel comes with commercial music licensing and multiple hook variations.
          </p>

          {/* Monthly / Annual Toggle */}
          <div style={{ marginTop: '28px' }}>
            <div className="pricing-billing-switch">
              <button
                className={`billing-option-btn ${!isAnnual ? 'is-active' : ''}`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly Flexible
              </button>
              <button
                className={`billing-option-btn ${isAnnual ? 'is-active' : ''}`}
                onClick={() => setIsAnnual(true)}
              >
                Annual Studio
                <span className="save-pill-tag">SAVE 20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.isPopular ? 'is-popular' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className="pricing-card-header">
                    <div className="pricing-tier-badge">{plan.badge}</div>
                    <h3 className="pricing-plan-title">{plan.name}</h3>
                    <p className="pricing-plan-desc">{plan.desc}</p>
                  </div>

                  <div className="pricing-price-wrap">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">{plan.price}</span>
                    <span className="pricing-period">/ {plan.period}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--forest-green)', fontWeight: 600, marginTop: '-12px', marginBottom: '20px' }}>
                    {plan.subnote}
                  </div>

                  <ul className="pricing-feature-list">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="pricing-feature-item">
                        <span className="feature-check">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <Link
                    href="/signup"
                    className={plan.isPopular ? 'pricing-cta-popular' : 'pricing-cta-default'}
                    style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agency vs Snapiq Comparison Table */}
        <section className="content-section">
          <div className="section-header">
            <div className="section-badge">How We Compare</div>
            <h2 className="section-title">Why Brands Choose Snapiq</h2>
            <p className="section-description">
              See how our creator platform stacks up against legacy production workflows.
            </p>
          </div>

          <div className="comparison-card" style={{ maxWidth: '980px', margin: '0 auto', overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(8, 72, 45, 0.12)' }}>
                  <th style={{ textAlign: 'left', padding: '18px 20px', color: 'var(--subline-ink)', fontWeight: 600 }}>Capability</th>
                  <th style={{ textAlign: 'center', padding: '18px 20px', color: '#738073', fontWeight: 500 }}>Traditional Agency</th>
                  <th style={{ textAlign: 'center', padding: '18px 20px', color: '#738073', fontWeight: 500 }}>Freelance Marketplace</th>
                  <th style={{ textAlign: 'center', padding: '18px 20px', background: 'rgba(8, 72, 45, 0.06)', color: 'var(--forest-green)', fontWeight: 700, borderRadius: '12px 12px 0 0' }}>Snapiq Studio</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx === comparisonRows.length - 1 ? 'none' : '1px solid rgba(8, 72, 45, 0.07)',
                    }}
                  >
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: 'var(--headline-ink)' }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: '18px 20px', textAlign: 'center', color: '#687368' }}>
                      {row.agency}
                    </td>
                    <td style={{ padding: '18px 20px', textAlign: 'center', color: '#687368' }}>
                      {row.freelance}
                    </td>
                    <td style={{ padding: '18px 20px', textAlign: 'center', fontWeight: 700, color: 'var(--forest-green)', background: 'rgba(8, 72, 45, 0.04)' }}>
                      {row.snapiq}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Guarantee Banner */}
        <section className="content-section" style={{ paddingBottom: 0 }}>
          <div className="stats-bar-card" style={{ flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '36px' }}>
            <span style={{ fontSize: '32px' }}>🔒</span>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--headline-ink)' }}>
              100% Risk-Free Pilot Guarantee
            </h3>
            <p style={{ maxWidth: '620px', margin: '0 auto', fontSize: '15.5px', lineHeight: 1.6, color: 'var(--subline-ink)' }}>
              If your creator doesn&apos;t match your brief or your reel arrives past 48 hours,
              we will re-shoot with another creator at zero cost or issue an unconditional 100% refund.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
