import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({
  size = 32,
  className = '',
  showText = false,
  textClassName = '',
}: LogoProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.3),
        textDecoration: 'none',
      }}
      className={className}
    >
      {/* Snapiq Signature Vector Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="snapiqForestGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B5636" />
            <stop offset="100%" stopColor="#053320" />
          </linearGradient>
          <linearGradient id="snapiqEmeraldGrad" x1="12" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#126E46" />
            <stop offset="100%" stopColor="#08482D" />
          </linearGradient>
          <linearGradient id="snapiqMintGrad" x1="14" y1="14" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EEF6E4" />
            <stop offset="100%" stopColor="#DAE7C7" />
          </linearGradient>
          <filter id="snapiqGlow" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#08482D" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Outer Squircle Container with Soft Shadow */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="10"
          fill="url(#snapiqForestGrad)"
          filter="url(#snapiqGlow)"
        />

        {/* Kinetic Snap Ribbon (Curved "S" Video Track) */}
        {/* Top-Right Loop */}
        <path
          d="M20 7C24.4183 7 28 10.5817 28 15C28 17.5 26.5 19.5 24.2 20.6L16.5 14.5C18.2 12.8 20.2 11.2 20 7Z"
          fill="url(#snapiqEmeraldGrad)"
          opacity="0.85"
        />

        {/* Dynamic Snap "S" Flow */}
        <path
          d="M25 11.5C23.2 9.4 20.4 8.5 17.6 9.1C13.8 9.9 11 13.2 11 17C11 20.2 13.2 22.8 16.2 23.6L21.5 25C23.2 25.4 24.5 26.9 24.5 28.6C24.5 30.6 22.8 32.2 20.7 32.2"
          stroke="url(#snapiqMintGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        />

        {/* Primary Shutter "S" Glyph */}
        <path
          d="M24 11.2C22.6 9.8 20.5 9 18.2 9C13.8 9 10.5 12.4 10.5 16.4C10.5 19.8 12.8 22.2 16.4 23.2L19.6 24.1C22.2 24.8 23.5 26.2 23.5 28C23.5 30.2 21.6 31.8 18.8 31.8C16.2 31.8 13.8 30.5 12.5 28.5"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Intelligent "IQ" Diamond Spark (Soft Mint Centerpiece) */}
        <path
          d="M25.5 15.5C25.5 17.2 27.2 18.5 29 18.5C27.2 18.5 25.5 19.8 25.5 21.5C25.5 19.8 23.8 18.5 22 18.5C23.8 18.5 25.5 17.2 25.5 15.5Z"
          fill="url(#snapiqMintGrad)"
        />

        {/* Subtle Shutter Center Aperture Dot */}
        <circle cx="17" cy="18.5" r="1.8" fill="#DAE7C7" />
      </svg>

      {/* Brand Typography (Optional) */}
      {showText && (
        <span
          className={textClassName}
          style={{
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontWeight: 700,
            fontSize: Math.round(size * 0.72),
            letterSpacing: '-0.03em',
            color: 'var(--headline-ink)',
            lineHeight: 1,
          }}
        >
          Snapiq
        </span>
      )}
    </div>
  );
}
