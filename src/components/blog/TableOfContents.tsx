import { useMemo } from "react";
import { List } from "lucide-react";
import { motion } from "framer-motion";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = useMemo<TocItem[]>(() => {
    const regex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi;
    const items: TocItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const text = match[2].replace(/<[^>]*>/g, "").trim();
      if (text) {
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
        items.push({ id, text, level: parseInt(match[1]) });
      }
    }
    return items;
  }, [content]);

  if (headings.length < 2) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      aria-label="Inhoudsopgave"
      className="mb-10 rounded-2xl bg-warm-50 border border-warm-200 p-6"
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
        <List className="h-4 w-4 text-terracotta-600" />
        Inhoudsopgave
      </h2>
      <ul className="space-y-1.5">
        {headings.map((heading, i) => (
          <li key={i} style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors leading-relaxed"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;
