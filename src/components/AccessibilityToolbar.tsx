import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Type, Plus, Minus, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FONT_SIZES = [
  { label: "Klein", value: 0.9 },
  { label: "Normaal", value: 1 },
  { label: "Groot", value: 1.1 },
  { label: "Zeer groot", value: 1.2 },
];

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("fontSizeIndex");
    if (saved) {
      const index = parseInt(saved);
      setFontSizeIndex(index);
      applyFontSize(index);
    }
  }, []);

  const applyFontSize = (index: number) => {
    const scale = FONT_SIZES[index].value;
    document.documentElement.style.setProperty("--font-scale", scale.toString());
    document.documentElement.style.fontSize = `${scale * 100}%`;
  };

  const handleIncrease = () => {
    if (fontSizeIndex < FONT_SIZES.length - 1) {
      const newIndex = fontSizeIndex + 1;
      setFontSizeIndex(newIndex);
      applyFontSize(newIndex);
      localStorage.setItem("fontSizeIndex", newIndex.toString());
    }
  };

  const handleDecrease = () => {
    if (fontSizeIndex > 0) {
      const newIndex = fontSizeIndex - 1;
      setFontSizeIndex(newIndex);
      applyFontSize(newIndex);
      localStorage.setItem("fontSizeIndex", newIndex.toString());
    }
  };

  const handleReset = () => {
    setFontSizeIndex(1);
    applyFontSize(1);
    localStorage.setItem("fontSizeIndex", "1");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-lg border border-warm-200 p-4 min-w-[200px]"
          >
            <p className="text-sm font-medium text-foreground mb-3">Tekstgrootte</p>
            <div className="flex items-center justify-between gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecrease}
                disabled={fontSizeIndex === 0}
                className="h-9 w-9 p-0 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground font-medium">
                {FONT_SIZES[fontSizeIndex].label}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleIncrease}
                disabled={fontSizeIndex === FONT_SIZES.length - 1}
                className="h-9 w-9 p-0 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3 mr-2" />
              Herstellen
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 w-12 rounded-full shadow-lg transition-all ${
          isOpen
            ? "bg-terracotta-600 hover:bg-terracotta-700"
            : "bg-white hover:bg-warm-50 text-foreground border border-warm-200"
        }`}
        aria-label="Toegankelijkheid opties"
      >
        <Type className={`h-5 w-5 ${isOpen ? "text-white" : ""}`} />
      </Button>
    </div>
  );
};

export default AccessibilityToolbar;
