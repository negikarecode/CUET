"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useTestStore } from "@/lib/store/useTestStore";
import { CUET_SUBJECTS } from "@/lib/data/subjects";
import { SUBJECT_TO_PYQ } from "@/lib/data/subjects";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { FileText, Lock, ArrowRight } from "lucide-react";

// Available PYQ tests metadata
const PYQ_TESTS: Record<
  string,
  { title: string; subject: string; code: string; testId: string; subjectSlug: string; duration: string; questions: number; year: string }
> = {
  "physics-pyq": { title: "CUET UG 2024 Physics (Shift 1 Official CBT)", subject: "Physics", code: "312", testId: "physics-pyq", subjectSlug: "physics", duration: "60 Minutes", questions: 50, year: "2024" },
  "chemistry-pyq": { title: "CUET UG 2024 Chemistry (Shift 1 Official CBT)", subject: "Chemistry", code: "306", testId: "chemistry-pyq", subjectSlug: "chemistry", duration: "60 Minutes", questions: 50, year: "2024" },
  "math-sci-pyq": { title: "CUET UG 2024 Mathematics (Shift 1 Official CBT)", subject: "Mathematics", code: "319", testId: "math-sci-pyq", subjectSlug: "mathematics", duration: "60 Minutes", questions: 50, year: "2024" },
  "biology-pyq": { title: "CUET UG 2024 Biology (Shift 1 Official CBT)", subject: "Biology", code: "304", testId: "biology-pyq", subjectSlug: "biology", duration: "45 Minutes", questions: 50, year: "2024" },
  "accountancy-pyq": { title: "CUET UG 2024 Accountancy (Shift 1 Official CBT)", subject: "Accountancy", code: "301", testId: "accountancy-pyq", subjectSlug: "accountancy", duration: "60 Minutes", questions: 50, year: "2024" },
  "business-pyq": { title: "CUET UG 2024 Business Studies (Shift 1 Official CBT)", subject: "Business Studies", code: "305", testId: "business-pyq", subjectSlug: "business-studies", duration: "45 Minutes", questions: 50, year: "2024" },
  "eco-pyq": { title: "CUET UG 2024 Economics (Shift 1 Official CBT)", subject: "Economics", code: "309", testId: "eco-pyq", subjectSlug: "economics", duration: "60 Minutes", questions: 50, year: "2024" },
  "history-pyq": { title: "CUET UG 2024 History (Shift 1 Official CBT)", subject: "History", code: "314", testId: "history-pyq", subjectSlug: "history", duration: "45 Minutes", questions: 50, year: "2024" },
  "pol-science-pyq": { title: "CUET UG 2024 Political Science (Shift 1 Official CBT)", subject: "Political Science", code: "323", testId: "pol-science-pyq", subjectSlug: "political-science", duration: "45 Minutes", questions: 50, year: "2024" },
  "geo-pyq": { title: "CUET UG 2024 Geography (Shift 1 Official CBT)", subject: "Geography", code: "313", testId: "geo-pyq", subjectSlug: "geography", duration: "45 Minutes", questions: 50, year: "2024" },
  "psychology-pyq": { title: "CUET UG 2024 Psychology (Shift 1 Official CBT)", subject: "Psychology", code: "324", testId: "psychology-pyq", subjectSlug: "psychology", duration: "45 Minutes", questions: 50, year: "2024" },
};

