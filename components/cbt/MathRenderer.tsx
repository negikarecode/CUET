"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  text: string | null | undefined;
  className?: string;
  inline?: boolean;
}

interface Segment {
  type: "text" | "math-inline" | "math-display";
  content: string;
}

/**
 * Clean up LaTeX string before passing to KaTeX
 */
function cleanLatex(math: string): string {
  let cleaned = math.trim();
  // Normalize double backslashes before common LaTeX macros (e.g. \\text -> \text)
  cleaned = cleaned.replace(/\\\\([a-zA-Z]+)/g, "\\$1");
  return cleaned;
}

/**
 * Render LaTeX to HTML string safely with graceful fallback
 */
function renderKaTeX(math: string, displayMode: boolean): string {
  try {
    const cleaned = cleanLatex(math);
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      output: "htmlAndMathml",
      strict: false,
      trust: false,
    });
  } catch {
    // If KaTeX fails unexpectedly, return empty so fallback text is used
    return "";
  }
}

/**
 * Parses mixed text with $$...$$ (display), $...$ (inline), and bare LaTeX formulas
 */
function parseSegments(text: string): Segment[] {
  if (!text) return [];

  // Match $$...$$ or $...$
  const tokenRegex = /(\$\$[\s\S]*?\$\$|\$(?:\\\$|[^\$\n])+?\$)/g;
  const rawParts = text.split(tokenRegex);
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
      // Check for bare LaTeX expressions (e.g. options written like \sqrt{77}\text{ V m}^{-1} without $)
      const hasBareLatex =
        /\\(?:sqrt|frac|text|vec|hat|mu|times|Omega|alpha|beta|theta|pi|le|ge|pm)\b|[_^]\{/.test(
          part
        );

      if (hasBareLatex) {
        segments.push({
          type: "math-inline",
          content: part,
        });
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

export default function MathRenderer({
  text,
  className = "",
  inline = false,
}: MathRendererProps) {
  const segments = useMemo(() => {
    if (!text) return [];
    return parseSegments(text);
  }, [text]);

  if (!text) return null;

  const renderedElements = segments.map((seg, idx) => {
    if (seg.type === "math-display") {
      const html = renderKaTeX(seg.content, true);
      if (html) {
        return (
          <div
            key={idx}
            className="notranslate my-3 overflow-x-auto text-center py-1 font-sans"
            translate="no"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return (
        <div key={idx} className="notranslate my-2 font-mono text-center" translate="no">
          {seg.content}
        </div>
      );
    }

    if (seg.type === "math-inline") {
      const html = renderKaTeX(seg.content, false);
      if (html) {
        return (
          <span
            key={idx}
            className="notranslate inline-math px-0.5 align-baseline"
            translate="no"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return (
        <span key={idx} className="notranslate font-mono" translate="no">
          {seg.content}
        </span>
      );
    }

    // Normal text - eligible for translation
    return <span key={idx}>{seg.content}</span>;
  });

  const Component = inline ? "span" : "div";

  return (
    <Component className={`${inline ? "inline" : "block"} ${className}`}>
      {renderedElements}
    </Component>
  );
}
