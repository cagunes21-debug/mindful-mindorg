import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { nl } from "./nl";
import { en } from "./en";
import { es } from "./es";
import { tr } from "./tr";
import { groupTrainingPageDict } from "./groupTrainingPageDict";

export type Language = "nl" | "en" | "es" | "tr";

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: "nl", label: "Nederlands", flag: "🇳🇱", nativeName: "Nederlands" },
  { code: "en", label: "English", flag: "🇬🇧", nativeName: "English" },
  { code: "es", label: "Español", flag: "🇪🇸", nativeName: "Español" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", nativeName: "Türkçe" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tx: (dutch: string) => string;
}

const translations: Record<Language, Record<string, any>> = { nl, en, es, tr };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "lang";
const COOKIE_KEY = "lang";

const detectInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "nl";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ["nl", "en", "es", "tr"].includes(saved)) return saved as Language;
    // Cookie fallback
    const cookie = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_KEY}=`));
    if (cookie) {
      const val = cookie.split("=")[1];
      if (["nl", "en", "es", "tr"].includes(val)) return val as Language;
    }
  } catch {
    // ignore
  }
  return "nl";
};

const writeCookie = (lang: Language) => {
  try {
    // 1 year
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch {
    // ignore
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  // Sync <html lang="..."> on mount and on change
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    writeCookie(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, []);

  const resolve = useCallback((dict: Record<string, any>, key: string): string | undefined => {
    const keys = key.split(".");
    let value: any = dict;
    for (const k of keys) {
      if (value == null) return undefined;
      value = value[k];
    }
    return typeof value === "string" ? value : undefined;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const primary = resolve(translations[language], key);
      if (primary !== undefined) return primary;
      // Fallback chain: chosen → EN → NL → key
      const enVal = resolve(translations.en, key);
      if (enVal !== undefined) return enVal;
      const nlVal = resolve(translations.nl, key);
      if (nlVal !== undefined) return nlVal;
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation for key "${key}" in all languages`);
      }
      return key;
    },
    [language, resolve],
  );

  const tx = useCallback(
    (dutch: string): string => {
      if (language === "nl") return dutch;
      const entry = groupTrainingPageDict[dutch];
      // Dict currently only has EN translations; for ES/TR fall back to Dutch
      // until the dict is expanded per-language.
      if (language === "en" && entry) return entry;
      return dutch;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tx }}>
      {children}
    </LanguageContext.Provider>
  );
};

const fallbackT = (key: string): string => {
  const keys = key.split(".");
  let value: any = translations.nl;
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === "string" ? value : key;
};

const fallbackContext: LanguageContextType = {
  language: "nl",
  setLanguage: () => {},
  t: fallbackT,
  tx: (dutch: string) => dutch,
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallbackContext;
};
