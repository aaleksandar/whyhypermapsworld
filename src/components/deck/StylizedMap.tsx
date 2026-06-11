import type { ReactNode } from "react";

/**
 * Stylized hand-drawn map of a generic city (loosely Saigon).
 * Renders a base layer; children render pins/overlays on top.
 */
export function StylizedMap({
  children,
  tint = "var(--sage)",
  showLabels = true,
  className = "",
}: {
  children?: ReactNode;
  tint?: string;
  showLabels?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="none">
        {/* Land */}
        <path
          d="M0 0 L100 0 L100 55 Q 80 60 70 55 Q 50 50 35 58 Q 20 65 0 60 Z"
          fill="var(--paper-2)"
        />
        {/* Water (river) */}
        <path
          d="M -5 60 Q 20 55 35 60 Q 55 66 80 58 Q 95 54 105 60 L 105 75 L -5 75 Z"
          fill="var(--water)"
          opacity="0.75"
        />
        <path
          d="M -5 60 Q 20 55 35 60 Q 55 66 80 58 Q 95 54 105 60"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="0.25"
        />
        {/* Park blobs */}
        <ellipse cx="22" cy="22" rx="9" ry="6" fill={tint} opacity="0.35" />
        <ellipse cx="70" cy="18" rx="7" ry="5" fill={tint} opacity="0.35" />
        <ellipse cx="50" cy="40" rx="6" ry="4" fill={tint} opacity="0.45" />
        {/* Streets */}
        <g stroke="var(--ink)" strokeWidth="0.15" fill="none" opacity="0.5">
          <path d="M 5 10 L 95 12" />
          <path d="M 5 25 Q 50 28 95 24" />
          <path d="M 5 40 Q 50 42 95 38" />
          <path d="M 15 5 L 17 55" />
          <path d="M 40 5 L 42 55" />
          <path d="M 65 5 L 67 55" />
          <path d="M 85 5 L 86 55" />
        </g>
        {/* Dashed walking path */}
        <path
          d="M 12 50 Q 30 30 50 35 T 88 20"
          stroke="var(--terracotta)"
          strokeWidth="0.4"
          strokeDasharray="1 1"
          fill="none"
        />
        {showLabels && (
          <g fontFamily="Caveat, cursive" fontSize="3.4" fill="var(--ink-soft)">
            <text x="20" y="20">park</text>
            <text x="64" y="16">district 1</text>
            <text x="44" y="38">canal</text>
            <text x="40" y="68" fill="var(--paper)">river</text>
          </g>
        )}
      </svg>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
