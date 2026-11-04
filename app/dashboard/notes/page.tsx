import React from "react";
import { getAllTaxonomySubjects } from "@/lib/notes/taxonomy";
import { NotesHubClient } from "./NotesHubClient";

export const metadata = {
  title: "CUET-UG Exam Notes — NCERT-Aligned High-Yield Revision",
  description:
    "Exam-focused, NCERT-aligned revision notes shaped by 13,200+ authentic CUET question patterns across 22 subjects and 155 units.",
};

export default function NotesPage() {
  const subjects = getAllTaxonomySubjects();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-[#18262E] text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 border border-purple-700/60 text-xs font-bold uppercase tracking-wider">
              <span>CUET-UG Revision Notes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Exam-Focused Revision Notes Shaped by 13,200+ PYQs
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              NCERT-aligned, concise, formula-rich notes engineered specifically for how the National Testing Agency tests each topic. Features worked examples, common traps, speed mnemonics, and 10 practice MCQs per topic.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-purple-400">22</span>
                <span className="text-slate-300">Domain & Lang Subjects</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-purple-400">155</span>
                <span className="text-slate-300">Syllabus Units</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-purple-400">191</span>
                <span className="text-slate-300">Curated Topics</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-purple-400">2 Free</span>
                <span className="text-slate-300">Previews per Subject</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client-side Tabs, Search & Subject Grid */}
        <NotesHubClient subjects={subjects} />
      </div>
    </div>
  );
}
