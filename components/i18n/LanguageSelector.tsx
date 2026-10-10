"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  ChevronDown,
  Check,
  Languages,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { CUET_OFFICIAL_LANGUAGES } from "@/lib/i18n/languages";

interface LanguageSelectorProps {
  variant?: "navbar" | "cbt" | "sidebar" | "mobile";
  className?: string;
}

export default function LanguageSelector({
  variant = "navbar",
  className = "",
}: LanguageSelectorProps) {
  const { language: activeCode, setLanguage, currentLanguage: currentLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    setIsOpen(false);
    if (code === activeCode) return;
    setLanguage(code);
  };

  // =========================================================================
  // CBT Player Variant: Official NTA Style ("View in: [Dropdown]")
  // =========================================================================
  if (variant === "cbt") {
    return (
      <div className={`relative inline-flex items-center gap-1.5 ${className}`} ref={dropdownRef}>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Languages className="w-3.5 h-3.5 text-indigo-600" />
          <span>{t("viewIn", "View in:")}</span>
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/80 shadow-xs focus:outline-none transition-all cursor-pointer"
            title="Switch Language Medium (13 NTA Official Languages)"
          >
            <span>
              {currentLang.nativeName}{" "}
              <span className="text-[10px] text-slate-400 font-normal">
                ({currentLang.name})
              </span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 max-h-80 overflow-y-auto bg-white rounded-2xl border border-slate-200/80 shadow-xl z-50 p-1.5">
              <div className="px-2.5 py-1.5 mb-1 bg-indigo-50/80 rounded-xl border border-indigo-100 text-[10px] font-bold text-indigo-700 flex items-center justify-between">
                <span>NTA CUET 13 OFFICIAL MEDIUMS</span>
                <span className="bg-indigo-600 text-white px-1.5 py-0.5 rounded-full text-[9px]">IN-BUILT</span>
              </div>
              <div className="space-y-0.5">
                {CUET_OFFICIAL_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === activeCode;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-all ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs"
                          : "hover:bg-slate-50 font-medium text-slate-700 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-mono text-[10px] font-semibold text-slate-400">
                          {lang.shortLabel}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold">
                            {lang.nativeName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // Mobile Variant: Embedded Drawer / List
  // =========================================================================
  if (variant === "mobile") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-700">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>NTA CUET Official Language (13 Mediums)</span>
          </div>
          <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-full">
            {currentLang.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1.5 bg-slate-50/70 rounded-2xl border border-slate-200/80">
          {CUET_OFFICIAL_LANGUAGES.map((lang) => {
            const isSelected = lang.code === activeCode;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-all ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs"
                    : "hover:bg-white bg-white/70 font-medium text-slate-700 border border-slate-200/60"
                }`}
              >
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-xs">
                    {lang.nativeName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-normal">
                    {lang.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-indigo-600 stroke-[2.5] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // Sidebar Variant: Compact Dashboard Left Sidebar Item
  // =========================================================================
  if (variant === "sidebar") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/80 shadow-xs transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="flex flex-col items-start truncate leading-tight">
              <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-wider">
                {t("examLanguage", "Exam Language")}
              </span>
              <span className="font-semibold text-xs truncate text-slate-800">
                {currentLang.nativeName}{" "}
                <span className="text-[10px] text-slate-400 font-normal">
                  ({currentLang.name})
                </span>
              </span>
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 bottom-full mb-1.5 w-64 max-h-72 overflow-y-auto bg-white rounded-2xl border border-slate-200/80 shadow-xl z-50 p-1.5">
            <div className="px-2.5 py-1 mb-1 bg-indigo-50/80 rounded-xl border border-indigo-100 text-[9px] font-bold text-indigo-700">
              13 OFFICIAL CUET EXAM LANGUAGES
            </div>
            <div className="space-y-0.5">
              {CUET_OFFICIAL_LANGUAGES.map((lang) => {
                const isSelected = lang.code === activeCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-all ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs"
                        : "hover:bg-slate-50 font-medium text-slate-700"
                    }`}
                  >
                    <span>
                      {lang.nativeName} ({lang.name})
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-indigo-600 stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // Navbar Variant: Header Button & Popover
  // =========================================================================
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] bg-white hover:bg-slate-50 rounded-[8px] border border-[var(--border)] transition-colors cursor-pointer shrink-0"
        aria-label="Select language"
        title="CUET official languages"
      >
        <Globe className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
        <span className="leading-none max-w-[70px] truncate text-[14px]">
          {currentLang.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-[12px] border border-[var(--border)] shadow-[0_8px_24px_rgba(15,23,42,0.12)] z-50 p-2">
          <div className="px-2 py-1.5 mb-1 border-b border-[var(--border)]">
            <span className="text-[12px] font-medium text-[var(--text-secondary)]">
              Exam language
            </span>
          </div>

          <div className="space-y-0.5">
            {CUET_OFFICIAL_LANGUAGES.map((lang) => {
              const isSelected = lang.code === activeCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[8px] text-[14px] text-left transition-colors ${
                    isSelected
                      ? "bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold"
                      : "hover:bg-slate-50 text-[var(--text)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {lang.nativeName}
                    </span>
                    <span className="text-[12px] text-[var(--text-muted)]">
                      ({lang.name})
                    </span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.75} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
