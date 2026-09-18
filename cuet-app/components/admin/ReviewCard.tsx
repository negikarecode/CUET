"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Edit3,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ReviewQuestionItem {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  review_status: "pending" | "approved" | "rejected" | "auto_approved";
  confidence_score?: number;
  auto_approve_score?: number;
  model_used?: string;
  flags?: string[];
  review_notes?: string;
  topic?: { id: number; topic_name: string };
  chapter?: { id: number; chapter_name: string; chapter_number: number };
  subject?: { id: number; name: string };
}

interface ReviewCardProps {
  item: ReviewQuestionItem;
  onApprove: (id: number, notes?: string) => Promise<void>;
  onReject: (id: number, reason: string) => Promise<void>;
}

export function ReviewCard({ item, onApprove, onReject }: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [notes, setNotes] = useState("");

  // Editable fields
  const [questionText, setQuestionText] = useState(item.question_text);
  const [optA, setOptA] = useState(item.option_a);
  const [optB, setOptB] = useState(item.option_b);
  const [optC, setOptC] = useState(item.option_c);
  const [optD, setOptD] = useState(item.option_d);
  const [correctOpt, setCorrectOpt] = useState(item.correct_option);
  const [explanation, setExplanation] = useState(item.explanation);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const confidence = item.confidence_score || item.auto_approve_score || 0.88;

  const handleApproveClick = async () => {
    setIsSubmitting(true);
    try {
      await onApprove(item.id, notes || undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectClick = async () => {
    if (!rejectReason.trim()) return;
    setIsSubmitting(true);
    try {
      await onReject(item.id, rejectReason);
    } finally {
      setIsSubmitting(false);
      setRejectMode(false);
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5 transition-all hover:border-slate-300">
      {/* Top badges bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-bold text-slate-700 bg-slate-50">
            {item.subject?.name || "Political Science"}
          </Badge>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-600">
            {item.topic?.topic_name || "Fundamental Rights"}
          </span>
          <Badge
            className={`text-xs font-bold capitalize ${
              item.difficulty === "easy"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : item.difficulty === "medium"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {item.difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Confidence Badge */}
          <Badge
            className={`text-xs font-bold ${
              confidence >= 0.85
                ? "bg-emerald-500/10 text-emerald-800 border-emerald-300"
                : confidence >= 0.7
                ? "bg-amber-500/10 text-amber-800 border-amber-300"
                : "bg-red-500/10 text-red-800 border-red-300"
            }`}
          >
            Confidence: {Math.round(confidence * 100)}%
          </Badge>

          {/* Status */}
          <Badge
            variant={
              item.review_status === "approved" || item.review_status === "auto_approved"
                ? "strong"
                : item.review_status === "rejected"
                ? "critical"
                : "weak"
            }
            className="uppercase text-[10px] font-bold"
          >
            {item.review_status}
          </Badge>
        </div>
      </div>

      {/* Flag warnings if any */}
      {item.flags && item.flags.length > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Flags: {item.flags.join(", ")}</span>
        </div>
      )}

      {/* Question Text & Options */}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Question</label>
            <textarea
              rows={2}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option A</label>
              <input
                type="text"
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option B</label>
              <input
                type="text"
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option C</label>
              <input
                type="text"
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option D</label>
              <input
                type="text"
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Correct Option</label>
              <select
                value={correctOpt}
                onChange={(e) => setCorrectOpt(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs font-bold"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Explanation</label>
              <textarea
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {item.question_text}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { k: "A", text: item.option_a },
              { k: "B", text: item.option_b },
              { k: "C", text: item.option_c },
              { k: "D", text: item.option_d },
            ].map((opt) => (
              <div
                key={opt.k}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                  item.correct_option === opt.k
                    ? "bg-emerald-50/80 border-emerald-400 text-emerald-950 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-[11px]">
                    {opt.k}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {item.correct_option === opt.k && (
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    Correct
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Explanation:</span>
            <p className="leading-relaxed">{item.explanation}</p>
          </div>
        </div>
      )}

      {/* Reject Reason input */}
      {rejectMode && (
        <div className="p-4 bg-red-50/60 border border-red-200 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-red-900">
            Specify Rejection Reason (for AI quality audit):
          </label>
          <input
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g. Ambiguous wording, fact outside NCERT context, duplicate options..."
            className="w-full p-2.5 rounded-xl border border-red-200 text-xs bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRejectMode(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleRejectClick}
              disabled={isSubmitting || !rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold gap-1"
            >
              Confirm Reject
            </Button>
          </div>
        </div>
      )}

      {/* Action Footer */}
      {!rejectMode && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold gap-1 text-slate-600"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Cancel Edit" : "Edit & Approve"}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRejectMode(true)}
              className="border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold gap-1"
            >
              <XCircle className="w-4 h-4 text-red-500" />
              <span>Reject</span>
            </Button>

            <Button
              size="sm"
              onClick={handleApproveClick}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1 shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isEditing ? "Save & Approve" : "Approve"}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
