import React, { useRef, useState } from 'react';
import { Sparkles, Target, Flame } from 'lucide-react';

interface WelcomeBannerProps {
  userName?: string;
  targetStream?: string;
  targetCollege?: string;
  streak?: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  targetStream = "Science",
  targetCollege,
  streak = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const displayName = userName && userName.trim() ? userName : "CUET Aspirant";
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const greeting = `${timeOfDay}, ${displayName}! 👋`;

  const getCollegeImage = (college?: string) => {
    if (!college) return '/assets/images/delhi-university.jpg';
    const c = college.toLowerCase();
    if (c.includes('srcc') || c.includes('shri ram') || c.includes('commerce')) return '/assets/images/srcc.jpg';
    if (c.includes('hindu')) return '/assets/images/hindu-college.jpg';
    if (c.includes('stephen')) return '/assets/images/st-stephens.jpg';
    if (c.includes('miranda')) return '/assets/images/miranda-house.jpg';
    return '/assets/images/delhi-university.jpg';
  };

  const collegeImageUrl = getCollegeImage(targetCollege);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left Column: Greeting and Context */}
      <div className="lg:col-span-7 flex flex-col justify-center py-2">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60 shadow-2xs action-glow cursor-default max-w-full">
            <Target className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">CUET 2026 • {targetStream}{targetCollege ? ` • Targeting ${targetCollege}` : ''}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/60 shadow-2xs action-glow cursor-default shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
            <span>{streak}-Day Practice Streak</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {greeting}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Stay consistent. Systematic NTA-pattern mock tests and targeted mistake diagnostics bring you closer to {targetCollege ? targetCollege : "your dream university"}.
        </p>
      </div>

      {/* Right Column: Motivational Card with Scenic Background & Interactive Hover-based Lighting */}
      <div className="lg:col-span-5">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-white transition-all duration-300 group min-h-[160px] flex flex-col justify-between border ${
            isHovered 
              ? 'border-sky-300 shadow-[0_16px_40px_-10px_rgba(56,189,248,0.35),0_0_25px_rgba(56,189,248,0.2)]' 
              : 'border-slate-800 shadow-md'
          }`}
        >
          {/* Authentic University Campus Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('${collegeImageUrl}')`,
            }}
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-indigo-950/85" />
          
          {/* Dynamic Cursor Spotlight Lighting Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.22), transparent 75%)`,
            }}
          />

          {/* Top tag & subtle quote icon */}
          <div className="relative z-20 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 action-glow cursor-default">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Daily Inspiration
            </span>
            <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
              {targetCollege || "Delhi University"}
            </span>
          </div>

          {/* Quote text: “Discipline today creates options tomorrow.” */}
          <div className="relative z-20 my-3">
            <p className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug drop-shadow-sm italic">
              &ldquo;Discipline today creates options tomorrow.&rdquo;
            </p>
          </div>

          {/* Bottom attribution/meta */}
          <div className="relative z-20 flex items-center justify-between text-xs text-slate-300">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Focus on the process
            </span>
            <span className="text-[11px] text-slate-400 font-mono">#CUET2026</span>
          </div>

        </div>
      </div>

    </div>
  );
};
