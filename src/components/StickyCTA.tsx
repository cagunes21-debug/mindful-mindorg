import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const HIDDEN_ROUTES = ["/login", "/admin", "/mijn-trainingen", "/betaling-succes", "/betaling-geannuleerd"];
const CTA_DISMISSED_KEY = "sticky_cta_dismissed";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  const isHiddenRoute = HIDDEN_ROUTES.some((r) => location.pathname.startsWith(r));

  useEffect(() => {
    if (sessionStorage.getItem(CTA_DISMISSED_KEY)) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(CTA_DISMISSED_KEY, "true");
  };

  if (isHiddenRoute || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-warm-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Start met de 8-weekse Zelfcompassie Training
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Nog enkele plekken beschikbaar · Kleine groepen · Gecertificeerde trainers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/agenda"
                className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
              >
                Bekijk data <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={dismiss}
                className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
                aria-label="Sluiten"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