export default function PYQsPage() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);

  // Wrap selectedSubjects in useMemo to maintain referential stability
  const selectedSubjects = useMemo(() => {
    return user?.selectedSubjects || [];
  }, [user?.selectedSubjects]);

  // Get available PYQ tests for selected subjects (or all live PYQ tests if none selected)
  const availablePYQs = useMemo(() => {
    if (selectedSubjects.length === 0) {
      return Object.values(PYQ_TESTS);
    }
    const pyqs: typeof PYQ_TESTS = {};
    selectedSubjects.forEach((subjectId) => {
      const pyqId = SUBJECT_TO_PYQ[subjectId];
      if (pyqId && PYQ_TESTS[pyqId]) {
        pyqs[pyqId] = PYQ_TESTS[pyqId];
      }
    });
    const result = Object.values(pyqs);
    return result.length > 0 ? result : Object.values(PYQ_TESTS);
  }, [selectedSubjects]);

  // Get subject configs for selected subjects to show additional info
  const selectedSubjectDetails = useMemo(() => {
    return CUET_SUBJECTS.filter((s) => selectedSubjects.includes(s.id));
  }, [selectedSubjects]);

  if (!isClient) {
    return <div className="min-h-screen bg-[#FAF7EE]" />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-black flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF5C5C] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <FileText className="w-5 h-5" />
            </div>
            Previous Year Questions (PYQ)
          </h1>
          <p className="text-black/60 font-bold text-lg">
            Master official CUET exam questions with detailed solutions
          </p>
        </div>

        {/* Selected Subjects Banner or All Domains Banner */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <p className="text-sm font-black text-black/60 uppercase">
              {selectedSubjectDetails.length > 0
                ? `Your Target Domain Subjects (${selectedSubjectDetails.length})`
                : "All Official CUET UG Domain PYQ Papers (11 Domains Live)"}
            </p>
            {selectedSubjectDetails.length === 0 && (
              <span className="text-xs font-bold text-black/60 bg-white px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
                Select your stream in settings to customize
              </span>
            )}
          </div>
          {selectedSubjectDetails.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
              {selectedSubjectDetails.map((subject) => (
                <div
                  key={subject.id}
                  className="px-3 py-2 bg-white rounded-lg border-2 border-black text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000]"
                >
                  {subject.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available PYQ Tests Grid */}
        <div>
          <p className="text-sm font-black text-black/60 uppercase mb-4">
            Official CUET NTA CBT Examination Papers ({availablePYQs.length} Live)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePYQs.map((pyq) => (
              <Link
                key={pyq.testId}
                href={`/dashboard/pyqs/${pyq.subjectSlug}`}
                className="group"
              >
                <div className="h-full bg-white rounded-xl border-2 border-black p-5 shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 cursor-pointer flex flex-col justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase bg-[#FEF3C7] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        {pyq.subject} • Code {pyq.code}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        {pyq.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-black leading-tight">
                      {pyq.title}
                    </h3>
                    <p className="text-xs font-bold text-black/60">
                      {pyq.questions} Official Questions • {pyq.duration} • NTA CBT Format
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-3 border-t border-black/10">
                    <div className="flex items-center gap-2 text-[#FF5C5C] font-black text-sm group-hover:gap-3 transition-all">
                      <span>Access Official Papers</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

            {/* Coming Soon Section */}
            <div className="mt-12 pt-8 border-t-2 border-black/20">
              <h2 className="text-2xl font-black text-black mb-6">
                Additional PYQ Tests (Coming Soon)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Physics",
                    code: "312",
                    desc: "50 Official Physics PYQ Questions",
                  },
                  {
                    name: "Chemistry",
                    code: "306",
                    desc: "50 Official Chemistry PYQ Questions",
                  },
                  {
                    name: "Biology",
                    code: "304",
                    desc: "50 Official Biology PYQ Questions",
                  },
                  {
                    name: "Mathematics",
                    code: "319",
                    desc: "50 Official Mathematics PYQ Questions",
                  },
                  {
                    name: "English",
                    code: "101",
                    desc: "50 Official English PYQ Questions",
                  },
                  {
                    name: "Accountancy",
                    code: "301",
                    desc: "50 Official Accountancy PYQ Questions",
                  },
                ].map((test) => (
                  <div
                    key={test.code}
                    className="bg-white rounded-xl border-2 border-dashed border-black/30 p-5 opacity-60"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-black text-black/80">
                          {test.name}
                        </h3>
                        <p className="text-xs font-bold text-black/50">
                          Code: {test.code}
                        </p>
                      </div>
                      <Lock className="w-5 h-5 text-black/30" />
                    </div>
                    <p className="text-sm font-bold text-black/50">{test.desc}</p>
                  </div>
                ))}
              </div>
            </div>
      </div>
    </div>
  );
}
