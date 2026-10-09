import type { Metadata, Viewport } from "next";
import AppShell from "@/components/layout/AppShell";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import GoogleTranslateSync from "@/components/i18n/GoogleTranslateSync";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "CUET AI-Prep | NTA-Grade CBT Practice & AI Mistake Diagnosis",
  description:
    "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis for Science, Commerce, and Humanities.",
  keywords: [
    "CUET UG 2025",
    "CUET Mock Test",
    "NTA CBT Simulator",
    "CUET Previous Year Papers",
    "CUET Science",
    "CUET Commerce",
    "CUET Humanities",
    "AI Mistake Diagnosis",
  ],
  authors: [{ name: "CUET AI-Prep Academic Team" }],
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth overflow-x-hidden">
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
        <LanguageProvider>
          <GoogleTranslateSync />
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
