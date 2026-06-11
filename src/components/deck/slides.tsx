import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideShell, Eyebrow, H1, Pin, PaperCard } from "./primitives";
import { StylizedMap } from "./StylizedMap";
import globe from "@/assets/deck/globe.png";
import personas from "@/assets/deck/personas.jpg";


/* 1. Cover */
export function SlideCover() {
  return (
    <SlideShell className="items-center justify-center text-center">
      <motion.img
        src={globe}
        alt="Hand-drawn globe with pins"
        width={520}
        height={520}
        className="w-[55vw] max-w-[420px] mb-6 drop-shadow-[3px_5px_0_rgba(26,23,20,0.2)]"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      />
      <Eyebrow>a pitch deck · 2026</Eyebrow>
      <H1 className="text-4xl sm:text-6xl md:text-8xl whitespace-nowrap">
        hypermaps<span className="text-pin">.world</span>
      </H1>
      <p className="font-display italic text-xl md:text-3xl text-ink-soft mt-6 max-w-2xl">
        Find where you belong.
      </p>
      <div className="mt-8 md:mt-10 font-marker text-base md:text-xl text-terracotta animate-pulse">
        scroll right →
      </div>
    </SlideShell>
  );
}

/* 2. Personas */
const personaQuotes = [
  { name: "Mai, Saigon", q: "Where do locals buy affordable clothes? Google Maps has no idea." },
  { name: "Dijana, chef", q: "I scroll IG to see which places my chef friends actually follow." },
  { name: "Sasha, NYC", q: "Where can a musician just walk in and jam tonight?" },
  { name: "Tourist", q: "4.8 stars from 12,000 strangers. Do I trust this?" },
  { name: "Julian", q: "I want to see where my friends have been. Not influencers." },
  { name: "Berlin newbie", q: "I keep asking friends for tips. They keep digging up old WhatsApp links." },
];
export function SlidePersonas() {
  const [hover, setHover] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const touch = (i: number) => {
    setHover(hover === i ? null : i);
    setSeen((s) => new Set(s).add(i));
  };
  return (
    <SlideShell>
      <Eyebrow>problem 01</Eyebrow>
      <H1 className="text-3xl md:text-6xl max-w-4xl mb-3 md:mb-6">
        The same city means <span className="text-terracotta italic">different things</span> to different people.
      </H1>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-3 md:gap-6 flex-1 max-w-5xl">
        {personaQuotes.map((p, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={() => touch(i)}
            className="relative bg-paper border-2 border-ink sticker p-2 md:p-4 overflow-hidden cursor-pointer"
            style={{ transform: `rotate(${[-1.5, 1, -0.5, 1.5, -1, 0.8][i]}deg)` }}
            whileHover={{ scale: 1.04, zIndex: 5 }}
            whileTap={{ scale: 0.97 }}
          >
            {!seen.has(i) && (
              <div className="absolute top-2 right-2 z-20 pointer-events-none">
                <motion.span
                  className="absolute rounded-full"
                  style={{ left: "50%", top: "50%", width: 28, height: 28, transform: "translate(-50%,-50%)", background: "var(--pin)", filter: "blur(8px)" }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.25, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <motion.span
                  className="relative block w-3 h-3 rounded-full bg-pin border-2 border-ink"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </div>
            )}
            <div
              className="aspect-[3/2] bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${personas})`,
                backgroundSize: "300% 200%",
                backgroundPosition: `${(i % 3) * 50}% ${Math.floor(i / 3) * 100}%`,
              }}
            />
            <div className="mt-1 md:mt-2 font-marker text-sm md:text-lg text-ink-soft">{p.name}</div>
            <AnimatePresence>
              {hover === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-ink/95 text-paper p-3 md:p-5 flex items-center font-display italic text-xs md:text-lg"
                >
                  "{p.q}"
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

/* 3. Information decay */
export function SlideDecay() {
  return (
    <SlideShell>
      <Eyebrow>problem 02</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-3xl">
        Knowledge <span className="text-terracotta italic">leaks away.</span>
      </H1>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-10 md:items-center mt-5 md:mt-6">
        <div className="md:col-span-2 space-y-3 md:space-y-4 text-base md:text-lg text-ink-soft">
          <p>Useful local recommendations are shared every day — across TikTok, Instagram, Reddit, Facebook Groups, WhatsApp, Telegram, and private conversations.</p>
          <p>Most are impossible to find a month later.</p>
        </div>
        <div className="md:col-span-3 relative aspect-[4/3] md:aspect-auto md:h-full">
          <StylizedMap tint="var(--terracotta)" showLabels={false}>
            {[
              { x: 14, y: 12, c: "var(--pin)",       tip: "best bún bò — auntie at 6am",    src: "WhatsApp · 2021" },
              { x: 38, y: 8,  c: "var(--terracotta)",tip: "rooftop jam every Thursday",     src: "Telegram · 2022" },
              { x: 62, y: 14, c: "var(--sage)",      tip: "tailor who copies any jacket",   src: "Reddit · 2019" },
              { x: 82, y: 10, c: "var(--mustard)",   tip: "kid-friendly café, has cradle",  src: "FB group · 2020" },
              { x: 20, y: 32, c: "var(--terracotta)",tip: "tiny natural wine bar, no sign", src: "DM · 2023" },
              { x: 46, y: 28, c: "var(--pin)",       tip: "skate spot — smooth till 11pm",  src: "Discord · 2022" },
              { x: 70, y: 34, c: "var(--sage)",      tip: "affordable vintage, Tue only",   src: "WhatsApp · 2020" },
              { x: 12, y: 48, c: "var(--mustard)",   tip: "gallery opening every 1st Fri",  src: "Email · 2021" },
              { x: 34, y: 50, c: "var(--pin)",       tip: "she'll braid your hair, $8",     src: "Note · 2019" },
              { x: 58, y: 46, c: "var(--terracotta)",tip: "queer-safe dance floor",         src: "Group chat · 2022" },
              { x: 80, y: 44, c: "var(--sage)",      tip: "wheelchair-accessible entrance", src: "Forum · 2020" },
              { x: 26, y: 18, c: "var(--sage)",      tip: "vegan pho — ask for #7",         src: "DM · 2023" },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={{ opacity: [1, 1, 0.05, 0.05, 1] }}
                transition={{ duration: 7, repeat: Infinity, delay: i * 0.35, times: [0, 0.35, 0.55, 0.85, 1] }}
              >
                <Pin x={0} y={0} delay={0} size={14} color={p.c} />
                <motion.div
                  className="absolute left-3 top-1 bg-paper border border-ink/60 sticker px-1.5 py-0.5 md:px-2 md:py-1 shadow-[2px_2px_0_rgba(26,23,20,0.15)]"
                  style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg)` }}
                  animate={{
                    opacity: [1, 0.4, 0, 0, 1],
                    filter: ["blur(0px)", "blur(1px)", "blur(4px)", "blur(4px)", "blur(0px)"],
                    y: [0, -4, -14, -14, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: i * 0.35 + 0.2, times: [0, 0.3, 0.5, 0.85, 1] }}
                >
                  <div className="font-marker text-[9px] md:text-[11px] leading-tight text-ink max-w-[90px] md:max-w-[150px] whitespace-normal">
                    "{p.tip}"
                  </div>
                  <div className="text-[8px] md:text-[9px] text-ink-soft italic mt-0.5">{p.src}</div>
                </motion.div>
              </motion.div>
            ))}
            <div className="absolute bottom-2 right-2 font-marker text-[10px] md:text-xs text-terracotta bg-paper/80 px-2 py-0.5 rounded">
              tips evaporate →
            </div>
          </StylizedMap>
        </div>
      </div>
    </SlideShell>
  );
}

/* 4. Google Maps is stuck */
export function SlideStuck() {
  return (
    <SlideShell>
      <Eyebrow>problem 03</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-10">
        Meanwhile, the dominant map <br/>hasn't <span className="text-terracotta italic">really</span> changed in a decade.
      </H1>
      <div className="grid grid-cols-2 gap-12 flex-1">
        <PaperCard rotate={-1.5} className="flex flex-col">
          <div className="font-marker text-xl text-ink-soft mb-2">the incumbent</div>
          <div className="flex-1 bg-[#e8eef4] border border-ink/20 rounded p-4 grid grid-cols-6 gap-1">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#dde4ee] rounded-sm" />
            ))}
          </div>
          <ul className="mt-4 space-y-1.5 text-ink-soft">
            <li>· Untrusted 4.8★ reviews</li>
            <li>· Pay-to-rank suggestions</li>
            <li>· No TikTok-era discovery</li>
            <li>· Same UI since 2014</li>
            <li>· Boring</li>
          </ul>
        </PaperCard>
        <PaperCard rotate={1.5} className="flex flex-col bg-paper-2">
          <div className="font-marker text-xl text-pin mb-2">hypermaps</div>
          <div className="flex-1 relative">
            <StylizedMap tint="var(--sage)" showLabels={false}>
              <Pin x={25} y={30} delay={0.1} />
              <Pin x={55} y={20} delay={0.3} color="var(--sage)" />
              <Pin x={70} y={45} delay={0.5} color="var(--mustard)" />
              <Pin x={40} y={55} delay={0.7} color="var(--terracotta)" />
            </StylizedMap>
          </div>
          <ul className="mt-4 space-y-1.5 text-ink-soft">
            <li>· Vibes from people like you</li>
            <li>· Your community curates</li>
            <li>· Many worlds, one map</li>
            <li>· Playful, alive, yours</li>
          </ul>
        </PaperCard>
      </div>
    </SlideShell>
  );
}

/* 5. Solution headline */
export function SlideSolutionHero() {
  return (
    <SlideShell className="justify-center relative overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 opacity-30"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 0.18 }}
          transition={{ delay: i * 0.15, duration: 1.2 }}
          style={{ transform: `translate(${i * 80}px, ${i * 40}px)` }}
        >
          <StylizedMap tint={["var(--sage)", "var(--terracotta)", "var(--mustard)", "var(--pin)"][i]} showLabels={false} />
        </motion.div>
      ))}
      {/* Floating world chips behind the headline */}
      {[
        { label: "Vegan",        x: "8%",  y: "22%", rot: -6,  delay: 0.2, dx: 12, color: "var(--sage)" },
        { label: "Architecture", x: "72%", y: "18%", rot: 5,   delay: 0.5, dx: -14, color: "var(--terracotta)" },
        { label: "Late-night",   x: "78%", y: "70%", rot: -3,  delay: 0.8, dx: 10, color: "var(--pin)" },
      ].map((chip) => (
        <motion.div
          key={chip.label}
          className="absolute z-0 pointer-events-none"
          style={{ left: chip.x, top: chip.y }}
          initial={{ opacity: 0, y: 20, rotate: chip.rot }}
          animate={{ opacity: 0.55, y: [0, -8, 0], x: [0, chip.dx, 0], rotate: chip.rot }}
          transition={{
            opacity: { delay: chip.delay, duration: 0.8 },
            y: { delay: chip.delay, duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { delay: chip.delay, duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className="bg-paper border-2 border-ink sticker px-4 py-2 font-marker text-xl"
            style={{ color: chip.color }}
          >
            {chip.label}
          </div>
        </motion.div>
      ))}
      <div className="relative z-10 max-w-5xl">
        <Eyebrow>the solution</Eyebrow>
        <H1 className="text-6xl md:text-8xl leading-[0.95]">
          A map that knows who you are
          <span className="italic text-pin"> — and the worlds you belong to.</span>
        </H1>
        <p className="font-display italic text-2xl text-ink-soft mt-8 max-w-3xl">
          Slip between worlds like rooms: foodies, skaters, modernists, night owls. Each one curated by the people already living it. The map listens, learns, and shows you the city you'd actually love.
        </p>
      </div>
    </SlideShell>
  );
}

/* 6. Many Worlds interactive — each world has its own filters, pins (with the criteria that world cares about), and events */
type WorldPin = { x: number; y: number; label: string; note: string };
type WorldEvent = { when: string; title: string };
type World = {
  id: string;
  label: string;
  tagline: string;
  tint: string;
  filters: string[];
  pins: WorldPin[];
  events: WorldEvent[];
};
const worlds: World[] = [
  {
    id: "jam",
    label: "🎸 Jam spots",
    tagline: "for musicians who want to plug in tonight",
    tint: "var(--pin)",
    filters: ["Open mic", "Jam nights", "Practice rooms", "Gear-friendly", "Looking for bandmates"],
    pins: [
      { x: 22, y: 26, label: "The Observatory", note: "Sun open jam · drums on site" },
      { x: 55, y: 34, label: "Yoko Café", note: "acoustic night · Wed" },
      { x: 74, y: 20, label: "Soma Art", note: "rehearsal rooms · hourly" },
      { x: 42, y: 48, label: "Indika", note: "BYO gear · friendly sound guy" },
    ],
    events: [
      { when: "Sun 9pm", title: "Open jam · The Observatory" },
      { when: "Thu", title: "Bassist wanted · indie trio, Thao Dien" },
    ],
  },
  {
    id: "parent",
    label: "👶 Parent-friendly",
    tagline: "for the gear, the chaos, the tiny humans",
    tint: "var(--mustard)",
    filters: ["Changing tables", "Kids menu", "Playground", "Stroller access", "Cot / cradle", "Quiet hours"],
    pins: [
      { x: 20, y: 30, label: "Park Hyatt", note: "cot on request · quiet pool" },
      { x: 50, y: 22, label: "Annam Gourmet", note: "changing room upstairs" },
      { x: 76, y: 40, label: "Runam Bistro", note: "indoor playground" },
      { x: 60, y: 50, label: "Pho 2000", note: "high chairs · kids portion" },
    ],
    events: [
      { when: "Sat 10am", title: "Toddler storytime · Tao Dan park" },
      { when: "Sun", title: "Family swap meet · D2 community garden" },
    ],
  },
  {
    id: "archi",
    label: "🏛 Architecture hunters",
    tagline: "for the people who look up",
    tint: "var(--terracotta)",
    filters: ["Modernist", "Brutalist", "Colonial-era", "New urban", "Art deco", "Lost & forgotten"],
    pins: [
      { x: 30, y: 20, label: "NK Apartments", note: "1968 · modernist icon" },
      { x: 60, y: 28, label: "Reunification Palace", note: "Ngô Viết Thụ · 1966" },
      { x: 48, y: 44, label: "Hẻm 14 villa", note: "colonial · crumbling, gorgeous" },
      { x: 82, y: 24, label: "Landmark 81", note: "new urban · sky deck" },
    ],
    events: [
      { when: "Sun 3pm", title: "Open House · Saigon modernist walk" },
      { when: "Next week", title: "New: Ba Son district opens to public" },
    ],
  },
  {
    id: "clothes",
    label: "👕 Local & affordable fashion",
    tagline: "real prices, real local brands",
    tint: "var(--sage)",
    filters: ["Under 500k₫", "Local brands", "🔥 Trending on TikTok", "New drops this week", "Thrift / vintage"],
    pins: [
      { x: 25, y: 38, label: "Tan Dinh market", note: "thrift · negotiate hard" },
      { x: 55, y: 24, label: "L Seoul", note: "🔥 trending · viral on TikTok" },
      { x: 72, y: 48, label: "Subtle Studios", note: "new local brand · 380k tees" },
      { x: 42, y: 18, label: "Métiers", note: "just launched · Reddit favorite" },
    ],
    events: [
      { when: "Sat", title: "Saigon Indie Fair · 40+ local brands" },
      { when: "Fri 6pm", title: "Drop party · Subtle Studios SS line" },
    ],
  },
  {
    id: "vegan",
    label: "🌱 Vegan & allergy-safe",
    tagline: "no awkward 'is this really vegan?' moments",
    tint: "var(--water)",
    filters: ["Fully vegan", "Vegetarian-only", "Celiac-safe GF kitchen", "Nut-free", "Halal", "Soy-free"],
    pins: [
      { x: 22, y: 26, label: "Hum Vegan", note: "fully vegan · separate GF prep" },
      { x: 55, y: 36, label: "Pi Bistro", note: "vegetarian · contains gluten" },
      { x: 75, y: 18, label: "Saigon Veg", note: "vegan + celiac-safe kitchen" },
      { x: 40, y: 48, label: "Loving Hut", note: "vegan · nut warning" },
    ],
    events: [
      { when: "Sun 9am", title: "Plant-based brunch market · D2" },
      { when: "Wed", title: "Celiac potluck · safe kitchen confirmed" },
    ],
  },
  {
    id: "art",
    label: "🎨 Art map",
    tagline: "what's opening, what's worth the trip",
    tint: "var(--pin)",
    filters: ["Gallery openings", "Installations", "Museum exhibitions", "Street art", "Artist studios"],
    pins: [
      { x: 24, y: 22, label: "Galerie Quynh", note: "new opening · Thu 7pm" },
      { x: 52, y: 32, label: "The Factory", note: "exhibition through Aug" },
      { x: 74, y: 26, label: "MoCA Saigon", note: "major retrospective" },
      { x: 40, y: 50, label: "Hẻm 47 mural", note: "fresh street piece · this week" },
    ],
    events: [
      { when: "Thu 7pm", title: "Vernissage · Galerie Quynh" },
      { when: "Sat", title: "Studio crawl · 6 artists, District 4" },
    ],
  },
];
export function SlideManyWorlds() {
  const [active, setActive] = useState("jam");
  const world = worlds.find(w => w.id === active)!;
  return (
    <SlideShell>
      <Eyebrow>solution · interactive</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-4xl mb-3">
        The map of <span className="italic text-pin">many worlds.</span>
      </H1>
      <p className="text-base md:text-lg text-ink-soft max-w-3xl mb-4 md:mb-5">
        Every community maps the city differently. Step into the worlds of foodies, skaters, architects, musicians, parents, and locals.
      </p>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
        {worlds.map(w => {
          const isActive = active === w.id;
          return (
            <div key={w.id} className="relative">
              {!isActive && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "var(--pin)", filter: "blur(12px)" }}
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.1, 0.95] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
              <motion.button
                onClick={() => setActive(w.id)}
                whileTap={{ scale: 0.94 }}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-ink font-marker text-sm md:text-lg transition-all ${
                  isActive
                    ? "bg-ink text-paper sticker shadow-[3px_3px_0_var(--pin)]"
                    : "bg-paper hover:bg-mustard shadow-[2px_2px_0_var(--ink)]"
                }`}
              >
                {w.label}
              </motion.button>
            </div>
          );
        })}
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 min-h-0">
        {/* Map */}
        <div className="md:col-span-2 relative border-2 border-ink sticker bg-paper-2 overflow-hidden aspect-[4/3] md:aspect-auto">
          <div className="absolute top-2 left-3 md:top-3 md:left-4 font-marker text-sm md:text-xl z-10 text-ink-soft">Saigon · {world.tagline}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={world.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <StylizedMap tint={world.tint}>
                {world.pins.map((p, i) => (
                  <div key={p.label}>
                    <Pin x={p.x} y={p.y} label={p.label} delay={0.1 + i * 0.08} color={world.tint} size={20} />
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className="absolute font-marker text-[10px] md:text-[13px] text-ink bg-paper/85 px-1 md:px-1.5 py-0.5 rounded border border-ink/30 whitespace-nowrap"
                      style={{ left: `${p.x}%`, top: `${p.y + 4}%`, transform: "translate(-50%, 0)" }}
                    >
                      {p.note}
                    </motion.div>
                  </div>
                ))}
              </StylizedMap>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Side panel: filters + events */}
        <AnimatePresence mode="wait">
          <motion.div
            key={world.id + "-side"}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 md:gap-4 min-h-0"
          >
            <div className="border-2 border-ink sticker bg-paper p-3 md:p-4">
              <div className="font-marker text-sm md:text-base text-ink-soft mb-2">filters this world cares about</div>
              <div className="flex flex-wrap gap-1.5">
                {world.filters.map(f => (
                  <span
                    key={f}
                    className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border-2 border-ink text-xs md:text-sm bg-paper-2"
                    style={{ background: world.tint, color: "var(--paper)" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-2 border-ink sticker bg-paper p-3 md:p-4 flex-1 min-h-0 overflow-auto">
              <div className="font-marker text-sm md:text-base text-ink-soft mb-2">happening · for this world</div>
              <ul className="space-y-2">
                {world.events.map(e => (
                  <li key={e.title} className="flex gap-2 items-start">
                    <span
                      className="font-marker text-xs md:text-sm px-2 py-0.5 rounded border-2 border-ink whitespace-nowrap"
                      style={{ background: world.tint, color: "var(--paper)" }}
                    >
                      {e.when}
                    </span>
                    <span className="text-xs md:text-sm text-ink leading-snug">{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}

/* 7. Vibes (merged: matching + layers of understanding) */
const vibeSignals = [
  { name: "Niche facts", desc: "Has a cradle. Late kitchen. Sauna. Open now.", color: "var(--water)" },
  { name: "Reviews from people like you", desc: "Not the loudest voices — the closest ones.", color: "var(--sage)" },
  { name: "Friends & taste-graph", desc: "Where the people you trust already are.", color: "var(--mustard)" },
  { name: "AI vibe estimate", desc: "We approximate the feeling of a place — and of you.", color: "var(--pin)" },
];

export function SlideVibes() {
  return (
    <SlideShell>
      <Eyebrow>how it works</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-4xl mb-3">
        We help you find places of <span className="italic text-pin">your vibe.</span>
      </H1>
      <p className="text-base md:text-lg text-ink-soft max-w-3xl mb-6 md:mb-10">
        Our algorithm stacks niche factual data, reviews from people like you, signals from your friends, and your inputs — to find places that match you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 flex-1 md:items-center">
        {/* Left: 3 inputs */}
        <div className="md:col-span-2 space-y-3 md:space-y-4">
          <div className="font-marker text-base md:text-xl text-terracotta mb-1">what we read</div>
          {["Who you are", "Where you are", "What you need"].map((t, i) => (
            <PaperCard key={t} rotate={i === 1 ? 1 : -1.2} className="bg-paper-2 flex items-baseline gap-3 md:gap-4">
              <div className="font-display font-extrabold text-2xl md:text-3xl text-pin shrink-0">{i+1}</div>
              <div className="min-w-0">
                <div className="font-display font-bold text-lg md:text-2xl leading-tight">{t}</div>
                <div className="font-marker text-sm md:text-base text-ink-soft">
                  {i === 0 && "history, taste, the worlds you belong to"}
                  {i === 1 && "city, neighborhood, this exact corner"}
                  {i === 2 && "right now: jam, eat, hide, wander"}
                </div>
              </div>
            </PaperCard>
          ))}
        </div>

        {/* Middle: signals stack */}
        <div className="md:col-span-2 space-y-2 md:space-y-3">
          <div className="font-marker text-base md:text-xl text-terracotta mb-1">what we stack</div>
          {vibeSignals.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="border-2 border-ink sticker p-2.5 md:p-3 md:px-4"
              style={{ background: s.color, transform: `rotate(${-1.5 + i * 0.8}deg)` }}
            >
              <div className="font-display font-bold text-base md:text-lg leading-tight">{s.name}</div>
              <div className="font-marker text-sm md:text-base text-ink-soft leading-tight">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Right: synchronicity dial */}
        <div className="md:col-span-1 flex flex-col items-center">
          <svg width="120" height="120" viewBox="0 0 120 120" className="md:w-[140px] md:h-[140px]">
            <circle cx="60" cy="60" r="50" fill="var(--pin)" stroke="var(--ink)" strokeWidth="2" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "60px 60px" }}
            >
              <circle cx="60" cy="20" r="4" fill="var(--paper)" />
              <circle cx="100" cy="60" r="4" fill="var(--paper)" />
              <circle cx="60" cy="100" r="4" fill="var(--paper)" />
              <circle cx="20" cy="60" r="4" fill="var(--paper)" />
            </motion.g>
            <text x="60" y="65" textAnchor="middle" fontFamily="Caveat" fontSize="18" fill="var(--paper)">match</text>
          </svg>
          <div className="font-marker text-base md:text-xl mt-2 md:mt-3 text-ink-soft text-center leading-tight">synchronicity,<br/>on tap</div>
        </div>
      </div>
    </SlideShell>
  );
}

// Back-compat shim so any stale import doesn't break the build.
export const SlideLayers = SlideVibes;

/* 9. Character profiles */
type ActivityKind = "rated" | "tagged" | "photo" | "visited" | "added" | "live";
type Profile = {
  name: string;
  kind: "person" | "brand" | "guide" | "list";
  tagline: string;
  color: string;
  glyph: string;
  mapLabel: string;
  pins: { x: number; y: number }[];
  stat: string;
  activity: { kind: ActivityKind; place: string; when: string; note?: string }[];
};

const profiles: Profile[] = [
  {
    name: "Julian", kind: "person", glyph: "J", color: "var(--sage)",
    tagline: "explorer · hunts hidden cafés",
    mapLabel: "places he's been",
    pins: [
      { x: 20, y: 30 }, { x: 35, y: 18 }, { x: 60, y: 22 }, { x: 75, y: 35 },
      { x: 45, y: 40 }, { x: 28, y: 50 }, { x: 65, y: 48 },
    ],
    stat: "312 places · 138 cafés mapped",
    activity: [
      { kind: "photo", place: "Slow Hours Café", when: "2h", note: "corner seat" },
      { kind: "visited", place: "Iron + Oak Gym", when: "yesterday" },
      { kind: "tagged", place: "Hum Vegan", when: "3d", note: "+ quiet" },
    ],
  },
  {
    name: "Michelin", kind: "guide", glyph: "★", color: "var(--pin)",
    tagline: "the guide · scores restaurants",
    mapLabel: "rated this year",
    pins: [
      { x: 25, y: 25 }, { x: 50, y: 20 }, { x: 70, y: 30 },
      { x: 40, y: 45 }, { x: 60, y: 50 },
    ],
    stat: "2026 picks · 38 restaurants in Saigon",
    activity: [
      { kind: "rated", place: "Anan Saigon", when: "today", note: "★★" },
      { kind: "rated", place: "Nén Light", when: "2d", note: "★" },
      { kind: "added", place: "Quince", when: "1w", note: "bib gourmand" },
    ],
  },
  {
    name: "Resident Advisor", kind: "list", glyph: "♪", color: "var(--ink)",
    tagline: "the list · electronic events",
    mapLabel: "live tonight",
    pins: [
      { x: 22, y: 22 }, { x: 38, y: 30 }, { x: 55, y: 25 },
      { x: 70, y: 40 }, { x: 48, y: 48 }, { x: 30, y: 45 }, { x: 78, y: 22 },
    ],
    stat: "23 venues open tonight",
    activity: [
      { kind: "live", place: "The Observatory", when: "9pm", note: "Hyperaktivist" },
      { kind: "added", place: "Arcan", when: "today", note: "Sat lineup" },
      { kind: "photo", place: "Savage", when: "1d", note: "floor shot" },
    ],
  },
  {
    name: "Tre Vineyard", kind: "brand", glyph: "❦", color: "var(--terracotta)",
    tagline: "the brand · a winery in Đà Lạt",
    mapLabel: "where their wine is poured",
    pins: [
      { x: 30, y: 28 }, { x: 45, y: 22 }, { x: 58, y: 30 },
      { x: 68, y: 42 }, { x: 35, y: 45 },
    ],
    stat: "now poured at 47 places",
    activity: [
      { kind: "added", place: "Stoker Woodfired", when: "today", note: "by the glass" },
      { kind: "photo", place: "Ănăn", when: "yesterday", note: "user pour" },
      { kind: "tagged", place: "Nén Light", when: "4d", note: "pairing" },
    ],
  },
];

const kindBadge: Record<Profile["kind"], string> = {
  person: "person", brand: "brand", guide: "guide", list: "list",
};
const activityVerb: Record<ActivityKind, string> = {
  rated: "rated", tagged: "tagged", photo: "photo of", visited: "visited", added: "added", live: "live at",
};
const activityIcon: Record<ActivityKind, string> = {
  rated: "★", tagged: "#", photo: "◉", visited: "✦", added: "+", live: "♪",
};

export function SlideCharacter() {
  return (
    <SlideShell>
      <Eyebrow>identity</Eyebrow>
      <H1 className="text-3xl md:text-6xl max-w-4xl mb-3">
        Everyone gets a <span className="italic text-pin">profile.</span> Even places, brands and lists.
      </H1>
      <p className="text-base md:text-lg text-ink-soft max-w-3xl mb-5 md:mb-6">
        A profile is a person, a brand, a curated list or a guide — each with its own map and a live feed of what they're doing on it.
      </p>
      <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-5 flex-1 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0 pb-2">
        {profiles.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="bg-paper border-2 border-ink sticker p-4 flex flex-col shrink-0 w-[78vw] md:w-auto snap-center"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.2}deg)` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-ink flex items-center justify-center font-display text-lg md:text-xl text-paper shrink-0"
                style={{ background: p.color }}
              >
                {p.glyph}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-base md:text-lg leading-tight truncate">{p.name}</div>
                <div className="font-marker text-xs text-ink-soft">
                  <span className="px-1.5 py-0.5 bg-paper-2 border border-ink/40 mr-1">{kindBadge[p.kind]}</span>
                  {p.tagline.replace(/^[^·]+·\s*/, "")}
                </div>
              </div>
            </div>

            <div className="font-marker text-[10px] text-terracotta uppercase tracking-wider mb-1">
              {p.mapLabel}
            </div>
            <div className="relative border border-ink/40 bg-paper-2 aspect-[4/3] overflow-hidden">
              <StylizedMap tint={p.color} showLabels={false}>
                {p.pins.map((pin, j) => (
                  <Pin key={j} x={pin.x} y={pin.y} color={p.color} size={12} delay={i * 0.08 + j * 0.05} />
                ))}
              </StylizedMap>
            </div>

            <div className="font-marker text-xs text-pin mt-2">{p.stat}</div>

            <div className="mt-2 pt-2 border-t border-ink/20">
              <div className="font-marker text-[10px] uppercase tracking-wider text-ink-soft mb-1">recent</div>
              <ul className="space-y-1">
                {p.activity.map((a, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.3 + j * 0.06 }}
                    className="flex items-baseline gap-1.5 text-[12px] leading-tight"
                  >
                    <span
                      className="font-marker shrink-0 w-4 text-center"
                      style={{ color: p.color }}
                    >
                      {activityIcon[a.kind]}
                    </span>
                    <span className="font-display flex-1 min-w-0">
                      <span className="text-ink-soft">{activityVerb[a.kind]}</span>{" "}
                      <span className="font-bold">{a.place}</span>
                      {a.note && <span className="text-ink-soft"> · {a.note}</span>}
                    </span>
                    <span className="font-marker text-[10px] text-ink-soft shrink-0">{a.when}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

/* 10. Ask the area */
const chatScript = [
  { who: "you", text: "where can i find art around me right now?" },
  { who: "ai", text: "3 open galleries in District 3, and a street-mural walk along Pasteur. Want pins?" },
  { who: "local", name: "Linh, local", text: "go to San Art before 6pm. Pop-up tonight on Ly Tu Trong — DM me 🌸" },
  { who: "local", name: "Minh, mural-hunter", text: "the wall behind Cafe Apartment is fresh this week." },
];
export function SlideAsk() {
  const [step, setStep] = useState(1);
  const visible = chatScript.slice(0, step);
  return (
    <SlideShell>
      <Eyebrow>ask the area · interactive</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-3xl mb-3">
        Toss a question <span className="italic text-pin">into the ether.</span>
      </H1>
      <p className="text-base md:text-lg text-ink-soft max-w-2xl mb-6 md:mb-8">
        AI answers first. Nearby locals chime in seconds later.
      </p>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="space-y-3">
          {visible.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 md:p-4 max-w-md border-2 border-ink sticker ${
                m.who === "you" ? "ml-auto bg-pin text-paper" :
                m.who === "ai" ? "bg-mustard" : "bg-paper"
              }`}
            >
              {m.who === "local" && (
                <div className="font-marker text-xs md:text-sm text-terracotta mb-1">{("name" in m && m.name) || "local"}</div>
              )}
              {m.who === "ai" && <div className="font-marker text-xs md:text-sm text-ink-soft mb-1">🤖 local AI</div>}
              <div className="font-display text-sm md:text-base">{m.text}</div>
            </motion.div>
          ))}
          <div className="relative inline-block mt-3 md:mt-4 self-start">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded pointer-events-none"
              style={{ background: "var(--pin)", filter: "blur(16px)" }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <motion.button
              onClick={() => setStep(s => s >= chatScript.length ? 1 : s + 1)}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.04, 1], boxShadow: ["3px 3px 0 var(--ink)", "5px 5px 0 var(--ink)", "3px 3px 0 var(--ink)"] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="relative px-5 py-2.5 border-2 border-ink sticker bg-pin text-paper font-marker text-base md:text-lg flex items-center gap-2"
            >
            {step >= chatScript.length ? "replay ↻" : (
              <>
                next reply
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>→</motion.span>
              </>
            )}
            </motion.button>
          </div>
        </div>
        <div className="relative border-2 border-ink sticker bg-paper-2 aspect-square md:aspect-auto">
          <StylizedMap tint="var(--pin)" showLabels={false}>
            <Pin x={50} y={50} color="var(--pin)" size={32} label="you" />
            {[{x:30,y:25,d:0.5},{x:72,y:30,d:1},{x:65,y:55,d:1.5},{x:25,y:55,d:2}].map((p,i)=>(
              <motion.div
                key={i}
                className="absolute"
                style={{ left:`${p.x}%`, top:`${p.y}%`, transform:"translate(-50%,-50%)" }}
                animate={{ scale:[1,1.5,1], opacity:[1,0.3,1] }}
                transition={{ duration:2, repeat:Infinity, delay:p.d }}
              >
                <div className="w-4 h-4 rounded-full bg-sage border-2 border-ink" />
              </motion.div>
            ))}
          </StylizedMap>
        </div>
      </div>
    </SlideShell>
  );
}

/* 11. Pin context — what every community remembers about this place */
type PinPhoto = { label: string; draw: (c: string) => React.ReactNode };
type Verdict = "love" | "avoid" | "mixed";
type Perspective = {
  community: string;
  emoji: string;
  verdict: Verdict;
  insight: string;
  voices: number;
};
type PinSpot = {
  name: string;
  kind: string;
  x: number; y: number;
  color: string;
  highlights: string[];
  bestFor: string;
  photos: PinPhoto[];
  perspectives: Perspective[];
  aiSummary: string;
  totalVoices: number;
  friends: number;
};

// tiny SVG "drawings" used as mock photos
const draw = {
  rack: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="6" y="10" width="3" height="40" fill={c}/>
      <rect x="51" y="10" width="3" height="40" fill={c}/>
      <rect x="6" y="22" width="48" height="2" fill={c}/>
      <circle cx="18" cy="40" r="6" fill="none" stroke={c} strokeWidth="2"/>
      <circle cx="42" cy="40" r="6" fill="none" stroke={c} strokeWidth="2"/>
      <rect x="14" y="39" width="32" height="2" fill={c}/>
    </svg>
  ),
  shower: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="28" y="6" width="2" height="14" fill={c}/>
      <path d="M18 20 Q30 14 42 20 Z" fill={c}/>
      <g stroke={c} strokeWidth="1.4" strokeLinecap="round">
        <line x1="22" y1="26" x2="20" y2="46"/>
        <line x1="30" y1="26" x2="30" y2="48"/>
        <line x1="38" y1="26" x2="40" y2="46"/>
      </g>
    </svg>
  ),
  yoga: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="6" y="44" width="48" height="6" rx="2" fill={c} opacity="0.4"/>
      <circle cx="30" cy="22" r="5" fill={c}/>
      <path d="M30 27 L30 40 M30 30 L20 36 M30 30 L40 36 M30 40 L22 48 M30 40 L38 48" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  cup: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <path d="M14 22 L46 22 L42 48 L18 48 Z" fill="none" stroke={c} strokeWidth="2"/>
      <path d="M46 26 Q56 28 50 40" fill="none" stroke={c} strokeWidth="2"/>
      <path d="M22 14 Q24 18 22 22 M30 14 Q32 18 30 22 M38 14 Q40 18 38 22" stroke={c} strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  plants: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <path d="M30 50 L30 30" stroke={c} strokeWidth="2"/>
      <path d="M30 36 Q18 30 16 18 Q26 22 30 32" fill={c} opacity="0.7"/>
      <path d="M30 32 Q42 26 46 14 Q34 18 30 28" fill={c} opacity="0.7"/>
      <rect x="22" y="48" width="16" height="8" fill={c}/>
    </svg>
  ),
  seat: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <path d="M8 36 L52 36 L48 50 L12 50 Z" fill={c} opacity="0.5"/>
      <rect x="10" y="20" width="20" height="18" fill="none" stroke={c} strokeWidth="2"/>
      <rect x="34" y="14" width="18" height="24" fill="none" stroke={c} strokeWidth="2"/>
    </svg>
  ),
  bowl: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <path d="M8 28 Q30 50 52 28 Z" fill={c} opacity="0.55"/>
      <circle cx="22" cy="30" r="3" fill={c}/>
      <circle cx="32" cy="32" r="4" fill={c}/>
      <circle cx="40" cy="29" r="2.5" fill={c}/>
      <path d="M6 28 L54 28" stroke={c} strokeWidth="1.5"/>
    </svg>
  ),
  leaf: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <path d="M30 8 Q50 20 30 52 Q10 20 30 8 Z" fill={c} opacity="0.7"/>
      <path d="M30 10 L30 50" stroke={c} strokeWidth="1.5"/>
    </svg>
  ),
  menu: (c: string) => (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="14" y="8" width="32" height="44" fill="none" stroke={c} strokeWidth="2"/>
      <line x1="18" y1="18" x2="42" y2="18" stroke={c} strokeWidth="1.4"/>
      <line x1="18" y1="26" x2="42" y2="26" stroke={c} strokeWidth="1.4"/>
      <line x1="18" y1="34" x2="36" y2="34" stroke={c} strokeWidth="1.4"/>
      <line x1="18" y1="42" x2="38" y2="42" stroke={c} strokeWidth="1.4"/>
    </svg>
  ),
};

