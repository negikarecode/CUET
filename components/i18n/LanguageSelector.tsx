"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  ChevronDown,
  Check,
  Languages,
  Sparkles,
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
        <span className="text-[11px] font-black uppercase tracking-wider text-black/70 flex items-center gap-1">
          <Languages className="w-3.5 h-3.5 text-[#FF5C5C]" />
          <span>{t("viewIn", "View in:")}</span>
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 px-2.5 py-1 text-xs font-black text-black bg-white hover:bg-[#FAF7EE] rounded-md border-2 border-black shadow-[2px_2px_0px_0px_#000] focus:outline-none transition-all cursor-pointer"
            title="Switch Language Medium (13 NTA Official Languages)"
          >
            <span>
              {currentLang.nativeName}{" "}
              <span className="text-[10px] text-black/60 font-semibold">
                ({currentLang.name})
              </span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 max-h-80 overflow-y-auto bg-white rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] z-50 p-1.5">
              <div className="px-2 py-1.5 mb-1 bg-[#FEF3C7] rounded border border-black text-[10px] font-black text-black flex items-center justify-between">
                <span>NTA CUET 13 OFFICIAL MEDIUMS</span>
                <span className="bg-black text-white px-1 py-0.2 rounded text-[9px]">IN-BUILT</span>
              </div>
              <div className="space-y-0.5">
                {CUET_OFFICIAL_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === activeCode;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-all ${
                        isSelected
                          ? "bg-[#D1FAE5] font-black border border-black shadow-[1px_1px_0px_0px_#000]"
                          : "hover:bg-[#FAF7EE] font-bold text-black border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-mono text-[10px] font-bold text-black/50">
                          {lang.shortLabel}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs">
                            {lang.nativeName}
                          </span>
                          <span className="text-[10px] text-black/60">
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
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
          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-black">
            <Globe className="w-4 h-4 text-[#FF5C5C]" />
            <span>NTA CUET Official Language (13 Mediums)</span>
          </div>
          <span className="text-[10px] font-black bg-[#FEF3C7] border border-black px-1.5 py-0.5 rounded">
            {currentLang.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1 bg-white rounded-lg border-2 border-black">
          {CUET_OFFICIAL_LANGUAGES.map((lang) => {
            const isSelected = lang.code === activeCode;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-2.5 py-2 rounded text-xs text-left transition-all ${
                  isSelected
                    ? "bg-[#D1FAE5] font-black border border-black shadow-[1px_1px_0px_0px_#000]"
                    : "hover:bg-[#FAF7EE] font-bold text-black border border-black/10"
                }`}
              >
                <div className="flex flex-col leading-tight">
                  <span className="font-black text-xs">
                    {lang.nativeName}
                  </span>
                  <span className="text-[9px] text-black/60 font-semibold">
                    {lang.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-black stroke-[3] shrink-0" />}
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
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-black bg-[#FAF7EE] hover:bg-[#F3EEDD] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 text-[#FF5C5C] shrink-0" />
            <div className="flex flex-col items-start truncate leading-tight">
              <span className="text-[9px] font-black uppercase text-black/60 tracking-wider">
                {t("examLanguage", "Exam Language")}
              </span>
              <span className="font-black text-xs truncate">
                {currentLang.nativeName}{" "}
                <span className="text-[10px] text-black/60 font-normal">
                  ({currentLang.name})
                </span>
              </span>
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 bottom-full mb-1.5 w-64 max-h-72 overflow-y-auto bg-white rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] z-50 p-1.5">
            <div className="px-2 py-1 mb-1 bg-[#FEF3C7] rounded border border-black text-[9px] font-black text-black">
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
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-all ${
                      isSelected
                        ? "bg-[#D1FAE5] font-black border border-black"
                        : "hover:bg-[#FAF7EE] font-medium text-black"
                    }`}
                  >
                    <span>
                      {lang.nativeName} ({lang.name})
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
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
  // Navbar Variant: Desktop Header Button & Popover
  // =========================================================================
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-black bg-white hover:bg-[#FAF7EE] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer"
        aria-label="Select Language (13 Official CUET Languages)"
        title="Official NTA CUET 13 Languages"
      >
        <Globe className="w-4 h-4 text-[#FF5C5C] stroke-[2.5]" />
        <span className="leading-none">
          {currentLang.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 stroke-[2.5] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 max-h-96 overflow-y-auto bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 mb-2 bg-[#FAF7EE] rounded-lg border border-black flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF5C5C]" />
                <span>NTA CUET 13 Languages</span>
              </div>
              <p className="text-[9px] text-black/60 font-medium">
                In-built native translations for all 13 mediums
              </p>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] border border-black text-[9px] font-black">
              13 Mediums
            </span>
          </div>

          <div className="space-y-1">
            {CUET_OFFICIAL_LANGUAGES.map((lang) => {
              const isSelected = lang.code === activeCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-all ${
                    isSelected
                      ? "bg-[#D1FAE5] font-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                      : "hover:bg-[#FAF7EE] font-bold text-black border-2 border-transparent hover:border-black/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 text-center font-mono text-[10px] font-black text-black/50 bg-black/5 px-1 py-0.5 rounded">
                      {lang.shortLabel}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-black/60 font-medium">
                        {lang.name} • {lang.script}
                      </span>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
