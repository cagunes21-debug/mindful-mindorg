import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium tracking-wide border border-border rounded-full px-2 py-1 text-muted-foreground"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("nl")}
        aria-pressed={language === "nl"}
        aria-label="Schakel naar Nederlands"
        className={`px-2 py-0.5 rounded-full transition-colors ${
          language === "nl"
            ? "text-primary font-semibold"
            : "hover:text-primary"
        }`}
      >
        NL
      </button>
      <span className="text-border" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
        className={`px-2 py-0.5 rounded-full transition-colors ${
          language === "en"
            ? "text-primary font-semibold"
            : "hover:text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
