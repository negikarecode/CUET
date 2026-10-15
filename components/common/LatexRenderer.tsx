"use client";

import React, { useMemo } from "react";
import katex from "katex";
import "katex/contrib/mhchem";

export interface LatexRendererProps {
  /** Text content containing LaTeX, math, or chemical notation */
  content?: string | null;
  /** Backward-compatible alias for content */
  text?: string | null;
  /** Additional CSS class names */
  className?: string;
  /** Whether to render as an inline element (span) or block (div) */
  inline?: boolean;
  /**
   * If true (default), strips an accidental lone "1. " bullet prefix
   * when there are no subsequent "2. " items in the text.
   */
  stripLoneIndex?: boolean;
}

interface Segment {
  type: "text" | "math-inline" | "math-display";
  content: string;
}

/**
 * Clean up raw LaTeX string before passing to KaTeX
 */
/**
 * Helper to strip raw LaTeX commands to readable plain text
 */
export function stripLatexToPlainText(latex: string): string {
  if (!latex) return "";
  return latex
    .replace(/\\(?:text|mathrm|mathbf|textit)\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[\$\{\}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Clean up raw LaTeX string before passing to KaTeX
 */
export function cleanLatex(math: string): string {
  if (!math) return "";
  let cleaned = math.trim();

  // Strip accidental outer single or double dollars
  if (cleaned.startsWith("$$") && cleaned.endsWith("$$") && cleaned.length >= 4) {
    cleaned = cleaned.slice(2, -2).trim();
  } else if (cleaned.startsWith("$") && cleaned.endsWith("$") && cleaned.length >= 2) {
    cleaned = cleaned.slice(1, -1).trim();
  } else if (cleaned.startsWith("$") && !cleaned.endsWith("$")) {
    cleaned = cleaned.slice(1).trim();
  } else if (cleaned.endsWith("$") && !cleaned.startsWith("$")) {
    cleaned = cleaned.slice(0, -1).trim();
  }

  // Normalize consecutive backslashes before LaTeX command letters (e.g. \\cdot -> \cdot, \\text -> \text)
  cleaned = cleaned.replace(/\\\\+([a-zA-Z]+)/g, "\\$1");
  // Normalize backslashes before braces: \\{ -> \{
  cleaned = cleaned.replace(/\\\\+([{}])/g, "\\$1");

  // Fix unescaped underscores in \text{...}, \mathrm{...}, \mathbf{...}, \textit{...}
  cleaned = cleaned.replace(/\\(text|mathrm|mathbf|textit)\{([^}]*)\}/g, (_match, cmd, inner) => {
    return "\\" + cmd + "{" + inner.replace(/_/g, "\\_") + "}";
  });

  // Fix presubscripts/presuperscripts without base: e.g. _7\text{N}^{14} or + _2\text{He}^4
  // At start of string
  cleaned = cleaned.replace(/^([_^][0-9a-zA-Z{}]+)/, "{}$1");
  // After spaces, operators, equals, plus, minus, commas, brackets, arrows
  cleaned = cleaned.replace(/([\s=+\-\(\[\{,])([_^][0-9a-zA-Z{}]+)/g, "$1{}$2");

  // Fix unescaped % inside math expressions (which LaTeX treats as comments)
  cleaned = cleaned.replace(/(?<!\\)%/g, "\\%");

  // Fix stray backslashes before numbers or percentages: e.g. \6.25\% -> 6.25\%
  cleaned = cleaned.replace(/\\([0-9.]+\s*\\?%)/g, "$1");
  // Normalize stray currency or escaped dollars
  cleaned = cleaned.replace(/\\+\$/g, "");

  // Auto-wrap negative exponents without braces: e.g. T^-2 -> T^{-2}, m^-1 -> m^{-1}
  cleaned = cleaned.replace(/([0-9a-zA-Z\)\]\}])\^([+\-][0-9a-zA-Z]+)/g, "$1^{$2}");
  // Auto-wrap multidigit exponents without braces: e.g. 10^12 -> 10^{12}
  cleaned = cleaned.replace(/([0-9a-zA-Z\)\]\}])\^([0-9]{2,})/g, "$1^{$2}");
  // Auto-wrap multidigit subscripts without braces: e.g. x_12 -> x_{12}
  cleaned = cleaned.replace(/([0-9a-zA-Z\)\]\}])_([+\-]?[0-9a-zA-Z]{2,})/g, "$1_{$2}");

  // Normalize simple text arrows
  cleaned = cleaned.replace(/<->/g, "\\leftrightarrow ");
  cleaned = cleaned.replace(/(?<!\\)->/g, "\\rightarrow ");

  return cleaned;
}

