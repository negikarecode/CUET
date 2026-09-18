"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  CUETLanguage,
  CUET_OFFICIAL_LANGUAGES,
  getActiveLanguage,
  setAppLanguage,
  getLanguageByCode,
  DEFAULT_CUET_LANGUAGE,
} from "./languages";
import {
  translations,
  translateNTAQuestionStem,
} from "./translations";

interface LanguageContextType {
  language: string;
  currentLanguage: CUETLanguage;
  languages: CUETLanguage[];
  setLanguage: (langCode: string) => void;
  t: (key: string, defaultText?: string, params?: Record<string, string | number>) => string;
  translateStem: (stem: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  currentLanguage: DEFAULT_CUET_LANGUAGE,
  languages: CUET_OFFICIAL_LANGUAGES,
  setLanguage: () => {},
  t: (_key, defaultText) => defaultText || _key,
  translateStem: (s) => s,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLangState] = useState<string>("en");

  useEffect(() => {
    const initialLang = getActiveLanguage();
    setLangState(initialLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLang;
      const langMeta = getLanguageByCode(initialLang);
      document.documentElement.dir = langMeta.direction || "ltr";
    }

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: string }>;
      if (customEvent.detail?.lang) {
        setLangState(customEvent.detail.lang);
      }
    };

    window.addEventListener("cuet:language-changed", handleLangChange);
    return () => {
      window.removeEventListener("cuet:language-changed", handleLangChange);
    };
  }, []);

  const changeLanguage = useCallback((langCode: string) => {
    setLangState(langCode);
    setAppLanguage(langCode);
  }, []);

  const t = useCallback(
    (
      key: string,
      defaultText?: string,
      params?: Record<string, string | number>
    ): string => {
      const langDict = translations[language];
      const enDict = translations.en;

      let val = langDict?.[key] || enDict?.[key] || defaultText || key;

      if (params) {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          val = val.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
        });
      }

      return val;
    },
    [language]
  );

  const translateStem = useCallback(
    (stem: string): string => {
      return translateNTAQuestionStem(stem, language);
    },
    [language]
  );

  const currentLanguage = getLanguageByCode(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage,
        languages: CUET_OFFICIAL_LANGUAGES,
        setLanguage: changeLanguage,
        t,
        translateStem,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe defaults if used outside provider
    return {
      language: "en",
      currentLanguage: DEFAULT_CUET_LANGUAGE,
      languages: CUET_OFFICIAL_LANGUAGES,
      setLanguage: setAppLanguage,
      t: (k: string, d?: string) => d || k,
      translateStem: (s: string) => s,
    };
  }
  return context;
}
