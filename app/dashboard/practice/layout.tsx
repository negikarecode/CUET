import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subject Chapter Practice | CUET AI-Prep",
  description: "Targeted chapter-wise question practice with instant step-by-step NCERT explanations, trap identification, and pacing calibration for CUET UG.",
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
