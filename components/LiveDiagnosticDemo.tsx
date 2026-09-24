"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Brain,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LatexRenderer from "@/components/common/LatexRenderer";

interface OptionBreakdown {
  id: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
  slipPercentage?: number;
  explanation: string;
  trapType?: string;
  ncertReference: string;
}

interface DemoQuestion {
  streamId: "physics" | "accounts" | "humanities";
  streamLabel: string;
  subject: string;
  topic: string;
  chapter: string;
  questionNumber: number;
  prompt: string;
  options: OptionBreakdown[];
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    streamId: "physics",
    streamLabel: "Physics (Science)",
    subject: "Physics",
    topic: "Equilibrium of Collinear Charges",
    chapter: "Electrostatics (NCERT Ch 1)",
    questionNumber: 1,
    prompt:
      "Two point charges +4q and +q are placed at a distance 'L' apart. A third charge Q is placed on the line connecting them such that ALL THREE charges remain in electrostatic equilibrium. What is the position and value of charge Q?",
    options: [
      {
        id: "A",
        text: "At 2L/3 from +4q, with Q = -4q/9",
        isCorrect: true,
        explanation:
          "Direct Hit! You correctly balanced the net force on charge Q (giving position 2L/3 from +4q) AND enforced the equilibrium of the outer charge +q (which requires Q to be negative, Q = -4q/9).",
        ncertReference: "NCERT Physics Part 1, Ch 1, Page 16",
      },
      {
        id: "B",
        text: "At 2L/3 from +4q, with Q = +4q/9",
        isCorrect: false,
        slipPercentage: 38,
        trapType: "Forgot Boundary Condition",
        explanation:
          "You picked B because you forgot the boundary condition. While Q itself experiences zero net force, if Q is positive (+4q/9), both outer positive charges (+4q and +q) experience net repulsive forces and fly apart! 38% of aspirants make this exact slip.",
        ncertReference: "NCERT Physics Part 1, Ch 1, Page 17 (System Equilibrium Rule)",
      },
      {
        id: "C",
        text: "At L/3 from +4q, with Q = -q/4",
        isCorrect: false,
        slipPercentage: 22,
        trapType: "Inverted Ratio Slip",
        explanation:
          "You measured the distance from +q instead of +4q! The distance from +4q is r1 = L / (1 + √(q/4q)) = 2L/3. Inverting the ratio costs you -6 net marks on a standard NCERT question.",
        ncertReference: "NCERT Physics Part 1, Ch 1, Page 18",
      },
      {
        id: "D",
        text: "At L/2 from +4q, with Q = -q",
        isCorrect: false,
        slipPercentage: 14,
        trapType: "Midpoint Guess Trap",
        explanation:
          "Symmetric midpoint equilibrium only occurs when the two outer charges are identical. Here, the +4q charge is 4x stronger than +q, so the neutral point must shift closer to +q.",
        ncertReference: "NCERT Physics Part 1, Ch 1, Page 21",
      },
    ],
  },
  {
    streamId: "accounts",
    streamLabel: "Accounts (Commerce)",
    subject: "Accountancy",
    topic: "Goodwill Valuation by Super Profit",
    chapter: "Partnership Fundamentals (NCERT Ch 2)",
    questionNumber: 1,
    prompt:
      "Average profit of a firm is ₹1,20,000. Capital employed in the business is ₹8,00,000 and the Normal Rate of Return (NRR) is 10%. What is the value of Goodwill under the Capitalisation of Super Profit method?",
    options: [
      {
        id: "A",
        text: "₹4,00,000",
        isCorrect: true,
        explanation:
          "Flawless execution! Normal Profit = 10% of ₹8,00,000 = ₹80,000. Super Profit = ₹1,20,000 - ₹80,000 = ₹40,000. Capitalised Goodwill = (Super Profit / NRR) × 100 = (₹40,000 / 10) × 100 = ₹4,00,000.",
        ncertReference: "NCERT Accountancy Part 1, Ch 2, Page 72",
      },
      {
        id: "B",
        text: "₹12,00,000",
        isCorrect: false,
        slipPercentage: 42,
        trapType: "Wrong Method Formula",
        explanation:
          "You picked B because you capitalised Average Profit directly ((₹1,20,000 / 10) × 100) and forgot to subtract Normal Profit! 42% of commerce aspirants confuse Capitalisation of Average Profit with Capitalisation of Super Profit under exam pressure.",
        ncertReference: "NCERT Accountancy Part 1, Ch 2, Page 74",
      },
      {
        id: "C",
        text: "₹40,000",
        isCorrect: false,
        slipPercentage: 26,
        trapType: "Incomplete Step Trap",
        explanation:
          "You calculated the Super Profit correctly (₹40,000) but stopped mid-way and forgot to divide by NRR (10%) to capitalise it into Goodwill! NTA deliberately puts intermediate calculation steps as trap options.",
        ncertReference: "NCERT Accountancy Part 1, Ch 2, Page 73",
      },
      {
        id: "D",
        text: "₹80,000",
        isCorrect: false,
        slipPercentage: 11,
        trapType: "Selected Normal Profit",
        explanation:
          "₹80,000 is just the Normal Profit (10% of ₹8,00,000). Selecting it wastes an easy +5 mark opportunity and incurs a -1 penalty.",
        ncertReference: "NCERT Accountancy Part 1, Ch 2, Page 71",
      },
    ],
  },
  {
    streamId: "humanities",
    streamLabel: "Pol Science (Humanities)",
    subject: "Political Science",
    topic: "Origins of the Cold War & Cuban Crisis",
    chapter: "Cold War Era (NCERT Ch 1)",
    questionNumber: 1,
    prompt:
      "In 1962, Nikita Khrushchev decided to convert Cuba into a Russian military base and install nuclear missiles. What was the primary strategic objective of the Soviet Union?",
    options: [
      {
        id: "A",
        text: "To protect Cuba from another US invasion and double nuclear strike proximity against the American mainland",
        isCorrect: true,
        explanation:
          "Direct Hit! The USSR wanted to safeguard Castro's communist regime after the 1961 Bay of Pigs failure while placing US cities under direct, short-range nuclear threat for the first time.",
        ncertReference: "NCERT Contemporary World Politics, Ch 1, Page 3",
      },
      {
        id: "B",
        text: "As direct military retaliation for the US Navy's naval blockade of Soviet ships",
        isCorrect: false,
        slipPercentage: 35,
        trapType: "Inverted Cause-and-Effect",
        explanation:
          "You picked B because you reversed the sequence of events! President Kennedy ordered the naval quarantine *in response* to discovering the Soviet missile bases, not before. 35% of humanities students mix up cause and effect timelines.",
        ncertReference: "NCERT Contemporary World Politics, Ch 1, Page 4",
      },
      {
        id: "C",
        text: "To force the United States to demolish the Berlin Wall built in 1961",
        isCorrect: false,
        slipPercentage: 20,
        trapType: "Unrelated Theater Distortion",
        explanation:
          "The Berlin Wall was erected in 1961 by East Germany to stop mass migration into West Berlin. The Cuban deployment was an independent Caribbean military gambit, not a diplomatic trade-off for Berlin.",
        ncertReference: "NCERT Contemporary World Politics, Ch 1, Page 6",
      },
      {
        id: "D",
        text: "Because Cuba had signed the multilateral Warsaw Pact military treaty",
        isCorrect: false,
        slipPercentage: 16,
        trapType: "Fact Fabrication Trap",
        explanation:
          "Cuba never joined the Warsaw Pact! It received Soviet economic and military aid as a bilateral ally and later joined the Non-Aligned Movement. Watch out for fabricated treaties in NTA options.",
        ncertReference: "NCERT Contemporary World Politics, Ch 1, Page 7",
      },
    ],
  },
];

