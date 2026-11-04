import React from "react";

export default function CUETStats() {
  const stats = [
    {
      percentage: "98.4%",
      label: "Pacing Accuracy",
      description:
        "Aspirants improve exam pacing and eliminate careless errors within their first 3 full-length diagnostic mocks.",
    },
    {
      percentage: "251+",
      label: "Official Shift Papers",
      description:
        "NTA-style shift-wise question papers (2022–2025) across all 22 domain subjects with step-by-step NCERT verified solutions.",
    },
    {
      percentage: "800 / 800",
      label: "DU Cutoffs (Normalized)",
      description:
        "Forensic marking engine calculates precise raw & normalized cutoffs for top colleges like SRCC, Hindu, St. Stephen's & Miranda House.",
    },
  ];

  return (
    <section id="features" className="py-14 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Exam Analytics &amp; Integrity
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built to support your target percentile
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto">
            Strict adherence to the official NTA Information Bulletin with real-time score calibration.
          </p>
        </div>

        {/* 3 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50/80 transition-colors duration-200 ${
                idx < 2 ? "md:border-r border-slate-200/80" : ""
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2 tabular-nums">
                {stat.percentage}
              </span>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                {stat.label}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-xs">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
