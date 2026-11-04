"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
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
      title: "Authentic NTA CBT Simulation",
      badge: "Standardized Exam Engine",
      dotColor: "bg-purple-600",
      points: [
        "Strict 50 compulsory questions per domain subject with zero internal choice",
        "Authentic 4-color NTA question palette (Answered, Not Answered, Marked for Review)",
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

  return (
    <section id="curriculum" className="py-16 md:py-24 bg-gradient-to-b from-[#F0FAF7] via-white to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-[36px] shadow-xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 transition-all">
          {/* Top Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-slate-100">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.dot}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-700 group"
                >
                  Try in Interactive Dashboard{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Detailed Narrative Box */}
            <div className="lg:col-span-6 bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Academic Engineering
              </span>
              {current.paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
