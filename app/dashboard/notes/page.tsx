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
    <div className="min-h-screen bg-[#FFF8F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Hero matching Warm Redesign Espresso Banner */}
        <div className="bg-[#441408] text-white rounded-3xl p-8 border border-[#5A1D0D] shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] text-xs font-bold uppercase tracking-wider">
              <span>CUET-UG Revision Notes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Exam-Focused Revision Notes Shaped by 13,200+ PYQs
            </h1>

            <p className="text-base sm:text-lg text-[#F5EBE1] leading-relaxed">
              NCERT-aligned, concise, formula-rich notes engineered specifically for how the National Testing Agency tests each topic. Features worked examples, common traps, speed mnemonics, and 10 practice MCQs per topic.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-[#FCE7D0]">22</span>
                <span className="text-[#F5EBE1]/80">Domain & Lang Subjects</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-[#FCE7D0]">155</span>
                <span className="text-[#F5EBE1]/80">Syllabus Units</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-[#FCE7D0]">191</span>
                <span className="text-[#F5EBE1]/80">Curated Topics</span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-[#FCE7D0]">2 Free</span>
                <span className="text-[#F5EBE1]/80">Previews per Subject</span>
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
