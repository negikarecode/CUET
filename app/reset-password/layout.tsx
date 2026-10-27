import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | CUET AI-Prep",
  description: "Set a new secure password for your CUET AI-Prep candidate account and resume your test prep.",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
