"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Scale,
  X,
  Share2,
  Copy,
  Check,
  Download,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { AICoachStoredReport } from "@/types/ai-coach";
import { ProgressCardRecord, ProgressCardFrozenData } from "@/lib/progress-cards/types";

interface MyReportsClientProps {
  initialReports: AICoachStoredReport[];
}

export default function MyReportsClient({ initialReports }: MyReportsClientProps) {
  const [reports] = useState<AICoachStoredReport[]>(initialReports);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"reports" | "cards">("reports");
  const [compareReportIds, setCompareReportIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, "up" | "down" | null>>(() => {
    const map: Record<string, "up" | "down" | null> = {};
    initialReports.forEach((r) => {
      map[r.id] = r.feedback || null;
    });
    return map;
  });

  // Progress cards state
  const [createdCards, setCreatedCards] = useState<ProgressCardRecord[]>([]);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardDisplayName, setCardDisplayName] = useState("");
  const [cardStudentNote, setCardStudentNote] = useState("");
  const [cardMilestone, setCardMilestone] = useState("CUET UG 2027 Aspirant");
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [cardCreationError, setCardCreationError] = useState<string | null>(null);
  const [createdCardSuccess, setCreatedCardSuccess] = useState<ProgressCardRecord | null>(null);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  // Fetch candidate's progress cards on mount
  useEffect(() => {
    let cancelled = false;
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/progress-cards/list");
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.cards)) {
          setCreatedCards(data.cards);
        }
      } catch (err) {
        console.warn("Failed to load progress cards:", err);
      }
    };
    fetchCards();
    return () => {
      cancelled = true;
    };
  }, []);

  // Extract distinct subjects
  const distinctSubjects = Array.from(new Set(reports.map((r) => r.subject)));

  // Filtered reports
  const filteredReports =
    selectedSubjectFilter === "All"
      ? reports
      : reports.filter(
          (r) => r.subject.toLowerCase() === selectedSubjectFilter.toLowerCase()
        );

  // Toggle selection for comparison
  const handleToggleCompare = (report: AICoachStoredReport) => {
    if (compareReportIds.includes(report.id)) {
      setCompareReportIds(compareReportIds.filter((id) => id !== report.id));
      return;
    }

    if (compareReportIds.length >= 2 && compareReportIds[0]) {
      setCompareReportIds([compareReportIds[0], report.id]);
      return;
    }

    if (compareReportIds.length === 1 && compareReportIds[0]) {
      const firstReport = reports.find((r) => r.id === compareReportIds[0]);
      if (firstReport && firstReport.subject.toLowerCase() !== report.subject.toLowerCase()) {
        setCompareReportIds([report.id]);
        return;
      }
    }

    setCompareReportIds([...compareReportIds, report.id]);
  };

  // Feedback handler
  const handleFeedback = async (reportId: string, vote: "up" | "down") => {
    const current = feedbackMap[reportId];
    const nextVote = current === vote ? null : vote;
    setFeedbackMap((prev) => ({ ...prev, [reportId]: nextVote }));

    try {
      await fetch("/api/ai-coach/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, feedback: nextVote }),
      });
    } catch (err) {
      console.warn("Failed to submit feedback:", err);
    }
  };

  // Reports for comparison
  const reportA = reports.find((r) => r.id === compareReportIds[0]);
  const reportB = reports.find((r) => r.id === compareReportIds[1]);
  const [olderReport, newerReport] =
    reportA && reportB
      ? new Date(reportA.created_at).getTime() <= new Date(reportB.created_at).getTime()
        ? [reportA, reportB]
        : [reportB, reportA]
      : [reportA, reportB];

  // Open Create Card modal
  const handleOpenCreateCardModal = () => {
    setCardCreationError(null);
    setCreatedCardSuccess(null);
    setIsCardModalOpen(true);
  };

  // Create Progress Card
  const handleCreateProgressCard = async () => {
    if (!olderReport || !newerReport) return;
    setIsGeneratingCard(true);
    setCardCreationError(null);

    try {
      const res = await fetch("/api/progress-cards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromReportId: olderReport.id,
          toReportId: newerReport.id,
          displayName: cardDisplayName.trim() || undefined,
          studentNote: cardStudentNote.trim() || undefined,
          milestoneBadge: cardMilestone.trim() || undefined,
          isPublic: true, // Mark public when shared
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.card) {
        setCreatedCardSuccess(data.card);
        setCreatedCards((prev) => [data.card, ...prev.filter((c) => c.id !== data.card.id)]);
      } else {
        setCardCreationError(data.error || "Failed to generate progress card.");
      }
    } catch {
      setCardCreationError("Network error. Please try again.");
    } finally {
      setIsGeneratingCard(false);
    }
  };

  // Toggle Card Public/Private
  const handleToggleCardPublic = async (cardId: string, currentPublic: boolean) => {
    const nextPublic = !currentPublic;
    try {
      const res = await fetch(`/api/progress-cards/${cardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_public: nextPublic }),
      });
      const data = await res.json();
      if (data.success && data.card) {
        setCreatedCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, is_public: nextPublic } : c))
        );
      }
    } catch (err) {
      console.warn("Failed to toggle public state:", err);
    }
  };

  // Delete Card
  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this progress card? Its public link will immediately stop working.")) {
      return;
    }

    try {
      await fetch(`/api/progress-cards/${cardId}`, { method: "DELETE" });
      setCreatedCards((prev) => prev.filter((c) => c.id !== cardId));
    } catch (err) {
      console.warn("Failed to delete card:", err);
    }
  };

  // Copy link
  const handleCopyCardLink = async (cardId: string) => {
    const url = `${window.location.origin}/r/${cardId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedCardId(cardId);
      setTimeout(() => setCopiedCardId(null), 2500);
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Diagnostic & Progress Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My Reports
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Permanent, unlimited archive of your saved diagnostic evaluations. Compare before vs after progress, track verified accuracy gains, and create shareable score cards.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/ai-coach"
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Coach Hub</span>
          </Link>
        </div>
      </div>

      {/* 2. Tabs: Saved Reports vs Shareable Progress Cards */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`pb-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === "reports"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Diagnostic Reports ({reports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cards")}
            className={`pb-2 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "cards"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Shareable Progress Cards ({createdCards.length})</span>
          </button>
        </div>
      </div>

      {/* 3. TAB A: REPORTS ARCHIVE */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          {/* Controls & Subject Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSubjectFilter("All")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubjectFilter === "All"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                All Subjects ({reports.length})
              </button>
              {distinctSubjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubjectFilter(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubjectFilter === sub
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Compare Action Bar */}
            {compareReportIds.length > 0 && (
              <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-200">
                <span className="text-xs font-semibold text-indigo-900">
                  {compareReportIds.length} of 2 selected for comparison
                </span>
                {compareReportIds.length === 2 && (
                  <button
                    type="button"
                    onClick={() => setIsCompareModalOpen(true)}
                    className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Compare Now</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCompareReportIds([])}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Reports Grid */}
          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const isComparing = compareReportIds.includes(report.id);
                const dateStr = new Date(report.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={report.id}
                    className={`p-6 rounded-3xl bg-white border transition-all space-y-4 shadow-xs hover:shadow-md ${
                      isComparing
                        ? "border-indigo-600 ring-2 ring-indigo-600/20"
                        : "border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-900">
                            {report.subject}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {dateStr}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Based on {report.questions_analyzed} questions, generated on {dateStr}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleCompare(report)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                          isComparing
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {isComparing ? "Selected" : "Compare"}
                      </button>
                    </div>

                    {/* Score Snapshot */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Net Score</span>
                        <div className="text-sm font-black text-slate-900">
                          {report.score_snapshot?.netScore ?? report.stats_json.netScore}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Accuracy</span>
                        <div className="text-sm font-black text-slate-900">
                          {report.score_snapshot?.accuracyPercentage ?? report.stats_json.overallAccuracyPercentage}%
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Lost Marks</span>
                        <div className="text-sm font-black text-rose-600">
                          -{report.score_snapshot?.negativeMarksLost ?? report.stats_json.negativeMarksLost}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {report.report_json.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 font-medium">Was helpful:</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback(report.id, "up")}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            feedbackMap[report.id] === "up"
                              ? "bg-emerald-500 text-white border-emerald-600"
                              : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(report.id, "down")}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            feedbackMap[report.id] === "down"
                              ? "bg-rose-500 text-white border-rose-600"
                              : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-slate-400 font-medium">
                        Model: {report.model}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Saved Reports Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                You have not generated any AI Coach reports yet. Complete 150 unique questions to unlock your first diagnostic evaluation.
              </p>
              <Link
                href="/dashboard/ai-coach"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700 transition-colors"
              >
                <span>Go to AI Coach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 4. TAB B: SHAREABLE PROGRESS CARDS */}
      {activeTab === "cards" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Shareable Progress Cards</h2>
              <p className="text-xs text-slate-500">
                Shareable before $\to$ after badges generated from two successive diagnostic reports.
              </p>
            </div>
          </div>

          {createdCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdCards.map((card) => {
                const cardData = card.card_json as ProgressCardFrozenData;
                const isCopied = copiedCardId === card.id;

                return (
                  <div
                    key={card.id}
                    className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                          {card.subject}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleCardPublic(card.id, card.is_public)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                              card.is_public
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                            }`}
                          >
                            {card.is_public ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{card.is_public ? "Public" : "Private"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Accuracy numbers */}
                      <div className="flex items-center justify-center gap-3 py-2">
                        <span className="text-2xl font-black text-slate-400">{cardData.fromAccuracy}%</span>
                        <span className="text-indigo-400 font-bold">→</span>
                        <span className="text-3xl font-black text-emerald-400">{cardData.toAccuracy}%</span>
                        {cardData.showAccuracyGain && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black">
                            +{cardData.accuracyDelta}%
                          </span>
                        )}
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1.5">
                        {cardData.highlights.map((h, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                            <span className="font-semibold truncate">{h.title}</span>
                            <span className="text-indigo-300 font-bold shrink-0">{h.detail}</span>
                          </div>
                        ))}
                      </div>

                      {cardData.studentNote && (
                        <p className="text-xs italic text-indigo-200/80 text-center">
                          &ldquo;{cardData.studentNote}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/r/${card.id}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition-colors"
                        >
                          View Public Page
                        </Link>
                        <a
                          href={`/r/${card.id}/image`}
                          download={`cuetmate-${card.subject.toLowerCase()}-progress.png`}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>PNG Image</span>
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopyCardLink(card.id)}
                          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? "Link Copied" : "Copy Link"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-rose-400/80 hover:text-rose-400 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Progress Cards Created Yet</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Generate 2 or more reports in any subject to create a before $\to$ after shareable progress card.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Compare Two Reports Modal */}
      {isCompareModalOpen && olderReport && newerReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Comparing {olderReport.subject} Evaluations
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delta Highlights */}
            {(() => {
              const accuracyDelta =
                newerReport.stats_json.overallAccuracyPercentage -
                olderReport.stats_json.overallAccuracyPercentage;
              const netScoreDelta =
                newerReport.stats_json.netScore - olderReport.stats_json.netScore;
              const marksLostDelta =
                olderReport.stats_json.negativeMarksLost -
                newerReport.stats_json.negativeMarksLost;

              return (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600">
                      Accuracy Shift
                    </span>
                    <div
                      className={`text-lg sm:text-xl font-black mt-0.5 ${
                        accuracyDelta >= 0 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {accuracyDelta >= 0 ? `+${accuracyDelta}%` : `${accuracyDelta}%`}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600">
                      Net Score Shift
                    </span>
                    <div
                      className={`text-lg sm:text-xl font-black mt-0.5 ${
                        netScoreDelta >= 0 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {netScoreDelta >= 0 ? `+${netScoreDelta}` : `${netScoreDelta}`}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600">
                      Penalty Reduction
                    </span>
                    <div
                      className={`text-lg sm:text-xl font-black mt-0.5 ${
                        marksLostDelta >= 0 ? "text-emerald-700" : "text-slate-700"
                      }`}
                    >
                      {marksLostDelta > 0
                        ? `${marksLostDelta} marks saved`
                        : `${Math.abs(marksLostDelta)} marks delta`}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Earlier Evaluation
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(olderReport.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Based on {olderReport.questions_analyzed} questions
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {olderReport.report_json.summary}
                </p>
                <div className="space-y-1 pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700">Top Leaks:</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    {olderReport.report_json.biggest_leaks.map((l, i) => (
                      <li key={i}>{l.issue}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Latest Evaluation
                  </span>
                  <span className="text-xs text-indigo-500">
                    {new Date(newerReport.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Based on {newerReport.questions_analyzed} questions
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {newerReport.report_json.summary}
                </p>
                <div className="space-y-1 pt-2 border-t border-indigo-100">
                  <span className="text-[11px] font-bold text-indigo-900">Current Leaks:</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    {newerReport.report_json.biggest_leaks.map((l, i) => (
                      <li key={i}>{l.issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Bar inside compare modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleOpenCreateCardModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>Create Shareable Progress Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Create Progress Card Modal */}
      {isCardModalOpen && olderReport && newerReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Create Shareable Progress Card</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCardModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cardCreationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {cardCreationError}
              </div>
            )}

            {createdCardSuccess ? (
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Progress Card Created!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your before $\to$ after card is live. Share it with friends or download the image.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-700">Public Link:</div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-indigo-600 truncate">
                    {window.location.origin}/r/{createdCardSuccess.id}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyCardLink(createdCardSuccess.id)}
                      className="p-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedCardId === createdCardSuccess.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCardId === createdCardSuccess.id ? "Copied!" : "Copy Link"}</span>
                    </button>
                    <a
                      href={`/r/${createdCardSuccess.id}/image`}
                      download={`cuetmate-${createdCardSuccess.subject.toLowerCase()}-card.png`}
                      className="p-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCardModalOpen(false);
                    setIsCompareModalOpen(false);
                    setActiveTab("cards");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                >
                  View All Created Cards
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-900">{olderReport.subject}</span>
                  <span className="text-indigo-700 font-semibold">
                    {olderReport.stats_json.overallAccuracyPercentage}% → {newerReport.stats_json.overallAccuracyPercentage}%
                  </span>
                </div>

                {/* Display Name Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Display Name / Nickname (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="e.g. Aryan or CUET Ranker (Leave blank for anonymous)"
                    value={cardDisplayName}
                    onChange={(e) => setCardDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] text-slate-400">Anonymous by default. Opt-in first name only.</span>
                </div>

                {/* Student Note Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Student Note (Optional, max 60 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Focused on optics formulas & fixed careless errors!"
                    value={cardStudentNote}
                    onChange={(e) => setCardStudentNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Profanity filtered automatically</span>
                    <span>{cardStudentNote.length}/60</span>
                  </div>
                </div>

                {/* Milestone Badge */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Milestone Badge
                  </label>
                  <select
                    value={cardMilestone}
                    onChange={(e) => setCardMilestone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="CUET UG 2027 Aspirant">CUET UG 2027 Aspirant</option>
                    <option value="500+ Questions Solved">500+ Questions Solved</option>
                    <option value="1,000+ Questions Calibrated">1,000+ Questions Calibrated</option>
                    <option value="12-Day Practice Streak">12-Day Practice Streak</option>
                    <option value="Domain Subject Ranker">Domain Subject Ranker</option>
                  </select>
                </div>

                {/* Privacy Guarantee */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 text-center">
                  Your name, phone and email are never sent to the AI
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCardModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isGeneratingCard}
                    onClick={handleCreateProgressCard}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:bg-slate-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isGeneratingCard ? "Generating Card..." : "Create Card & Get Link"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-500">
        Disclaimer: This is diagnostic guidance, not an examination guarantee. Continued timed practice across diverse question archetypes is recommended.
      </div>
    </div>
  );
}
