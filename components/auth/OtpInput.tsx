"use client";

import React, { useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { sanitizeOtp } from "@/lib/auth/validation";

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  autoFocus?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  onComplete,
  disabled = false,
  hasError = false,
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of 6 characters
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  useEffect(() => {
    if (autoFocus && !disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleInputChange = (index: number, char: string) => {
    const cleanChar = char.replace(/[^0-9]/g, "").slice(-1); // Take latest single digit
    const newDigits = [...digits];
    newDigits[index] = cleanChar;
    const newOtp = newDigits.join("");
    onChange(newOtp);

    // If entered a digit, advance focus to next input
    if (cleanChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, notify completion
    if (newOtp.length === 6 && onComplete) {
      onComplete(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const sanitized = sanitizeOtp(pastedText);

    if (sanitized) {
      onChange(sanitized);
      const focusIndex = Math.min(sanitized.length, 5);
      inputRefs.current[focusIndex]?.focus();

      if (sanitized.length === 6 && onComplete) {
        onComplete(sanitized);
      }
    }
  };

  return (
    <div
      role="group"
      aria-label="Six-digit verification code"
      className="flex items-center justify-center gap-2 sm:gap-3"
    >
      {digits.map((digit, index) => {
        const isFilled = Boolean(digit);
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            value={digit}
            disabled={disabled}
            aria-label={`Verification code digit ${index + 1} of 6`}
            aria-invalid={hasError}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono rounded-xl border transition-all duration-150 select-none
              ${
                disabled
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : hasError
                  ? "bg-rose-50/50 text-rose-900 border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15"
                  : isFilled
                  ? "bg-blue-50/40 text-blue-900 border-blue-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15"
                  : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15"
              }
              focus:outline-hidden
            `}
          />
        );
      })}
    </div>
  );
}
