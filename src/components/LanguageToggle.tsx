import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    const nextLanguage = language === "nl" ? "en" : "nl";
    setLanguage(nextLanguage);

    if (location.pathname === "/msc-training" && nextLanguage === "en") {
      navigate("/msc-groepstraining");
      return;
    }

    if (location.pathname === "/msc-groepstraining" && nextLanguage === "nl") {
      navigate("/msc-training");
    }
  };

  return (
    <button
      onClick={handleToggle}
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
