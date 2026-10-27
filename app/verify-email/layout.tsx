import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Email | CUET AI-Prep",
  description: "Verify your email address to activate your CUET AI-Prep aspirant account and start practicing timed CBT mocks.",
};

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
