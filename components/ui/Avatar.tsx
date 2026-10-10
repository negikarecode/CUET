"use client";

import React, { useState, useEffect } from "react";

export interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xs" | "xl";
  className?: string;
}

const SIZE_CLASSES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs", // 32px in nav
  md: "w-10 h-10 text-sm", // 40px in profile
  lg: "w-12 h-12 text-base",
  xl: "w-14 h-14 text-lg",
};

export function getInitials(name?: string): string {
  if (!name || !name.trim()) return "CU";
  const cleaned = name.replace(/^(Dr\.|Prof\.|CA|Er\.|Coach)\s+/i, "").trim();
  const parts = cleaned.split(/[\s_-]+/).filter(Boolean);
  if (parts.length === 0) return "CU";
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function getAvatarColor(_name?: string): { bg: string; text: string } {
  return { bg: "bg-[#EFF6FF]", text: "text-[#2563EB]" };
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "CUET Aspirant",
  alt,
  size = "md",
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = getInitials(name);
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const shouldShowFallback = !src || hasError;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full font-semibold select-none ${sizeClass} ${className}`}
    >
      {shouldShowFallback ? (
        <div
          data-testid="avatar-fallback"
          className="w-full h-full rounded-full flex items-center justify-center font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#CBD5E1]"
          aria-label={alt || name}
        >
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className="w-full h-full rounded-full object-cover border border-[#E2E8F0]"
        />
      )}
    </div>
  );
};

export default Avatar;
