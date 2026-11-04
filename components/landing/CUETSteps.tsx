import React from "react";
import { CheckCircle2, Clock, Brain, Target } from "lucide-react";

export default function CUETSteps() {
  const steps = [
    {
      step: "01",
      title: "Take Full-Length CBT Mock",
      desc: "Sit 50 domain questions under the real 60-minute NTA countdown clock, authentic question palette navigation, and exact +5/−1 marking.",
      bg: "bg-[#E6F7F0]",
      border: "border-emerald-200/80",
      pill: "bg-emerald-600 text-white",
      textColor: "text-emerald-950",
      accentIcon: Clock,
      iconColor: "text-emerald-700",
      tag: "Authentic NTA Engine",
    },
    {
      step: "02",
      title: "Get AI Mistake Diagnosis",
      desc: "Understand exactly why you lost marks. Our diagnostic engine separates careless reading slips from foundational NCERT concept gaps.",
      bg: "bg-[#FEF5DC]",
      border: "border-amber-200/80",
      pill: "bg-amber-600 text-white",
      textColor: "text-amber-950",
      accentIcon: Brain,
      iconColor: "text-amber-700",
      tag: "NCERT Citations & Traps",
    },
    {
      step: "03",
      title: "Close Cutoff Gaps & Rank Up",
      desc: "Work through personalized 10-question repair drills, follow your 7-day score accelerator, and watch your gap to dream college cutoffs shrink.",
      bg: "bg-[#F3EFFE]",
      border: "border-purple-200/80",
      pill: "bg-purple-600 text-white",
      textColor: "text-purple-950",
      accentIcon: Target,
      iconColor: "text-purple-700",
      tag: "Dream College Match",
    },
  ];

  return (
    <section id="steps" className="py-16 md:py-24 bg-[#FAFCFB] px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Everything You Need for Admission Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100/70 px-4 py-1.5 rounded-full border border-emerald-300">
            Target-Driven Preparation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need for<br />
            <span className="text-purple-600">North Campus Admission</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
            Eliminate exam anxiety, master timed negative marking, track chapter mastery, and target verified DU cutoffs all from one unified dashboard.
          </p>
        </div>

        {/* 3 Simple Steps Headline */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your <span className="text-purple-600">Admission Journey</span> in 3 Simple Steps
          </h3>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-[32px] border ${item.bg} ${item.border} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${item.pill} shadow-sm tracking-wider uppercase`}>
                    Step {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/80 border border-slate-200/50 flex items-center justify-center shadow-xs">
                    <item.accentIcon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                </div>
                <h4 className={`text-xl font-bold ${item.textColor} mb-3`}>
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-300/40 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{item.tag}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
