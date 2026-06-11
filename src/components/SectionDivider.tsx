interface SectionDividerProps {
  /** CSS color of the section ABOVE the divider */
  fromColor: string;
  /** CSS color of the section BELOW the divider */
  toColor: string;
  /** Visual style of the organic shape */
  variant?: "wave" | "curve" | "soft" | "drift";
  /** Pixel height of the divider (default 120) */
  height?: number;
  /** Flip the curve vertically */
  flip?: boolean;
  /** Show a subtle accent glow behind the curve */
  glow?: "sage" | "terracotta" | "none";
}

/**
 * Elegant organic divider between sections.
 * Renders a flowing SVG curve that transitions between two background colors,
 * with optional soft accent glow — replaces hard horizontal borders.
 */
const paths: Record<NonNullable<SectionDividerProps["variant"]>, string> = {
  // Soft single wave
  wave: "M0,40 C240,90 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z",
  // Pronounced flowing curve
  curve: "M0,20 C360,100 720,0 1080,70 C1260,105 1380,90 1440,80 L1440,120 L0,120 Z",
  // Very subtle, almost flat ripple
  soft: "M0,70 C360,90 720,60 1080,80 C1260,90 1380,75 1440,85 L1440,120 L0,120 Z",
  // Asymmetric organic drift
  drift: "M0,60 C200,30 420,110 700,70 C980,30 1200,100 1440,50 L1440,120 L0,120 Z",
};

const SectionDivider = ({
  fromColor,
  toColor,
  variant = "wave",
  height = 120,
  flip = false,
  glow = "none",
}: SectionDividerProps) => {
  const d = paths[variant];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden pointer-events-none -mt-px -mb-px"
      style={{ backgroundColor: fromColor, height }}
    >
      {/* Soft gradient blend on top of fromColor */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${fromColor} 0%, transparent 60%, ${toColor} 100%)`,
          opacity: 0.55,
        }}
      />

      {/* Optional accent glow */}
      {glow !== "none" && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[90px]"
          style={{
            width: "60%",
            height: height * 1.6,
            top: -height * 0.4,
            backgroundColor:
              glow === "sage"
                ? "hsl(var(--sage-300) / 0.18)"
                : "hsl(var(--terracotta-300) / 0.16)",
          }}
        />
      )}

      {/* Organic curve */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path d={d} fill={toColor} />
      </svg>
    </div>
  );
};

export default SectionDivider;
