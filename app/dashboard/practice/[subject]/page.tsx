"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  Layers,
} from "lucide-react";
import practiceManifest from "@/lib/data/practice_test_manifest.json";

interface PageProps {
  params: {
    subject: string;
  };
}

export default function SubjectPracticeDetailPage({ params }: PageProps) {
  const decodedSubject = decodeURIComponent(params.subject).toLowerCase();

  // Find canonical subject data from manifest
  const subjectEntry = useMemo(() => {
    const rawData = (practiceManifest as Record<string, any>)[decodedSubject];
    if (rawData) return { ...rawData, folder: decodedSubject };

    // Try finding by alias or match
    for (const [folder, data] of Object.entries(practiceManifest)) {
      if (
        folder.toLowerCase() === decodedSubject ||
        data.name.toLowerCase() === decodedSubject ||
        data.code === decodedSubject
      ) {
        return { ...data, folder };
      }
    }
    return null;
  }, [decodedSubject]);

  // State to track expanded units
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitNumber]: !prev[unitNumber],
    }));
  };

  const expandAll = () => {
    if (!subjectEntry) return;
    const allExpanded: Record<number, boolean> = {};
    subjectEntry.units.forEach((u: any) => {
      allExpanded[u.unitNumber] = true;
    });
    setExpandedUnits(allExpanded);
  };

  const collapseAll = () => {
    setExpandedUnits({});
  };

  if (!subjectEntry) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Subject Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested subject &quot;{decodedSubject}&quot; is not available in the curriculum manifest.
        </p>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Practice Tests</span>
        </Link>
      </div>
    );
  }

  const { name, folder, units } = subjectEntry;
  const totalTests = units.length * 20;
  const totalQuestions = units.length * 400;

  return (
    <div className="w-full min-w-0 max-w-5xl mx-auto space-y-6">
      {/* Navigation */}
      <div>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Tests Hub</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {name} Unit Practice Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Comprehensive unit-by-unit assessment drills covering all official NTA syllabus chapters with 20 questions each.
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <Layers className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Units</p>
              <p className="text-sm font-bold text-slate-800">{units.length} Units</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tests</p>
              <p className="text-sm font-bold text-slate-800">{totalTests} Tests ({totalQuestions} Qs)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Test Duration</p>
              <p className="text-sm font-bold text-slate-800">25 Mins (20 Qs)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Marking Scheme</p>
              <p className="text-sm font-bold text-slate-800">+5 Correct / -1 Incorrect</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Syllabus Units ({units.length})
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Units Accordion List */}
      <div className="space-y-4">
        {units.map((unit: any) => {
          const isExpanded = !!expandedUnits[unit.unitNumber];

          return (
            <div
              key={unit.unitNumber}
              className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden transition-all"
            >
              {/* Unit Header Bar */}
              <button
                onClick={() => toggleUnit(unit.unitNumber)}
                className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      20 Tests • 400 Questions
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {unit.unitTitle}
                  </h3>
                  {unit.topics && unit.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {unit.topics.slice(0, 4).map((topic: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                      {unit.topics.length > 4 && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 text-slate-400">
                          +{unit.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-2 rounded-xl bg-slate-100 text-slate-500 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Unit Tests Grid (Visible when expanded) */}
              {isExpanded && (
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((testNum) => {
                      const testId = `practice-${folder}-unit${unit.unitNumber}-test${testNum}`;

                      return (
                        <div
                          key={testNum}
                          className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-900">
                                Practice Test {testNum}
                              </span>
                              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                20 Qs
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">
                              25 Mins • +5 / -1
                            </p>
                          </div>

                          <Link
                            href={`/test/${testId}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-2xs transition-all"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Start Test</span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