const spots: PinSpot[] = [
  {
    name: "Slow Hours Café", kind: "cool café", x: 60, y: 22, color: "var(--terracotta)",
    highlights: ["Fast wifi 220Mbps", "Outlets at every table", "Sugar-free menu"],
    bestFor: "deep-work mornings and a sugar-free matcha",
    photos: [
      { label: "pour-over", draw: draw.cup },
      { label: "plant wall", draw: draw.plants },
      { label: "corner seat", draw: draw.seat },
    ],
    perspectives: [
      { community: "Digital nomads", emoji: "💻", verdict: "love",
        insight: "Big tables, outlet at every seat, wifi 220Mbps. Best deep-work spot in D3.", voices: 184 },
      { community: "Parents",        emoji: "👶", verdict: "avoid",
        insight: "Guests glare the moment kids make noise. Vibe shifts instantly — kids feel they're 'ruining' the room.", voices: 41 },
      { community: "Zero-sugar",     emoji: "🚫", verdict: "love",
        insight: "Unsweetened matcha, sugar-free syrups, sparkling water on tap. Owner gets it.", voices: 58 },
      { community: "Vegans",         emoji: "🌱", verdict: "mixed",
        insight: "Only one vegan pastry. Oat milk costs +20k. No real plant-based meal.", voices: 26 },
    ],
    totalVoices: 309,
    aiSummary: "Loved by nomads and the zero-sugar crowd. Avoid with small kids — the room punishes noise. Vegans have one option, that's it.",
    friends: 7,
  },
  {
    name: "Iron + Oak Gym", kind: "gym", x: 30, y: 32, color: "var(--pin)",
    highlights: ["Open 24h", "Bumper plates", "Women-only hour 7-9pm"],
    bestFor: "serious lifters who hate waiting for a rack",
    photos: [
      { label: "squat rack", draw: draw.rack },
      { label: "showers", draw: draw.shower },
      { label: "yoga corner", draw: draw.yoga },
    ],
    perspectives: [
      { community: "Lifters",   emoji: "🏋", verdict: "love",
        insight: "8 racks, bumper plates, deadlift platforms. You never wait.", voices: 210 },
      { community: "Women",     emoji: "♀",  verdict: "love",
        insight: "Women-only hour 7-9pm, always staffed. Feels safe at night.", voices: 92 },
      { community: "Beginners", emoji: "🌱", verdict: "mixed",
        insight: "No intro classes. Regulars are intense — can feel intimidating week one.", voices: 34 },
      { community: "Nomads",    emoji: "💻", verdict: "avoid",
        insight: "No lounge, lockers too small for a laptop. Not a 'gym + work' spot.", voices: 18 },
    ],
    totalVoices: 354,
    aiSummary: "Best lifting gym in D3 and safe for women after dark. Beginners feel out of place; not built for laptop-toting nomads.",
    friends: 4,
  },
  {
    name: "Hum Vegan Kitchen", kind: "vegan spot", x: 48, y: 48, color: "var(--sage)",
    highlights: ["100% vegan kitchen", "GF marked", "Kids menu"],
    bestFor: "strict vegans who also need gluten-free",
    photos: [
      { label: "buddha bowl", draw: draw.bowl },
      { label: "tofu mapo", draw: draw.leaf },
      { label: "menu", draw: draw.menu },
    ],
    perspectives: [
      { community: "Vegans",       emoji: "🌱", verdict: "love",
        insight: "100% vegan kitchen, owner is vegan, zero cross-contact risk.", voices: 167 },
      { community: "Celiac / GF",  emoji: "🌾", verdict: "love",
        insight: "GF noodles use rice flour, marked clearly on the menu.", voices: 73 },
      { community: "Parents",      emoji: "👶", verdict: "love",
        insight: "Kids menu, crayons, high chairs. Staff actually smile at toddlers.", voices: 49 },
      { community: "Meat-eaters",  emoji: "🍖", verdict: "mixed",
        insight: "Tofu mapo converts skeptics. Portions feel small if you're hungry.", voices: 22 },
    ],
    totalVoices: 311,
    aiSummary: "A safe yes for vegans, celiacs, and families with small kids. Big appetites should order an extra side.",
    friends: 3,
  },
];

