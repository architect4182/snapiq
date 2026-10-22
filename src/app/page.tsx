'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

// Shared media tile assets (5x2 grid)
const POSTER_SRC =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b7ebb74a-8c8a-4f7e-8f80-55e2d74ecd05.webp';
const VIDEO_SRC =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/04fd3d5f-99d7-476e-98a4-46c08518ffb3.mp4';

// 10 Tiles in 5x2 grid (row-major)
const TILE_ASPECT = 384 / 540; // 0.711111...
const TOTAL_CARDS = 10;
const PITCH = 196; // 196u unpushed pitch
const LOOP_LENGTH = TOTAL_CARDS * PITCH; // 1960u

// Rounded Quad Path Generator (15u Corners)
function buildRoundedQuadPath(
  w: number,
  hLeft: number,
  hRight: number,
  r: number
): string {
  const h = Math.max(hLeft, hRight);
  const y0 = (h - hLeft) / 2;
  const y1 = (h - hRight) / 2;
  const y2 = (h + hRight) / 2;
  const y3 = (h + hLeft) / 2;

  const dx01 = w;
  const dy01 = y1 - y0;
  const len01 = Math.hypot(dx01, dy01) || 1;
  const ux01 = dx01 / len01;
  const uy01 = dy01 / len01;

  const dx23 = -w;
  const dy23 = y3 - y2;
  const len23 = Math.hypot(dx23, dy23) || 1;
  const ux23 = dx23 / len23;
  const uy23 = dy23 / len23;

  // Corners
  const s0x = 0;
  const s0y = y0 + r;
  const e0x = ux01 * r;
  const e0y = y0 + uy01 * r;

  const s1x = w - ux01 * r;
  const s1y = y1 - uy01 * r;
  const e1x = w;
  const e1y = y1 + r;

  const s2x = w;
  const s2y = y2 - r;
  const e2x = w + ux23 * r;
  const e2y = y2 + uy23 * r;

  const s3x = -ux23 * r;
  const s3y = y3 - uy23 * r;
  const e3x = 0;
  const e3y = y3 - r;

  return (
    'M ' +
    s0x.toFixed(2) +
    ' ' +
    s0y.toFixed(2) +
    ' Q 0.0 ' +
    y0.toFixed(2) +
    ' ' +
    e0x.toFixed(2) +
    ' ' +
    e0y.toFixed(2) +
    ' L ' +
    s1x.toFixed(2) +
    ' ' +
    s1y.toFixed(2) +
    ' Q ' +
    w.toFixed(2) +
    ' ' +
    y1.toFixed(2) +
    ' ' +
    e1x.toFixed(2) +
    ' ' +
    e1y.toFixed(2) +
    ' L ' +
    s2x.toFixed(2) +
    ' ' +
    s2y.toFixed(2) +
    ' Q ' +
    w.toFixed(2) +
    ' ' +
    y2.toFixed(2) +
    ' ' +
    e2x.toFixed(2) +
    ' ' +
    e2y.toFixed(2) +
    ' L ' +
    s3x.toFixed(2) +
    ' ' +
    s3y.toFixed(2) +
    ' Q 0.0 ' +
    y3.toFixed(2) +
    ' ' +
    e3x.toFixed(2) +
    ' ' +
    e3y.toFixed(2) +
    ' Z'
  );
}

