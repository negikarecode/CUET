import React from 'react';
import { Flame, Clock, Zap } from 'lucide-react';
import { getDaysToExam } from '@/lib/config/dashboardConfig';

interface WelcomeBannerProps {
  userName?: string;
  streak?: number;
  xp?: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  streak = 1,
  xp = 0,
}) => {
  const displayName = userName && userName.trim() ? userName : 'CUET Aspirant';
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const daysToExam = getDaysToExam();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
      {/* Greeting Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {timeOfDay}, {displayName}! 👋
        </h1>
        <p className="mt-1 text-[13px] text-slate-500 font-medium">
          Your personalized CUET AI Command Hub. Calibrate accuracy and repair weak topics.
        </p>
      </div>

      {/* Badges: Exam Countdown + Practice Streak + XP */}
      <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto shrink-0">
        {/* Countdown */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-800 text-xs font-bold rounded-xl border border-sky-200 shadow-2xs font-mono">
          <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>{daysToExam} days to CUET 2026</span>
        </div>

        {/* Practice Streak */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 shadow-2xs font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
          <span>{streak}-Day Streak</span>
        </div>

        {/* XP */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-800 text-xs font-bold rounded-xl border border-purple-200 shadow-2xs font-mono">
          <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600 shrink-0" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
