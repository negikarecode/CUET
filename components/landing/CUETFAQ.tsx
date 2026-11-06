"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function CUETFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Are these mock tests strictly based on the latest NTA CUET 2026 syllabus?",
      answer:
        "Yes, 100%. Every mock test, unit practice paper, and past shift exam strictly follows the latest official NTA Information Bulletin. This includes 50 compulsory questions per domain subject with zero internal choice and rationalized Class 12 NCERT curriculum alignment.",
    },
    {
      question: "How does the official CUET negative marking calculation work?",
      answer:
        "You earn +5 marks for every correct response and receive a -1 mark penalty for each incorrect response (-0.25 penalty ratio). Unattempted questions receive 0 marks with zero penalty. Our platform calculates this automatically and generates forensic scorecards.",
    },
    {
      question: "What is included in the Free tier vs the Gold Pass?",
      answer:
        "The Free plan includes 1 past-year shift paper, 3 unit practice tests, 3 full mocks per subject, and diagnostic scoring with baseline percentiles. The Gold Pass unlocks all 251+ reconstructed shift papers, full-length NTA CBT mock test series, granular AI mistake diagnosis, and exact NCERT citations.",
    },
    {
      question: "Can I practice on smartphones and tablets?",
      answer:
        "Yes. While we strongly recommend taking full 60-minute mock tests on a desktop or laptop to replicate NTA-style Computer-Based Test conditions, all practice drills, AI diagnostic explanations, and chapter revisions work seamlessly across modern mobile phones and tablets.",
    },
    {
      question: "How accurate are the dream college cutoff projections?",
      answer:
        "Our cutoffs are built from 4 consecutive years (2022 to 2025) of verified Common Seat Allocation System (CSAS) round allocations across 96 colleges and 48 courses. We factor in your exact subject combination, category reservation, and historical normalized percentile trends.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 md:py-24 bg-[#FAFBFD] px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Frequently Asked Questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything you need to know about CUET preparation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Clear, honest answers about our syllabus coverage, NTA-style simulation, and scoring engine.
          </p>
        </div>

        {/* Accordion List with full WAI-ARIA accessibility */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs transition-all duration-200 overflow-hidden"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-purple-700 focus-visible:outline-2 focus-visible:outline-purple-600 transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      isOpen
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-3"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
