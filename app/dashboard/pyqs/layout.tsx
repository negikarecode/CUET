import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "251 Shift PYQs Vault | CUET AI-Prep",
  description: "Access and practice all 251 authentic official shift question papers (2022–2025) with verified official NTA answer keys and detailed NCERT solutions.",
};

export default function PYQsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
