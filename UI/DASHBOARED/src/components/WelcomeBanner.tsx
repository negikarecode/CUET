import React, { useRef, useState } from 'react';
import { BANNER_INFO } from '../data/mockData';
import { Quote, Sparkles, Target, Flame } from 'lucide-react';

export const WelcomeBanner: React.FC = () => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left Column: Greeting and Context */}
      <div className="lg:col-span-7 flex flex-col justify-center py-2">
        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60 shadow-2xs action-glow cursor-default">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            CUET 2025 Aspirant
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/60 shadow-2xs action-glow cursor-default">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            12-Day Practice Streak
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {BANNER_INFO.greeting}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          {BANNER_INFO.subtitle}
        </p>
      </div>

      {/* Right Column: Motivational Card with Scenic Background & Interactive Hover-based Lighting */}
      <div className="lg:col-span-5">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-white transition-all duration-300 group min-h-[140px] flex flex-col justify-between border ${
            isHovered 
              ? 'border-sky-300 shadow-[0_16px_40px_-10px_rgba(56,189,248,0.35),0_0_25px_rgba(56,189,248,0.2)]' 
              : 'border-slate-800 shadow-md'
          }`}
        >
          {/* Scenic Mountain Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80')`,
            }}
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/75 to-indigo-950/80" />
          
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
            <Quote className="w-5 h-5 text-white/40" />
          </div>

          {/* Quote text: “Discipline today creates options tomorrow.” */}
          <div className="relative z-20 my-3">
            <p className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug drop-shadow-sm italic">
              {BANNER_INFO.quote}
            </p>
          </div>

          {/* Bottom attribution/meta */}
          <div className="relative z-20 flex items-center justify-between text-xs text-slate-300">
            <span className="font-medium text-slate-300">Focus on the process</span>
            <span className="text-[11px] text-slate-400 font-mono">#CUET2025</span>
          </div>

        </div>
      </div>

    </div>
  );
};
