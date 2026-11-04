"use client";

import React, { useState } from "react";
import OwlScholarMascot from "./OwlScholarMascot";
import {
  Bell,
  Calendar,
  Grid,
  Home,
  Plus,
  Activity,
  Clock,
  Target,
  Trophy,
  BarChart3,
  Calculator,
  Percent,
  Atom,
  FlaskConical,
  Landmark,
  TrendingUp,
} from "lucide-react";

interface SubjectData {
  name: string;
  code: string;
  score: string;
  accuracy: string;
  pace: string;
  status: string;
  statusBg: string;
  statusText: string;
  focusTopic: string;
  ecgColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function CozyStudyRoomScene({ onStartTest }: { onStartTest?: () => void }) {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number>(0);

  const subjects: SubjectData[] = [
    {
      name: "Economics",
      code: "309",
      score: "198 / 200",
      accuracy: "98.2%",
      pace: "52s / Q",
      status: "North Campus Safe",
      statusBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      statusText: "SRCC Cutoff: 196",
      focusTopic: "National Income Accounting & Multiplier",
      ecgColor: "#10B981",
      icon: BarChart3,
    },
    {
      name: "Accounts",
      code: "301",
      score: "194 / 200",
      accuracy: "96.4%",
      pace: "56s / Q",
      status: "Cutoff Cleared",
      statusBg: "bg-purple-50 border-purple-200 text-purple-700",
      statusText: "Hindu Cutoff: 192",
      focusTopic: "Partnership Dissolution & Share Forfeiture",
      ecgColor: "#8B5CF6",
      icon: Calculator,
    },
    {
      name: "Maths",
      code: "319",
      score: "186 / 200",
      accuracy: "92.0%",
      pace: "64s / Q",
      status: "Nearing Target",
      statusBg: "bg-amber-50 border-amber-200 text-amber-700",
      statusText: "St. Stephen's: 190",
      focusTopic: "Definite Integrals & Differential Equations",
      ecgColor: "#F59E0B",
      icon: Percent,
    },
    {
      name: "Physics",
      code: "322",
      score: "192 / 200",
      accuracy: "95.0%",
      pace: "55s / Q",
      status: "Cutoff Cleared",
      statusBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      statusText: "Miranda Cutoff: 188",
      focusTopic: "Electromagnetic Waves & Ray Optics",
      ecgColor: "#10B981",
      icon: Atom,
    },
    {
      name: "Chemistry",
      code: "306",
      score: "190 / 200",
      accuracy: "94.0%",
      pace: "54s / Q",
      status: "Target Achieved",
      statusBg: "bg-teal-50 border-teal-200 text-teal-700",
      statusText: "Hansraj Cutoff: 186",
      focusTopic: "Coordination Compounds & Electrochemistry",
      ecgColor: "#14B8A6",
      icon: FlaskConical,
    },
    {
      name: "Pol Science",
      code: "323",
      score: "196 / 200",
      accuracy: "97.5%",
      pace: "48s / Q",
      status: "Rank 1 Range",
      statusBg: "bg-rose-50 border-rose-200 text-rose-700",
      statusText: "LSR Cutoff: 194",
      focusTopic: "Contemporary World Politics & Globalisation",
      ecgColor: "#F43F5E",
      icon: Landmark,
    },
  ];

  const fallbackSubject: SubjectData = subjects[0] ?? {
    name: "Economics",
    code: "309",
    score: "198 / 200",
    accuracy: "98.2%",
    pace: "52s / Q",
    status: "North Campus Safe",
    statusBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
    statusText: "SRCC Cutoff: 196",
    focusTopic: "National Income Accounting & Multiplier",
    ecgColor: "#10B981",
    icon: TrendingUp,
  };
  const current: SubjectData = subjects[selectedSubjectIndex] ?? fallbackSubject;

  return (
    <div className="relative w-full max-w-[1020px] mx-auto rounded-[36px] overflow-hidden shadow-2xl border-4 border-emerald-800/20 bg-gradient-to-b from-[#164C3B] via-[#1B5744] to-[#12382B] p-4 md:p-10 select-none">
      {/* Background Architectural Elements & Furniture (SVG Layer) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg viewBox="0 0 1000 720" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="vaultArch" x1="500" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F382B" />
              <stop offset="60%" stopColor="#1B5945" />
              <stop offset="100%" stopColor="#25725A" />
            </linearGradient>

            <linearGradient id="rugYellow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="rugOrange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Arched Vault Ceiling Curves */}
          <path d="M 0 0 Q 500 120 1000 0 L 1000 340 L 0 340 Z" fill="url(#vaultArch)" />
          <path d="M 50 0 Q 500 90 950 0" stroke="#0D3025" strokeWidth="8" fill="none" opacity="0.6" />
          <path d="M 120 0 Q 500 70 880 0" stroke="#3DA381" strokeWidth="4" fill="none" opacity="0.3" />

          {/* Wooden Floor Planks */}
          <rect x="0" y="470" width="1000" height="250" fill="#2E2838" />
          <line x1="0" y1="520" x2="1000" y2="520" stroke="#231F2C" strokeWidth="2" />
          <line x1="0" y1="580" x2="1000" y2="580" stroke="#231F2C" strokeWidth="2" />
          <line x1="0" y1="640" x2="1000" y2="640" stroke="#231F2C" strokeWidth="2" />

          {/* Left Wall Bookshelves with NCERT Textbooks */}
          <rect x="10" y="220" width="160" height="12" rx="3" fill="#D97706" />
          {/* NCERT Books standing */}
          <rect x="35" y="170" width="16" height="50" rx="3" fill="#DC2626" />
          <rect x="53" y="165" width="18" height="55" rx="3" fill="#2563EB" />
          <rect x="73" y="172" width="15" height="48" rx="3" fill="#16A34A" />
          <rect x="90" y="168" width="17" height="52" rx="3" fill="#9333EA" />
          {/* Trophy on shelf */}
          <ellipse cx="130" cy="205" rx="14" ry="14" fill="#F59E0B" />
          <rect x="127" y="205" width="6" height="15" fill="#D97706" />

          {/* Lower shelf */}
          <rect x="0" y="275" width="140" height="12" rx="3" fill="#D97706" />

          {/* Small side study table with potted ficus */}
          <ellipse cx="195" cy="540" rx="30" ry="10" fill="#B45309" />
          <rect x="190" y="465" width="10" height="75" fill="#78350F" />
          <ellipse cx="195" cy="465" rx="36" ry="12" fill="#D97706" />
          <polygon points="182,460 208,460 203,425 187,425" fill="#F1F5F9" />
          <circle cx="195" cy="405" r="16" fill="#10B981" />
          <circle cx="180" cy="415" r="14" fill="#059669" />
          <circle cx="210" cy="415" r="14" fill="#34D399" />
          <circle cx="195" cy="385" r="12" fill="#6EE7B7" />

          {/* Ergonomic Study Armchair on Wheels (Left) */}
          <g transform="translate(10, 410)">
            <rect x="50" y="40" width="70" height="90" rx="18" fill="#0D9488" stroke="#115E59" strokeWidth="4" />
            <rect x="42" y="100" width="20" height="35" rx="8" fill="#14B8A6" />
            <rect x="108" y="100" width="20" height="35" rx="8" fill="#14B8A6" />
            <rect x="45" y="115" width="80" height="35" rx="10" fill="#0D9488" />
            <rect x="80" y="150" width="10" height="35" fill="#64748B" />
            <path d="M 60 185 L 85 182 L 110 185" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <circle cx="58" cy="188" r="5" fill="#0F172A" />
            <circle cx="112" cy="188" r="5" fill="#0F172A" />
          </g>

          {/* Study Desk & Cozy Yellow Desk Lamp (Right) */}
          <g transform="translate(680, 240)">
            {/* Lamp base on table */}
            <ellipse cx="140" cy="270" rx="22" ry="7" fill="#475569" />
            <path d="M 140 270 Q 155 180 120 140" stroke="#E2E8F0" strokeWidth="5" fill="none" />
            {/* Lamp Hood */}
            <path d="M 90 145 L 140 120 L 145 155 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            {/* Warm Cone Light Glow radiating down */}
            <polygon points="90,145 145,155 240,360 40,360" fill="url(#sunGlow)" opacity="0.35" />

            {/* Coffee mug with steam */}
            <rect x="190" y="270" width="18" height="22" rx="4" fill="#F8FAFC" />
            <path d="M 208 274 Q 215 281 208 288" stroke="#F8FAFC" strokeWidth="2.5" fill="none" />
            <path d="M 194 264 Q 192 256 195 250 M 202 264 Q 200 256 203 250" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Sturdy Study Table */}
            <rect x="20" y="290" width="260" height="18" rx="4" fill="#78350F" />
            <rect x="40" y="308" width="14" height="160" fill="#451A03" />
            <rect x="240" y="308" width="14" height="160" fill="#451A03" />
          </g>

          {/* Cozy Bohemian Moroccan Rug */}
          <g transform="translate(320, 520)">
            <ellipse cx="180" cy="80" rx="220" ry="60" fill="url(#rugOrange)" opacity="0.95" />
            <ellipse cx="180" cy="80" rx="180" ry="46" fill="url(#rugYellow)" />
            <ellipse cx="180" cy="80" rx="140" ry="34" fill="#EA580C" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Foreground Content: Interactive Phone Mockup & Scholar Owl Mascot */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-6 pb-2">
        {/* ============================================================== */}
        {/* HIGH-RES SMARTPHONE MOCKUP (iPhone with Dynamic Island)        */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-[340px] md:max-w-[360px] bg-slate-900 p-[10px] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/60 ring-1 ring-white/10">
          {/* Realistic iPhone Screen Container */}
          <div className="relative bg-[#F8FAFC] text-slate-800 rounded-[38px] overflow-hidden flex flex-col min-h-[580px] select-none">
            {/* Status Bar */}
            <div className="px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white/70 backdrop-blur border-b border-slate-100">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 mr-2" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
              <div className="flex items-center space-x-1.5 text-slate-700">
                <span className="text-[10px]">5G</span>
                <span className="text-[10px]">100%</span>
              </div>
            </div>

            {/* App Header (Candidate Profile & Exam Status) */}
            <div className="p-4 bg-white/90 backdrop-blur-sm flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-[2px] shadow-sm">
                  <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                    <span className="text-sm font-bold text-amber-900">AS</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Hello, Aryan!</h4>
                  <p className="text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                    <Target className="w-2.5 h-2.5 text-purple-600" /> Target: SRCC B.Com (Hons)
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center relative shadow-xs">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white" />
              </div>
            </div>

            {/* App Scrollable Body Content */}
            <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto max-h-[460px]">
              {/* Active Full Mock Exam Card */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                    Live NTA Simulator
                  </span>
                  <span className="text-[10px] text-purple-200 font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> 60:00 Mins
                  </span>
                </div>
                <h5 className="text-xs font-bold">CUET 2026 Full-Length Mock #12</h5>
                <p className="text-[10px] text-purple-200 mt-0.5">50 Compulsory Questions · Zero Choice</p>

                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-300 font-medium">Standard +5 / −1 Marking</span>
                  <button
                    type="button"
                    onClick={onStartTest}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs transition-colors"
                  >
                    Start Test
                  </button>
                </div>
              </div>

              {/* Interactive Domain Subject Selector */}
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Select Domain Subject</span>
                  <span className="text-[10px] font-semibold text-purple-600">
                    6 Subjects Loaded
                  </span>
                </div>
                {/* 6 Subject buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {subjects.map((sub, idx) => {
                    const isSelected = selectedSubjectIndex === idx;
                    return (
                      <button
                        key={sub.name}
                        type="button"
                        onClick={() => setSelectedSubjectIndex(idx)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "bg-purple-50 border-purple-400 ring-2 ring-purple-600/30 shadow-xs font-bold text-purple-900 scale-[1.02]"
                            : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <sub.icon className={`w-4 h-4 mb-1 ${isSelected ? "text-purple-700" : "text-slate-600"}`} />
                        <span className="text-[10px] font-semibold leading-tight">{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Diagnostic Preview Widget */}
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <current.icon className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{current.name} Standing</span>
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${current.statusBg}`}>
                    {current.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <span className="text-xl font-black text-slate-900 tabular-nums">{current.score}</span>
                    <span className="text-[10px] text-slate-500 ml-1">({current.accuracy} accuracy)</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">{current.statusText}</span>
                </div>

                <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-2 mt-2">
                  <strong className="text-purple-700">AI Priority Fix:</strong> {current.focusTopic}
                </p>
              </div>

              {/* Exam Pace & Health Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Speed Pace Widget */}
                <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1 text-slate-600 mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold">Speed Pace</span>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-lg font-black text-slate-900 tabular-nums">{current.pace}</span>
                    <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded-full">
                      Optimal
                    </span>
                  </div>
                  {/* ECG Pace Pulse SVG */}
                  <div className="h-4 w-full mt-1">
                    <svg viewBox="0 0 100 24" fill="none" className="w-full h-full">
                      <path
                        d="M 0 12 L 25 12 L 32 4 L 40 20 L 48 2 L 56 18 L 63 12 L 100 12"
                        stroke={current.ecgColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Accuracy Rank Widget */}
                <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1 text-slate-600 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-[10px] font-bold">Percentile</span>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-lg font-black text-slate-900 tabular-nums">99.8%</span>
                    <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 px-1 py-0.2 rounded-full">
                      North Campus
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 font-medium">Top 0.2% Pan-India</p>
                </div>
              </div>
            </div>

            {/* Bottom App Navigation Bar inside phone */}
            <div className="p-2 bg-white/95 backdrop-blur-sm border-t border-slate-200/80 flex items-center justify-around text-slate-400">
              <div className="p-1 text-purple-600 flex flex-col items-center">
                <Home className="w-4 h-4" />
                <span className="text-[8px] font-bold mt-0.5">Mocks</span>
              </div>
              <div className="p-1 hover:text-slate-600 flex flex-col items-center">
                <Grid className="w-4 h-4" />
                <span className="text-[8px] font-bold mt-0.5">PYQs</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm">
                <Plus className="w-4 h-4" />
              </div>
              <div className="p-1 hover:text-slate-600 flex flex-col items-center">
                <Activity className="w-4 h-4" />
                <span className="text-[8px] font-bold mt-0.5">Radar</span>
              </div>
              <div className="p-1 hover:text-slate-600 flex flex-col items-center">
                <Calendar className="w-4 h-4" />
                <span className="text-[8px] font-bold mt-0.5">Cutoffs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Mascot Presentation: Owl Scholar Mentor */}
        <div className="hidden lg:flex flex-col items-center text-center max-w-xs space-y-4">
          <OwlScholarMascot size={230} withCap={true} />
          <div className="bg-white/90 backdrop-blur-md border border-white/80 p-4 rounded-3xl shadow-xl text-slate-900 space-y-1">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              AI Academic Mentor
            </span>
            <h4 className="text-sm font-extrabold text-slate-900">
              Interactive Domain Radar
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Click the domain subjects on the phone screen to inspect real-time cutoff projections and chapter priority fixes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
