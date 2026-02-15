import { useMemo } from "react";
import { Clock } from "lucide-react";

interface ReadingTimeProps {
  content: string;
  className?: string;
}

export function useReadingTime(content: string) {
  return useMemo(() => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }, [content]);
}

const ReadingTime = ({ content, className = "" }: ReadingTimeProps) => {
  const minutes = useReadingTime(content);

  return (
    <span className={`text-sm text-muted-foreground flex items-center gap-1 ${className}`}>
      <Clock className="h-3.5 w-3.5" />
      {minutes} min leestijd
    </span>
  );
};

export default ReadingTime;
