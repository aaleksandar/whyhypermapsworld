import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeckProps {
  slides: { id: string; title: string; render: () => ReactNode }[];
}

export function Deck({ slides }: DeckProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, slides.length]);

  // Convert vertical wheel to horizontal scroll for trackpad/mouse users.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative h-[100svh] w-screen overflow-hidden bg-paper text-ink font-body">
      <div
        ref={ref}
        className="h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((s) => (
          <section
            key={s.id}
            className="snap-start shrink-0 w-screen h-[100svh] relative paper-grain overflow-y-auto overflow-x-hidden md:overflow-hidden"
            aria-label={s.title}
          >
            {s.render()}
          </section>
        ))}
      </div>

      {/* Top brand */}
      <div className="pointer-events-none absolute top-3 left-4 md:top-6 md:left-8 z-30 flex items-center gap-2">
        <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-pin shadow-[2px_2px_0_var(--ink)]" />
        <span className="font-display font-extrabold tracking-tight text-ink text-sm md:text-lg">
          hypermaps<span className="text-pin">.world</span>
        </span>
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 right-4 md:top-6 md:right-8 z-30 font-marker text-base md:text-2xl text-ink-soft">
        {String(active + 1).padStart(2, "0")}
        <span className="opacity-50"> / {String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Active slide title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 font-marker text-sm md:text-xl text-ink-soft pointer-events-none whitespace-nowrap"
        >
          {slides[active]?.title}
        </motion.div>
      </AnimatePresence>

      {/* Progress route */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 max-w-[90vw]">
        <svg
          className="w-[min(90vw,500px)] md:w-auto"
          width={slides.length * 28 + 40}
          height="20"
          viewBox={`0 0 ${slides.length * 28 + 40} 20`}
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={`M 10 10 L ${slides.length * 28 + 30} 10`}
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            fill="none"
            opacity="0.35"
          />
          {slides.map((_, i) => (
            <g key={i} onClick={() => goTo(i)} style={{ cursor: "pointer" }}>
              <circle
                cx={20 + i * 28}
                cy={10}
                r={i === active ? 7 : 4}
                fill={i === active ? "var(--pin)" : "var(--ink)"}
                opacity={i === active ? 1 : 0.45}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Prev/Next — bottom corners on mobile, side-centered on desktop */}
      <button
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label="Previous slide"
        className="absolute left-3 bottom-16 md:left-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-paper border-2 border-ink sticker grid place-items-center disabled:opacity-30 hover:bg-mustard transition-colors"
      >
        <span className="font-display text-lg md:text-xl">←</span>
      </button>
      <button
        onClick={() => goTo(active + 1)}
        disabled={active === slides.length - 1}
        aria-label="Next slide"
        className="absolute right-3 bottom-16 md:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-pin border-2 border-ink sticker grid place-items-center disabled:opacity-30 hover:scale-110 transition-transform"
      >
        <span className="font-display text-lg md:text-xl text-paper">→</span>
      </button>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
