'use client';
import React from 'react';
import { GraduationCap, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function ExamDayCard() {
  const checklist = [
    'NTA CUET Admit Card printed clearly (with self-declaration signed)',
    'Original Government Photo ID (Aadhaar / Passport / School ID)',
    'Passport size photographs (same as application form)',
    'Simple transparent blue/black ballpoint pen',
    'Personal transparent water bottle (500ml)',
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-indigo-700/50 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
          <GraduationCap className="w-8 h-8 animate-bounce" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-400/20">
            D-DAY HAS ARRIVED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">
            Today is Your Day to Shine! 
          </h2>
        </div>
      </div>

      <p className="text-sm text-indigo-100 leading-relaxed max-w-xl">
        All the weeks of studying, solving weak topics, mock tests, and asking doubts have prepared you for this moment. Take a deep breath. Trust your preparation and stay composed during the exam.
      </p>

      {/* Mandatory Exam Hall Checklist */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Mandatory Exam Hall Checklist
        </h4>
        <ul className="space-y-2 text-xs text-slate-200">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center gap-3 text-xs text-indigo-200">
        <Heart className="w-5 h-5 text-rose-400 flex-shrink-0" />
        <span>
          &quot;Jab paper samne aaye, pehle 2 minute shanti se breathe karo. Jo questions aate hain pehle unko mark karo. Elimination technique use karo.&quot; — Best of luck from the entire CUET team!
        </span>
      </div>
    </div>
  );
}
