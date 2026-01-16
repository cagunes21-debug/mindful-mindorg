import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/31625633379"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
          aria-label="Contact via WhatsApp"
        >
          <div className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
            <MessageCircle className="h-6 w-6 fill-white" />
          </div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block bg-white text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-warm-200"
          >
            Stel een vraag
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
