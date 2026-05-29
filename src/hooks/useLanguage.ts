import { useEffect, useState } from "react";
import type { Language } from "../data/projects";

const storageKey = "portfolio-language";
const fallbackLanguage: Language = "zh-Hant";

function isLanguage(value: string | null): value is Language {
  return value === "zh-Hant" || value === "en" || value === "ja";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return fallbackLanguage;
  }

  const saved = window.localStorage.getItem(storageKey);
  return isLanguage(saved) ? saved : fallbackLanguage;
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  return {
    language,
    setLanguage,
  };
}