// Brand Logos Data
const BRAND_LOGOS = [
  { name: 'LUMINA', icon: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' },
  { name: 'VESPER', icon: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
  { name: 'BLOOM', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z' },
  { name: 'NORDICA', icon: 'M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10h2v4h-2zm0 5h2v2h-2z' },
  { name: 'KINETIC', icon: 'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z' },
  { name: 'AURA', icon: 'M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z' },
];

// FAQs Data
const FAQ_ITEMS = [
  {
    q: 'How fast will I receive my finished reels?',
    a: 'Our standard delivery time is 48 hours from creator match. For expedited launches, same-day 24-hour turnaround is available with our Growth and Launch Engine plans.',
  },
  {
    q: 'Do I have to send physical products to the creators?',
    a: 'Yes, if you sell physical goods. Once matched, you receive the creator’s verified studio shipping address. For software, mobile apps, or digital services, simply provide screen captures, test flight access, or Figma links.',
  },
  {
    q: 'What if I need revisions on a clip?',
    a: 'Every order includes free creative revisions. You can leave timestamped comments directly on the preview link. If a reel genuinely does not match your creative brief, we will re-shoot with an alternate creator for free.',
  },
  {
    q: 'Are commercial music and audio licenses included?',
    a: '100% yes. Every clip is delivered with fully cleared commercial audio licensing for TikTok, Instagram Reels, YouTube Shorts, and Meta Paid Ads. Zero copyright strikes or muted video warnings.',
  },
  {
    q: 'Can I use these reels for paid ads (TikTok Ads, Meta Ads)?',
    a: 'Absolutely. You receive complete, perpetual commercial advertising rights and raw footage cutdowns with every plan, formatted in native 9:16 vertical 4K resolution.',
  },
  {
    q: 'How are creators vetted before joining Snapiq?',
    a: 'We accept fewer than 1.4% of creator applicants. Each creator undergoes a 3-stage audition evaluating hook delivery rate, lighting/sound gear, edit timing, and historical conversion metrics.',
  },
];

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('how-it-works');

  const scrollProgressBarRef = useRef<HTMLDivElement>(null);
  const carouselBandRef = useRef<HTMLElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLElement>(null);
  const badgePillRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const heroSublineRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const noteBeSeenRef = useRef<HTMLDivElement>(null);
  const noteZeroCostRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posterRefs = useRef<(HTMLImageElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const playIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    function getUnitScale() {
      if (typeof window === 'undefined') return 1;
      if (window.innerWidth <= 820) {
        return Math.min(window.innerWidth / 640, 1.25);
      }
      return Math.min(window.innerWidth / 1440, window.innerHeight / 1080);
    }

    // Video synchronization
    const masterVideo = videoRefs.current[0];
    if (masterVideo && !prefersReducedMotion) {
      const handleTimeUpdate = () => {
        const targetTime = masterVideo.currentTime;
        videoRefs.current.slice(1).forEach((v) => {
          if (
            v &&
            v.readyState >= 2 &&
            Math.abs(v.currentTime - targetTime) > 0.08 &&
            !v.seeking
          ) {
            try {
              v.currentTime = targetTime;
            } catch {
              // ignore
            }
          }
        });
      };
      masterVideo.addEventListener('timeupdate', handleTimeUpdate);

      const ensureAutoplay = () => {
        videoRefs.current.forEach((v) => {
          if (v && v.paused) v.play().catch(() => {});
        });
        window.removeEventListener('pointerdown', ensureAutoplay);
      };
      window.addEventListener('pointerdown', ensureAutoplay, { once: true });
    }

    // Draggable and Momentum State
    let scrollOffset = 0;
    let isDragging = false;
    let startPointerX = 0;
    let startScrollOffset = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let flingVelocity = 0;

    const carouselBand = carouselBandRef.current;
    if (carouselBand) {
      carouselBand.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startPointerX = e.clientX;
        startScrollOffset = scrollOffset;
        lastPointerX = e.clientX;
        lastPointerTime = performance.now();
        flingVelocity = 0;

        carouselBand.classList.add('is-dragging');
        if (carouselBand.setPointerCapture) {
          try {
            carouselBand.setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const u = getUnitScale();
      const dx = e.clientX - startPointerX;
      const dxUnits = dx / u;

      scrollOffset = startScrollOffset - dxUnits;

      const now = performance.now();
      const dt = (now - lastPointerTime) / 1000;
      if (dt > 0.008) {
        const instVel = -(e.clientX - lastPointerX) / u / dt;
        flingVelocity = flingVelocity * 0.35 + instVel * 0.65;
        lastPointerX = e.clientX;
        lastPointerTime = now;
      }
    };

    const onPointerEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (carouselBand) {
        carouselBand.classList.remove('is-dragging');
      }

      if (performance.now() - lastPointerTime > 90) {
        flingVelocity = 0;
      }
      flingVelocity = Math.max(-2800, Math.min(2800, flingVelocity));
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerEnd);
    window.addEventListener('pointercancel', onPointerEnd);

    // Long-running Web Animations Clock (duration: 1e9)
    const clockAnim = document.documentElement.animate([], {
      duration: 1e9,
      iterations: 1,
    });
    let lastTime = clockAnim.currentTime || performance.now();
    let animFrameId: number;

    function renderLoop() {
      const currentTime = clockAnim.currentTime || performance.now();
      const dt = Math.min(
        Math.max((Number(currentTime) - Number(lastTime)) / 1000, 0),
        0.1
      );
      lastTime = currentTime;

      const isMobile = window.innerWidth <= 820;
      const u = getUnitScale();

      // Coasting physics + auto-scroll
      if (!isDragging && !prefersReducedMotion) {
        if (Math.abs(flingVelocity) > 0.5) {
          scrollOffset += flingVelocity * dt;
          const decay = Math.pow(0.05, dt);
          flingVelocity *= decay;
          if (Math.abs(flingVelocity) < 0.5) flingVelocity = 0;
        }
        scrollOffset += 50 * dt;
      }

      scrollOffset =
        ((scrollOffset % LOOP_LENGTH) + LOOP_LENGTH) % LOOP_LENGTH;

      for (let i = 0; i < TOTAL_CARDS; i++) {
        const card = cardRefs.current[i];
        const poster = posterRefs.current[i];
        const video = videoRefs.current[i];
        const playIcon = playIconRefs.current[i];
        if (!card || !poster || !video || !playIcon) continue;

        const col = i % 5;
        const row = Math.floor(i / 5);

        const rawOffset = i * PITCH - scrollOffset - 720;
        let t = ((rawOffset % LOOP_LENGTH) + LOOP_LENGTH) % LOOP_LENGTH;
        if (t >= 980) t -= LOOP_LENGTH;

        const tNorm = t / 706;
        const xCenter = 720 + t * (1 + 0.083 * tNorm * tNorm);

        const d = Math.abs(xCenter - 720) / 706;
        const W = 170 + 48 * d * d;

        const xLeft = xCenter - W / 2;
        const xRight = xCenter + W / 2;

        const qLeft = Math.abs(xLeft - 720) / 706;
        const qRight = Math.abs(xRight - 720) / 706;
        const hLeft = 280 + 92 * Math.pow(qLeft, 2.6);
        const hRight = 280 + 92 * Math.pow(qRight, 2.6);

        const yc = isMobile ? 125 / u : 687 - 12 * d * d;

        const H = Math.max(hLeft, hRight);
        const cardTop = yc - H / 2;

        const margin = 140;
        if (xRight < -margin || xLeft > 1440 + margin) {
          card.style.display = 'none';
          continue;
        } else {
          card.style.display = 'block';
        }

        const wPx = W * u;
        const hPx = H * u;
        const hLeftPx = hLeft * u;
        const hRightPx = hRight * u;
        const rPx = 15 * u;

        const pathString = buildRoundedQuadPath(wPx, hLeftPx, hRightPx, rPx);
        card.style.clipPath = 'path("' + pathString + '")';
        (card.style as unknown as { webkitClipPath: string }).webkitClipPath =
          'path("' + pathString + '")';

        card.style.width = wPx + 'px';
        card.style.height = hPx + 'px';
        card.style.transform =
          'translate3d(' + xLeft * u + 'px, ' + cardTop * u + 'px, 0)';

        const tileHeight = Math.max(H, W / TILE_ASPECT);
        const tileWidth = tileHeight * TILE_ASPECT;

        const totalVideoW = 5 * tileWidth;
        const totalVideoH = 2 * tileHeight;

        const videoLeft = (W - tileWidth) / 2 - col * tileWidth;
        const videoTop = (H - tileHeight) / 2 - row * tileHeight;

        const mediaStyleTransform =
          'translate3d(' + videoLeft * u + 'px, ' + videoTop * u + 'px, 0)';
        const mediaStyleWidth = totalVideoW * u + 'px';
        const mediaStyleHeight = totalVideoH * u + 'px';

        poster.style.width = mediaStyleWidth;
        poster.style.height = mediaStyleHeight;
        poster.style.transform = mediaStyleTransform;

        video.style.width = mediaStyleWidth;
        video.style.height = mediaStyleHeight;
        video.style.transform = mediaStyleTransform;

        const y3 = (H + hLeft) / 2;
        const playX = 16 * u;
        const playY = (y3 - 16 - 30) * u;
        playIcon.style.transform =
          'translate3d(' + playX + 'px, ' + playY + 'px, 0)';
      }

      animFrameId = requestAnimationFrame(renderLoop);
    }

    animFrameId = requestAnimationFrame(renderLoop);

    // Entrance sequence
    if (!prefersReducedMotion) {
      if (topBarRef.current) {
        topBarRef.current.animate(
          [
            { opacity: 0, transform: 'translateY(-28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 600,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      }

      if (badgePillRef.current) {
        badgePillRef.current.animate(
          [
            { opacity: 0, transform: 'scale(0.82)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          {
            delay: 150,
            duration: 550,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards',
          }
        );
      }

      if (headlineLine1Ref.current) {
        headlineLine1Ref.current.animate(
          [
            { opacity: 0, transform: 'translateY(36px)', filter: 'blur(12px)' },
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
          ],
          {
            delay: 260,
            duration: 680,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      }

      if (headlineLine2Ref.current) {
        headlineLine2Ref.current.animate(
          [
            { opacity: 0, transform: 'translateY(36px)', filter: 'blur(12px)' },
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
          ],
          {
            delay: 380,
            duration: 680,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      }

      if (heroSublineRef.current) {
        heroSublineRef.current.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            delay: 500,
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      }

      if (cardsLayerRef.current) {
        cardsLayerRef.current.animate(
          [
            { opacity: 0, transform: 'translateY(60px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            delay: 580,
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      }

      if (ctaContainerRef.current) {
        ctaContainerRef.current.animate(
          [
            { opacity: 0, transform: 'scale(0.84)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          {
            delay: 720,
            duration: 650,
            easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
            fill: 'forwards',
          }
        );
      }

      const doodleStrokes =
        document.querySelectorAll<SVGPathElement>('.doodle-stroke');
      doodleStrokes.forEach((stroke, idx) => {
        const length = stroke.getTotalLength ? stroke.getTotalLength() : 100;
        stroke.style.strokeDasharray = `${length}`;
        stroke.style.strokeDashoffset = `${length}`;
        stroke.animate(
          [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
          {
            delay: 850 + idx * 40,
            duration: 750,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      });

      [noteBeSeenRef.current, noteZeroCostRef.current].forEach((note) => {
        if (!note) return;
        const baseTransform = note.getAttribute('data-base-transform') || '';
        note.animate(
          [
            { opacity: 0, transform: baseTransform + ' scale(0.92)' },
            { opacity: 1, transform: baseTransform + ' scale(1)' }
          ],
          {
            delay: 860,
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      });
    }

    // Scroll progress, floating nav, and scroll-spy
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = `${progress}%`;
      }

      setShowFloatingNav(scrollY > 560);
      setShowBackToTop(scrollY > 900);

      const sectionIds = ['how-it-works', 'formats', 'pricing', 'testimonials', 'faq'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page-wrapper">
      {/* 0. Top Scroll Progress Indicator */}
      <div className="scroll-progress-bar" id="scrollProgressBar" ref={scrollProgressBarRef} />

      {/* 0. Floating Sticky Glass Nav Bar */}
      <nav
        className={`floating-nav ${showFloatingNav ? 'is-visible' : ''}`}
        id="floatingNav"
        aria-label="Floating Navigation"
      >
        <Link href="/" className="floating-nav-logo" aria-label="Snapiq Home">
          <Logo size={24} showText />
        </Link>

        <div className="floating-nav-links">
          <Link href="/how-it-works" className="floating-nav-item">
            How It Works
          </Link>
          <Link href="/formats" className="floating-nav-item">
            Formats
          </Link>
          <Link href="/pricing" className="floating-nav-item">
            Pricing
          </Link>
          <Link href="/creators" className="floating-nav-item">
            Creators
          </Link>
          <Link href="/faq" className="floating-nav-item">
            FAQ
          </Link>
        </div>

        <div className="floating-nav-actions">
          <Link href="/login" className="floating-btn-login">
            Log in
          </Link>
          <Link href="/pricing" className="floating-btn-cta">
            Make a Reel
          </Link>
        </div>
      </nav>

      {/* Back to Top Floating Button */}
      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* 1. HERO SECTION (1440x1080 Contained Frame) */}
      <section className="hero-viewport-wrap" id="hero">
        <main className="frame-stage" id="frameStage">
          {/* Top Navigation Bar */}
          <header className="top-bar" id="topBar" ref={topBarRef}>
            <Link href="/" className="brand-logo" id="brandLogo" aria-label="Snapiq Home">
              <Logo size={32} showText textClassName="brand-logo-text" />
            </Link>

            <nav className="top-nav" id="topNav" aria-label="Primary Navigation">
              <Link href="/how-it-works" className="nav-item">
                How It Works
              </Link>
              <span className="nav-sep" aria-hidden="true">
                ·
              </span>
              <Link href="/formats" className="nav-item">
                Formats
              </Link>
              <span className="nav-sep" aria-hidden="true">
                ·
              </span>
              <Link href="/pricing" className="nav-item">
                Pricing
              </Link>
              <span className="nav-sep" aria-hidden="true">
                ·
              </span>
              <Link href="/creators" className="nav-item">
                Creators
              </Link>
              <span className="nav-sep" aria-hidden="true">
                ·
              </span>
              <Link href="/faq" className="nav-item">
                FAQ
              </Link>
            </nav>

            <div className="top-buttons">
              <Link href="/login" className="btn-login" id="btnLogin">
                Log in
              </Link>
              <Link href="/signup" className="btn-signup" id="btnSignup">
                Sign up
              </Link>
            </div>
          </header>

          {/* Trusted Badge at (575, 115) */}
          <div className="badge-pill" id="badgePill" ref={badgePillRef}>
            <span className="badge-dot" aria-hidden="true"></span>
            <span className="badge-text">Trusted by 120,000+ indie makers</span>
          </div>

          {/* Centered Headline at top 176 */}
          <h1 className="hero-headline" id="heroHeadline">
            <span className="line-1" id="headlineLine1" ref={headlineLine1Ref}>
              Captivate Crowds
            </span>
            <span className="line-2" id="headlineLine2" ref={headlineLine2Ref}>
              with Snackable Reels
            </span>
          </h1>

          {/* Subline at top 394 */}
          <p className="hero-subline" id="heroSubline" ref={heroSublineRef}>
            Grow your brand with short, snappy product clips by
            <br />
            our handpicked video makers. Our crew is ready to
            <br />
            lift your next launch higher.
          </p>

          {/* Hand-drawn Notes */}
          <div
            className="hand-note note-be-seen"
            id="noteBeSeen"
            ref={noteBeSeenRef}
            data-base-transform="rotate(16deg)"
          >
            Be seen
            <br />
            with clips
          </div>

          {/* 1. "//" doodle at (263, 377) */}
          <svg className="doodle-svg doodle-slashes" viewBox="0 0 32 32" aria-hidden="true">
            <path
              className="draw-stroke doodle-stroke"
              strokeWidth="2.8"
              d="M 5 28 C 9 19, 13 10, 16 4"
            />
            <path
              className="draw-stroke doodle-stroke"
              strokeWidth="2.8"
              d="M 15 28 C 19 19, 23 10, 26 4"
            />
          </svg>

          {/* 2. "Be seen with clips" curving arrow down to cards */}
          <svg className="doodle-svg doodle-be-seen-arrow" viewBox="0 0 140 160" aria-hidden="true">
            {/* Curving shaft starting below note and curling down to cards */}
            <path
              className="draw-stroke doodle-stroke"
              strokeWidth="2.8"
              strokeLinecap="round"
              d="M 118 8 C 122 46, 92 86, 42 114"
            />
            {/* Crisp, symmetrical hand-drawn arrowhead pointing directly into card */}
            <path
              className="draw-stroke doodle-stroke"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 54 94 L 42 114 L 63 114"
            />
          </svg>

          {/* Curved Video Carousel Row */}
          <section
            className="carousel-band"
            id="carouselBand"
            ref={carouselBandRef}
            aria-label="Curved Reels Showcase"
          >
            <div className="carousel-cards-layer" id="cardsLayer" ref={cardsLayerRef}>
              {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
                <div
                  key={i}
                  className="reel-card"
                  data-index={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <div className="reel-media-inner">
                    <img
                      className="card-poster"
                      src={POSTER_SRC}
                      alt={`Reel clip ${i + 1}`}
                      draggable={false}
                      ref={(el) => {
                        posterRefs.current[i] = el;
                      }}
                    />
                    <video
                      className="card-video"
                      src={VIDEO_SRC}
                      muted
                      playsInline
                      loop
                      preload="auto"
                      autoPlay
                      aria-hidden="true"
                      draggable={false}
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      onLoadedData={(e) => {
                        (e.currentTarget as HTMLVideoElement).classList.add('is-ready');
                      }}
                      onPlaying={(e) => {
                        (e.currentTarget as HTMLVideoElement).classList.add('is-ready');
                      }}
                    />
                  </div>
                  <div
                    className="card-play-icon"
                    ref={(el) => {
                      playIconRefs.current[i] = el;
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="white">
                      <polygon points="7,4 20,12 7,20" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Section: "Zero cost" note, arrow, and CTA button */}
          <div className="bottom-section" id="bottomSection">
            <div
              className="hand-note note-zero-cost"
              id="noteZeroCost"
              ref={noteZeroCostRef}
              data-base-transform="rotate(24deg)"
            >
              Zero cost
            </div>

            <svg className="doodle-svg doodle-zero-cost-arrow" viewBox="0 0 52 36" aria-hidden="true">
              <path
                className="draw-stroke doodle-stroke"
                strokeWidth="2.2"
                strokeLinecap="round"
                d="M 6 25 C 18 23, 28 17, 40 12"
              />
              <path
                className="draw-stroke doodle-stroke"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 28 5 L 40 12 L 31 23"
              />
            </svg>

            <div className="cta-container" id="ctaContainer" ref={ctaContainerRef}>
              <div className="cta-ring" aria-hidden="true"></div>
              <Link href="/pricing" className="cta-button" id="ctaButton">
                Make a Reel
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* 2. SOCIAL PROOF LOGO CLOUD */}
      <section className="logo-cloud-section reveal-on-scroll">
        <span className="logo-cloud-label">
          Powering short-form launches for breakout DTC & SaaS brands
        </span>
        <div className="logos-row">
          {BRAND_LOGOS.map((brand, idx) => (
            <div key={idx} className="logo-item" title={brand.name}>
              <svg viewBox="0 0 24 24">
                <path d={brand.icon} />
              </svg>
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="content-section reveal-on-scroll" id="how-it-works">
        <div className="section-header">
          <div className="section-badge">Streamlined Workflow</div>
          <h2 className="section-title">From Product Brief to Viral Reel in 48h</h2>
          <p className="section-description">
            Skip the 4-week agency retainer cycle. Our handpicked creators shoot,
            edit, and optimize snackable reels built specifically to hook and convert.
          </p>
        </div>

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

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/how-it-works" className="site-btn-login" style={{ display: 'inline-flex', border: '1px solid rgba(8, 72, 45, 0.2)', padding: '10px 24px', fontWeight: 600 }}>
            View Full 48-Hour Production Breakdown & Guarantees →
          </Link>
        </div>
      </section>

      {/* 4. PERFORMANCE STATS COUNTER */}
      <section className="content-section reveal-on-scroll" style={{ paddingTop: 0 }}>
        <div className="stats-bar-card">
          <div>
            <div className="stat-num">4.8×</div>
            <div className="stat-label">Higher 3-Second Hook Retention</div>
          </div>
          <div>
            <div className="stat-num">120K+</div>
            <div className="stat-label">Custom Reels Crafted for Makers</div>
          </div>
          <div>
            <div className="stat-num">48 Hrs</div>
            <div className="stat-label">Average Brief-to-Delivery Time</div>
          </div>
          <div>
            <div className="stat-num">4.9 / 5</div>
            <div className="stat-label">Founder Satisfaction Rating</div>
          </div>
        </div>
      </section>

      {/* 5. VIRAL REEL FORMATS & USE CASES */}
      <section className="content-section reveal-on-scroll" id="formats">
        <div className="section-header">
          <div className="section-badge">Proven Frameworks</div>
          <h2 className="section-title">Tested Formats Built for Algorithm Velocity</h2>
          <p className="section-description">
            Don&apos;t guess what works on modern feeds. Choose from formats engineered
            to stop thumbs in the first 1.5 seconds.
          </p>
        </div>

        <div className="formats-grid">
          <div className="format-card">
            <div className="format-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="format-title">Problem & Solve</h3>
            <p className="format-desc">
              Highlights customer friction immediately, followed by snappy visual demonstration
              showing why your solution is irresistible.
            </p>
            <div className="format-metric-pill">
              <span>Average Lift</span>
              <span>+42% CTR</span>
            </div>
          </div>

          <div className="format-card">
            <div className="format-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
              </svg>
            </div>
            <h3 className="format-title">Tactile ASMR</h3>
            <p className="format-desc">
              Macro close-ups, packaging crinkles, tactile product clicks, and hyper-sensory
              audio that triggers natural dopamine loops.
            </p>
            <div className="format-metric-pill">
              <span>Completion Rate</span>
              <span>68% Watch-thru</span>
            </div>
          </div>

          <div className="format-card">
            <div className="format-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <h3 className="format-title">Founder Journey</h3>
            <p className="format-desc">
              Authentic behind-the-scenes building stories that turn passive scrollers into
              die-hard backers and organic brand advocates.
            </p>
            <div className="format-metric-pill">
              <span>Share Velocity</span>
              <span>3.8× Shares</span>
            </div>
          </div>

          <div className="format-card">
            <div className="format-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <h3 className="format-title">Dynamic Street Test</h3>
            <p className="format-desc">
              Real public reactions, unscripted product blind-tests, and candid feedback
              that provides undeniable social proof on feed.
            </p>
            <div className="format-metric-pill">
              <span>Viral Potential</span>
              <span>10× Organic</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/formats" className="site-btn-login" style={{ display: 'inline-flex', border: '1px solid rgba(8, 72, 45, 0.2)', padding: '10px 24px', fontWeight: 600 }}>
            Explore All 6 Formats, Scripts & Hook Retention Data →
          </Link>
        </div>
      </section>

      {/* 6. COMPARISON: SNAPIQ VS TRADITIONAL AGENCIES */}
      <section className="content-section reveal-on-scroll" id="comparison">
        <div className="section-header">
          <div className="section-badge">Better Way to Launch</div>
          <h2 className="section-title">Why Fast-Growing Brands Switch to Snapiq</h2>
          <p className="section-description">
            Traditional video production was designed for 2012 TV commercials.
            Snapiq is engineered for the fast-paced TikTok & Reels economy.
          </p>
        </div>

        <div className="comparison-card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature Comparison</th>
                <th>Traditional Agency</th>
                <th>Freelance Sites</th>
                <th className="highlight-col">Snapiq Marketplace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Delivery Turnaround</strong></td>
                <td>3 to 6 weeks</td>
                <td>1 to 2 weeks</td>
                <td className="highlight-col">⚡ Under 48 hours</td>
              </tr>
              <tr>
                <td><strong>Pricing Model</strong></td>
                <td>$3k - $8k monthly retainer</td>
                <td>Unpredictable per project</td>
                <td className="highlight-col">✨ Flat on-demand from $190</td>
              </tr>
              <tr>
                <td><strong>Creator Vetting</strong></td>
                <td>Junior internal staff</td>
                <td>Anyone can bid</td>
                <td className="highlight-col">🌿 Top 1.4% creator auditions</td>
              </tr>
              <tr>
                <td><strong>Hook Strategy</strong></td>
                <td>Generic storyboard</td>
                <td>No short-form strategy</td>
                <td className="highlight-col">🎯 Tested viral hook variations</td>
              </tr>
              <tr>
                <td><strong>Commercial Rights</strong></td>
                <td>Expensive license add-ons</td>
                <td>Ambiguous usage terms</td>
                <td className="highlight-col">✅ 100% Perpetual commercial rights</td>
              </tr>
              <tr>
                <td><strong>Re-Shoot Guarantee</strong></td>
                <td>Billed by the hour</td>
                <td>Lengthy dispute tickets</td>
                <td className="highlight-col">🛡️ 100% Free re-shoot policy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. TRANSPARENT PRICING PLANS */}
      <section className="content-section reveal-on-scroll" id="pricing">
        <div className="section-header">
          <div className="section-badge">Predictable Pricing</div>
          <h2 className="section-title">Transparent Plans with Zero Retainers</h2>
          <p className="section-description">
            Scale your product video clips on your own schedule. Start with a single reel
            or fuel an ongoing monthly organic presence.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="pricing-toggle-wrap">
          <span
            className="toggle-label"
            onClick={() => setIsAnnual(false)}
            style={{ color: !isAnnual ? 'var(--forest-green)' : 'var(--subline-ink)' }}
          >
            One-Time Order
          </span>
          <button
            type="button"
            className={`toggle-btn ${isAnnual ? 'is-active' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle Monthly Subscription"
          >
            <div className="toggle-knob"></div>
          </button>
          <span
            className="toggle-label"
            onClick={() => setIsAnnual(true)}
            style={{ color: isAnnual ? 'var(--forest-green)' : 'var(--subline-ink)' }}
          >
            Monthly Bundle <span className="discount-pill">Save 20%</span>
          </span>
        </div>

        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="pricing-card">
            <h3 className="plan-name">Single Launch Reel</h3>
            <p className="plan-sub">Ideal for testing your first short-form angle.</p>
            <div className="price-row">
              <span className="price-num">{isAnnual ? '$152' : '$190'}</span>
              <span className="price-period">/ reel</span>
            </div>
            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>1 Bespoke 9:16 vertical short-form clip</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>2 Hook variations included for testing</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Commercial music & sound design</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>48-Hour delivery guarantee</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>1 Free creative revision</span>
              </li>
            </ul>
            <a href="#order" className="plan-btn plan-btn-outline">
              Order Single Reel
            </a>
          </div>

          {/* Plan 2: Most Popular */}
          <div className="pricing-card is-popular">
            <div className="popular-badge">Most Popular for Launches</div>
            <h3 className="plan-name">Growth Pack</h3>
            <p className="plan-sub">Everything you need to test multiple creator styles.</p>
            <div className="price-row">
              <span className="price-num">{isAnnual ? '$432' : '$540'}</span>
              <span className="price-period">/ 3 reels</span>
            </div>
            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span><strong>3 Custom short-form reels</strong></span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>6 Total hook variations (2 per clip)</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Matched with 2 different creator styles</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Formatted for TikTok, IG Reels & Shorts</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Priority expedited matching</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Full commercial rights + raw cuts</span>
              </li>
            </ul>
            <a href="#order" className="plan-btn plan-btn-solid">
              Get Growth Pack
            </a>
          </div>

          {/* Plan 3 */}
          <div className="pricing-card">
            <h3 className="plan-name">Launch Engine</h3>
            <p className="plan-sub">Ongoing monthly content system for serious brands.</p>
            <div className="price-row">
              <span className="price-num">{isAnnual ? '$1,280' : '$1,600'}</span>
              <span className="price-period">/ 10 reels</span>
            </div>
            <ul className="plan-features-list">
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span><strong>10 Custom short-form clips</strong></span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>20 Hook variations tailored for paid ads</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Up to 5 distinct creator personalities</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Dedicated creative strategist & Slack channel</span>
              </li>
              <li className="plan-feature-item">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Unlimited minor revisions & edits</span>
              </li>
            </ul>
            <a href="#order" className="plan-btn plan-btn-outline">
              Fuel Your Launch
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/pricing" className="site-btn-login" style={{ display: 'inline-flex', border: '1px solid rgba(8, 72, 45, 0.2)', padding: '10px 24px', fontWeight: 600 }}>
            Compare All Package Details, Features & Annual 20% Savings →
          </Link>
        </div>
      </section>

      {/* 8. TESTIMONIALS (WALL OF LOVE) */}
      <section className="content-section reveal-on-scroll" id="testimonials">
        <div className="section-header">
          <div className="section-badge">Maker Love</div>
          <h2 className="section-title">Loved by Indie Founders & DTC Operators</h2>
          <p className="section-description">
            Read what makers say after switching from painful agency retainers to
            on-demand creator reels.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;Snapiq completely transformed our launch economics. The first ASMR
              skincare clip generated over 920,000 organic views on TikTok and drove $41k
              in sales within our first 72 hours.&rdquo;
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle">SL</div>
              <div>
                <div className="user-name">Sarah Lin</div>
                <div className="user-role">Founder, Lumina Botanicals</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;We used to wait 4 weeks for an agency to deliver one video with zero
              short-form instinct. With Snapiq, we had 3 hook variations in our inbox in
              under 48 hours. Our TikTok ad CPA dropped by 52%.&rdquo;
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle">MV</div>
              <div>
                <div className="user-name">Marcus Vance</div>
                <div className="user-role">Head of Growth, Vesper Audio</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;As a creator, Snapiq connects me directly with visionary indie
              makers who value quality cinematography. The briefs are straightforward,
              creative freedom is high, and payouts are immediate.&rdquo;
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle">ER</div>
              <div>
                <div className="user-name">Elena Rostova</div>
                <div className="user-role">Verified Reel Creator (340k followers)</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/creators" className="site-btn-login" style={{ display: 'inline-flex', border: '1px solid rgba(8, 72, 45, 0.2)', padding: '10px 24px', fontWeight: 600 }}>
            Meet the Full Creator Roster & Audition Standards →
          </Link>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="content-section reveal-on-scroll" id="faq">
        <div className="section-header">
          <div className="section-badge">Got Questions?</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about creator matching, delivery turnaround,
            and commercial usage rights.
          </p>
        </div>

        <div className="faq-accordion-wrap">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <svg className="faq-icon-chevron" viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
                <div className="faq-body">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/faq" className="site-btn-login" style={{ display: 'inline-flex', border: '1px solid rgba(8, 72, 45, 0.2)', padding: '10px 24px', fontWeight: 600 }}>
            Browse Complete FAQ Knowledge Base & Support →
          </Link>
        </div>
      </section>

      {/* 10. PRE-FOOTER HIGH IMPACT CTA BANNER */}
      <section className="content-section reveal-on-scroll" id="cta-banner" style={{ paddingBottom: 0 }}>
        <div className="pre-footer-banner">
          <div className="banner-badge">Start Your Snapiq Launch</div>
          <h2 className="banner-title">
            Ready to Captivate Crowds
            <br />
            with Snackable Reels?
          </h2>
          <p className="banner-sub">
            Join 120,000+ indie makers and fast-moving brands turning short-form
            attention into sustainable customer loyalty.
          </p>
          <div className="banner-cta-wrap">
            <Link href="/pricing" className="banner-cta-btn">
              Make Your First Reel
            </Link>
          </div>
          <div>
            <span className="live-creators-pill">
              🟢 42 Vetted creators online and ready for matching right now
            </span>
          </div>
        </div>
      </section>

      {/* 11. DEEP COMPREHENSIVE FOOTER */}
      <Footer />
    </div>
  );
}
