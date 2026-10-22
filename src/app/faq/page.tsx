'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FAQItem {
  id: string;
  category: 'production' | 'licensing' | 'formats' | 'guarantees';
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIds, setOpenIds] = useState<string[]>(['turnaround-48', 'licensing-rights']);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    document.title = 'Frequently Asked Questions | Snapiq';
  }, []);

  const faqs: FAQItem[] = [
    {
      id: 'turnaround-48',
      category: 'production',
      question: 'How does the 48-hour delivery guarantee work?',
      answer:
        'Once your product arrives at the creator’s studio (or immediately for digital products and SaaS briefs), our 48-hour countdown clock starts. Your ready-to-run 4K reel, burned-in captions, and hook variations will be ready for download in your dashboard before the timer hits 00:00:00. If we are late, your reel is completely free.',
    },
    {
      id: 'physical-shipping',
      category: 'production',
      question: 'How does product shipping work for physical DTC goods?',
      answer:
        'Upon brief submission, you will be assigned a vetted creator with their verified studio address. You ship your sample directly via USPS, UPS, or FedEx. Our dashboard automatically tracks your delivery tracking number, and production begins the hour the package is marked delivered.',
    },
    {
      id: 'licensing-rights',
      category: 'licensing',
      question: 'Do I own 100% perpetual commercial rights to all delivered videos?',
      answer:
        'Yes. You receive unrestricted worldwide commercial licensing in perpetuity. You are free to run the reels as paid ads on Meta (Instagram & Facebook), TikTok Ads Manager, YouTube Shorts, Pinterest, and organic social media channels without paying ongoing talent royalties.',
    },
    {
      id: 'whitelisting',
      category: 'licensing',
      question: 'Can I whitelist or run Spark Ads through the creator’s personal profile?',
      answer:
        'Yes! On our Growth Pack and Scale Retainer tiers, ad whitelisting and TikTok Spark Code authorization are supported. The creator will provide an ad authorization token so you can run dark posts directly through their authentic handle.',
    },
    {
      id: 'hook-variations',
      category: 'formats',
      question: 'What are "hook intro variations" and why are they critical?',
      answer:
        'Over 70% of viewers drop off in the first 3 seconds of a reel. Hook variations provide 2 to 3 completely different visual and verbal openings for the same body video. This allows you to A/B test angles on paid Meta or TikTok ads to discover which hook drives the lowest Cost Per Acquisition (CPA).',
    },
    {
      id: 'aspect-ratios',
      category: 'formats',
      question: 'What video resolutions and file formats are delivered?',
      answer:
        'All videos are rendered in crisp 4K or 1080p 60fps vertical format (9:16 aspect ratio, 1080x1920) perfectly formatted for mobile feeds. Growth and Scale tiers also include a 1:1 square crop optimized for Meta feed carousel placements.',
    },
    {
      id: 'revision-policy',
      category: 'guarantees',
      question: 'What is your revision policy if I need adjustments?',
      answer:
        'Every order includes creative revisions. If an edit deviates from your initial creative brief (e.g. wrong text overlay, pacing issue, or audio balance), we will adjust it within 24 hours. If you feel the creator missed the brand tone completely, we offer a free re-shoot with an alternate creator.',
    },
    {
      id: 'refund-policy',
      category: 'guarantees',
      question: 'What if I am truly unsatisfied with the final video?',
      answer:
        'We stand firmly behind our 100% Risk-Free Guarantee. If our team cannot deliver a reel that meets your brief even after a re-shoot, we will issue a full, prompt refund to your original payment method. No questions asked.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'production', label: 'Production & Timing' },
    { id: 'licensing', label: 'Licensing & Rights' },
    { id: 'formats', label: 'Formats & Hooks' },
    { id: 'guarantees', label: 'Guarantees & Revisions' },
  ];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="subpage-main">
        {/* Hero Section */}
        <section className="subpage-hero">
          <div className="subpage-badge">
            <span className="badge-dot" style={{ width: 7, height: 7 }} />
            <span>Knowledge Base & Support</span>
          </div>
          <h1 className="subpage-title">Frequently Asked Questions</h1>
          <p className="subpage-subtitle">
            Everything you need to know about turnaround times, creator matching, commercial
            licensing, and our 100% money-back guarantee.
          </p>
        </section>

        {/* Categories Bar */}
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="formats-filter-bar" role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeCategory === c.id}
                className={`format-filter-btn ${
                  activeCategory === c.id ? 'is-active' : ''
                }`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`faq-card-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="faq-card-header"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-card-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions help box */}
          <div className="faq-help-box">
            <h3 style={{ fontFamily: 'var(--font-inter-tight)', fontSize: '22px', fontWeight: 700, color: 'var(--headline-ink)', marginBottom: '8px' }}>
              Still have a specific question about your brand?
            </h3>
            <p style={{ color: 'var(--subline-ink)', fontSize: '15px', marginBottom: '20px' }}>
              Our creative strategy team is available on live chat 7 days a week.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="site-btn-cta" style={{ display: 'inline-flex', padding: '10px 24px' }}>
                View Pricing Packages
              </Link>
              <a
                href="mailto:support@snapiq.co"
                className="site-btn-login"
                style={{ border: '1px solid rgba(8, 72, 45, 0.16)' }}
              >
                Email Support Team
              </a>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="content-section" style={{ paddingBottom: 0 }}>
          <div className="pre-footer-banner">
            <div className="banner-badge">Ready to Start?</div>
            <h2 className="banner-title">
              Turn Attention Into Revenue<br />with Snackable Reels
            </h2>
            <p className="banner-sub">
              Get matched with a top 1.4% creator today and receive your first reel in 48 hours.
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
