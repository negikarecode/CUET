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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
              <span>CUET-UG Premium Notes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Exam-Focused Revision Notes Shaped by 13,200+ PYQs
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              NCERT-aligned, concise, formula-rich notes engineered specifically for how the National Testing Agency tests each topic. Features worked examples, common traps, speed mnemonics, and 10 practice MCQs per topic.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-slate-900 dark:text-white">22</span>
                <span className="text-slate-500">Domain & Lang Subjects</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-slate-900 dark:text-white">155</span>
                <span className="text-slate-500">Syllabus Units</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-slate-900 dark:text-white">191</span>
                <span className="text-slate-500">Curated Topics</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">2 Free</span>
                <span className="text-slate-500">Previews per Subject</span>
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
