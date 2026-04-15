import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 40, showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chain link background */}
        <circle cx="50" cy="50" r="45" fill="url(#gradient1)" opacity="0.1"/>

        {/* Left chain link */}
        <path
          d="M 25 35 A 10 10 0 0 1 35 25 L 45 25 A 10 10 0 0 1 55 35 L 55 50 A 10 10 0 0 1 45 60 L 35 60 A 10 10 0 0 1 25 50 Z"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="4"
        />

        {/* Right chain link */}
        <path
          d="M 45 40 A 10 10 0 0 1 55 30 L 65 30 A 10 10 0 0 1 75 40 L 75 65 A 10 10 0 0 1 65 75 L 55 75 A 10 10 0 0 1 45 65 Z"
          fill="none"
          stroke="url(#gradient3)"
          strokeWidth="4"
        />

        {/* Letter D */}
        <path
          d="M 30 35 L 30 60 L 40 60 A 12.5 12.5 0 0 0 52.5 47.5 A 12.5 12.5 0 0 0 40 35 Z"
          fill="#0A2540"
        />

        {/* Letter Z */}
        <path
          d="M 55 40 L 70 40 L 55 65 L 70 65"
          stroke="#00A86B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Gold accent dot */}
        <circle cx="72" cy="38" r="3" fill="#FFD700" />

        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A2540" />
            <stop offset="100%" stopColor="#00A86B" />
          </linearGradient>
          <linearGradient id="gradient2" x1="25" y1="25" x2="55" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A2540" />
            <stop offset="100%" stopColor="#00A86B" />
          </linearGradient>
          <linearGradient id="gradient3" x1="45" y1="30" x2="75" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A86B" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-none" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--color-navy)' }}>
            InterLink
          </span>
          <span className="text-xs tracking-wider" style={{ color: 'var(--color-emerald)' }}>
            DZ
          </span>
        </div>
      )}
    </div>
  );
};
