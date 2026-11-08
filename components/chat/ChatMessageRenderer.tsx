"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

interface ChatMessageRendererProps {
  content: string;
}

// Custom sanitizer schema to allow target, rel on links and keep safe elements
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a || []), ["target", "_blank"], ["rel", "noopener noreferrer"]],
  },
};

/**
 * High-performance, streaming-safe Markdown message renderer for CUET Coach Chat.
 *
 * Enforces:
 * - Paragraphs with clean spacing
 * - Tight bullet and numbered lists (no blank block between marker and text)
 * - Bold stays inline (no block linebreaks)
 * - Headings (h1-h4) mapped to small, unobtrusive bold labels
 * - Links open in a new tab with rel="noopener noreferrer"
 * - Raw dangerous HTML is stripped via rehype-sanitize
 * - Safe against partial/streaming tokens
 */
export const ChatMessageRenderer: React.FC<ChatMessageRendererProps> = memo(({ content }) => {
  if (!content) return null;

  return (
    <div className="chat-markdown text-sm text-slate-800 leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={{
          // Paragraphs: standard clean spacing
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed text-sm text-slate-800">
              {children}
            </p>
          ),
          // Tight bullet lists without blank spacing between marker and text
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-1.5 space-y-0.5 text-slate-800">
              {children}
            </ul>
          ),
          // Tight numbered lists
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-1.5 space-y-0.5 text-slate-800">
              {children}
            </ol>
          ),
          // List item: enforce inline paragraph to prevent empty block gap
          li: ({ children }) => (
            <li className="my-0 leading-relaxed [&>p]:inline [&>p]:m-0 [&>p]:leading-relaxed text-sm">
              {children}
            </li>
          ),
          // Bold stays inline without breaking lines
          strong: ({ children }) => (
            <strong className="font-bold inline text-slate-900">
              {children}
            </strong>
          ),
          b: ({ children }) => (
            <strong className="font-bold inline text-slate-900">
              {children}
            </strong>
          ),
          // Map giant headings (h1, h2, h3, h4) to a small, disciplined bold line
          h1: ({ children }) => (
            <div className="font-bold text-xs uppercase tracking-wide text-slate-700 mt-2 mb-1">
              {children}
            </div>
          ),
          h2: ({ children }) => (
            <div className="font-bold text-xs uppercase tracking-wide text-slate-700 mt-2 mb-1">
              {children}
            </div>
          ),
          h3: ({ children }) => (
            <div className="font-bold text-xs tracking-tight text-slate-800 mt-1.5 mb-1">
              {children}
            </div>
          ),
          h4: ({ children }) => (
            <div className="font-bold text-xs tracking-tight text-slate-800 mt-1 mb-0.5">
              {children}
            </div>
          ),
          // Links open in a new tab with rel="noopener noreferrer"
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline font-medium hover:text-emerald-700 transition-colors"
            >
              {children}
            </a>
          ),
          // Inline code
          code: ({ children }) => (
            <code className="px-1 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono">
              {children}
            </code>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-emerald-500 pl-2.5 my-1 text-slate-600 italic">
              {children}
            </blockquote>
          ),
          // Tables from remark-gfm
          table: ({ children }) => (
            <div className="overflow-x-auto my-2">
              <table className="min-w-full text-xs text-left border-collapse border border-slate-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-slate-200 px-2 py-1 text-slate-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

ChatMessageRenderer.displayName = "ChatMessageRenderer";

export default ChatMessageRenderer;
