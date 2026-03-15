import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "nl" ? "en" : "nl")}
      className="flex items-center gap-1 text-xs font-medium tracking-wide border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      aria-label={language === "nl" ? "Switch to English" : "Schakel naar Nederlands"}
    >
      <span className={language === "nl" ? "text-primary font-semibold" : ""}>NL</span>
      <span className="text-border">|</span>
      <span className={language === "en" ? "text-primary font-semibold" : ""}>EN</span>
    </button>
  );
};

export default LanguageToggle;
