import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoteBySlug } from "@/lib/notes/store";
import { getTaxonomyTopic } from "@/lib/notes/taxonomy";
import { NoteReader } from "@/components/notes/NoteReader";
import { NoteDocument } from "@/types/notes";
import { ArrowLeft, BookOpen, Clock, Target, ShieldCheck } from "lucide-react";

interface Props {
  params: {
    subject: string;
    slug: string;
  };
}

export function generateMetadata({ params }: Props) {
  const topic = getTaxonomyTopic(params.subject, params.slug);
  if (!topic) return { title: "Topic Notes — CUET-UG" };

  return {
    title: `${topic.title} Notes — ${topic.subjectName} Unit ${topic.unitNumber} | CUET-UG`,
    description: `NCERT-aligned exam revision notes, key formulas, worked examples, and practice MCQs for ${topic.title} in CUET-UG ${topic.subjectName}.`,
  };
}

export default function NoteDetailPage({ params }: Props) {
  const { subject: subjectFolder, slug } = params;

  // 1. Try to load verified saved note from disk
  const note: NoteDocument | null = getNoteBySlug(subjectFolder, slug);

  if (note) {
    return <NoteReader note={note} />;
  }

  // 2. If not on disk, verify against canonical taxonomy
  const topic = getTaxonomyTopic(subjectFolder, slug);
  if (!topic) {
    notFound();
  }

  // 3. Strict Rule 4: Never render generic filler or placeholder notes.
  // Display clean "Notes Coming Soon" with authentic syllabus grounding and practice test CTA.
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/notes?subject=${encodeURIComponent(topic.subjectFolder)}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {topic.subjectName} Notes
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Academic Quality Gate Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Unit {topic.unitNumber}: {topic.unitTitle} • {topic.subjectName}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <BookOpen className="w-4 h-4 text-sky-500" />
              Syllabus & NCERT Scope
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              This topic is currently undergoing rigorous dual-solver mathematical verification and PYQ distractor analysis to ensure 100% data-driven accuracy before release.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={topic.practiceTestUrl || `/dashboard/practice/${topic.subjectFolder}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all"
            >
              <Target className="w-4 h-4" />
              Practice Authentic Shift PYQs Now
            </Link>
            <Link
              href={`/dashboard/notes?subject=${encodeURIComponent(topic.subjectFolder)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Explore Other Topics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
