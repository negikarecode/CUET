import React from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  activeBorderColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  // Remove glowColor & activeBorderColor decorative properties
  glowColor,
  activeBorderColor,
  ...props
}) => {
  return (
    <div
      className={`app-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
