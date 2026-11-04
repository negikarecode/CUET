import React from "react";

interface OwlScholarMascotProps {
  className?: string;
  size?: number;
  withCap?: boolean;
}

export default function OwlScholarMascot({
  className = "",
  size = 180,
  withCap = true,
}: OwlScholarMascotProps) {
  return (
    <div
      className={`relative inline-block select-none transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size * 1.08 }}
    >
      <svg
        viewBox="0 0 200 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Feather gradients */}
          <linearGradient id="owlBodyGrad" x1="40" y1="20" x2="160" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8F7CFF" />
            <stop offset="60%" stopColor="#7052FF" />
            <stop offset="100%" stopColor="#5534E6" />
          </linearGradient>

          <linearGradient id="owlBellyGrad" x1="70" y1="90" x2="130" y2="175" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>

          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="beakGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="coatGrad" x1="70" y1="120" x2="130" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <linearGradient id="clipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Shadow under feet */}
        <ellipse cx="100" cy="204" rx="46" ry="8" fill="rgba(20, 50, 40, 0.18)" />

        {/* Feet / Talons */}
        <g fill="#F59E0B">
          <ellipse cx="76" cy="198" rx="8" ry="5" />
          <ellipse cx="84" cy="199" rx="7" ry="5" />
          <ellipse cx="68" cy="198" rx="7" ry="4.5" />
          <ellipse cx="124" cy="198" rx="8" ry="5" />
          <ellipse cx="132" cy="199" rx="7" ry="4.5" />
          <ellipse cx="116" cy="199" rx="7" ry="5" />
        </g>

        {/* Feather Tufts (Ears) */}
        <path
          d="M 68 45 C 50 15, 30 18, 25 32 C 22 42, 40 54, 58 58 Z"
          fill="#6448E6"
        />
        <path
          d="M 72 40 C 60 10, 42 12, 40 22 C 38 30, 52 42, 66 48 Z"
          fill="#846EFF"
        />
        <path
          d="M 132 45 C 150 15, 170 18, 175 32 C 178 42, 160 54, 142 58 Z"
          fill="#6448E6"
        />
        <path
          d="M 128 40 C 140 10, 158 12, 160 22 C 162 30, 148 42, 134 48 Z"
          fill="#846EFF"
        />

        {/* Owl Main Round Body */}
        <ellipse cx="100" cy="120" rx="64" ry="74" fill="url(#owlBodyGrad)" />

        {/* Fluffy Chest / Belly */}
        <ellipse cx="100" cy="138" rx="44" ry="48" fill="url(#owlBellyGrad)" />

        {/* Belly feather scallops */}
        <g stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M 85 130 Q 92 136 100 130 Q 108 136 115 130" />
          <path d="M 80 148 Q 90 154 100 148 Q 110 154 120 148" />
          <path d="M 88 165 Q 94 170 100 165 Q 106 170 112 165" />
        </g>

        {/* Scholar Lab Coat / Vest */}
        <path
          d="M 66 120 C 66 160, 78 185, 100 188 C 122 185, 134 160, 134 120 C 125 125, 115 130, 100 130 C 85 130, 75 125, 66 120 Z"
          fill="url(#coatGrad)"
        />
        <path d="M 100 130 V 188" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 3" />
        {/* Lapel collar */}
        <polygon points="100,130 84,118 90,138" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <polygon points="100,130 116,118 110,138" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

        {/* Eyes & Glasses */}
        {/* Left eye background */}
        <circle cx="76" cy="80" r="24" fill="#FFFFFF" />
        <circle cx="76" cy="80" r="16" fill="url(#eyeGrad)" />
        <circle cx="76" cy="80" r="9" fill="#1E1B4B" />
        <circle cx="73" cy="76" r="3.5" fill="#FFFFFF" />
        <circle cx="80" cy="83" r="1.5" fill="#FFFFFF" />

        {/* Right eye background */}
        <circle cx="124" cy="80" r="24" fill="#FFFFFF" />
        <circle cx="124" cy="80" r="16" fill="url(#eyeGrad)" />
        <circle cx="124" cy="80" r="9" fill="#1E1B4B" />
        <circle cx="121" cy="76" r="3.5" fill="#FFFFFF" />
        <circle cx="128" cy="83" r="1.5" fill="#FFFFFF" />

        {/* Cute spectacles / Glasses frames */}
        <circle cx="76" cy="80" r="24" stroke="#F59E0B" strokeWidth="3.5" fill="none" />
        <circle cx="124" cy="80" r="24" stroke="#F59E0B" strokeWidth="3.5" fill="none" />
        <path d="M 100 80 H 100" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M 94 77 Q 100 74 106 77" stroke="#F59E0B" strokeWidth="3.5" fill="none" />

        {/* Cute Beak */}
        <polygon points="100,98 92,85 108,85" fill="url(#beakGrad)" rx="2" />

        {/* Rosy blush cheeks */}
        <ellipse cx="56" cy="94" rx="8" ry="5" fill="#FDA4AF" opacity="0.75" />
        <ellipse cx="144" cy="94" rx="8" ry="5" fill="#FDA4AF" opacity="0.75" />

        {/* Left Wing holding Exam Clipboard */}
        <g>
          {/* Clipboard board */}
          <rect x="24" y="115" width="36" height="50" rx="5" fill="#78350F" stroke="#92400E" strokeWidth="1.5" transform="rotate(-10 24 115)" />
          {/* Paper */}
          <rect x="28" y="120" width="28" height="42" rx="3" fill="#FFFFFF" transform="rotate(-10 24 115)" />
          {/* Paper lines + A+ grade badge */}
          <line x1="32" y1="130" x2="50" y2="127" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="138" x2="48" y2="135" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="145" x2="48" y2="143" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <text x="35" y="157" fill="#16A34A" fontSize="9" fontWeight="bold">100%</text>
          {/* Clip on top */}
          <rect x="36" y="112" width="12" height="6" rx="2" fill="url(#clipGrad)" transform="rotate(-10 24 115)" />
          {/* Left Wing wrapping around clipboard */}
          <path
            d="M 50 110 C 35 125, 30 150, 48 165 C 55 160, 58 145, 56 125 Z"
            fill="#7052FF"
          />
        </g>

        {/* Right Wing waving friendly */}
        <path
          d="M 155 110 C 175 115, 185 130, 180 148 C 172 155, 160 150, 150 135 Z"
          fill="#7052FF"
        />

        {/* Graduation Mortarboard / Scholar Cap */}
        {withCap && (
          <g transform="translate(100, 32)">
            {/* Cap base skullcap */}
            <path d="M -22 0 Q 0 -6 22 0 L 16 10 Q 0 14 -16 10 Z" fill="#1E1B4B" />
            {/* Diamond flat top */}
            <polygon points="0,-16 46,-2 0,12 -46,-2" fill="#312E81" stroke="#4338CA" strokeWidth="1.5" />
            {/* Center golden button */}
            <circle cx="0" cy="-2" r="3" fill="#F59E0B" />
            {/* Golden tassel */}
            <path d="M 0 -2 Q 24 -4 32 8" stroke="#F59E0B" strokeWidth="2" fill="none" />
            <polygon points="32,8 30,18 36,18" fill="#F59E0B" />
          </g>
        )}
      </svg>
    </div>
  );
}
