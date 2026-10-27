import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Mock Tests Hub | CUET AI-Prep",
  description: "Browse 50-question full-length CUET UG mock tests across Science, Commerce, and Humanities. Timed authentic NTA CBT simulator with instant AI mistake diagnosis.",
};

export default function MocksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
