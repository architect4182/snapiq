# Snapiq 🎬🌿

> **Captivate Crowds with Snackable Reels.**  
> The on-demand marketplace connecting fast-moving brands and indie makers with vetted short-form video creators — delivered in 48 hours.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blueviolet?style=flat-square)](https://turbo.build/pack)
[![Design](https://img.shields.io/badge/Design-Soft_Mint_Studio-08482D?style=flat-square)](#design-system)

---

## 🌟 Overview

**Snapiq** replaces sluggish, expensive $5k/mo agency retainers with a transparent, creator-first production platform. Every video is engineered using behavioral hook psychology, pattern interrupts, and hyper-sensory audio to maximize 3-second hook retention and conversion rates on TikTok, Instagram Reels, and YouTube Shorts.

### Design Aesthetics & Studio Identity
- **Palette**: Warm off-white canvas (`#F5F8EF`), deep forest green accents (`#08482D`), and soft mint badges (`#DAE7C7`).
- **Typography**:
  - **Headlines**: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) (700) with tight tracking (`-0.035em`)
  - **Body / UI**: [Inter](https://fonts.google.com/specimen/Inter) (400 / 500 / 600)
  - **Hand-Drawn Notes**: [Caveat](https://fonts.google.com/specimen/Caveat) (600) in forest green
- **Interactive Carousel**: 10-tile video card band with curved canvas quad paths and momentum drag physics.

---

## 🧭 Pages & Route Directory

All sections of the platform have been architected into dedicated, standalone routes with fluid page-to-page transitions:

| Route | Page | Description & Key Features |
|---|---|---|
| [`/`](src/app/page.tsx) | **Home & Hero** | 1440×1080 framed hero showcase, animated curved video band, vector doodle arrow & notes, live stats counter, social proof logos, and section preview links. |
| [`/how-it-works`](src/app/how-it-works/page.tsx) | **How It Works** | 3-step briefing workflow, hour-by-hour 48-hour timeline breakdown (Hour 00:00 to 48:00), and the 100% on-time & re-shoot guarantee. |
| [`/formats`](src/app/formats/page.tsx) | **Viral Hook Formats** | Interactive category filter tabs (*All*, *DTC*, *Beauty & ASMR*, *SaaS*, *Food*), 6 hook format cards with hook & completion metrics, and the **3-Second Viral Hook Anatomy blueprint**. |
| [`/pricing`](src/app/pricing/page.tsx) | **Pricing & Plans** | Interactive **Monthly vs. Annual (20% Save)** discount toggle, 3 flat-rate tiers (*Starter Pilot*, *Growth Pack*, *Scale Retainer*), and the **Agency vs. Freelance vs. Snapiq** comparison table. |
| [`/creators`](src/app/creators/page.tsx) | **Creator Network** | Top 1.4% vetted creator profiles (gear setups, hook ratings, completed reels), Wall of Love testimonials, and creator audition application section. |
| [`/faq`](src/app/faq/page.tsx) | **FAQ & Knowledge Base** | Categorized accordion with interactive toggle states covering turnaround times, perpetual commercial rights, whitelisting, and refund policies. |
| [`/login`](src/app/login/page.tsx) | **Studio Login** | Studio auth card with Google OAuth, magic link authentication, and smooth feedback states. |
| [`/signup`](src/app/signup/page.tsx) | **Join Snapiq** | Interactive role toggle (*Brand/Agency* vs *Creator/Filmmaker*), input fields, and instant onboarding confirmation. |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack compiler.
- **Language**: TypeScript (`strict` mode).
- **Styling**: Pure semantic Vanilla CSS (`src/app/globals.css`) with CSS custom properties for studio tokens.
- **Page Transitions**: Custom Next.js transition wrapper (`src/app/template.tsx`) utilizing CSS `@keyframes pageFadeSlideIn` and the browser native View Transitions API (`@view-transition { navigation: auto; }`).
- **Interactive Elements**:
  - Sticky glassmorphic subpage header with active-route dot indicator (`src/components/Header.tsx`).
  - Universal studio footer with newsletter subscription state (`src/components/Footer.tsx`).
  - Floating sticky nav bar with scroll-spy tracking on the home page.
  - Category filters, billing switches, and animated accordions.

---

## 📂 Project Structure

```
reelmaker/
├── src/
│   ├── app/
│   │   ├── creators/
│   │   │   └── page.tsx          # Creator roster & audition application
│   │   ├── faq/
│   │   │   └── page.tsx          # Interactive FAQ accordion
│   │   ├── formats/
│   │   │   └── page.tsx          # Hook format blueprints & category filters
│   │   ├── how-it-works/
│   │   │   └── page.tsx          # 48-hour production breakdown & guarantee
│   │   ├── login/
│   │   │   └── page.tsx          # Studio login & OAuth
│   │   ├── pricing/
│   │   │   └── page.tsx          # Flat-rate tiers & agency comparison table
│   │   ├── signup/
│   │   │   └── page.tsx          # Creator vs brand onboarding
│   │   ├── globals.css           # Studio tokens, animations & responsive styles
│   │   ├── layout.tsx            # Root layout, Google Fonts & metadata
│   │   ├── page.tsx              # Home landing hero & curved carousel
│   │   └── template.tsx          # Page transition animation wrapper
│   └── components/
│       ├── Header.tsx            # Active route indicator & navigation
│       └── Footer.tsx            # Deep universal studio footer
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── package.json                  # Dependencies & npm scripts
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or later
- npm, pnpm, or yarn

### Installation
Clone the repository and install dependencies:

```bash
cd reelmaker
npm install
```

### Development Server
Run the local dev server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
To create an optimized production build:

```bash
npm run build
```

All 8 routes will be statically generated and prerendered (`○ (Static)`):

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /creators
├ ○ /faq
├ ○ /formats
├ ○ /how-it-works
├ ○ /login
├ ○ /pricing
└ ○ /signup
```

To run the production server:

```bash
npm run start
```

---

## 📄 License

Built for indie makers and short-form creators. © 2026 Snapiq Inc. All rights reserved.
