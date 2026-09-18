"use client";

import React, { useState } from "react";
import { Download, Loader2, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  analysisId: string;
  testNumber?: number;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function DownloadButton({
  analysisId,
  testNumber = 1,
  className = "",
  variant = "outline",
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(`/api/analysis/download/${analysisId}`);
      if (!res.ok) {
        throw new Error("Download request failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CUET_Mock_${testNumber}_Performance_Report.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF download error:", err);
      // Fallback: trigger direct link navigation
      window.open(`/api/analysis/download/${analysisId}`, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      className={`font-bold gap-2 text-xs sm:text-sm h-10 transition-all ${className}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
          <span>Generating 4-Page PDF...</span>
        </>
      ) : downloadSuccess ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4 text-indigo-600" />
          <span>Download PDF Report</span>
        </>
      )}
    </Button>
  );
}
