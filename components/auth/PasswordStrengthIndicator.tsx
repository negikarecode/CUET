"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { getPasswordRequirements } from "@/lib/auth/validation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const reqs = getPasswordRequirements(password);

  const criteria = [
    { label: "At least 8 characters", valid: reqs.minLength },
    { label: "One uppercase letter (A-Z)", valid: reqs.hasUppercase },
    { label: "One lowercase letter (a-z)", valid: reqs.hasLowercase },
    { label: "One number (0-9)", valid: reqs.hasNumber },
  ];

  const validCount = criteria.filter((c) => c.valid).length;
  const strengthPercentage = (validCount / criteria.length) * 100;

  return (
    <div className="mt-2 space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
        <span>Password strength</span>
        <span
          className={`font-semibold ${
            validCount === 4
              ? "text-emerald-600"
              : validCount >= 2
              ? "text-amber-600"
              : "text-rose-600"
          }`}
        >
          {validCount === 4
            ? "Strong"
            : validCount >= 2
            ? "Moderate"
            : "Weak"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            validCount === 4
              ? "bg-emerald-500"
              : validCount >= 2
              ? "bg-amber-500"
              : "bg-rose-500"
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-[11px] transition-colors ${
              item.valid ? "text-emerald-700 font-medium" : "text-slate-500"
            }`}
          >
            {item.valid ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-300 shrink-0" strokeWidth={2} />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
