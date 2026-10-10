import React from 'react';

interface WelcomeBannerProps {
  userName?: string;
  streak?: number;
  xp?: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
}) => {
  const displayName = userName && userName.trim() ? userName : 'Aspirant';
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-1">
      <h1 className="text-[28px] font-semibold text-[var(--text)] leading-[1.25]">
        {timeOfDay}, {displayName}
      </h1>
      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
        Track your preparation progress, diagnostic accuracy, and target cutoffs.
      </p>
    </div>
  );
};

export default WelcomeBanner;
