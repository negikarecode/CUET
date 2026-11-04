import React from "react";
import OwlScholarMascot from "./OwlScholarMascot";
import { Award } from "lucide-react";

export default function HeroCampusIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-[560px] select-none ${className}`}>
      <svg
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="campusHillGrad" x1="0" y1="340" x2="600" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#81D8BA" />
            <stop offset="100%" stopColor="#48B38A" />
          </linearGradient>

          <linearGradient id="backCampusHill" x1="100" y1="280" x2="500" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7E5CD" />
            <stop offset="100%" stopColor="#76CEAB" />
          </linearGradient>

          <linearGradient id="roofPurpleGrad" x1="320" y1="120" x2="480" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6C52A8" />
            <stop offset="100%" stopColor="#4D3782" />
          </linearGradient>

          <linearGradient id="wallYellowGrad" x1="330" y1="200" x2="470" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="doorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Warm Sun / Sky Glow in background */}
        <circle cx="190" cy="140" r="130" fill="url(#sunGlow)" />

        {/* Floating clouds in sky */}
        <g fill="#FFFFFF" opacity="0.8">
          <ellipse cx="120" cy="90" rx="36" ry="14" />
          <ellipse cx="100" cy="96" rx="24" ry="12" />
          <ellipse cx="140" cy="96" rx="24" ry="12" />

          <ellipse cx="480" cy="80" rx="42" ry="16" />
          <ellipse cx="460" cy="88" rx="28" ry="13" />
          <ellipse cx="505" cy="88" rx="26" ry="12" />
        </g>

        {/* Distant Hills Layer */}
        <path
          d="M 20 400 Q 220 270 420 330 T 600 370 L 600 520 L 0 520 Z"
          fill="url(#backCampusHill)"
          opacity="0.8"
        />

        {/* University Main Academic Hall / Library (Right side) */}
        <g id="university-hall">
          {/* Main Hall Base Shadow */}
          <ellipse cx="400" cy="390" rx="85" ry="18" fill="rgba(30, 80, 60, 0.15)" />

          {/* Academic Building Facade (Yellow/Cream Stone) */}
          <rect x="330" y="210" width="140" height="175" rx="16" fill="url(#wallYellowGrad)" stroke="#B45309" strokeWidth="3" />

          {/* Pitched Roof (Purple Slate) */}
          <polygon points="400,120 310,218 490,218" fill="url(#roofPurpleGrad)" stroke="#3B2668" strokeWidth="3" />

          {/* Clock Tower / Bell Arch on Roof */}
          <rect x="382" y="145" width="36" height="36" rx="18" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" />
          {/* Clock Hands pointing to 10:10 */}
          <circle cx="400" cy="163" r="3" fill="#78350F" />
          <line x1="400" y1="163" x2="400" y2="153" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <line x1="400" y1="163" x2="408" y2="159" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

          {/* Arched Classical Windows on 2nd Floor */}
          <g fill="#4338CA">
            {/* Window 1 */}
            <rect x="350" y="235" width="24" height="32" rx="12" fill="#E0E7FF" stroke="#3730A3" strokeWidth="2" />
            <path d="M 362 235 V 267 M 350 252 H 374" stroke="#3730A3" strokeWidth="1.5" />

            {/* Window 2 */}
            <rect x="388" y="235" width="24" height="32" rx="12" fill="#E0E7FF" stroke="#3730A3" strokeWidth="2" />
            <path d="M 400 235 V 267 M 388 252 H 412" stroke="#3730A3" strokeWidth="1.5" />

            {/* Window 3 */}
            <rect x="426" y="235" width="24" height="32" rx="12" fill="#E0E7FF" stroke="#3730A3" strokeWidth="2" />
            <path d="M 438 235 V 267 M 426 252 H 450" stroke="#3730A3" strokeWidth="1.5" />
          </g>

          {/* Grand Library Entrance Arch & Wooden Door */}
          <path d="M 380 385 V 320 Q 400 305 420 320 V 385 Z" fill="url(#doorGrad)" stroke="#451A03" strokeWidth="3" />
          <circle cx="414" cy="355" r="2.5" fill="#FDE68A" />

          {/* Classical Entry Pillars */}
          <rect x="368" y="315" width="8" height="70" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <rect x="424" y="315" width="8" height="70" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          {/* Welcome Entrance Plaque: "CUET 100%ile" */}
          <rect x="375" y="295" width="50" height="15" rx="3" fill="#15803D" />
          <text x="382" y="306" fill="#FFFFFF" fontSize="8" fontWeight="bold">NORTH CAMPUS</text>

          {/* Little green bushes beside library steps */}
          <ellipse cx="325" cy="385" rx="18" ry="12" fill="#15803D" />
          <ellipse cx="475" cy="385" rx="18" ry="12" fill="#15803D" />
        </g>

        {/* Foreground Lush Emerald Hills (Rolling Campus Lawn) */}
        <path
          d="M 0 380 Q 200 340 400 400 T 600 420 L 600 520 L 0 520 Z"
          fill="url(#campusHillGrad)"
        />

        {/* Campus Stone Walkway / Paver Path */}
        <path
          d="M 400 385 Q 360 440 280 470 T 120 520"
          stroke="#FEF3C7"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M 400 385 Q 360 440 280 470 T 120 520"
          stroke="#D97706"
          strokeWidth="3"
          strokeDasharray="6 14"
          fill="none"
          opacity="0.6"
        />

        {/* Flowering Bushes & Campus Trees */}
        <g id="campus-trees">
          {/* Tree 1 (Left) */}
          <rect x="76" y="350" width="12" height="60" rx="3" fill="#78350F" />
          <circle cx="82" cy="320" r="38" fill="#10B981" />
          <circle cx="68" cy="335" r="28" fill="#059669" />
          <circle cx="98" cy="335" r="28" fill="#34D399" />

          {/* Little Yellow & White Daisies on lawn */}
          <circle cx="160" cy="460" r="4" fill="#FFFFFF" />
          <circle cx="160" cy="460" r="2" fill="#F59E0B" />
          <circle cx="210" cy="430" r="4" fill="#FFFFFF" />
          <circle cx="210" cy="430" r="2" fill="#F59E0B" />
          <circle cx="290" cy="485" r="4" fill="#FFFFFF" />
          <circle cx="290" cy="485" r="2" fill="#F59E0B" />
          <circle cx="510" cy="460" r="5" fill="#FFFFFF" />
          <circle cx="510" cy="460" r="2.5" fill="#F59E0B" />
        </g>
      </svg>

      {/* Floating Mascot (Scholar Owl) seated prominently on the left lawn */}
      <div className="absolute left-6 bottom-4 md:left-14 md:bottom-8 z-20">
        <OwlScholarMascot size={210} withCap={true} />
      </div>

      {/* Floating Score Badge on right */}
      <div className="absolute right-4 top-20 md:right-8 md:top-24 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-3 shadow-xl z-20 flex items-center gap-3 animate-bounce duration-1000">
        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
          <Award className="w-5 h-5 text-purple-700" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-slate-500">Predicted Score</div>
          <div className="text-sm font-extrabold text-slate-900">800/800 · SRCC</div>
        </div>
      </div>
    </div>
  );
}
