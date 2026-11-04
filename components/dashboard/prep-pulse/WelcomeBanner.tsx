import React from "react";

interface WelcomeBannerProps {
  userName?: string;
  targetCollege?: string;
  targetCourse?: string;
  targetStream?: string;
  isDiagnosticUnlocked?: boolean;
  cycleNumber?: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  targetCollege,
  targetCourse,
}) => {
  const displayName = userName && userName.trim() ? userName : "Aryan 3";
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const displayCourse = targetCourse || "B.A. (Hons.) Economics";
  const displayCollege = targetCollege || "Shri Ram College of Commerce";

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
      {/* Left: Greeting and subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
          {timeOfDay}, {displayName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal font-medium">
          Track your readiness and take your next best action.
        </p>
      </div>

      {/* Right: Target Program Card */}
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-2xs shrink-0 min-w-[240px]">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target program</div>
        <div className="text-sm font-bold text-slate-900 mt-0.5 truncate max-w-[260px]" title={displayCourse}>
          {displayCourse}
        </div>
        <div className="text-xs text-slate-600 mt-0.5 truncate max-w-[260px] font-medium" title={displayCollege}>
          {displayCollege}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
