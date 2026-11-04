import React from "react";

export default function MeditatingMascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-[220px] flex items-center justify-center bg-[#FDF6E9] rounded-2xl overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[200px]"
      >
        <defs>
          <linearGradient id="medBody" x1="120" y1="80" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="auraGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Peaceful Meditation Aura Rings */}
        <circle cx="160" cy="120" r="85" fill="url(#auraGlow)" />
        <circle cx="160" cy="120" r="70" stroke="#E9D5FF" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.7" />

        {/* Soft shadow under sitting creature */}
        <ellipse cx="160" cy="188" rx="55" ry="10" fill="rgba(120, 53, 15, 0.12)" />

        {/* Blooming Flowers on Head */}
        <circle cx="138" cy="72" r="8" fill="#FDA4AF" />
        <circle cx="138" cy="72" r="3" fill="#F43F5E" />
        <circle cx="160" cy="64" r="10" fill="#C4B5FD" />
        <circle cx="160" cy="64" r="4" fill="#7C3AED" />
        <circle cx="182" cy="72" r="8" fill="#6EE7B7" />
        <circle cx="182" cy="72" r="3" fill="#059669" />
        <ellipse cx="148" cy="60" rx="5" ry="2" fill="#10B981" transform="rotate(-20 148 60)" />
        <ellipse cx="172" cy="60" rx="5" ry="2" fill="#10B981" transform="rotate(20 172 60)" />

        {/* Main Cute Creature Body in lotus pose */}
        <ellipse cx="160" cy="130" rx="46" ry="50" fill="url(#medBody)" />

        {/* Belly Cream Patch */}
        <ellipse cx="160" cy="142" rx="28" ry="32" fill="#FFFBEB" />

        {/* Cute folded ears */}
        <ellipse cx="122" cy="95" rx="8" ry="12" fill="#D97706" transform="rotate(-25 122 95)" />
        <ellipse cx="198" cy="95" rx="8" ry="12" fill="#D97706" transform="rotate(25 198 95)" />

        {/* Gentle Zen Peaceful Closed Smiling Eyes */}
        <path d="M 142 115 Q 148 122 154 115" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 166 115 Q 172 122 178 115" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Rosy Cheeks */}
        <circle cx="138" cy="125" r="5" fill="#FB7185" opacity="0.6" />
        <circle cx="182" cy="125" r="5" fill="#FB7185" opacity="0.6" />

        {/* Cute button nose & smile */}
        <ellipse cx="160" cy="121" rx="3.5" ry="2.5" fill="#78350F" />
        <path d="M 160 123 Q 160 130 164 130" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Sitting Paws resting on knees */}
        <ellipse cx="118" cy="165" rx="14" ry="9" fill="#F59E0B" />
        <ellipse cx="202" cy="165" rx="14" ry="9" fill="#F59E0B" />
        {/* Crossed little legs in lotus pose */}
        <ellipse cx="138" cy="180" rx="22" ry="10" fill="#D97706" />
        <ellipse cx="182" cy="180" rx="22" ry="10" fill="#D97706" />

        {/* Floating sparkles */}
        <g fill="#A78BFA" opacity="0.8">
          <path d="M 95 70 Q 100 65 105 70 Q 100 75 95 70" />
          <path d="M 235 90 Q 240 85 245 90 Q 240 95 235 90" />
          <circle cx="85" cy="100" r="2" />
          <circle cx="240" cy="65" r="2.5" />
          <circle cx="225" cy="130" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
