"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface Props {
  content: string;
  className?: string;
}

export function NotesMarkdownRenderer({ content, className = "" }: Props) {
  return (
    <div className={`prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-2.5 text-base leading-7 text-slate-700 dark:text-slate-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 space-y-1.5 my-2.5 text-slate-700 dark:text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 space-y-1.5 my-2.5 text-slate-700 dark:text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => <em className="italic text-slate-800 dark:text-slate-200">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 px-4 py-2.5 rounded-r-lg my-3 text-slate-700 dark:text-slate-300 italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 uppercase text-xs font-semibold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
              {children}
            </td>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-sm text-sky-600 dark:text-sky-400 font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 overflow-x-auto text-sm my-3 border border-slate-800">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
