import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideViewerProps {
  folder: string;
  count: number;
  title?: string;
}

export default function SlideViewer({ folder, count, title }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const paths = Array.from({ length: count }, (_, i) =>
      `${folder}/slide-${String(i + 1).padStart(2, "0")}.jpg`
    );
    supabase.storage
      .from("presentations")
      .createSignedUrls(paths, 3600)
      .then(({ data }) => {
        if (data) setUrls(data.map((d) => d.signedUrl || ""));
        setLoading(false);
      });
  }, [folder, count]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(count - 1, c + 1));

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setFullscreen(false);
    },
    [count]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const slideContent = (
    <div className={cn("relative group", fullscreen && "fixed inset-0 z-50 bg-black flex items-center justify-center")}>
      {fullscreen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={() => setFullscreen(false)}
        >
          <Minimize2 className="h-5 w-5" />
        </Button>
      )}

      <div className={cn("relative", fullscreen ? "w-full max-w-5xl mx-auto px-4" : "w-full")}>
        {urls[current] && (
          <img
            src={urls[current]}
            alt={`Slide ${current + 1}`}
            className={cn(
              "w-full rounded-lg shadow-sm select-none",
              fullscreen && "rounded-none max-h-[90vh] object-contain"
            )}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        {/* Navigation overlay */}
        <button
          onClick={prev}
          disabled={current === 0}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all",
            "bg-black/40 text-white hover:bg-black/60 disabled:opacity-0",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          disabled={current === count - 1}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all",
            "bg-black/40 text-white hover:bg-black/60 disabled:opacity-0",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom bar */}
      <div className={cn(
        "flex items-center justify-between mt-2 px-1",
        fullscreen && "absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 rounded-full px-4 py-2 text-white"
      )}>
        <span className={cn("text-xs", fullscreen ? "text-white/80" : "text-muted-foreground")}>
          {current + 1} / {count}
        </span>
        {!fullscreen && (
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={() => setFullscreen(true)}>
            <Maximize2 className="h-3 w-3" /> Volledig scherm
          </Button>
        )}
      </div>
    </div>
  );

  return slideContent;
}
