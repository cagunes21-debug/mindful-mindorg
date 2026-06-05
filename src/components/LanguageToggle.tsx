import { useLanguage, SUPPORTED_LANGUAGES, type Language } from "@/i18n/LanguageContext";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const active = SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Huidige taal: ${active.label}. Klik om te wisselen.`}
        className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Globe className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        <span className="text-base leading-none" aria-hidden="true">{active.flag}</span>
        <span className="uppercase tracking-wide">{active.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border w-44">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = lang.code === language;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as Language)}
              aria-current={isActive ? "true" : undefined}
              className={`flex cursor-pointer items-center gap-2 ${
                isActive ? "bg-primary/10 text-primary font-medium" : ""
              }`}
            >
              <span className="text-lg leading-none" aria-hidden="true">{lang.flag}</span>
              <span className="flex-1">{lang.nativeName}</span>
              {isActive && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
