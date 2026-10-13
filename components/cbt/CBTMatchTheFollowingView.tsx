"use client";

import React from "react";
import MathRenderer from "./MathRenderer";

export interface MatchItem {
  id: string; // "A", "B", "I", "II" etc.
  text: string;
}

export interface MatchTheFollowingResult {
  isMatch: boolean;
  intro: string;
  list1Title: string;
  list1Items: MatchItem[];
  list2Title: string;
  list2Items: MatchItem[];
  instruction?: string;
}

/**
 * Parses raw question text to detect and structure Match-the-Following questions.
 * Handles:
 * - Match List-I with List-II
 * - Match Column I with Column II
 * - Items formatted as (A)..(D) and (I)..(IV) either on separate lines or paired lines.
 */
export function parseMatchTheFollowing(raw: string): MatchTheFollowingResult | null {
  if (!raw || typeof raw !== "string") return null;

  // Must mention Match and List or Column
  const hasMatch = /Match\s+(?:List|Column|the\s+following)/i.test(raw);
  if (!hasMatch) return null;

  const hasList1 = /(?:List[\s\-–—]*I|Column[\s\-–—]*[IA])\b/i.test(raw);
  const hasList2 = /(?:List[\s\-–—]*II|Column[\s\-–—]*[IIB])\b/i.test(raw);
  if (!hasList1 || !hasList2) return null;

  const rawLines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (rawLines.length < 3) return null;

  let intro = "";
  let instruction = "";

  const firstLine = rawLines[0];
  if (firstLine && /Match/i.test(firstLine)) {
    intro = firstLine;
  }

  let lines = rawLines.slice(intro ? 1 : 0);
  const lastLine = lines[lines.length - 1];
  if (lastLine && /Choose the correct answer/i.test(lastLine)) {
    instruction = lastLine;
    lines = lines.slice(0, -1);
  }

  const isHeaderLine = (l: string) =>
    /^(?:List|Column)[\s\-–—]*(?:I|II|1|2|A|B)(?:\s*\([^)]+\))?[:\]]?\s*$/i.test(l.trim());

  let list1CustomTitle = "List I";
  let list2CustomTitle = "List II";

  // Filter out divider lines and capture custom titles from headers
  const contentLines: string[] = [];
  for (const line of lines) {
    if (/^[\-\s|—–=]{3,}$/.test(line.trim())) {
      continue;
    }
    const hMatch = line.trim().match(/^(?:List|Column)[\s\-–—]*(I|II|1|2|A|B)(\s*\([^)]+\))?[:\]]?\s*$/i);
    if (hMatch && hMatch[1]) {
      const colNum = hMatch[1].toUpperCase();
      const subtitle = hMatch[2] ? hMatch[2].trim() : "";
      if (colNum === "I" || colNum === "1" || colNum === "A") {
        list1CustomTitle = `List I${subtitle ? " " + subtitle : ""}`;
      } else {
        list2CustomTitle = `List II${subtitle ? " " + subtitle : ""}`;
      }
      continue;
    }
    contentLines.push(line);
  }

  const combinedRegex = /(\([A-D]\)|[A-D]\.)\s*(.*?)\s*\|?\s*(\([IVX]+\)|[IVX]+\.)\s*(.*)/i;
  const singleItemRegex = /^(\([A-D]\)|[A-D]\.|\([IVX]+\)|[IVX]+\.)\s*(.*)/i;

  const list1Items: MatchItem[] = [];
  const list2Items: MatchItem[] = [];

  for (let idx = 0; idx < contentLines.length; idx++) {
    const line = contentLines[idx];
    if (!line) continue;

    const combMatch = line.match(combinedRegex);
    if (combMatch && combMatch[1] && combMatch[2] && combMatch[3] && combMatch[4]) {
      list1Items.push({
        id: combMatch[1].replace(/[().]/g, "").trim().toUpperCase(),
        text: combMatch[2].replace(/[|\s]+$/, "").trim(),
      });
      list2Items.push({
        id: combMatch[3].replace(/[().]/g, "").trim().toUpperCase(),
        text: combMatch[4].replace(/^[|\s]+/, "").trim(),
      });
      continue;
    }

    const singleMatch = line.match(singleItemRegex);
    if (singleMatch && singleMatch[1] && singleMatch[2]) {
      const tag = singleMatch[1].replace(/[().]/g, "").trim().toUpperCase();
      let itemText = singleMatch[2].trim();

      // Collect continuation lines that don't start with an item bullet, header, or divider
      while (idx + 1 < contentLines.length) {
        const nextLine = contentLines[idx + 1];
        if (
          !nextLine ||
          singleItemRegex.test(nextLine) ||
          combinedRegex.test(nextLine) ||
          isHeaderLine(nextLine) ||
          /^[\-\s|—–=]{3,}$/.test(nextLine.trim())
        ) {
          break;
        }
        idx++;
        itemText += " " + nextLine.trim();
      }

      if (/^[A-D]$/.test(tag)) {
        list1Items.push({ id: tag, text: itemText });
      } else {
        list2Items.push({ id: tag, text: itemText });
      }
    }
  }

  if (list1Items.length >= 2 && list2Items.length >= 2) {
    return {
      isMatch: true,
      intro: intro || "Match List-I with List-II",
      list1Title: list1CustomTitle,
      list1Items,
      list2Title: list2CustomTitle,
      list2Items,
      instruction: instruction || "Choose the correct answer from the options given below:",
    };
  }

  return null;
}

interface CBTMatchTheFollowingViewProps {
  data: MatchTheFollowingResult;
  className?: string;
}

export default function CBTMatchTheFollowingView({
  data,
  className = "",
}: CBTMatchTheFollowingViewProps) {
  return (
    <div className={`space-y-4 my-2 ${className}`}>
      {data.intro && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
            <MathRenderer text={data.intro} inline />
          </h4>
        </div>
      )}

      {/* Side-by-side 2-column grid on desktop/tablet, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* List I Column */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {data.list1Title}
            </span>
            <span className="text-[10px] font-medium text-slate-400">Concepts / Terms</span>
          </div>
          <div className="space-y-2">
            {data.list1Items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-2.5 text-xs sm:text-sm text-slate-800"
              >
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs shrink-0 border border-blue-100">
                  ({item.id})
                </span>
                <div className="flex-1 leading-relaxed">
                  <MathRenderer text={item.text} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* List II Column */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {data.list2Title}
            </span>
            <span className="text-[10px] font-medium text-slate-400">Descriptions / Matches</span>
          </div>
          <div className="space-y-2">
            {data.list2Items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-2.5 text-xs sm:text-sm text-slate-800"
              >
                <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0 border border-emerald-100">
                  ({item.id})
                </span>
                <div className="flex-1 leading-relaxed">
                  <MathRenderer text={item.text} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.instruction && (
        <p className="text-xs sm:text-sm font-medium text-slate-600 pt-1">
          <MathRenderer text={data.instruction} inline />
        </p>
      )}
    </div>
  );
}
