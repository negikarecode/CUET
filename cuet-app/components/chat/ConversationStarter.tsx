'use client';
import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { WeaknessScore } from '@/lib/types';

interface ConversationStarterProps {
  studentName?: string;
  weakTopics: WeaknessScore[];
  onSelectQuery: (query: string) => void;
}

export default function ConversationStarter({
  studentName = 'Champion',
  weakTopics = [],
  onSelectQuery,
}: ConversationStarterProps) {
  const trendingDoubts = [
    {
      label: 'Article 21 vs 21A',
      query: 'Bhaiya, Article 21 aur 21A me kya difference hai aur 86th amendment kyu important hai?',
    },
    {
      label: 'Dr. Ambedkar on Article 32',
      query: 'Why did Dr. Ambedkar call Article 32 the heart and soul of the Indian Constitution?',
    },
    {
      label: 'Uniform Civil Code (Article 44)',
      query: 'Article 44 DPSP me kya provisions hain aur CUET me ispe kya questions aate hain?',
    },
    {
      label: 'DU Cutoffs & Normalisation',
      query: 'CUET normalisation process kaise kaam karta hai aur North Campus ke liye safe score kya hai?',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6 animate-fadeIn">
      {/* Mentor Intro Hero */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20 mb-2">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Hey {studentName}! What CUET doubt can we crush today?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          I am your 24/7 AI CUET Mentor. Ask in <strong>Hinglish, Hindi, or English</strong>. I use verified NCERT facts to keep you 100% exam-ready.
        </p>
      </div>

      {/* Module 1 Weakness Integration: Recommended Weak Topics */}
      {weakTopics && weakTopics.length > 0 && (
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              From Your Weakness Tracker (Module 1)
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            You struggled with these topics recently. Clear your doubts right now:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {weakTopics.slice(0, 2).map((item) => (
              <button
                key={item.topic_id}
                onClick={() =>
                  onSelectQuery(
                    `Mujhe ${item.topic?.topic_name || 'Fundamental Rights'} me doubt hai. Iske high-yield points NCERT ke basis pe simple Hinglish me samjha do.`
                  )
                }
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-800/40 hover:border-amber-400 dark:hover:border-amber-600 shadow-sm text-left transition group"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {item.topic?.topic_name}
                  </h4>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase">
                    {item.weakness_level} • {Math.round(item.accuracy_score)}% Accuracy
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending Doubts */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Trending Doubts Asked by Aspirants
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {trendingDoubts.map((item, i) => (
            <button
              key={i}
              onClick={() => onSelectQuery(item.query)}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm text-left transition group"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {item.label}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {item.query}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
