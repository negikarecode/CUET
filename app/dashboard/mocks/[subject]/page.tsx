"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, HelpCircle, CheckCircle2, Activity, Landmark } from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import { CUET_SUBJECTS } from "@/lib/data/subjects";

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

export default function SubjectMocksListPage({ params }: SubjectPageProps) {
  const subjectKey = params.subject.toLowerCase();

  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );

  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  const code = metadata?.officialCode ?? subjectConfig?.code ?? "300";

  const durationMinutes =
    code === "322" || code === "306" || code === "319" || code === "301" || code === "309" || code === "308" || code === "501"
      ? 60
      : 45;

  return (
    <div className="w-full min-w-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      {/* Navigation */}
      <div>
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Domain Mock Assessments
        </Link>
      </div>

      {/* Subject Header */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-mono">
                Code {code}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {subjectName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Official NTA CUET UG domain curriculum and assessment specifications.
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exam Duration</p>
              <p className="text-sm font-bold text-slate-800">{durationMinutes} Minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Question Pattern</p>
              <p className="text-sm font-bold text-slate-800">50 Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Marking Scheme</p>
              <p className="text-sm font-bold text-slate-800">+5 Correct / -1 Incorrect</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Preparation Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Recommended Prep Resources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Official PYQ Papers</h3>
              <p className="text-xs text-slate-500 font-medium">
                Practice verified past year question papers from 2022-2025 with authentic NTA answer keys.
              </p>
            </div>
            <Link
              href={`/dashboard/pyqs?subject=${subjectKey}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>Explore PYQs</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-600">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Diagnostic Radar</h3>
              <p className="text-xs text-slate-500 font-medium">
                Analyze your strengths and weaknesses across all syllabus chapters with AI-powered telemetry.
              </p>
            </div>
            <Link
              href={`/dashboard/radar?subject=${subjectKey}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
            >
              <span>View Weakness Radar</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Target College Cutoffs</h3>
              <p className="text-xs text-slate-500 font-medium">
                Benchmark your scores against real admission cutoffs for top universities like DU, BHU, and JNU.
              </p>
            </div>
            <Link
              href="/dashboard/standing"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
            >
              <span>Where Do I Stand</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
