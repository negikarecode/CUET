"use client";

import React, { useState } from "react";
import MeditatingMascot from "./illustrations/MeditatingMascot";
import { ArrowRight, Clock, X } from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  content: string;
  accent: string;
  icon: string;
}

export default function CUETArticles() {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const featuredArticle: ArticleItem = {
    id: "negative-marking",
    title: "How to Score 200/200 in Domain Subjects Without Negative Marking Traps",
    summary:
      "Understand the strict mathematical risk-to-reward ratio of CUET's +5/−1 marking scheme and why skipping uncertain guesses protects your percentile.",
    readTime: "4 min read",
    category: "Exam Strategy",
    accent: "bg-purple-100 text-purple-700",
    icon: "🎯",
    content: `
In CUET UG, raw scores translate directly into normalized percentiles where a difference of just 2 marks can determine whether you secure SRCC or an off-campus college.

### The Penalty Mathematics (+5 / −1)
Every incorrect guess incurs a -1 mark deduction from your score, whereas an unattempted question incurs exactly 0 penalty. 
- 5 wrong answers forfeit **25 potential marks + 5 penalty marks = 30 marks lost**!
- If your confidence on an option is below 60%, leaving the question unattempted preserves your baseline score.

### The 3-Pass Solving Framework:
1. **Pass 1 (0 to 25 mins)**: Answer only the 25–30 direct recall and formula-based questions where your confidence is 100%. Lock in +150 raw marks immediately.
2. **Pass 2 (25 to 50 mins)**: Tackle multi-step numericals, statement-assertion pairs, and case studies requiring deeper calculation.
3. **Pass 3 (Last 10 mins)**: Forensic review. Verify marked questions and **never change an answer in the final 2 minutes** unless you spotted a blatant arithmetic mistake.
    `,
  };

  const articleList: ArticleItem[] = [
    {
      id: "three-pass-rule",
      title: "The 3-Pass Rule for 50-Question NTA Papers",
      summary:
        "Master the 60-minute countdown clock by categorizing questions into immediate locks, calculated solves, and high-risk traps.",
      readTime: "3 min read",
      category: "Pacing",
      accent: "bg-emerald-100 text-emerald-700",
      icon: "⏱️",
      content: `
Time allocation is the number one differentiator between a 95 percentile and a 100 percentile score.

Candidates who get stuck on question #12 often find that questions #45 through #50 were simple 10-second factual lookups that they never had time to read.

Always scroll through all 50 questions within the first 60 seconds to identify the easiest low-hanging fruit.
      `,
    },
    {
      id: "ncert-weightage",
      title: "High-Weightage Chapters in Rationalized Class 12 NCERT",
      summary:
        "Focus your final revision cycles on the 30% of chapters that consistently generate over 65% of NTA examination questions.",
      readTime: "5 min read",
      category: "Syllabus",
      accent: "bg-indigo-100 text-indigo-700",
      icon: "📚",
      content: `
NTA strictly restricts the CUET UG domain syllabus to rationalized Class 12 NCERT textbooks:
- **Economics**: National Income Accounting, Determination of Income & Employment, and Government Budget.
- **Accountancy**: Accounting for Partnership Firms, Share Capital, and Cash Flow Statements.
- **Physics**: Electrostatics, Current Electricity, and Optics.
- **Mathematics**: Definite Integrals, Matrices, and Differential Equations.

Mastering NCERT summary tables, solved examples, and end-of-chapter exemplar problems guarantees high accuracy.
      `,
    },
    {
      id: "du-combinations",
      title: "How to Choose CUET Domain Combinations for Delhi University",
      summary:
        "Optimize your subject combination to qualify for multiple high-demand undergraduate honors programs simultaneously.",
      readTime: "3 min read",
      category: "Cutoffs",
      accent: "bg-amber-100 text-amber-700",
      icon: "🏛️",
      content: `
Delhi University admissions require specific combinations depending on the degree:
- **B.Com (Hons)**: Any 1 Language from Section IA + Mathematics/Applied Mathematics OR Accountancy/Book Keeping + Any 2 Domain subjects.
- **B.A. (Hons) Economics**: Any 1 Language + Mathematics (Compulsory) + Any 2 Domain subjects.
- **B.Sc (Hons) Sciences**: Physics + Chemistry + Mathematics/Biology (Calculated out of 600 instead of 800).

Selecting the optimal domain subject combination maximizes your eligibility across multiple faculties without increasing testing fatigue.
      `,
    },
  ];

  return (
    <section id="articles" className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200">
            Admissions Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Daily <span className="text-purple-600">Insights</span> for Higher<br />
            CUET Percentiles
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto">
            Practical strategies, exam pacing frameworks, and NCERT revision blueprints distilled from past 100-percentile toppers.
          </p>
        </div>

        {/* Articles Layout: Featured Card on Left + 3 Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Card (Left - 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-purple-50/80 via-white to-amber-50/50 rounded-[32px] p-6 sm:p-8 border border-purple-100/80 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${featuredArticle.accent}`}>
                  {featuredArticle.category}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-600" /> {featuredArticle.readTime}
                </span>
              </div>

              {/* Meditating / Study Mascot */}
              <div className="mb-6">
                <MeditatingMascot />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-3">
                {featuredArticle.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {featuredArticle.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveArticle(featuredArticle)}
              className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-700 group pt-2 border-t border-purple-100"
            >
              Read Strategy Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Articles List (Right - 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {articleList.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${article.accent}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-600" /> {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-purple-600 group-hover:text-white text-slate-500 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-Page Article Reading Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white rounded-[36px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 select-none animate-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Close article modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeArticle.accent}`}>
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-4">
                {activeArticle.title}
              </h3>

              <div className="prose prose-slate prose-sm text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line border-t border-slate-100 pt-4">
                {activeArticle.content}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
