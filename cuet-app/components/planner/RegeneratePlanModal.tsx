'use client';
import React, { useState } from 'react';
import { RefreshCw, X, Sparkles, AlertCircle } from 'lucide-react';

interface RegeneratePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerated: () => void;
}

export default function RegeneratePlanModal({
  isOpen,
  onClose,
  onRegenerated,
}: RegeneratePlanModalProps) {
  const [reason, setReason] = useState('score_improved');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/planner/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (data.success) {
        onRegenerated();
        onClose();
      }
    } catch (err) {
      console.error('Failed to regenerate plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Rebuild Study Plan?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Rebuilding will recalibrate all future study days based on your current Module 1 weakness scores, new exam date, and chat doubts. Past completed tasks and streak will be preserved!
        </p>

        <div className="space-y-2 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Why are you rebuilding your plan?
          </label>
          {[
            { id: 'score_improved', label: 'My scores improved and I want harder targets' },
            { id: 'nta_date_change', label: 'NTA updated / changed the CUET exam dates' },
            { id: 'missed_sessions', label: 'I missed several sessions and want a fresh realistic plan' },
            { id: 'manual_request', label: 'I changed my daily study hours or subjects' },
          ].map((r) => (
            <label
              key={r.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                reason === r.id
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="regen_reason"
                checked={reason === r.id}
                onChange={() => setReason(r.id)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Rebuilding Plan...' : 'Rebuild Plan Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
