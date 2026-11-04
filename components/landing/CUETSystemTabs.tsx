"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, BookOpen, Target, Flame, FileText } from "lucide-react";
import Link from "next/link";

type TabKey = "authenticity" | "diagnostics" | "cutoffs" | "pyqs" | "accelerator";

interface TabData {
  title: string;
  badge: string;
  dotColor: string;
  points: string[];
  paragraphs: string[];
}

export default function CUETSystemTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("authenticity");

  const tabContents: Record<TabKey, TabData> = {
    authenticity: {
      title: "NTA-Style CBT Simulation",
      badge: "Standardized Exam Engine",
      dotColor: "bg-purple-600",
      points: [
        "Strict 50 compulsory questions per domain subject with zero internal choice (250 raw marks)",
        "Authentic 4-color NTA-style question palette (Answered, Not Answered, Marked for Review)",
        "Strict +5 marks for correct, −1 penalty for incorrect, 0 for unattempted",
      ],
      paragraphs: [
        "In CUET UG, exam panic and time misallocation account for more lost marks than difficult questions. Our simulator replicates the exact screen layout, keyboard shortcuts, and ticking 60-minute countdown clock used in real NTA testing centres across India.",
        "Aspirants develop psychological pacing habits, eliminating the shock factor on exam day and ensuring every single minute yields maximum raw score.",
      ],
    },
    diagnostics: {
      title: "Granular AI Mistake Diagnosis",
      badge: "Root-Cause Error Analysis",
      dotColor: "bg-amber-500",
      points: [
        "Differentiates reading & careless errors from foundational conceptual deficits",
        "Tracks right-to-wrong answer toggles where candidates second-guessed themselves",
        "Maps every question directly to the rationalized NCERT Class 12 textbook page",
      ],
      paragraphs: [
        "Standard test series merely give you a scorecard and generic answer keys. Our diagnostic engine evaluates candidate decision trees: did you rush the last 10 questions? Did you switch from a correct option to a distractor in the final 5 minutes?",
        "By identifying cognitive traps before exam day, students avoid losing 20–40 marks to preventable penalty errors.",
      ],
    },
    cutoffs: {
      title: "Verified College Cutoff Intelligence",
      badge: "Data-Driven Admissions",
      dotColor: "bg-emerald-500",
      points: [
        "4 historical years (2022–2025) of verified CSAS college and course cutoff scores",
        "Real-time dream college gap analysis for SRCC, Hindu, Hansraj, St. Stephen's & Miranda",
        "Category-wise percentile distributions across General, OBC, SC, ST, and EWS quotas",
      ],
      paragraphs: [
        "Cutoff targets are not static guesses. We calculate your composite percentile against authentic Delhi University admission thresholds, factoring in course-specific domain combinations (e.g., Mathematics + 2 Domains for B.Com Hons vs Humanities combinations).",
        "You always know your exact distance to your dream campus and how many additional raw marks are required to secure admission.",
      ],
    },
    pyqs: {
      title: "Shift-Wise Past Year Paper Archive",
      badge: "100% Comprehensive Coverage",
      dotColor: "bg-indigo-500",
      points: [
        "251+ reconstructed shift papers from CUET 2022, 2023, 2024, and 2025",
        "Full mathematical equation rendering with KaTeX and original case-study graphs",
        "Public access to all 22 domain subjects including Science, Commerce, and Arts",
      ],
      paragraphs: [
        "NTA draws heavily from historical question archetypes and Class 12 rationalized syllabi. Practicing actual past shift papers ensures you encounter the exact phrasing, match-the-column grids, and multi-statement assertions that define CUET.",
        "Every paper includes verified step-by-step academic explanations written by senior subject educators.",
      ],
    },
    accelerator: {
      title: "7-Day Score Accelerator",
      badge: "Targeted Remediation",
      dotColor: "bg-rose-500",
      points: [
        "Personalized 10-question repair drills targeted specifically at diagnosed weak topics",
        "Spaced repetition algorithms that re-test previous incorrect responses until mastered",
        "Daily practice streaks and milestone progression to build unbreakable study habits",
      ],
      paragraphs: [
        "Instead of re-reading entire 300-page textbooks, the Score Accelerator delivers concentrated 15-minute high-yield practice drills focused on your exact score leak areas.",
        "Candidates using the daily 10-question fix consistently gain 15 to 30 marks within their subsequent mock test attempts.",
      ],
    },
  };

  const tabs: { key: TabKey; label: string; dot: string }[] = [
    { key: "authenticity", label: "NTA Authenticity", dot: "bg-purple-600" },
    { key: "diagnostics", label: "AI Diagnosis", dot: "bg-amber-500" },
    { key: "cutoffs", label: "College Cutoffs", dot: "bg-emerald-500" },
    { key: "pyqs", label: "PYQ Archive", dot: "bg-indigo-500" },
    { key: "accelerator", label: "Score Accelerator", dot: "bg-rose-500" },
  ];

  const current = tabContents[activeTab];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      const targetTab = tabs[nextIndex];
      if (targetTab) setActiveTab(targetTab.key);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      const targetTab = tabs[prevIndex];
      if (targetTab) setActiveTab(targetTab.key);
    }
  };

  return (
    <section id="curriculum" className="py-14 md:py-24 bg-gradient-to-b from-[#F0FAF7] via-white to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 transition-all">
          {/* Top Pill Tabs with Accessible ARIA Role and Arrow Navigation */}
          <div
            role="tablist"
            aria-label="CUET AI-Prep platform feature architecture"
            className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-slate-100"
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`tab-${tab.key}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-purple-600 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.dot}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center focus:outline-none"
          >
            {/* Left Points List */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {current.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                  {current.title}
                </h3>
              </div>

              <div className="space-y-3.5">
                {current.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-700"
                >
                  Try in Interactive Dashboard
                </Link>
              </div>
            </div>

            {/* Right Live UI Component Panel */}
            <div className="lg:col-span-6 space-y-4">
              {activeTab === "authenticity" && (
                <div className="bg-[#18262E] text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
                  {/* NTA Top Bar */}
                  <div className="bg-[#101C23] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-slate-200">NTA-Style CBT Engine · Section I (Domain)</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-amber-300 font-bold bg-amber-950/60 border border-amber-800/80 px-2.5 py-0.5 rounded">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>58:14</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Question Header */}
                    <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2.5">
                      <span className="font-bold text-slate-300">Question 24 of 50</span>
                      <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 px-2 py-0.5 rounded text-[11px] font-semibold">
                        +5.0 / −1.0 Scheme (250 Raw)
                      </span>
                    </div>

                    {/* Question Prompt */}
                    <div className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      In macroeconomic equilibrium, when Aggregate Demand exceeds Aggregate Supply at full employment level of income, the resulting gap is identified as:
                    </div>

                    {/* Options */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300">
                        <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">A</span>
                        <span>Deflationary Gap</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/80 text-white font-medium shadow-xs">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">B</span>
                        <span className="text-emerald-200">Inflationary Gap</span>
                        <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">Chosen</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300">
                        <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">C</span>
                        <span>Liquidity Trap</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300">
                        <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">D</span>
                        <span>Fiscal Deficit Gap</span>
                      </div>
                    </div>

                    {/* NTA Palette Preview Mini */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                        <span className="font-semibold">Question Palette (50 Total)</span>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 23</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> 3</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> 24</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
                        {[
                          { num: 20, state: "bg-emerald-600 text-white" },
                          { num: 21, state: "bg-emerald-600 text-white" },
                          { num: 22, state: "bg-purple-600 text-white" },
                          { num: 23, state: "bg-emerald-600 text-white" },
                          { num: 24, state: "bg-emerald-500 text-white ring-2 ring-emerald-300" },
                          { num: 25, state: "bg-rose-600 text-white" },
                          { num: 26, state: "bg-slate-700 text-slate-300" },
                          { num: 27, state: "bg-slate-700 text-slate-300" },
                          { num: 28, state: "bg-purple-600 text-white" },
                          { num: 29, state: "bg-slate-700 text-slate-300" },
                        ].map((item) => (
                          <div key={item.num} className={`h-6 rounded text-[10px] font-bold flex items-center justify-center ${item.state}`}>
                            {item.num}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* NTA Action Bar */}
                    <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800">
                      <button type="button" className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px] font-medium">
                        Mark for Review
                      </button>
                      <button type="button" className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px] font-medium">
                        Clear Response
                      </button>
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded font-bold text-[11px] shadow-sm">
                        Save &amp; Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "diagnostics" && (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">AI Mistake Diagnosis Dossier</h4>
                        <p className="text-[10px] text-slate-500">Question 31 · Macroeconomics Domain</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                      −1 Penalty Incurred
                    </span>
                  </div>

                  {/* Root cause classification chip */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                        Classification: Careless Reading Slip
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded">
                        Cognitive Trap
                      </span>
                    </div>
                    <p className="text-xs text-amber-950 font-normal leading-relaxed">
                      You correctly solved the multiplier formula but misread the prompt asking for &ldquo;Change in Savings&rdquo; instead of &ldquo;Change in Income&rdquo;.
                    </p>
                  </div>

                  {/* Pacing telemetry */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-[10px] text-slate-500 font-medium block">Pacing Telemetry</span>
                      <span className="text-xs font-bold text-slate-800">42s (Rushed by 18s)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-[10px] text-slate-500 font-medium block">Option Switch</span>
                      <span className="text-xs font-bold text-rose-600">Option B → Option C (at 57m)</span>
                    </div>
                  </div>

                  {/* NCERT Citation mapping */}
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-900 text-xs font-bold">
                      <BookOpen className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Exact NCERT Rationalized Citation</span>
                    </div>
                    <p className="text-xs text-purple-950 font-normal">
                      NCERT Class 12 Macroeconomics · Chapter 4: <em>Determination of Income and Employment</em>, Page 64, Paragraph 3.
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Preventable leak: +6 marks swing</span>
                    <span className="text-xs font-bold text-purple-700">
                      3 Targeted Drills Ready
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "cutoffs" && (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Target className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">DU CSAS Cutoff Calibrator</h4>
                        <p className="text-[10px] text-slate-500">4-Year Allocation Data (2022–2025)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full">
                      General (UR) Quota
                    </span>
                  </div>

                  {/* Dream Target Card */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950">SRCC · B.Com (Honours)</span>
                      <span className="text-xs font-black text-emerald-800 tabular-nums">782 / 800 (Norm.)</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "94.5%" }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-600">
                        <span>Current Projected: <strong className="text-slate-900">756 / 800</strong></span>
                        <span className="text-rose-700 font-bold">26 Marks Gap (−5 Raw Qs)</span>
                      </div>
                    </div>
                  </div>

                  {/* Other College Cutoff Thresholds */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      North Campus Alternative Matches
                    </span>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <div>
                        <div className="font-bold text-slate-800">Hindu College · B.Com (Hons)</div>
                        <div className="text-[10px] text-slate-500">Cutoff: 775 / 800 (Normalized)</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        86% Safe
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <div>
                        <div className="font-bold text-slate-800">Hansraj College · Economics (Hons)</div>
                        <div className="text-[10px] text-slate-500">Cutoff: 760 / 800 (Normalized)</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        94% Safe Zone
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Calibrated across Round 1, 2, and Spot admission lists</span>
                  </div>
                </div>
              )}

              {activeTab === "pyqs" && (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-indigo-700" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Official Shift Paper Vault</h4>
                        <p className="text-[10px] text-slate-500">251+ Reconstructed NTA Exam Shifts</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                      2022–2025 Shifts
                    </span>
                  </div>

                  {/* Active Shift Paper Card */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">CUET UG 2024 · 24 May Shift 1</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Accountancy (Code 301)
                      </span>
                    </div>

                    {/* KaTeX / Academic rendering snippet */}
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 font-mono text-[11px] text-slate-800 space-y-1">
                      <div className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider">
                        Reconstructed Question Stem
                      </div>
                      <div className="text-slate-800 font-serif">
                        &ldquo;Partners X and Y share profits in 3:2. On admission of Z with 1/5th share, sacrificing ratio calculation: ΔS = 3/5 − 1/2 = 1/10.&rdquo;
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-600">
                      <span className="bg-slate-200/60 px-2 py-0.5 rounded font-medium">50 Compulsory Qs</span>
                      <span className="bg-slate-200/60 px-2 py-0.5 rounded font-medium">Strict 60 Mins</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">100% Educator Verified</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">Full solution walkthrough included</span>
                    <span className="text-xs font-bold text-indigo-600">
                      Standardized CBT Format
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "accelerator" && (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">7-Day Score Accelerator</h4>
                        <p className="text-[10px] text-slate-500">Adaptive Remediation Loop</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                      <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>Day 4 Active · 4-Day Streak</span>
                    </div>
                  </div>

                  {/* Current Drill Module */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50/50 to-amber-50/40 border border-rose-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">High-Yield Deficit Drill #4</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        +18 Raw Marks Projected
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      10 micro-questions on <em>National Income & Multiplier</em> targeting your past 3 diagnostic slips.
                    </p>

                    {/* Progress bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-600">
                        <span>Today&apos;s Drill Completion</span>
                        <span className="text-rose-700 font-bold">8 / 10 Mastered</span>
                      </div>
                      <div className="w-full bg-rose-200/60 rounded-full h-2 overflow-hidden">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Spaced repetition review queue */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Spaced Repetition Review Queue
                    </span>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-700 font-medium text-xs">Question #14 (Deflationary Gap concept)</span>
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded">Re-test in 24h</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-700 font-medium text-xs">Question #29 (Money Creation Formula)</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">Mastered</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Estimated daily time: 12 minutes</span>
                    <span className="text-xs font-bold text-rose-600">
                      Average gain: +22.4 marks
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
