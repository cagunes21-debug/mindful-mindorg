import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/* Shared editorial primitives — chapter labels, fades, section frames.
   Locked palette: terracotta · sage · ivory (#FDFBF7). */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Chapter = ({
  n,
  label,
  tone = "terracotta",
}: {
  n: string;
  label: string;
  tone?: "terracotta" | "sage" | "ivory";
}) => {
  const toneClass =
    tone === "ivory"
      ? "text-white/80"
      : tone === "sage"
      ? "text-sage-700/85"
      : "text-terracotta-600/85";
  const numClass =
    tone === "ivory"
      ? "text-white"
      : tone === "sage"
      ? "text-sage-700"
      : "text-terracotta-600";
  const lineClass =
    tone === "ivory"
      ? "bg-white/40"
      : tone === "sage"
      ? "bg-sage-700/35"
      : "bg-terracotta-600/30";
  return (
    <div className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] ${toneClass}`}>
      <span className={`font-serif italic text-base normal-case tracking-normal ${numClass}`}>
        {n}
      </span>
      <span className={`h-px w-8 ${lineClass}`} />
      <span>{label}</span>
    </div>
  );
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="bg-[#FDFBF7] text-[#2C2A28]">{children}</div>
);

export const SectionBand = ({
  tone = "ivory",
  children,
  className = "",
}: {
  tone?: "ivory" | "cream" | "sage" | "deep";
  children: ReactNode;
  className?: string;
}) => {
  const bg =
    tone === "cream"
      ? "bg-[#F6F1E8]"
      : tone === "sage"
      ? "bg-sage-600 text-[#FDFBF7]"
      : tone === "deep"
      ? "bg-[#1f1d1b] text-[#FDFBF7]"
      : "bg-[#FDFBF7]";
  return <section className={`${bg} ${className}`}>{children}</section>;
};

export const SmallCaps = ({ children }: { children: ReactNode }) => (
  <span className="text-[11px] uppercase tracking-[0.28em] text-[#7a7670]">
    {children}
  </span>
);
