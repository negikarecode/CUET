'use client';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, X } from 'lucide-react';

interface TaskCompleteAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
}

export default function TaskCompleteAnimation({
  isOpen,
  onClose,
  streakCount,
}: TaskCompleteAnimationProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti cannons
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 300);
      } catch (err) {
        console.warn('Confetti animation error:', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Day Target Complete
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Phenomenal Job! 
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            You finished every single study task scheduled for today. Your streak is now{' '}
            <strong className="text-indigo-600 dark:text-indigo-400 font-bold">
              {streakCount} days strong
            </strong>
            . Dream college admission is won with days like this!
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs flex items-center justify-between font-semibold">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tomorrow&apos;s schedule is locked</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400">Ready</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition active:scale-95"
        >
          Keep It Up! Back to Plan
        </button>
      </div>
    </div>
  );
}
