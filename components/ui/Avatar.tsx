"use client";

import React, { useState, useEffect } from "react";

export interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showStatusDot?: boolean;
  statusDotColor?: string;
}

const SIZE_CLASSES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-14 h-14 text-lg",
};

const COLOR_PALETTES = [
  { bg: "bg-blue-600 text-white" },
  { bg: "bg-indigo-600 text-white" },
  { bg: "bg-violet-600 text-white" },
  { bg: "bg-emerald-600 text-white" },
  { bg: "bg-amber-600 text-white" },
  { bg: "bg-rose-600 text-white" },
  { bg: "bg-sky-600 text-white" },
  { bg: "bg-teal-600 text-white" },
];

export function getInitials(name?: string): string {
  if (!name || !name.trim()) return "CU";
  // Remove honorifics like Dr., Prof., CA, Er., etc. for better initials
  const cleaned = name.replace(/^(Dr\.|Prof\.|CA|Er\.|Coach)\s+/i, "").trim();
  const parts = cleaned.split(/[\s_-]+/).filter(Boolean);
  if (parts.length === 0) return "CU";
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function getAvatarColor(name: string = ""): { bg: string } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLOR_PALETTES.length;
  return COLOR_PALETTES[index]!;
}

export function getDeterministicColor(name: string = ""): string {
  return getAvatarColor(name).bg;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "CUET Aspirant",
  alt,
  size = "md",
  className = "",
  showStatusDot = false,
  statusDotColor = "bg-emerald-500",
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state if image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = getInitials(name);
  const colorClass = getDeterministicColor(name);
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  const shouldShowFallback = !src || hasError;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full font-bold select-none ${sizeClass} ${className}`}
    >
      {shouldShowFallback ? (
        <div
          data-testid="avatar-fallback"
          className={`w-full h-full rounded-full flex items-center justify-center font-bold tracking-wider shadow-2xs ${colorClass}`}
          aria-label={alt || name}
        >
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className="w-full h-full rounded-full object-cover ring-1 ring-slate-200/60"
        />
      )}

      {showStatusDot && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusDotColor}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Avatar;
