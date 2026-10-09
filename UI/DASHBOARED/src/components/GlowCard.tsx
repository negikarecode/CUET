import React, { useRef, useState, useCallback } from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // Default cyan/sky lighting
  activeBorderColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.11)', // Sky cyan glow matching reference
  activeBorderColor = 'rgba(56, 189, 248, 0.5)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-white rounded-2xl border transition-all duration-300 ${
        isHovered
          ? 'border-sky-300/65 shadow-[0_10px_28px_-10px_rgba(56,189,248,0.16),0_0_16px_rgba(56,189,248,0.08)]'
          : 'border-slate-100 shadow-sm'
      } ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer (tracks mouse coordinates) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 75%)`,
        }}
      />

      {/* Subtle edge highlight beacon */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 0.4 : 0,
          boxShadow: `inset 0 0 16px rgba(56, 189, 248, 0.04)`,
        }}
      />

      {/* Card Content (z-10 to stay interactive on top of spotlight layer) */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
