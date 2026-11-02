import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTaxonomySubject, getAllTaxonomySubjects } from "@/lib/notes/taxonomy";
import { hasNote } from "@/lib/notes/store";

interface Props {
  params: {
    subject: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const subject = getTaxonomySubject(params.subject);
  if (!subject) return { title: "Subject Notes | CUET AI-Prep" };
  return {
    title: `${subject.name} Revision Notes & Formulas | CUET AI-Prep`,
    description: `High-yield chapter notes, formulas, and NCERT revision points for CUET UG ${subject.name}. Master core concepts and question shortcuts.`,
  };
}

export function generateStaticParams() {
  const subjects = getAllTaxonomySubjects();
  return subjects.map((s) => ({ subject: s.folder }));
}

export default function SubjectNotesPage({ params }: Props) {
  const subject = getTaxonomySubject(params.subject);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/dashboard/notes"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#C2410C] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Notes Hub
          </Link>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Code {subject.code}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF]">
                  {subject.units.length} Units • {subject.totalTopics} Topics
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {subject.name} Revision Notes
              </h1>
              <p className="text-sm text-slate-500 max-w-xl">
                Structured unit-wise syllabus coverage strictly aligned to NCERT and the official CUET NTA specification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/ai-coach?subject=${subject.folder}`}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                AI Coach
              </Link>
              <Link
                href={`/dashboard/practice`}
                className="px-4 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-xs transition shadow-sm"
              >
                Practice Drills
              </Link>
            </div>
          </div>
        </div>

        {/* Units Accordion / List */}
        <div className="space-y-6">
          {subject.units.map((unit) => (
            <div
              key={unit.unitNumber}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-[#FDF0E6] text-[#C2410C] font-black text-sm flex items-center justify-center border border-[#F6D3AF]">
                    {unit.unitNumber}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {unit.unitTitle}
                  </h2>
                </div>

                <Link
                  href={`/test/practice-${subject.folder}-unit${unit.unitNumber}-test1`}
                  className="text-xs font-semibold text-[#C2410C] hover:text-[#9A3412] hover:underline flex items-center"
                >
                  <span>Practice Unit {unit.unitNumber} Test</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {/* Topics in this unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.topics.map((t) => {
                  const noteExists = hasNote(subject.folder, t.slug);

                  return (
                    <div
                      key={t.slug}
                      className="p-4 rounded-2xl border border-slate-100 bg-[#FAF3EB]/40 hover:bg-[#FAF3EB]/80 transition flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Topic {t.id.split("_t")[1]}
                          </span>
                          {t.isFreePreview && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Free Preview
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {t.title}
                        </h3>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {noteExists ? "10 MCQs • Complete Note" : "Standard Syllabus"}
                        </span>

                        <Link
                          href={`/dashboard/notes/${subject.folder}/${t.slug}`}
                          className="px-3 py-1.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-xs transition shadow-sm"
                        >
                          Read Notes
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
