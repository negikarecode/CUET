"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";
import { Alert } from "@/lib/types";

interface AlertBannerProps {
  alerts: Alert[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);

  const activeAlerts = alerts.filter((a) => !dismissedIds.includes(a.id));
  if (activeAlerts.length === 0) return null;

  return (
    <div className="w-full space-y-2 mb-6" aria-label="Smart Academic Alerts">
      {activeAlerts.map((alert) => {
        const isCritical = alert.type === "critical_weakness";

        return (
          <div
            key={alert.id}
            className={`flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
              isCritical
                ? "bg-red-50 border-red-200 text-red-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                {isCritical ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">
                  {alert.title}
                </h4>
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {alert.action_url && (
                <Link
                  href={alert.action_url}
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border shadow-sm transition-colors whitespace-nowrap min-h-[36px] ${
                    isCritical
                      ? "bg-red-600 text-white border-red-700 hover:bg-red-700"
                      : "bg-amber-600 text-white border-amber-700 hover:bg-amber-700"
                  }`}
                >
                  {alert.action_text || "View →"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <button
                type="button"
                onClick={() => setDismissedIds([...dismissedIds, alert.id])}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 focus:outline-none min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
