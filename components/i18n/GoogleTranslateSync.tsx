"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/LanguageContext";

/**
 * Patch DOM methods to prevent React 18 from crashing when Google Translate
 * wraps or replaces text nodes with <font> tags.
 */
function applyReactDomSafetyPatch() {
  if (typeof window === "undefined" || typeof Node === "undefined" || !Node.prototype) {
    return;
  }

  // Prevent multiple patches
  if ((Node.prototype as any).__gt_patched) {
    return;
  }
  (Node.prototype as any).__gt_patched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child);
      }
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (referenceNode.parentNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode);
      }
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

/**
 * Helper to set googtrans cookie on root path and relevant host domains
 */
function setGoogtransCookie(langCode: string) {
  if (typeof document === "undefined") return;

  const cookieVal = langCode === "en" ? "/en/en" : `/en/${langCode}`;
  document.cookie = `googtrans=${cookieVal}; path=/;`;

  const hostname = window.location.hostname;
  if (hostname && hostname !== "localhost") {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
    const parts = hostname.split(".");
    if (parts.length > 1) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${parts.slice(-2).join(".")};`;
    }
  }

  if (langCode === "en") {
    // Delete stale cookie
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    if (hostname && hostname !== "localhost") {
      document.cookie = `googtrans=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  }
}

/**
 * Trigger the Google Translate select combo in DOM
 */
function triggerTranslateCombo(langCode: string): boolean {
  if (typeof document === "undefined") return false;
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo) {
    const target = langCode === "en" ? "en" : langCode;
    if (combo.value !== target) {
      combo.value = target;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return true;
  }
  return false;
}

export default function GoogleTranslateSync() {
  const { language } = useTranslation();
  const pathname = usePathname();
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Apply React DOM patch
    applyReactDomSafetyPatch();

    // 2. Setup Google Translate Element Init Callback
    (window as any).googleTranslateElementInit = function () {
      if ((window as any).google?.translate?.TranslateElement) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,as,bn,gu,kn,ml,mr,or,pa,ta,te,ur",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 3. Inject Google Translate script if absent
    const scriptId = "cuet-google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Sync active language to Google Translate
  useEffect(() => {
    setGoogtransCookie(language);

    let attempts = 0;
    const maxAttempts = 12;

    if (retryTimerRef.current) {
      clearInterval(retryTimerRef.current);
    }

    const trySync = () => {
      attempts++;
      const success = triggerTranslateCombo(language);
      if (success || attempts >= maxAttempts) {
        if (retryTimerRef.current) {
          clearInterval(retryTimerRef.current);
          retryTimerRef.current = null;
        }
      }
    };

    trySync();
    if (attempts < maxAttempts) {
      retryTimerRef.current = setInterval(trySync, 300);
    }

    return () => {
      if (retryTimerRef.current) {
        clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [language]);

  // When changing routes in Next.js, re-apply translation if non-English
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (language !== "en") {
      timer = setTimeout(() => {
        triggerTranslateCombo(language);
      }, 200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, language]);


  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      style={{ display: "none", visibility: "hidden" }}
      className="hidden notranslate"
      translate="no"
    />
  );
}