/**
 * Strips an accidental lone "1. " or "1) " prefix if the string does not
 * contain a subsequent "2. " or "2) " item.
 */
export function sanitizeConceptText(raw: string): string {
  if (!raw) return "";
  let text = raw.trim();
  if (
    /^\s*1[\.\)]\s+/.test(text) &&
    !/\n\s*2[\.\)]\s+/.test(text) &&
    !/(?:^|\s)2[\.\)]\s+/.test(text)
  ) {
    text = text.replace(/^\s*1[\.\)]\s+/, "");
  }
  return text;
}

/**
 * Safely render LaTeX string to HTML via KaTeX with mhchem chemical extension.
 */
function renderKaTeX(math: string, displayMode: boolean): { html: string; error?: string } {
  try {
    const cleaned = cleanLatex(math);
    const html = katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      strict: false,
      output: "htmlAndMathml",
      trust: false,
    });

    if (html.includes("katex-error")) {
      // Secondary fallback: strip problematic macro arguments and render cleanly
      const secondaryClean = cleaned
        .replace(/\\(?:text|mathrm|mathbf|textit)\{([^}]*)\}/g, "$1")
        .replace(/[_^]/g, "");
      const secondAttempt = katex.renderToString(secondaryClean, {
        displayMode,
        throwOnError: false,
        strict: false,
        output: "htmlAndMathml",
        trust: false,
      });
      if (!secondAttempt.includes("katex-error")) {
        return { html: secondAttempt };
      }
    }

    return { html };
  } catch (err: any) {
    return { html: "", error: err?.message || "LaTeX Render Error" };
  }
}

/**
 * Regex identifying bare LaTeX macros that indicate mathematical or chemical syntax
 */
const BARE_LATEX_REGEX =
  /\\(?:sqrt|frac|text|mathrm|mathbf|textit|vec|hat|mu|times|Omega|alpha|beta|gamma|delta|epsilon|theta|pi|lambda|sigma|omega|phi|psi|tau|rho|le|ge|leq|geq|pm|cdot|Delta|Phi|lambda|int|sum|partial|infty|approx|equiv|neq|rightarrow|leftarrow|rightleftharpoons|ce|nu|eta|hbar|nabla|circ|degree)\b|[_^]\{|[_^][+\-]?[0-9a-zA-Z]/;

/**
 * Parses mixed text containing $$...$$ (display), $...$ (inline), and bare LaTeX.
 */
export function parseLatexSegments(text: string): Segment[] {
  if (!text) return [];

  let normalizedText = text;

  // 1. Strip trailing stray dollar attached to words (e.g. Physics$ -> Physics)
  normalizedText = normalizedText.replace(/([a-zA-Z0-9_\-\.\)]+)\$\s*$/, "$1");

  // 2. Normalize unpaired dollars cleanly without wrapping whole prose paragraphs
  const dollarCount = (normalizedText.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 === 1) {
    if (normalizedText.trim().endsWith("$")) {
      normalizedText = normalizedText.trim().slice(0, -1);
    } else if (normalizedText.trim().startsWith("$") && /[\\=+\-^_]/.test(normalizedText)) {
      normalizedText = normalizedText.trim() + "$";
    } else {
      // Strip lone unmatched dollar
      normalizedText = normalizedText.replace(/(?<!\\)\$/, "");
    }
  }

  // Match $$...$$ or $...$ (non-greedy, not spanning across newlines for single $)
  const tokenRegex = /(\$\$[\s\S]*?\$\$|\$(?:\\\$|[^\$\n])+?\$)/g;
  const rawParts = normalizedText.split(tokenRegex);
  const segments: Segment[] = [];

  for (let i = 0; i < rawParts.length; i++) {
    const part = rawParts[i];
    if (!part) continue;

    if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
      segments.push({
        type: "math-display",
        content: part.slice(2, -2),
      });
    } else if (part.startsWith("$") && part.endsWith("$") && part.length >= 2) {
      segments.push({
        type: "math-inline",
        content: part.slice(1, -1),
      });
    } else {
      // Check for bare LaTeX expressions (e.g. \sqrt{77}\text{ V m}^{-1} without $)
      if (BARE_LATEX_REGEX.test(part)) {
        // If part has multiple normal English words (prose), don't turn the whole sentence into math mode
        const words = part.split(/\s+/).filter((w: string) => /^[a-zA-Z]{2,}$/.test(w));
        if (words.length >= 3) {
          // Tokenize bare macros inside prose
          const bareTokenRegex = /(\\(?:[a-zA-Z]+)(?:\{[^{}]*\})*)/g;
          const subParts = part.split(bareTokenRegex);
          for (const sub of subParts) {
            if (!sub) continue;
            if (BARE_LATEX_REGEX.test(sub)) {
              segments.push({ type: "math-inline", content: sub });
            } else {
              segments.push({ type: "text", content: sub });
            }
          }
        } else {
          segments.push({
            type: "math-inline",
            content: part,
          });
        }
      } else {
        segments.push({
          type: "text",
          content: part,
        });
      }
    }
  }

  return segments;
}

