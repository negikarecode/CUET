"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { isPasswordValid } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/client";

interface ResetPasswordViewProps {
  onSuccess?: () => void;
}

export default function ResetPasswordView({ onSuccess }: ResetPasswordViewProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isPasswordValid(newPassword)) {
      setErrorMessage("Please ensure your new password satisfies all security requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter identical passwords.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message || "Failed to update password. Your reset session may have expired.");
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.href = "/dashboard";
        }
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6 space-y-4 animate-in fade-in">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Password Updated!</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Your account credentials have been securely updated. Redirecting to your dashboard...
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs mx-auto">
          <ShieldCheck className="w-6 h-6" strokeWidth={2} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Set New Password
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Create a strong, unique password to secure your CUET AI-Prep account and progress.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span className="font-medium leading-relaxed">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter new strong password"
              className="w-full h-11 pl-10 pr-10 bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 hover:border-slate-300 focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <PasswordStrengthIndicator password={newPassword} />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Re-enter your new password"
              className="w-full h-11 pl-10 pr-10 bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 hover:border-slate-300 focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !newPassword || !confirmPassword}
          className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer
            ${
              isLoading || !newPassword || !confirmPassword
                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 active:scale-[0.99]"
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating password...</span>
            </>
          ) : (
            <>
              <span>Save & Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
