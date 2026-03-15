import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { nl } from "./nl";
import { en } from "./en";

export type Language = "nl" | "en";

type Translations = typeof nl;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = { nl, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" ? "en" : "nl") as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: any = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      if (typeof value === "string") return value;
      // Fallback to Dutch
      let fallback: any = translations.nl;
      for (const k of keys) {
        fallback = fallback?.[k];
      }
      return typeof fallback === "string" ? fallback : key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
