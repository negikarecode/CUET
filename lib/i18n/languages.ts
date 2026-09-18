export interface CUETLanguage {
  code: string;
  name: string;
  nativeName: string;
  shortLabel: string;
  script: string;
  direction?: "ltr" | "rtl";
  regionBadge?: string;
}

/**
 * The 13 official languages notified by the National Testing Agency (NTA)
 * for the Common University Entrance Test (CUET-UG).
 */
export const CUET_OFFICIAL_LANGUAGES: CUETLanguage[] = [
  { code: "en", name: "English", nativeName: "English", shortLabel: "EN", script: "Latin", direction: "ltr", regionBadge: "Standard" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", shortLabel: "HI", script: "Devanagari", direction: "ltr", regionBadge: "Official" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", shortLabel: "AS", script: "Bengali-Assamese", direction: "ltr", regionBadge: "Regional" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", shortLabel: "BN", script: "Bengali", direction: "ltr", regionBadge: "Regional" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", shortLabel: "GU", script: "Gujarati", direction: "ltr", regionBadge: "Regional" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", shortLabel: "KN", script: "Kannada", direction: "ltr", regionBadge: "Regional" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", shortLabel: "ML", script: "Malayalam", direction: "ltr", regionBadge: "Regional" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", shortLabel: "MR", script: "Devanagari", direction: "ltr", regionBadge: "Regional" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", shortLabel: "OD", script: "Odia", direction: "ltr", regionBadge: "Regional" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", shortLabel: "PA", script: "Gurmukhi", direction: "ltr", regionBadge: "Regional" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", shortLabel: "TA", script: "Tamil", direction: "ltr", regionBadge: "Regional" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", shortLabel: "TE", script: "Telugu", direction: "ltr", regionBadge: "Regional" },
  { code: "ur", name: "Urdu", nativeName: "اردو", shortLabel: "UR", script: "Perso-Arabic", direction: "rtl", regionBadge: "Regional" },
];

export const CUET_LANGUAGE_CODES = CUET_OFFICIAL_LANGUAGES.map((l) => l.code);
export const DEFAULT_CUET_LANGUAGE: CUETLanguage = CUET_OFFICIAL_LANGUAGES[0]!;

export function getLanguageByCode(code: string): CUETLanguage {
  const found = CUET_OFFICIAL_LANGUAGES.find((l) => l.code === code);
  return found ?? DEFAULT_CUET_LANGUAGE;
}

export function getActiveLanguage(): string {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("cuet_preferred_language");
    if (saved && CUET_LANGUAGE_CODES.includes(saved)) {
      return saved;
    }
  } catch {}
  return "en";
}

export function setAppLanguage(langCode: string): void {
  if (typeof window === "undefined") return;

  const validCode = CUET_LANGUAGE_CODES.includes(langCode) ? langCode : "en";

  try {
    localStorage.setItem("cuet_preferred_language", validCode);
    document.documentElement.lang = validCode;
    const langMeta = getLanguageByCode(validCode);
    if (langMeta.direction === "rtl") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }

    // Set Google Translate cookie
    const cookieVal = validCode === "en" ? "/en/en" : `/en/${validCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (window.location.hostname && window.location.hostname !== "localhost") {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
      const parts = window.location.hostname.split(".");
      if (parts.length > 1) {
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${parts.slice(-2).join(".")};`;
      }
    }
    if (validCode === "en") {
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    // Attempt direct combo dispatch
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = validCode;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } catch {}

  // Dispatch custom event for real-time reactivity without page reloads
  window.dispatchEvent(
    new CustomEvent("cuet:language-changed", { detail: { lang: validCode } })
  );
}

