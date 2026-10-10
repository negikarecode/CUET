import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingChecklistProps {
  totalAttempted: number;
  attemptsCount: number;
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  totalAttempted,
  attemptsCount,
}) => {
  const steps = [
    {
      id: 1,
      title: 'Take a diagnostic mock',
      description: 'Establish your baseline score and calibrate starting percentile.',
      isDone: attemptsCount >= 1 || totalAttempted >= 50,
      href: '/dashboard/mocks',
      ctaText: 'Start mock',
    },
    {
      id: 2,
      title: 'Review your mistakes',
      description: 'Analyze question pacing, conceptual slips, and topic blindspots.',
      isDone: attemptsCount >= 1 && totalAttempted >= 50,
      href: '/dashboard/sessions',
      ctaText: 'Review session',
    },
    {
      id: 3,
      title: 'Unlock adaptive drills',
      description: 'Complete 150 questions to activate AI Mistake Diagnostics and Radar.',
      isDone: totalAttempted >= 150,
      href: '/dashboard/radar',
      ctaText: 'View diagnostics',
    },
  ];

  const completedCount = steps.filter((s) => s.isDone).length;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Getting Started Checklist
            </h3>
            <p className="text-[13px] text-slate-400">
              {completedCount} of 3 milestones completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
            {Math.round((completedCount / 3) * 100)}% Onboarded
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
              step.isDone
                ? 'bg-slate-800/60 border-emerald-500/40 text-slate-200'
                : 'bg-slate-800/30 border-slate-800 text-slate-300'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {step.isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={`text-xs font-bold ${step.isDone ? 'text-white line-through opacity-80' : 'text-white'}`}>
                  {step.id}. {step.title}
                </span>
              </div>
              <p className="text-[12px] text-slate-400 leading-relaxed pl-6">
                {step.description}
              </p>
            </div>

            <div className="pt-3 pl-6">
              <Link
                href={step.href}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  step.isDone
                    ? 'text-slate-400 hover:text-white'
                    : 'text-sky-400 hover:text-sky-300'
                }`}
              >
                <span>{step.ctaText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;
