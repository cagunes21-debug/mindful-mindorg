import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const CookieConsent = () => {
  const { tx } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
        >
          <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-warm-200 p-6 md:flex md:items-center md:gap-6">
            <div className="flex items-start gap-4 flex-1 mb-4 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
              </div>
              <div>
                <h3 id="cookie-consent-title" className="font-medium text-foreground mb-1">
                  {tx("Deze website gebruikt cookies")}
                </h3>
                <p id="cookie-consent-desc" className="text-sm text-muted-foreground">
                  {tx("Wij gebruiken cookies om je ervaring te verbeteren en om te begrijpen hoe onze website wordt gebruikt. Je kunt je voorkeuren op elk moment aanpassen.")}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={declineCookies}
                className="border-warm-300 text-muted-foreground hover:bg-warm-50 rounded-full"
              >
                {tx("Alleen noodzakelijk")}
              </Button>
              <Button
                onClick={acceptCookies}
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full"
              >
                {tx("Alles accepteren")}
              </Button>
            </div>
            <button
              onClick={declineCookies}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1"
              aria-label={tx("Sluiten")}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
