"use client";

import React, { useState, useEffect, useCallback } from "react";

import {
  ShieldCheck,
  CheckCircle2,
  Filter,
  RefreshCw,
  Sparkles,
  Inbox,
  AlertCircle,
} from "lucide-react";
import { ReviewCard, ReviewQuestionItem } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { SEED_SUBJECTS } from "@/lib/data-store";

export function ReviewQueue() {
  const [items, setItems] = useState<ReviewQuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      params.set("status", statusFilter);
      if (subjectFilter !== "all") params.set("subject_id", subjectFilter);
      if (difficultyFilter !== "all") params.set("difficulty", difficultyFilter);

      const res = await fetch(`/api/review/queue?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
        setTotalPages(json.pagination?.totalPages || 1);
        setTotalCount(json.pagination?.totalCount || 0);
      }
    } catch (err) {
      console.error("Fetch queue error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, subjectFilter, difficultyFilter]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = async (id: number, notes?: string) => {
    try {
      const res = await fetch("/api/review/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: id, review_notes: notes }),
      });
      if (res.ok) {
        showToast(`Question #${id} approved!`);
        fetchQueue();
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      const res = await fetch("/api/review/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: id, rejection_reason: reason }),
      });
      if (res.ok) {
        showToast(`Question #${id} rejected.`);
        fetchQueue();
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleBulkApproveHighConfidence = async () => {
    const highConfidenceItems = items.filter(
      (item) => (item.confidence_score || 0.9) >= 0.85 && (!item.flags || item.flags.length === 0)
    );

    if (highConfidenceItems.length === 0) {
      showToast("No high-confidence questions found to bulk approve.");
      return;
    }

    setBulkProcessing(true);
    try {
      await Promise.all(
        highConfidenceItems.map((item) =>
          fetch("/api/review/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question_id: item.id,
              review_notes: "Bulk approved (high confidence >= 0.85)",
            }),
          })
        )
      );
      showToast(`Bulk approved ${highConfidenceItems.length} questions!`);
      fetchQueue();
    } finally {
      setBulkProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <ShieldCheck className="w-4 h-4" />
            <span>SME Editorial Control</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">
            AI Question Review Queue ({totalCount})
          </h2>
          <p className="text-xs text-slate-500">
            Audit AI-generated questions before they are promoted to the live student question bank.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchQueue}
            className="text-xs font-semibold gap-1.5 h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>

          <Button
            size="sm"
            disabled={bulkProcessing || items.length === 0}
            onClick={handleBulkApproveHighConfidence}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5 h-9"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Bulk Approve (90%+ Confidence)
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-xl text-center animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
        <span className="font-bold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </span>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="p-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700"
        >
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="auto_approved">Auto Approved</option>
          <option value="all">All Statuses</option>
        </select>

        {/* Subject */}
        <select
          value={subjectFilter}
          onChange={(e) => {
            setSubjectFilter(e.target.value);
            setPage(1);
          }}
          className="p-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700"
        >
          <option value="all">All Subjects</option>
          {SEED_SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          value={difficultyFilter}
          onChange={(e) => {
            setDifficultyFilter(e.target.value);
            setPage(1);
          }}
          className="p-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Queue List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-48 bg-slate-100 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 bg-white border border-slate-200 rounded-3xl text-center space-y-3">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No questions pending review
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All AI-generated questions have been reviewed or matched filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <ReviewCard
              key={item.id}
              item={item}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl">
          <span className="text-xs text-slate-500 font-medium">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-xs"
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
