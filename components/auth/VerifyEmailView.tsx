"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  RotateCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Sparkles,
  Inbox,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface VerifyEmailViewProps {
  email: string;
  onBackToSignup?: () => void;
  initialError?: string | null;
  initialMessage?: string | null;
}

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailView({
  email,
  onBackToSignup,
  initialError = null,
  initialMessage = null,
}: VerifyEmailViewProps) {
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [successMessage, setSuccessMessage] = useState<string | null>(initialMessage);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const cleanEmail = email.trim().toLowerCase();

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;

    if (!cleanEmail) {
      setErrorMessage("No email address specified. Please return to signup and try again.");
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Server-side email resend rate limit check (3 per 15 min per combined user/IP)
      try {
        const rcRes = await fetch("/api/auth/rate-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "auth:resend_verification", identifier: cleanEmail }),
        });
        if (rcRes.status === 429) {
          const rcData = await rcRes.json().catch(() => ({}));
          setErrorMessage(rcData.error || "Too many verification emails requested. Please wait 15 minutes before requesting a new link.");
          setIsResending(false);
          return;
        }
      } catch {
        // Proceed gracefully if offline sandbox
      }

      const supabase = createClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const redirectTo = `${origin}/auth/confirm`;

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        const errMsg = error.message.toLowerCase();
        if (errMsg.includes("rate limit") || (error as any).status === 429) {
          setErrorMessage(
            "Rate limit exceeded: Too many emails have been requested. Please wait a few minutes before trying again."
          );
        } else {
          setErrorMessage(error.message || "Failed to resend confirmation link. Please try again.");
        }
        return;
      }

      setSuccessMessage("A fresh confirmation link has been sent to your email address.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred while resending the link.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6 text-center animate-in fade-in duration-300">
      {/* Icon Badge */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Mail className="w-8 h-8 stroke-[2]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Verify your email
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          We have sent a confirmation link to your registered email address. Click the link to activate your candidate account and open your dashboard.
        </p>
      </div>

      {/* Target Email Box */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Inbox className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Registered Email
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate" title={cleanEmail}>
              {cleanEmail || "Your registered email"}
            </p>
          </div>
        </div>

        {onBackToSignup ? (
          <button
            type="button"
            onClick={onBackToSignup}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0 cursor-pointer"
          >
            Change
          </button>
        ) : (
          <Link
            href="/signup"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            Change
          </Link>
        )}
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium flex items-start gap-2.5 text-left animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <p className="flex-1">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium flex items-start gap-2.5 text-left animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <p className="flex-1">{successMessage}</p>
        </div>
      )}

      {/* Primary Actions */}
      <div className="space-y-3 pt-1">
        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Open Gmail</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <p className="text-[11px] text-slate-500">
          Using Outlook, Apple Mail, Yahoo, or another app? You can open your inbox in any email client you normally use.
        </p>
      </div>

      {/* Resend Section */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="text-xs text-slate-500">
          Didn&apos;t receive the email? Check your Spam or Promotions folder, or request a new link.
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
          className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
        >
          {isResending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Sending fresh link...</span>
            </>
          ) : cooldown > 0 ? (
            <>
              <RotateCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Resend available in {cooldown}s</span>
            </>
          ) : (
            <>
              <RotateCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Resend confirmation email</span>
            </>
          )}
        </button>
      </div>

      {/* Back to sign in / signup link */}
      <div className="pt-2">
        {onBackToSignup ? (
          <button
            type="button"
            onClick={onBackToSignup}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to registration</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to sign in</span>
          </Link>
        )}
      </div>
    </div>
  );
}
