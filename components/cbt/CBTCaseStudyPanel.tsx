"use client";

import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import MathRenderer from "./MathRenderer";

interface CBTCaseStudyPanelProps {
  prompt: string;
  questionNumber: number;
}

export interface ParsedPromptResult {
  hasPassage: boolean;
  passageText: string;
  questionStem: string;
  passageTitle?: string;
}

export function parsePassageFromPrompt(rawPrompt: string): ParsedPromptResult {
  if (!rawPrompt) {
    return { hasPassage: false, passageText: "", questionStem: "" };
  }

  const trimmed = rawPrompt.trim();

  // Common patterns for passage-based questions in CUET banks
  const passageIntroRegex =
    /^(Read the following (?:passage|case study|case|excerpt)(?: carefully)?(?: and answer the (?:given )?questions?(?: that follow)?)?[\.\:\n\r]+)/i;

  const match = trimmed.match(passageIntroRegex);

  if (match) {
    const afterIntro = trimmed.slice(match[0].length).trim();
    
    // Look for paragraph separation where the question begins
    // Often separated by two newlines, or lines starting with "Q.", "Question:", or a paragraph ending in a question mark
    const paragraphs = afterIntro.split(/\n\s*\n/);

    if (paragraphs.length >= 2) {
      // The last paragraph is usually the specific question stem
      const questionStem = (paragraphs[paragraphs.length - 1] ?? "").trim();
      const passageText = paragraphs.slice(0, paragraphs.length - 1).join("\n\n").trim();

      return {
        hasPassage: true,
        passageText,
        questionStem,
        passageTitle: match[0].replace(/[\.\:\n\r]+$/, "").trim(),
      };
    }
  }

  return {
    hasPassage: false,
    passageText: "",
    questionStem: trimmed,
  };
}

export default function CBTCaseStudyPanel({
  prompt,
  questionNumber,
}: CBTCaseStudyPanelProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);
  const parsed = parsePassageFromPrompt(prompt);

  if (!parsed.hasPassage) {
    return (
      <div className="text-base sm:text-lg font-bold text-black leading-relaxed font-sans whitespace-pre-line">
        <MathRenderer text={prompt} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Case Study / Reading Passage Container */}
      <div className="border-2 border-black rounded-xl bg-[#FFFDF8] shadow-[3px_3px_0px_0px_#000] overflow-hidden">
        {/* Header Bar with Toggle */}
        <div
          onClick={() => setIsMobileExpanded((prev) => !prev)}
          className="bg-[#FFE5B4] px-4 py-3 border-b-2 border-black flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wide">
              {parsed.passageTitle || "Case Study / Comprehension Passage"}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-black text-black bg-white px-2 py-1 rounded border border-black shadow-[1px_1px_0px_0px_#000]"
          >
            <span>{isMobileExpanded ? "Collapse" : "Expand"}</span>
            {isMobileExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Passage Content Body */}
        {isMobileExpanded && (
          <div className="p-4 sm:p-6 max-h-[300px] sm:max-h-[360px] overflow-y-auto text-sm sm:text-base leading-relaxed text-slate-800 font-serif border-t border-black/10 bg-white/60">
            <MathRenderer text={parsed.passageText} />
          </div>
        )}
      </div>

      {/* Specific Question Stem for Current Question */}
      <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]">
        <div className="inline-block px-2 py-0.5 mb-2 rounded bg-black text-white text-[10px] font-black tracking-wider uppercase">
          Question {questionNumber} Target
        </div>
        <div className="text-base sm:text-lg font-bold text-black leading-relaxed font-sans whitespace-pre-line">
          <MathRenderer text={parsed.questionStem} />
        </div>
      </div>
    </div>
  );
}
