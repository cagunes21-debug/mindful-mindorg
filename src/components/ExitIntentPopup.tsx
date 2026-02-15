import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const EXIT_INTENT_KEY = "exit_intent_dismissed";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(EXIT_INTENT_KEY);
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay adding the listener so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(EXIT_INTENT_KEY, "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md"
          >
            <div className="rounded-3xl bg-white border border-warm-200 shadow-2xl p-8 relative">
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Sluiten"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="h-14 w-14 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-7 w-7 text-terracotta-600" />
                </div>
                <h2 className="text-2xl font-light text-foreground mb-2">
                  Wacht even!
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ontvang een <span className="font-semibold text-terracotta-600">gratis meditatie-oefening</span> en maandelijkse mindfulness tips in je inbox.
                </p>
              </div>

              <NewsletterForm variant="inline" />

              <p className="text-xs text-muted-foreground text-center mt-4">
                Geen spam · Je kunt je altijd uitschrijven
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
