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
  /\\(?:sqrt|frac|text|mathrm|mathbf|textit|vec|hat|mu|times|Omega|alpha|beta|gamma|delta|epsilon|theta|pi|lambda|sigma|omega|phi|psi|tau|rho|le|ge|leq|geq|pm|cdot|Delta|Phi|lambda|int|sum|partial|infty|approx|equiv|neq|rightarrow|leftarrow|rightleftharpoons|ce)\b|[_^]\{/;

/**
 * Parses mixed text containing $$...$$ (display), $...$ (inline), and bare LaTeX.
 */
export function parseLatexSegments(text: string): Segment[] {
  if (!text) return [];

  // Normalize unpaired dollars (e.g. single leading $ in formula with no closing $)
  let normalizedText = text;
  const dollarCount = (normalizedText.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 === 1) {
    if (normalizedText.trim().startsWith("$")) {
      normalizedText = normalizedText.trim() + "$";
    } else if (normalizedText.trim().endsWith("$")) {
      normalizedText = "$" + normalizedText.trim();
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
        const words = part.split(/\s+/).filter((w) => /^[a-zA-Z]{2,}$/.test(w));
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

    // Normal text - preserve line breaks if present
    if (seg.content.includes("\n")) {
      const lines = seg.content.split("\n");
      return (
        <span key={idx}>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {line}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      );
    }

    return <span key={idx}>{seg.content}</span>;
  });

  const Component = inline ? "span" : "div";

  return (
    <Component className={`${inline ? "inline" : "block"} ${className}`}>
      {renderedElements}
    </Component>
  );
}
