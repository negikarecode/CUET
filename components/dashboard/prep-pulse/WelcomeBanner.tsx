import React from "react";
import { Sparkles, Compass, CheckCircle2 } from "lucide-react";

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
  targetStream,
  isDiagnosticUnlocked = false,
  cycleNumber = 1,
}) => {
  const displayName = userName && userName.trim() ? userName : "Aspirant";
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/70">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            AI Learning Command Center
          </span>
          {isDiagnosticUnlocked ? (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Cycle {cycleNumber} Active
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-full">
              Cycle 1 Calibration
            </span>
          )}
          {targetStream && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full hidden md:inline-block">
              {targetStream} Stream
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
          {timeOfDay}, {displayName}
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl leading-normal">
          Understand your preparation readiness, track diagnostic accuracy, and take your next best action.
        </p>
      </div>

      {(targetCollege || targetCourse) && (
        <div className="hidden lg:flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Compass className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-left text-xs leading-tight">
            <div className="text-slate-400 font-medium">Target Program</div>
            <div className="text-slate-900 font-semibold truncate max-w-[180px]" title={targetCourse || "Undergraduate Degree"}>
              {targetCourse || "Undergraduate Degree"}
            </div>
            <div className="text-slate-500 truncate max-w-[180px]" title={targetCollege || "Central University"}>
              {targetCollege || "Central University"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
