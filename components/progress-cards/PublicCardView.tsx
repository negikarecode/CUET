"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  Copy,
  Check,
  Download,
  ArrowRight,
} from "lucide-react";
import { ProgressCardRecord, ProgressCardFrozenData } from "@/lib/progress-cards/types";

interface PublicCardViewProps {
  card: ProgressCardRecord;
}

export default function PublicCardView({ card }: PublicCardViewProps) {
  const [copied, setCopied] = useState(false);
  const cardData = card.card_json as ProgressCardFrozenData;
  const displayName = card.display_name || cardData.displayName || "CUET Aspirant";
  const accuracyDelta = cardData.accuracyDelta;
  const showGain = cardData.showAccuracyGain;
  const highlights = (cardData.highlights || []).slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://cuetmate.com/r/${card.id}`;
  const shareText = `Check out my ${cardData.subject} score gain on CUETMate! ${
    showGain ? `+${accuracyDelta}% accuracy increase` : "Significant topic mastery"
  }: ${shareUrl}`;

  // Copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // WhatsApp share
  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank");
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${displayName}'s ${cardData.subject} Score Gain | CUET UG 2027`,
          text: `Check out my ${cardData.subject} progress on CUETMate!`,
          url: shareUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Download image
  const handleDownloadImage = () => {
    const a = document.createElement("a");
    a.href = `/r/${card.id}/image`;
    a.download = `cuetmate-${card.subject.toLowerCase()}-progress-${card.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-indigo-500/20">
            C
          </div>
          <span className="font-black text-xl tracking-tight text-white">CUETMate</span>
        </Link>

        <Link
          href="/signup"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
        >
          <span>Try AI Coach Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Card View */}
      <div className="max-w-xl mx-auto w-full my-8 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
              {cardData.subject} Performance
            </span>
            <div className="flex items-center gap-2">
              {cardData.milestoneBadge && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                  ★ {cardData.milestoneBadge}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
                CUET UG 2027
              </span>
            </div>
          </div>

          {/* Student Name */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-slate-300">{displayName}</h2>
            <div className="text-xs text-slate-500">
              Verified calibration across {cardData.totalQuestionsAnalyzed} questions
            </div>
          </div>

          {/* Accuracy Transition */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
            <div className="text-4xl sm:text-5xl font-black text-slate-400">
              {cardData.fromAccuracy}%
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400">→</div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.3)]">
              {cardData.toAccuracy}%
            </div>
          </div>

          {showGain && (
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-black shadow-lg shadow-emerald-500/20">
                +{accuracyDelta} Points Gain
              </span>
            </div>
          )}

          {/* Highlights */}
          <div className="space-y-2.5 pt-2">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{h.title}</span>
                </div>
                <span className="font-bold text-indigo-300">{h.detail}</span>
              </div>
            ))}
          </div>

          {/* Student Note */}
          {cardData.studentNote && (
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs italic text-center text-indigo-200">
              &ldquo;{cardData.studentNote}&rdquo;
            </div>
          )}

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-500">
            <span>cuetmate.com</span>
            <span>AI Coach Certified</span>
          </div>
        </div>

        {/* Share Buttons Bar */}
        <div className="space-y-3">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
            Share this Progress
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>WhatsApp</span>
            </button>

            {/* Instagram / Download */}
            <button
              type="button"
              onClick={handleDownloadImage}
              className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>

            {/* Web Share API */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <div className="max-w-md mx-auto text-center space-y-2 py-6 border-t border-slate-900 w-full">
        <p className="text-xs text-slate-400">
          Preparing for CUET (UG) 2026/2027? Get your personalized diagnostic coaching report.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
        >
          <span>Create Free Aspirant Account</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
