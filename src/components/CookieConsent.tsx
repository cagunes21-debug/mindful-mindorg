import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
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
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-warm-200 p-6 md:flex md:items-center md:gap-6">
            <div className="flex items-start gap-4 flex-1 mb-4 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-terracotta-600" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Deze website gebruikt cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wij gebruiken cookies om je ervaring te verbeteren en om te begrijpen hoe onze website wordt gebruikt. 
                  Je kunt je voorkeuren op elk moment aanpassen.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={declineCookies}
                className="border-warm-300 text-muted-foreground hover:bg-warm-50 rounded-full"
              >
                Alleen noodzakelijk
              </Button>
              <Button
                onClick={acceptCookies}
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full"
              >
                Alles accepteren
              </Button>
            </div>
            <button
              onClick={declineCookies}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground md:hidden"
              aria-label="Sluiten"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