const verdictStyle: Record<Verdict, { bg: string; label: string; tone: string }> = {
  love:  { bg: "bg-sage/30",       label: "LOVE",  tone: "text-sage" },
  avoid: { bg: "bg-terracotta/25", label: "AVOID", tone: "text-terracotta" },
  mixed: { bg: "bg-mustard/40",    label: "MIXED", tone: "text-ink-soft" },
};

function GlowPin({ spot, active, onClick }: { spot: PinSpot; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Show ${spot.name}`}
      className="absolute group"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%,-100%)" }}
    >
      {/* soft pink interactive halo for inactive pins */}
      {!active && (
        <motion.span
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "50%", top: "100%",
            width: 64, height: 64,
            transform: "translate(-50%,-50%)",
            background: "var(--pin)",
            filter: "blur(10px)",
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      <motion.span
        className="absolute rounded-full"
        style={{
          left: "50%", top: "100%",
          width: 60, height: 60,
          transform: "translate(-50%,-50%)",
          background: spot.color,
          filter: "blur(14px)",
          opacity: active ? 0.7 : 0.45,
        }}
        animate={active ? { scale: [1, 1.3, 1] } : { scale: [1, 1.25, 1] }}
        transition={{ duration: active ? 1.2 : 1.8, repeat: Infinity }}
      />
      <motion.div
        animate={{ y: active ? [0, -6, 0] : [0, -4, 0] }}
        transition={{ duration: active ? 0.8 : 1.2, repeat: Infinity }}
        className="relative"
      >
        <svg width={active ? 36 : 30} height={(active ? 36 : 30) * 1.4} viewBox="0 0 22 30">
          <path d="M11 0 C 4 0 0 5 0 11 C 0 18 11 30 11 30 C 11 30 22 18 22 11 C 22 5 18 0 11 0 Z"
            fill={spot.color} stroke="var(--ink)" strokeWidth="1.5"/>
          <circle cx="11" cy="11" r="4" fill="var(--paper)"/>
        </svg>
        {active && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 font-marker text-base whitespace-nowrap bg-paper border border-ink/50 px-2 rounded sticker">
            {spot.name}
          </div>
        )}
      </motion.div>
    </button>
  );
}

export function SlidePin() {
  const [idx, setIdx] = useState(0);
  const d = spots[idx];
  return (
    <SlideShell>
      <Eyebrow>pin context</Eyebrow>
      <H1 className="text-3xl md:text-6xl max-w-4xl mb-2">
        Every place remembers <span className="italic text-pin">what each community said.</span>
      </H1>
      <p className="text-sm md:text-lg text-ink-soft max-w-3xl mb-4 md:mb-5">
        Open any pin — see how parents, nomads, vegans, lifters and more actually experienced it. Plus the photos, the highlights, and an AI summary of the room.
      </p>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 min-h-0">
        {/* map */}
        <div className="md:col-span-2 border-2 border-ink sticker bg-paper relative overflow-hidden aspect-[4/3] md:aspect-auto">
          <StylizedMap tint={d.color} showLabels={false}>
            {spots.map((s, i) => (
              <GlowPin key={s.name} spot={s} active={i === idx} onClick={() => setIdx(i)} />
            ))}
          </StylizedMap>
          <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 font-marker text-xs md:text-sm text-ink-soft bg-paper/80 px-2 py-1 rounded">
            ↑ open any glowing pin
          </div>
        </div>

        {/* detail panel */}
        <div className="md:col-span-3 grid grid-rows-[auto_auto_auto] md:grid-rows-[auto_1fr_auto] gap-3 md:gap-4 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="contents"
            >
              {/* community history — the hero of this slide */}
              <PaperCard rotate={0.4} className="min-h-0 overflow-hidden">
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <div className="font-marker text-sm md:text-lg text-terracotta truncate">community · {d.name}</div>
                  <div className="font-marker text-xs md:text-sm text-ink-soft shrink-0">{d.totalVoices} voices · {d.friends} friends</div>
                </div>
                <div className="bg-mustard/60 border border-ink/40 p-2.5 md:p-3 mb-3">
                  <div className="font-marker text-[10px] md:text-xs uppercase tracking-wider text-ink-soft mb-1">✦ AI summary</div>
                  <div className="font-display text-[13px] md:text-[15px] leading-snug">{d.aiSummary}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {d.perspectives.map((p) => {
                    const v = verdictStyle[p.verdict];
                    return (
                      <div key={p.community} className={`border border-ink/50 p-2 md:p-2.5 ${v.bg}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base md:text-lg leading-none">{p.emoji}</span>
                          <span className="font-display font-bold text-[12px] md:text-[14px] flex-1 min-w-0 truncate">{p.community}</span>
                          <span className={`font-marker text-[9px] md:text-[10px] px-1.5 py-0.5 bg-paper border border-ink/60 ${v.tone}`}>{v.label}</span>
                        </div>
                        <div className="font-display text-[11px] md:text-[12px] leading-snug text-ink">{p.insight}</div>
                        <div className="font-marker text-[10px] text-ink-soft mt-1">{p.voices} voices</div>
                      </div>
                    );
                  })}
                </div>
              </PaperCard>

              {/* photos */}
              <PaperCard rotate={-0.5}>
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <div className="font-marker text-sm md:text-lg text-terracotta">photos that matter</div>
                  <div className="font-marker text-xs md:text-sm text-ink-soft shrink-0 hidden sm:block">picked from community uploads</div>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {d.photos.map((p) => (
                    <div key={p.label} className="border border-ink/40 bg-paper-2 p-1.5 md:p-2 flex flex-col">
                      <div className="aspect-[4/3]">{p.draw(d.color)}</div>
                      <div className="font-marker text-xs md:text-sm text-ink-soft mt-1 text-center">{p.label}</div>
                    </div>
                  ))}
                </div>
              </PaperCard>

              {/* highlights */}
              <PaperCard rotate={-0.3} className="bg-mustard">
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                  <div className="font-marker text-sm md:text-lg text-ink-soft shrink-0">best for →</div>
                  <div className="font-display text-base md:text-xl flex-1">{d.bestFor}</div>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                  {d.highlights.map((h) => (
                    <span key={h} className="px-2 py-0.5 md:py-1 bg-paper border border-ink/50 font-marker text-xs md:text-sm">{h}</span>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}

/* 12. Rewards — RPG-style contribution */
type Rarity = "common" | "rare" | "epic" | "legendary";
type Loot = {
  glyph: string;
  name: string;
  via: string;     // action that drops it
  rarity: Rarity;
};
const rarityStyle: Record<Rarity, { bg: string; ring: string; label: string }> = {
  common:    { bg: "bg-paper-2",       ring: "border-ink/40",       label: "common" },
  rare:      { bg: "bg-sage/30",       ring: "border-sage",         label: "rare" },
  epic:      { bg: "bg-pin/25",        ring: "border-pin",          label: "epic" },
  legendary: { bg: "bg-mustard",       ring: "border-terracotta",   label: "legendary" },
};
const loot: Loot[] = [
  { glyph: "🌱", name: "Vegan Stamp",       via: "tagged Hum Vegan",        rarity: "common" },
  { glyph: "📷", name: "Golden Polaroid",   via: "best photo · Slow Hours", rarity: "rare" },
  { glyph: "🗝", name: "Hidden Door Key",   via: "added secret rooftop",    rarity: "epic" },
  { glyph: "👶", name: "Family Charm",      via: "confirmed cradle · Hyatt",rarity: "rare" },
  { glyph: "🎟", name: "Open Mic Ticket",   via: "covered jam · Observatory", rarity: "common" },
  { glyph: "🌙", name: "Night-Owl Sigil",   via: "mapped 5 late-night spots", rarity: "epic" },
  { glyph: "✦",  name: "Curator's Crown",   via: "guide hit 1k followers",  rarity: "legendary" },
  { glyph: "🍵", name: "Matcha Token",      via: "rated 3 cafés",           rarity: "common" },
];
const shopExchanges = [
  { glyph: "🍵", trade: "Matcha Token", at: "Shin Coffee", reward: "free matcha" },
  { glyph: "👶", trade: "Family Charm", at: "Park Hyatt",  reward: "cradle on the house" },
  { glyph: "🎟", trade: "Open Mic Ticket", at: "Observatory", reward: "skip the line" },
  { glyph: "✦",  trade: "Curator's Crown", at: "any partner", reward: "20% off, anywhere" },
];

export function SlideRewards() {
  const [collected, setCollected] = useState(3);
  const slots = 8;
  return (
    <SlideShell>
      <Eyebrow>contribution</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-4xl mb-3">
        Contributing is a <span className="italic text-pin">game.</span>
      </H1>
      <p className="text-base md:text-lg text-ink-soft max-w-3xl mb-5 md:mb-6">
        Every tag, photo, or guide drops loot into your backpack. Collect, mix, and trade items at partner spots around the world — like a city-sized RPG.
      </p>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 min-h-0">
        {/* Backpack */}
        <div className="md:col-span-3 border-2 border-ink sticker bg-paper-2 p-3 md:p-5 flex flex-col">
          <div className="flex items-baseline justify-between mb-3">
            <div className="font-marker text-base md:text-xl text-terracotta">🎒 your backpack</div>
            <div className="font-marker text-xs md:text-sm text-ink-soft">{collected} / {slots} slots</div>
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-3 flex-1">
            {Array.from({ length: slots }).map((_, i) => {
              const item = i < collected ? loot[i] : null;
              if (!item) {
                return (
                  <div key={i} className="border-2 border-dashed border-ink/30 rounded bg-paper/40 aspect-square flex items-center justify-center">
                    <span className="font-marker text-xs md:text-sm text-ink-soft/60">empty</span>
                  </div>
                );
              }
              const r = rarityStyle[item.rarity];
              return (
                <motion.div
                  key={item.name}
                  initial={{ scale: 0.4, opacity: 0, y: -30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: i * 0.05 }}
                  className={`relative border-2 ${r.ring} rounded ${r.bg} aspect-square flex flex-col items-center justify-center p-1 sticker overflow-hidden`}
                  style={{ transform: `rotate(${(i%2?1:-1)*1.5}deg)` }}
                >
                  <div className="text-2xl md:text-3xl leading-none">{item.glyph}</div>
                  <div className="font-display font-bold text-[10px] md:text-[11px] text-center mt-1 leading-tight px-0.5">{item.name}</div>
                  <div className="font-marker text-[8px] md:text-[9px] text-ink-soft text-center leading-tight px-0.5 line-clamp-2">{item.via}</div>
                  <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 font-marker text-[7px] md:text-[8px] uppercase tracking-wider bg-paper px-1 border border-ink/40 rounded">{r.label}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 flex-wrap">
            <div className="relative inline-block">
              {collected < loot.length && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded pointer-events-none"
                  style={{ background: "var(--pin)", filter: "blur(16px)" }}
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
              <motion.button
                onClick={() => setCollected((c) => Math.min(loot.length, c + 1))}
                disabled={collected >= loot.length}
                whileTap={{ scale: 0.95 }}
                animate={collected < loot.length ? { scale: [1, 1.05, 1], boxShadow: ["3px 3px 0 var(--ink)", "5px 5px 0 var(--ink)", "3px 3px 0 var(--ink)"] } : {}}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="relative px-3 py-2 md:px-5 md:py-2.5 bg-pin text-paper border-2 border-ink sticker font-marker text-sm md:text-lg disabled:opacity-40 flex items-center gap-2"
              >
                contribute
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>🎁</motion.span>
              </motion.button>
            </div>
            <button
              onClick={() => setCollected(0)}
              className="px-3 py-2 md:px-4 md:py-2.5 bg-paper border-2 border-ink sticker font-marker text-sm md:text-base"
            >
              reset
            </button>
          </div>
        </div>

        {/* Shop / exchanges */}
        <div className="md:col-span-2 border-2 border-ink sticker bg-paper p-3 md:p-5 flex flex-col">
          <div className="font-marker text-base md:text-xl text-terracotta mb-1">🏪 trade at partner spots</div>
          <div className="font-marker text-xs md:text-sm text-ink-soft mb-3 md:mb-4">items unlock real-world rewards across the world.</div>
          <div className="space-y-2 md:space-y-3 flex-1">
            {shopExchanges.map((s, i) => (
              <motion.div
                key={s.trade}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 md:gap-3 border border-ink/40 bg-paper-2 p-2 md:p-3 rounded"
                style={{ transform: `rotate(${(i%2?1:-1)*0.6}deg)` }}
              >
                <div className="text-2xl md:text-3xl shrink-0">{s.glyph}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[12px] md:text-[14px] leading-tight truncate">{s.trade}</div>
                  <div className="font-marker text-[10px] md:text-xs text-ink-soft truncate">at {s.at}</div>
                </div>
                <div className="font-marker text-lg md:text-2xl text-ink-soft shrink-0">→</div>
                <div className="font-display text-[11px] md:text-[13px] text-pin font-bold text-right max-w-[90px] md:max-w-[120px] leading-tight shrink-0">{s.reward}</div>
              </motion.div>
            ))}
          </div>
          <div className="font-marker text-[10px] md:text-xs text-ink-soft mt-3 italic">play the city. level up. unlock the world.</div>
        </div>
      </div>
    </SlideShell>
  );
}

/* 13. Smart UX defaults */
const defaults = [
  { icon: "🟢", t: "Open now, by default", d: "Hide what you can't visit. Surface what's alive right now." },
  { icon: "🍹", t: "Happy hour glows", d: "Pins pulse when a deal is on. Sunset spots shimmer at golden hour." },
  { icon: "📶", t: "Auto Wi-Fi", d: "Enter a laptop-friendly café? Your phone just connects. Magic, not menus." },
  { icon: "🗺", t: "Living zones", d: "Safe · hipster · tourist · industrial — the city paints itself." },
  { icon: "🥬", t: "Today, here", d: "Farmer's market in 200m. Pop-up opens in 1h. Sunset at the rooftop in 40m." },
];
export function SlideUX() {
  return (
    <SlideShell>
      <Eyebrow>ux that just gets it</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-10">
        Defaults that feel like <span className="italic text-pin">a local friend.</span>
      </H1>
      <div className="grid grid-cols-5 gap-5 flex-1">
        {defaults.map((d, i) => (
          <motion.div
            key={d.t}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="bg-paper border-2 border-ink sticker p-5 flex flex-col"
            style={{ transform: `rotate(${(i%2?1:-1)*0.8}deg)` }}
          >
            <div className="text-5xl mb-3">{d.icon}</div>
            <div className="font-display font-bold text-xl mb-2">{d.t}</div>
            <div className="text-ink-soft text-sm">{d.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

/* 14. Competition 2x2 */
const competitors = [
  { name: "Google Maps", x: 25, y: 35 },
  { name: "ChatGPT / Gemini", x: 45, y: 50 },
  { name: "IG / Substack lists", x: 30, y: 60 },
  { name: "Reddit / FB groups", x: 55, y: 30 },
  { name: "Wisepass / AllTrails", x: 65, y: 55 },
  { name: "Corner / Where", x: 70, y: 70 },
  { name: "Vibecoded maps", x: 55, y: 75 },
];
export function SlideCompetition() {
  return (
    <SlideShell>
      <Eyebrow>competition</Eyebrow>
      <H1 className="text-4xl md:text-6xl max-w-3xl mb-6 md:mb-8">
        Nobody is <span className="italic text-pin">both</span> personal <em>and</em> alive.
      </H1>
      <div className="flex-1 relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div className="relative border-2 border-ink sticker bg-paper-2 aspect-square md:aspect-auto">
          {/* Axes */}
          <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-ink/40" />
          <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-ink/40" />
          {/* labels */}
          <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 font-marker text-sm md:text-lg text-ink-soft">↑ living</div>
          <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 font-marker text-sm md:text-lg text-ink-soft">static ↓</div>
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 font-marker text-sm md:text-lg text-ink-soft md:-rotate-90">← generic</div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 font-marker text-sm md:text-lg text-ink-soft md:rotate-90">personal →</div>
          {/* dots */}
          {competitors.map((c) => (
            <div
              key={c.name}
              className="absolute"
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-ink/70" />
              <div className="font-marker text-[10px] md:text-sm text-ink-soft whitespace-nowrap mt-1">{c.name}</div>
            </div>
          ))}
          {/* us */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, delay: 0.4 }}
            className="absolute"
            style={{ left: "82%", top: "15%", transform: "translate(-50%,-50%)" }}
          >
            <div className="bg-pin border-2 border-ink sticker px-2 py-1 md:px-3 md:py-1.5 font-display font-bold text-xs md:text-base text-paper whitespace-nowrap">
              hypermaps
            </div>
            <svg className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2" width="20" height="14" viewBox="0 0 20 14">
              <path d="M 0 0 L 20 0 L 10 14 Z" fill="var(--pin)" stroke="var(--ink)" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
        <div className="md:w-64 flex flex-col md:justify-center text-ink-soft text-sm md:text-base space-y-2 md:space-y-3">
          <p><b className="text-ink">Up-right</b> is empty. That's where a map of <em>your</em> world lives.</p>
          <p>Everyone else is either generic or frozen in time.</p>
        </div>
      </div>
    </SlideShell>
  );
}

/* 15. Close */
export function SlideClose() {
  return (
    <SlideShell className="items-center justify-center text-center relative overflow-hidden">
      {[0,1,2,3,4].map(i => (
        <motion.div
          key={i}
          className="absolute inset-0 opacity-20"
          animate={{ x: [-50, 50, -50], y: [-20, 20, -20] }}
          transition={{ duration: 12 + i*2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: `translate(${i*60}px, ${i*30}px) rotate(${i*3}deg)` }}
        >
          <StylizedMap tint={["var(--sage)","var(--terracotta)","var(--mustard)","var(--pin)","var(--water)"][i]} showLabels={false}/>
        </motion.div>
      ))}
      <div className="relative z-10 max-w-4xl">
        <Eyebrow>the vision</Eyebrow>
        <H1 className="text-5xl md:text-[8rem] leading-[0.9]">
          Belong <span className="italic text-pin">anywhere.</span>
        </H1>
        <p className="font-display italic text-lg md:text-2xl text-ink-soft mt-6 md:mt-8 max-w-3xl mx-auto">
          A world where every city reveals communities, spaces, and experiences that resonate with who you are.
        </p>
        <div className="mt-8 md:mt-12 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
          <a href="mailto:hello@hypermaps.world" className="px-4 py-2 md:px-6 md:py-3 bg-ink text-paper border-2 border-ink sticker font-display font-bold text-sm md:text-lg">
            hello@hypermaps.world
          </a>
          <a href="https://hypermaps.world" className="px-4 py-2 md:px-6 md:py-3 bg-pin text-paper border-2 border-ink sticker font-display font-bold text-sm md:text-lg">
            hypermaps.world
          </a>
        </div>
        <div className="mt-8 md:mt-10 font-marker text-base md:text-xl text-terracotta">thanks for scrolling →</div>
      </div>
    </SlideShell>
  );
}
