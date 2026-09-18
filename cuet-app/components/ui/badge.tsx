import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "critical" | "weak" | "average" | "strong" | "excellent" | "untested";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-slate-950 border-slate-200",
    critical: "border-red-200 bg-red-100 text-red-800",
    weak: "border-orange-200 bg-orange-100 text-orange-800",
    average: "border-yellow-200 bg-yellow-100 text-yellow-800",
    strong: "border-green-200 bg-green-100 text-green-800",
    excellent: "border-emerald-200 bg-emerald-100 text-emerald-800",
    untested: "border-slate-200 bg-slate-100 text-slate-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