export default function LatexRenderer({
  content,
  text,
  className = "",
  inline = false,
  stripLoneIndex = true,
}: LatexRendererProps) {
  const rawInput = content ?? text ?? "";

  const processedText = useMemo(() => {
    if (!rawInput) return "";
    return stripLoneIndex ? sanitizeConceptText(rawInput) : rawInput;
  }, [rawInput, stripLoneIndex]);

  const segments = useMemo(() => {
    if (!processedText) return [];
    return parseLatexSegments(processedText);
  }, [processedText]);

  if (!rawInput) return null;

  const renderedElements = segments.map((seg, idx) => {
    if (seg.type === "math-display") {
      const { html } = renderKaTeX(seg.content, true);
      if (html) {
        return (
          <div
            key={idx}
            className="notranslate my-3 overflow-x-auto text-center py-1 font-sans max-w-full"
            translate="no"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return (
        <div
          key={idx}
          className="notranslate my-2 text-center text-sm text-slate-700 bg-slate-50 p-2 rounded-xl"
          translate="no"
        >
          {stripLatexToPlainText(seg.content)}
        </div>
      );
    }

    if (seg.type === "math-inline") {
      const { html } = renderKaTeX(seg.content, false);
      if (html) {
        return (
          <span
            key={idx}
            className="notranslate inline-math px-0.5 align-baseline max-w-full overflow-x-auto inline-block align-middle"
            translate="no"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return (
        <span
          key={idx}
          className="notranslate font-sans text-slate-800"
          translate="no"
        >
          {stripLatexToPlainText(seg.content)}
        </span>
      );
    }

    // Normal text - unescape \% to %, parse markdown bold, and preserve line breaks
    return <span key={idx}>{renderFormattedText(seg.content)}</span>;
  });

  const Component = inline ? "span" : "div";

  return (
    <Component className={`${inline ? "inline" : "block"} ${className}`}>
      {renderedElements}
    </Component>
  );
}

function renderFormattedText(text: string): React.ReactNode {
  // 1. Unescape \% to % and clean stray backslashes
  const unescaped = text
    .replace(/\\+%/g, "%")
    .replace(/\\+\$/g, "$")
    .replace(/\\([0-9.]+\s*\\?%)/g, "$1");

  // 2. Parse markdown bold **...**
  if (!unescaped.includes("**")) {
    if (unescaped.includes("\n")) {
      const lines = unescaped.split("\n");
      return (
        <>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {line}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </>
      );
    }
    return unescaped;
  }

  // Split by **...**
  const boldParts = unescaped.split(/(\*\*[\s\S]*?\*\*)/g);
  return (
    <>
      {boldParts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          const inner = part.slice(2, -2);
          return (
            <strong key={pIdx} className="font-bold text-slate-900 block my-1.5 first:mt-0">
              {inner}
            </strong>
          );
        }
        if (part.includes("\n")) {
          const lines = part.split("\n");
          return (
            <React.Fragment key={pIdx}>
              {lines.map((line, lIdx) => (
                <React.Fragment key={lIdx}>
                  {line}
                  {lIdx < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        }
        return <React.Fragment key={pIdx}>{part}</React.Fragment>;
      })}
    </>
  );
}
