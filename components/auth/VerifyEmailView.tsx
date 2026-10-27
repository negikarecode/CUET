"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Pencil,
  Check,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { parseAuthError } from "@/lib/auth/emailErrorHandler";
import { validateEmail } from "@/lib/auth/validation";
import { getAuthCallbackUrl } from "@/lib/auth/urls";

interface VerifyEmailViewProps {
  email: string;
  onBackToSignup?: () => void;
  onEmailChange?: (newEmail: string) => void;
  initialError?: string | null;
  initialMessage?: string | null;
}

export default function VerifyEmailView({
  email,
  onBackToSignup,
  onEmailChange,
  initialError = null,
  initialMessage = null,
}: VerifyEmailViewProps) {
  const [targetEmail, setTargetEmail] = useState(email.trim().toLowerCase());
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [successMessage, setSuccessMessage] = useState<string | null>(initialMessage);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editInput, setEditInput] = useState(email.trim().toLowerCase());

  // Concurrency-safe in-flight lock to prevent double clicks
  const isResendingRef = useRef(false);

  // Sync prop changes
  useEffect(() => {
    const clean = email.trim().toLowerCase();
    setTargetEmail(clean);
    setEditInput(clean);
  }, [email]);

  // Cooldown countdown (only active if provider throttling occurs)
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const cleanEmail = targetEmail.trim().toLowerCase();

  const handleResend = async () => {
    // Drop rapid repeated clicks or requests during active provider cooldown
    if (cooldown > 0 || isResending || isResendingRef.current) return;

    if (!cleanEmail) {
      setErrorMessage("No email address specified. Please return to signup and try again.");
      return;
    }

    isResendingRef.current = true;
    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setErrorMessage("You appear to be offline. Please check your internet connection.");
        return;
      }

      const supabase = createClient();
      const redirectTo = getAuthCallbackUrl("/dashboard");

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        const parsed = parseAuthError(error);
        setErrorMessage(parsed.message);

        // Apply provider cooldown only if reported by Supabase Auth
        if (parsed.isRateLimit && parsed.recommendedCooldownSeconds) {
          setCooldown(parsed.recommendedCooldownSeconds);
        }
        return;
      }

      setSuccessMessage("A fresh confirmation link has been sent to your email address.");
    } catch (err: any) {
      const parsed = parseAuthError(err);
      setErrorMessage(parsed.message);
    } finally {
      isResendingRef.current = false;
      setIsResending(false);
    }
  };

  const handleSaveEditedEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = editInput.trim().toLowerCase();
    if (!validateEmail(clean)) {
      setErrorMessage("Please enter a valid, deliverable email address.");
      return;
    }
    setTargetEmail(clean);
    setIsEditingEmail(false);
    setErrorMessage(null);
    setSuccessMessage(`Email address updated to ${clean}. You can now send a confirmation link to this address.`);
    setCooldown(0); // Allow immediate resend to the corrected address
    if (onEmailChange) {
      onEmailChange(clean);
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
          We sent a verification link to your email. Click the link to activate your candidate account and unlock your dashboard.
        </p>
      </div>

      {/* Target Email Box with Inline Edit Option */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left transition-all">
        {isEditingEmail ? (
          <form onSubmit={handleSaveEditedEmail} className="space-y-2.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Correct Your Email Address
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                placeholder="yourname@gmail.com"
                className="flex-1 px-3 py-1.5 rounded-xl border border-blue-500 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                autoFocus
                required
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer"
                title="Save corrected email"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditInput(cleanEmail);
                  setIsEditingEmail(false);
                }}
                className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 transition-all cursor-pointer"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Need to fix your name, college, or stream instead?{" "}
              {onBackToSignup && (
                <button
                  type="button"
                  onClick={onBackToSignup}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Return to registration
                </button>
              )}
            </p>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-3">
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

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditingEmail(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                title="Fix a typo in your email"
              >
                <Pencil className="w-3 h-3" />
                <span>Fix typo</span>
              </button>
              {onBackToSignup && (
                <>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={onBackToSignup}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                    title="Change all registration details"
                  >
                    Edit details
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium flex items-start gap-2.5 text-left animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <p className="flex-1 leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium flex items-start gap-2.5 text-left animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <p className="flex-1 leading-relaxed">{successMessage}</p>
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
          Tip: Look for an email from <strong>CUET AI-Prep</strong> or <strong>Supabase</strong>. Be sure to check your <strong>Spam</strong> or <strong>Promotions</strong> folder.
        </p>
      </div>

      {/* Resend Section */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="text-xs text-slate-500">
          Didn&apos;t receive the link after 1-2 minutes? You can request a fresh one below.
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

        {cooldown > 0 && (
          <p className="text-[10px] text-slate-400">
            Please wait for the timer to finish before requesting another link.
          </p>
        )}
      </div>

      {/* Return to signup / back to login links */}
      <div className="pt-2 flex items-center justify-center gap-4 text-xs">
        {onBackToSignup && (
          <button
            type="button"
            onClick={onBackToSignup}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to registration</span>
          </button>
        )}

        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          <span>Already verified? Sign in</span>
        </Link>
      </div>
    </div>
  );
}
