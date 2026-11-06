"use client";

import React, { useState } from "react";
import { Flag, X, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

interface QuestionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionNumber?: number | string;
  testId?: string;
  onReportSubmitted?: () => void;
}

const REPORT_REASONS = [
  { value: "wrong_answer", label: "Wrong answer key / incorrect marked option" },
  { value: "ambiguous_question", label: "Ambiguous question wording or confusing options" },
  { value: "factual_error", label: "Factual error or incorrect formula in explanation" },
  { value: "out_of_syllabus", label: "Question is out of current CUET UG / NCERT syllabus" },
  { value: "formatting_or_typo", label: "Typo, grammatical mistake, or broken formatting" },
  { value: "other", label: "Other issue" },
] as const;

export default function QuestionReportModal({
  isOpen,
  onClose,
  questionId,
  questionNumber,
  testId,
  onReportSubmitted,
}: QuestionReportModalProps) {
  const [reason, setReason] = useState<string>("wrong_answer");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/questions/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          testId,
          reportReason: reason,
          comment: comment.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit question report.");
      }

      setSuccess(true);
      if (onReportSubmitted) {
        onReportSubmitted();
      }
      setTimeout(() => {
        setSuccess(false);
        setComment("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <Flag className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Report Question Issue {questionNumber ? `(Q${questionNumber})` : ""}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Academic Audit &amp; NCERT Content Quality Review
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Report Received</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thank you for keeping CUET practice accurate. Our subject team will review this question and verify it against NCERT sources.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                What is the problem with this question?
              </label>
              <div className="space-y-2">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r.value}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      reason === r.value
                        ? "bg-purple-50/70 border-purple-300 text-purple-950 font-semibold"
                        : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r.value}
                      checked={reason === r.value}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-0.5 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-xs leading-snug">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Additional context or textbook reference (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                placeholder="e.g. NCERT Class 12 Chemistry, Chapter 4 states rate constant units are s⁻¹ for first order..."
                className="w-full h-20 p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
              />
              <span className="text-[10px] text-slate-400 block text-right">
                {comment.length} / 1000 characters
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium text-[11px]">{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-[#18262E] hover:bg-purple-700 text-white font-bold transition-all shadow-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Report</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
