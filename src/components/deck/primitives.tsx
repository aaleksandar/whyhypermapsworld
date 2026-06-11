import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

export function SlideShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`min-h-full w-full px-5 pt-14 pb-24 md:px-16 md:py-20 flex flex-col contour-bg ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-marker text-2xl text-terracotta tracking-wide mb-4">
      {children}
    </div>
  );
}

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`font-display font-extrabold text-ink leading-[0.95] tracking-tight ${className}`}>
      {children}
    </h1>
  );
}

export function Pin({
  x, y, color = "var(--pin)", label, delay = 0, size = 22,
}: { x: number; y: number; color?: string; label?: string; delay?: number; size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 14 }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-100%)" }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 22 30">
        <path
          d="M11 0 C 4 0 0 5 0 11 C 0 18 11 30 11 30 C 11 30 22 18 22 11 C 22 5 18 0 11 0 Z"
          fill={color}
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <circle cx="11" cy="11" r="4" fill="var(--paper)" />
      </svg>
      {label && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 font-marker text-sm whitespace-nowrap text-ink-soft bg-paper/80 px-1 rounded">
          {label}
        </div>
      )}
    </motion.div>
  );
}

export function PaperCard({
  children, rotate = 0, className = "", style,
}: { children: ReactNode; rotate?: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`bg-paper border-2 border-ink sticker p-5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </div>
  );
}