export default function LiveDiagnosticDemo() {
  const { t, translateStem } = useTranslation();
  const [selectedStream, setSelectedStream] = useState<"physics" | "accounts" | "humanities">("physics");
  const [selectedOptionId, setSelectedOptionId] = useState<"A" | "B" | "C" | "D" | null>("B"); // Pre-selected on trap B for instant demonstration

  const activeQuestion =
    DEMO_QUESTIONS.find((q) => q.streamId === selectedStream) || DEMO_QUESTIONS[0]!;
  const activeBreakdown = activeQuestion.options.find((o) => o.id === selectedOptionId);

  const handleSelectStream = (streamId: "physics" | "accounts" | "humanities") => {
    setSelectedStream(streamId);
    setSelectedOptionId("B"); // Default to the highest-slip trap to showcase the AI diagnosis immediately
  };

  return (
    <div
      id="live-demo"
      className="w-full max-w-4xl mx-auto rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] overflow-hidden text-left"
    >
      {/* Top Header Bar */}
      <div className="bg-[#FAF7EE] p-3.5 sm:p-5 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5C5C] border border-black animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-black font-mono">
            {t("liveDemoTitle", "Live Diagnostic Demo")}
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded font-mono">
            {t("clickAnyOption", "Click Any Option Below")}
          </span>
        </div>

        {/* Stream Switcher Tabs: 3-column equal grid on phones, flex on larger screens */}
        <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 bg-white border-2 border-black rounded-lg w-full sm:w-auto">
          {DEMO_QUESTIONS.map((q) => {
            const isActive = q.streamId === selectedStream;
            const fullLabel =
              q.streamId === "physics"
                ? t("physics", q.streamLabel)
                : q.streamId === "accounts"
                ? t("accountancy", q.streamLabel)
                : t("politicalScience", q.streamLabel);
            const shortLabel =
              q.streamId === "physics"
                ? "Physics"
                : q.streamId === "accounts"
                ? "Accounts"
                : "Pol Sci";

            return (
              <button
                key={q.streamId}
                type="button"
                onClick={() => handleSelectStream(q.streamId)}
                className={`px-2 sm:px-3 py-1 text-xs font-black rounded transition-all text-center truncate ${
                  isActive
                    ? "bg-[#FF5C5C] text-white shadow-[1px_1px_0px_0px_#000]"
                    : "text-black hover:bg-[#FAF7EE]"
                }`}
              >
                <span className="hidden sm:inline">{fullLabel}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Context & Prompt */}
      <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-black font-black font-mono" translate="no">
              Q1 of 50
            </span>
            <span className="font-bold text-black/70">{activeQuestion.chapter}</span>
          </div>
          <span className="font-mono font-black text-black bg-[#FAF7EE] px-2 py-0.5 rounded border border-black">
            {t("markingInfo", "+5 / -1 Marking")}
          </span>
        </div>

        <div className="text-base sm:text-lg font-black text-black leading-snug">
          <LatexRenderer content={translateStem(activeQuestion.prompt)} />
        </div>

        {/* Options List */}
        <div className="space-y-2.5 pt-1">
          {activeQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOptionId(option.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 border-black font-bold text-xs sm:text-sm flex items-start gap-3 transition-all ${
                  isSelected
                    ? option.isCorrect
                      ? "bg-[#D1FAE5] shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                      : "bg-[#FEE2E2] shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                    : "bg-white hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md border-2 border-black flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                    isSelected
                      ? option.isCorrect
                        ? "bg-[#10B981] text-white"
                        : "bg-[#FF5C5C] text-white"
                      : "bg-[#FAF7EE] text-black"
                  }`}
                  translate="no"
                >
                  {option.id}
                </span>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-black flex-1">
                    <LatexRenderer content={translateStem(option.text)} inline />
                  </div>
                  {option.slipPercentage && !option.isCorrect && (
                    <span className="text-[10px] font-mono font-black text-[#DC2626] bg-white px-2 py-0.5 rounded border border-black shrink-0 self-start sm:self-auto shadow-[1px_1px_0px_0px_#000]">
                      {option.slipPercentage}% {t("pickThis", "pick this")}
                    </span>
                  )}
                  {option.isCorrect && (
                    <span className="text-[10px] font-mono font-black text-[#059669] bg-white px-2 py-0.5 rounded border border-black shrink-0 self-start sm:self-auto shadow-[1px_1px_0px_0px_#000]">
                      {t("officialKey", "Official NTA Key")}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Real-Time AI Distractor Breakdown Drawer */}
        {activeBreakdown && (
          <div
            className={`mt-6 p-5 sm:p-6 rounded-xl border-2 border-black animate-in fade-in zoom-in-95 duration-200 ${
              activeBreakdown.isCorrect
                ? "bg-[#D1FAE5] shadow-[4px_4px_0px_0px_#000]"
                : "bg-[#FEF3C7] shadow-[4px_4px_0px_0px_#000]"
            }`}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                {activeBreakdown.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#059669] stroke-[2.5]" />
                ) : (
                  <Brain className="w-5 h-5 text-[#DC2626] stroke-[2.5]" />
                )}
                <div>
                  <h4 className="text-sm font-black text-black">
                    {activeBreakdown.isCorrect
                      ? t("correct", "AI Diagnosis: Correct Conceptual Execution (+5 Marks)")
                      : `${t("trapOptionAnalysisText", "NTA Trap Breakdown")}: Option ${activeBreakdown.id} (-1 Mark)`}
                  </h4>
                  {activeBreakdown.trapType && (
                    <p className="text-[11px] font-bold text-[#DC2626]">
                      {t("radar", "Trap Category")}: {activeBreakdown.trapType}
                    </p>
                  )}
                </div>
              </div>

              <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-white border border-black text-black shrink-0 shadow-[1px_1px_0px_0px_#000]">
                {t("ncertVerified", "NCERT Verified")}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-black/90 font-medium leading-relaxed mt-3">
              <LatexRenderer content={activeBreakdown.explanation} />
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-black/70">
              <span className="font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-black" />
                <span>{t("ncertCitationText", "NCERT Reference")}: <strong>{activeBreakdown.ncertReference}</strong></span>
              </span>

              <Link
                href="/dashboard/mocks"
                className="inline-flex items-center gap-1.5 font-black text-black hover:underline"
              >
                <span>{t("practiceMore", "Practice 49 More Questions Like This")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
