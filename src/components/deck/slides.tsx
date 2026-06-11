import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideShell, Eyebrow, H1, Pin, PaperCard } from "./primitives";
import { StylizedMap } from "./StylizedMap";
import globe from "@/assets/deck/globe.png";
import personas from "@/assets/deck/personas.jpg";
import pack from "@/assets/deck/pack.png";

/* 1. Cover */
export function SlideCover() {
  return (
    <SlideShell className="items-center justify-center text-center">
      <motion.img
        src={globe}
        alt="Hand-drawn globe with pins"
        width={520}
        height={520}
        className="w-[36vh] max-w-[420px] mb-6 drop-shadow-[3px_5px_0_rgba(26,23,20,0.2)]"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      />
      <Eyebrow>a pitch deck · 2026</Eyebrow>
      <H1 className="text-7xl md:text-8xl">
        hypermaps<span className="text-pin">.world</span>
      </H1>
      <p className="font-display italic text-2xl md:text-3xl text-ink-soft mt-6 max-w-2xl">
        Find where you belong.
      </p>
      <div className="mt-10 font-marker text-xl text-terracotta animate-pulse">
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
  return (
    <SlideShell>
      <Eyebrow>problem 01</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-4xl mb-10">
        The same city means <span className="text-terracotta italic">different things</span> to different people.
      </H1>
      <div className="grid grid-cols-3 grid-rows-2 gap-6 flex-1 max-w-5xl">
        {personaQuotes.map((p, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative bg-paper border-2 border-ink sticker p-4 overflow-hidden cursor-pointer"
            style={{ transform: `rotate(${[-1.5, 1, -0.5, 1.5, -1, 0.8][i]}deg)` }}
            whileHover={{ scale: 1.04, zIndex: 5 }}
          >
            <div
              className="aspect-[3/2] bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${personas})`,
                backgroundSize: "300% 200%",
                backgroundPosition: `${(i % 3) * 50}% ${Math.floor(i / 3) * 100}%`,
              }}
            />
            <div className="mt-2 font-marker text-lg text-ink-soft">{p.name}</div>
            <AnimatePresence>
              {hover === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-ink/95 text-paper p-5 flex items-center font-display italic text-lg"
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
      <H1 className="text-5xl md:text-6xl max-w-3xl">
        Knowledge <span className="text-terracotta italic">leaks away.</span>
      </H1>
      <div className="flex-1 grid grid-cols-5 gap-10 items-center mt-6">
        <div className="col-span-2 space-y-4 text-lg text-ink-soft">
          <p>Useful local recommendations are shared every day — across TikTok, Instagram, Reddit, Facebook Groups, WhatsApp, Telegram, and private conversations.</p>
          <p>Most are impossible to find a month later.</p>
        </div>
        <div className="col-span-3 h-full relative">
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
                <Pin x={0} y={0} delay={0} size={16} color={p.c} />
                <motion.div
                  className="absolute left-3 top-1 whitespace-nowrap bg-paper border border-ink/60 sticker px-2 py-1 shadow-[2px_2px_0_rgba(26,23,20,0.15)]"
                  style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg)` }}
                  animate={{
                    opacity: [1, 0.4, 0, 0, 1],
                    filter: ["blur(0px)", "blur(1px)", "blur(4px)", "blur(4px)", "blur(0px)"],
                    y: [0, -4, -14, -14, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: i * 0.35 + 0.2, times: [0, 0.3, 0.5, 0.85, 1] }}
                >
                  <div className="font-marker text-[11px] leading-tight text-ink max-w-[150px] whitespace-normal">
                    "{p.tip}"
                  </div>
                  <div className="text-[9px] text-ink-soft italic mt-0.5">{p.src}</div>
                </motion.div>
              </motion.div>
            ))}
            <div className="absolute bottom-2 right-2 font-marker text-xs text-terracotta bg-paper/80 px-2 py-0.5 rounded">
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
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-3">
        Every world cares about <span className="italic text-pin">different things.</span>
      </H1>
      <p className="text-lg text-ink-soft max-w-2xl mb-5">
        Same city. Different lens. Pick a world — the filters, the pins, even the events on the map shift to what that tribe actually looks for.
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {worlds.map(w => (
          <button
            key={w.id}
            onClick={() => setActive(w.id)}
            className={`px-4 py-2 rounded-full border-2 border-ink font-marker text-lg transition-all ${
              active === w.id ? "bg-ink text-paper sticker" : "bg-paper hover:bg-paper-2"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        {/* Map */}
        <div className="col-span-2 relative border-2 border-ink sticker bg-paper-2 overflow-hidden">
          <div className="absolute top-3 left-4 font-marker text-xl z-10 text-ink-soft">Saigon · {world.tagline}</div>
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
                    <Pin x={p.x} y={p.y} label={p.label} delay={0.1 + i * 0.08} color={world.tint} size={26} />
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className="absolute font-marker text-[13px] text-ink bg-paper/85 px-1.5 py-0.5 rounded border border-ink/30 whitespace-nowrap"
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
            className="flex flex-col gap-4 min-h-0"
          >
            <div className="border-2 border-ink sticker bg-paper p-4">
              <div className="font-marker text-base text-ink-soft mb-2">filters this world cares about</div>
              <div className="flex flex-wrap gap-1.5">
                {world.filters.map(f => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded-full border-2 border-ink text-sm bg-paper-2"
                    style={{ background: world.tint, color: "var(--paper)" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-2 border-ink sticker bg-paper p-4 flex-1 min-h-0 overflow-auto">
              <div className="font-marker text-base text-ink-soft mb-2">happening · for this world</div>
              <ul className="space-y-2">
                {world.events.map(e => (
                  <li key={e.title} className="flex gap-2 items-start">
                    <span
                      className="font-marker text-sm px-2 py-0.5 rounded border-2 border-ink whitespace-nowrap"
                      style={{ background: world.tint, color: "var(--paper)" }}
                    >
                      {e.when}
                    </span>
                    <span className="text-sm text-ink leading-snug">{e.title}</span>
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
      <Eyebrow>matching</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-4xl mb-3">
        We match you with places of <span className="italic text-pin">your vibe.</span>
      </H1>
      <p className="text-lg text-ink-soft max-w-3xl mb-10">
        Vibe isn't magic — it's an <b>approximation</b>. We stack niche factual data, reviews from people like you, signals from your friends, and an AI estimate of who you are right now. The more you use the map, the sharper the guess.
      </p>

      <div className="grid grid-cols-5 gap-8 flex-1 items-center">
        {/* Left: 3 inputs */}
        <div className="col-span-2 space-y-4">
          <div className="font-marker text-xl text-terracotta mb-1">what we read</div>
          {["Who you are", "Where you are", "What you need"].map((t, i) => (
            <PaperCard key={t} rotate={i === 1 ? 1 : -1.2} className="bg-paper-2 flex items-baseline gap-4">
              <div className="font-display font-extrabold text-3xl text-pin">{i+1}</div>
              <div>
                <div className="font-display font-bold text-2xl leading-tight">{t}</div>
                <div className="font-marker text-base text-ink-soft">
                  {i === 0 && "history, taste, the worlds you belong to"}
                  {i === 1 && "city, neighborhood, this exact corner"}
                  {i === 2 && "right now: jam, eat, hide, wander"}
                </div>
              </div>
            </PaperCard>
          ))}
        </div>

        {/* Middle: signals stack */}
        <div className="col-span-2 space-y-3">
          <div className="font-marker text-xl text-terracotta mb-1">what we stack</div>
          {vibeSignals.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="border-2 border-ink sticker p-3 px-4"
              style={{ background: s.color, transform: `rotate(${-1.5 + i * 0.8}deg)` }}
            >
              <div className="font-display font-bold text-lg leading-tight">{s.name}</div>
              <div className="font-marker text-base text-ink-soft leading-tight">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Right: synchronicity dial */}
        <div className="col-span-1 flex flex-col items-center">
          <svg width="140" height="140" viewBox="0 0 120 120">
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
          <div className="font-marker text-xl mt-3 text-ink-soft text-center leading-tight">synchronicity,<br/>on tap</div>
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
      <H1 className="text-5xl md:text-6xl max-w-4xl mb-3">
        Everyone gets a <span className="italic text-pin">profile.</span> Even places, brands and lists.
      </H1>
      <p className="text-lg text-ink-soft max-w-3xl mb-6">
        A profile is a person, a brand, a curated list or a guide — each with its own map and a live feed of what they're doing on it.
      </p>
      <div className="grid grid-cols-4 gap-5 flex-1">
        {profiles.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="bg-paper border-2 border-ink sticker p-4 flex flex-col"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.2}deg)` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center font-display text-xl text-paper shrink-0"
                style={{ background: p.color }}
              >
                {p.glyph}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-lg leading-tight truncate">{p.name}</div>
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
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-3">
        Toss a question <span className="italic text-pin">into the ether.</span>
      </H1>
      <p className="text-lg text-ink-soft max-w-2xl mb-8">
        AI answers first. Nearby locals — auto-matched to your keywords — chime in seconds later. Uber-like, for knowing things.
      </p>
      <div className="flex-1 grid grid-cols-2 gap-10">
        <div className="space-y-3">
          {visible.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 max-w-md border-2 border-ink sticker ${
                m.who === "you" ? "ml-auto bg-pin text-paper" :
                m.who === "ai" ? "bg-mustard" : "bg-paper"
              }`}
            >
              {m.who === "local" && (
                <div className="font-marker text-sm text-terracotta mb-1">{("name" in m && m.name) || "local"}</div>
              )}
              {m.who === "ai" && <div className="font-marker text-sm text-ink-soft mb-1">🤖 local AI</div>}
              <div className="font-display">{m.text}</div>
            </motion.div>
          ))}
          <button
            onClick={() => setStep(s => s >= chatScript.length ? 1 : s + 1)}
            className="mt-4 px-4 py-2 border-2 border-ink sticker bg-paper hover:bg-mustard font-marker text-lg"
          >
            {step >= chatScript.length ? "replay ↻" : "next reply →"}
          </button>
        </div>
        <div className="relative border-2 border-ink sticker bg-paper-2">
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

/* 11. Pin context */
type PinPhoto = { label: string; draw: (c: string) => React.ReactNode };
type PinThread = { q: string; replies: number; hot?: boolean };
type PinSpot = {
  name: string;
  kind: string;
  x: number; y: number;
  color: string;
  highlights: string[];
  bestFor: string;
  photos: PinPhoto[];
  threads: PinThread[];
  aiSummary: string;
  threadCount: number;
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
    name: "Iron + Oak Gym", kind: "gym", x: 30, y: 32, color: "var(--pin)",
    highlights: ["Open 24h", "Bumper plates", "Women-only hour 7-9pm"],
    bestFor: "serious lifters who hate waiting for a rack",
    photos: [
      { label: "squat rack", draw: draw.rack },
      { label: "showers", draw: draw.shower },
      { label: "yoga corner", draw: draw.yoga },
    ],
    threads: [
      { q: "Is it safe for women at night?", replies: 47, hot: true },
      { q: "Air quality / ventilation?", replies: 22 },
      { q: "Do they have deadlift platforms?", replies: 14 },
    ],
    threadCount: 83,
    aiSummary: "Locals say it's the cleanest rack-heavy gym in D3. Women feel safe after 7pm (staffed). A/C struggles on Saturday mornings.",
    friends: 4,
  },
  {
    name: "Slow Hours Café", kind: "cool café", x: 60, y: 22, color: "var(--terracotta)",
    highlights: ["Fast wifi", "Outlets at every table", "Quiet 'til 11am"],
    bestFor: "long deep-work sessions and a good matcha",
    photos: [
      { label: "pour-over", draw: draw.cup },
      { label: "plant wall", draw: draw.plants },
      { label: "corner seat", draw: draw.seat },
    ],
    threads: [
      { q: "Wifi speed for video calls?", replies: 31, hot: true },
      { q: "Outlets near the window?", replies: 12 },
      { q: "Loud after 2pm?", replies: 9 },
    ],
    threadCount: 52,
    aiSummary: "Best café in the area for laptop work mornings. Wifi 200+ Mbps. Gets loud after 2pm — bring headphones or leave by then.",
    friends: 7,
  },
  {
    name: "Hum Vegan Kitchen", kind: "vegan spot", x: 48, y: 48, color: "var(--sage)",
    highlights: ["Fully vegan", "GF marked", "Owner is vegan"],
    bestFor: "strict vegans who also need gluten-free",
    photos: [
      { label: "buddha bowl", draw: draw.bowl },
      { label: "tofu mapo", draw: draw.leaf },
      { label: "menu", draw: draw.menu },
    ],
    threads: [
      { q: "Are the noodles really GF?", replies: 28, hot: true },
      { q: "Soy-free options?", replies: 18 },
      { q: "Owner vegan or just vegan-friendly?", replies: 11 },
    ],
    threadCount: 57,
    aiSummary: "Genuinely 100% vegan kitchen, no cross-contact. GF noodles use rice flour. Soy-free menu exists but you have to ask.",
    friends: 3,
  },
];

function GlowPin({ spot, active, onClick }: { spot: PinSpot; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%,-100%)" }}
    >
      {/* glow halo */}
      <motion.span
        className="absolute rounded-full"
        style={{
          left: "50%", top: "100%",
          width: 60, height: 60,
          transform: "translate(-50%,-50%)",
          background: spot.color,
          filter: "blur(14px)",
          opacity: active ? 0.7 : 0.35,
        }}
        animate={active ? { scale: [1, 1.3, 1] } : { scale: [1, 1.15, 1] }}
        transition={{ duration: active ? 1.2 : 2.4, repeat: Infinity }}
      />
      <motion.div
        animate={{ y: active ? [0, -6, 0] : [0, -3, 0] }}
        transition={{ duration: active ? 0.8 : 1.6, repeat: Infinity }}
        className="relative"
      >
        <svg width={active ? 36 : 28} height={(active ? 36 : 28) * 1.4} viewBox="0 0 22 30">
          <path d="M11 0 C 4 0 0 5 0 11 C 0 18 11 30 11 30 C 11 30 22 18 22 11 C 22 5 18 0 11 0 Z"
            fill={spot.color} stroke="var(--ink)" strokeWidth="1.5"/>
          <circle cx="11" cy="11" r="4" fill="var(--paper)"/>
        </svg>
        <div className="absolute left-1/2 -translate-x-1/2 -top-7 font-marker text-base whitespace-nowrap bg-paper border border-ink/50 px-2 rounded sticker">
          {active ? spot.name : "tap me"}
        </div>
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
      <H1 className="text-5xl md:text-6xl max-w-4xl mb-2">
        Tap a pin. See <span className="italic text-pin">what you actually care about.</span>
      </H1>
      <p className="text-lg text-ink-soft max-w-2xl mb-5">
        Photos that matter, an AI-summarized community thread, and the highlights people <em>actually</em> show up for.
      </p>
      <div className="flex-1 grid grid-cols-5 gap-6 min-h-0">
        {/* map */}
        <div className="col-span-2 border-2 border-ink sticker bg-paper relative overflow-hidden">
          <StylizedMap tint={d.color} showLabels={false}>
            {spots.map((s, i) => (
              <GlowPin key={s.name} spot={s} active={i === idx} onClick={() => setIdx(i)} />
            ))}
          </StylizedMap>
          <div className="absolute bottom-3 left-3 right-3 font-marker text-sm text-ink-soft bg-paper/80 px-2 py-1 rounded">
            ↑ tap any glowing pin
          </div>
        </div>

        {/* detail panel */}
        <div className="col-span-3 grid grid-rows-[auto_1fr_auto] gap-4 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="contents"
            >
              {/* photos */}
              <PaperCard rotate={-0.5}>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-marker text-lg text-terracotta">photos that matter</div>
                  <div className="font-display text-2xl">{d.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {d.photos.map((p) => (
                    <div key={p.label} className="border border-ink/40 bg-paper-2 p-2 flex flex-col">
                      <div className="aspect-[4/3]">{p.draw(d.color)}</div>
                      <div className="font-marker text-sm text-ink-soft mt-1 text-center">{p.label}</div>
                    </div>
                  ))}
                </div>
              </PaperCard>

              {/* threads + AI summary */}
              <PaperCard rotate={0.4} className="min-h-0 overflow-hidden">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-marker text-lg text-terracotta">community threads</div>
                  <div className="font-marker text-sm text-ink-soft">{d.threadCount} discussions · {d.friends} friends here</div>
                </div>
                <div className="bg-mustard/60 border border-ink/40 p-3 mb-3">
                  <div className="font-marker text-xs uppercase tracking-wider text-ink-soft mb-1">✦ AI summary</div>
                  <div className="font-display text-[15px] leading-snug">{d.aiSummary}</div>
                </div>
                <div className="space-y-2">
                  {d.threads.map((t) => (
                    <div key={t.q} className="flex items-center gap-3 border-l-4 border-pin pl-3 py-1">
                      <div className="font-display flex-1">{t.q}</div>
                      {t.hot && <span className="font-marker text-xs text-terracotta">🔥 hot</span>}
                      <span className="font-marker text-sm text-ink-soft">{t.replies} replies</span>
                    </div>
                  ))}
                </div>
              </PaperCard>

              {/* highlights */}
              <PaperCard rotate={-0.3} className="bg-mustard">
                <div className="flex items-baseline gap-4">
                  <div className="font-marker text-lg text-ink-soft">best for →</div>
                  <div className="font-display text-xl flex-1">{d.bestFor}</div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {d.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-paper border border-ink/50 font-marker text-sm">{h}</span>
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

/* 12. Rewards */
const rewards = ["Free matcha at Shin", "20% off · Things Café", "Mystery dish · Hum Vegan", "Skip the line · The Workshop"];
export function SlideRewards() {
  const [opened, setOpened] = useState(-1);
  return (
    <SlideShell>
      <Eyebrow>contribution</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-3">
        Contributing feels like <span className="italic text-pin">opening a pack.</span>
      </H1>
      <p className="text-lg text-ink-soft max-w-2xl mb-10">
        Update a closed spot. Add a vegan tag. Curate a guide. Get a mystery reward — and competence that compounds.
      </p>
      <div className="flex-1 grid grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center">
          <motion.img
            src={pack}
            alt="Mystery pack"
            width={300}
            height={400}
            className="w-64 cursor-pointer drop-shadow-[3px_5px_0_rgba(26,23,20,0.3)]"
            whileHover={{ rotate: [-2, 2, -2, 0] }}
            onClick={() => setOpened((o) => Math.min(rewards.length - 1, o + 1))}
            animate={opened >= 0 ? { y: [0, -10, 0] } : {}}
          />
          <button
            onClick={() => setOpened((o) => (o >= rewards.length - 1 ? -1 : o + 1))}
            className="mt-6 px-6 py-3 bg-pin text-paper border-2 border-ink sticker font-marker text-xl"
          >
            {opened === -1 ? "tap to open" : opened >= rewards.length - 1 ? "reset" : "open next"}
          </button>
        </div>
        <div className="space-y-3">
          {rewards.map((r, i) => (
            <AnimatePresence key={r}>
              {i <= opened && (
                <motion.div
                  initial={{ rotateY: 180, opacity: 0, x: -40 }}
                  animate={{ rotateY: 0, opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="p-5 border-2 border-ink sticker bg-mustard font-display text-2xl"
                  style={{ transform: `rotate(${(i%2?1:-1)*1.5}deg)` }}
                >
                  🎁 {r}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
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
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-8">
        Nobody is <span className="italic text-pin">both</span> personal <em>and</em> alive.
      </H1>
      <div className="flex-1 relative grid grid-cols-[1fr_auto] gap-4">
        <div className="relative border-2 border-ink sticker bg-paper-2">
          {/* Axes */}
          <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-ink/40" />
          <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-ink/40" />
          {/* labels */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 font-marker text-lg text-ink-soft">↑ living map</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-marker text-lg text-ink-soft">static lists ↓</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 font-marker text-lg text-ink-soft">generic ←</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 font-marker text-lg text-ink-soft">→ personal</div>
          {/* dots */}
          {competitors.map((c) => (
            <div
              key={c.name}
              className="absolute"
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <div className="w-3 h-3 rounded-full bg-ink/70" />
              <div className="font-marker text-sm text-ink-soft whitespace-nowrap mt-1">{c.name}</div>
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
            <div className="bg-pin border-2 border-ink sticker px-3 py-1.5 font-display font-bold text-paper">
              hypermaps.world
            </div>
            <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2" width="20" height="14" viewBox="0 0 20 14">
              <path d="M 0 0 L 20 0 L 10 14 Z" fill="var(--pin)" stroke="var(--ink)" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
        <div className="w-64 flex flex-col justify-center text-ink-soft text-sm space-y-3">
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
        <H1 className="text-7xl md:text-[8rem] leading-[0.9]">
          Multidimensional <br/><span className="italic text-pin">belonging.</span>
        </H1>
        <p className="font-display italic text-2xl text-ink-soft mt-8 max-w-2xl mx-auto">
          A world where the right place, the right person, the right moment find you — naturally, playfully, often.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          <a href="mailto:hello@hypermaps.world" className="px-6 py-3 bg-ink text-paper border-2 border-ink sticker font-display font-bold text-lg">
            hello@hypermaps.world
          </a>
          <a href="https://hypermaps.world" className="px-6 py-3 bg-pin text-paper border-2 border-ink sticker font-display font-bold text-lg">
            hypermaps.world
          </a>
        </div>
        <div className="mt-10 font-marker text-xl text-terracotta">thanks for scrolling →</div>
      </div>
    </SlideShell>
  );
}
