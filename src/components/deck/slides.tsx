import { useState } from "react";
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
        A map that knows who you are <br/>— and resonates with your vibe.
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
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-10">
        Everyone is hunting for places. <span className="text-terracotta italic">Nobody</span> has a good way.
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
        Hidden groups. <br/>Information that <span className="text-terracotta italic">leaks away.</span>
      </H1>
      <div className="flex-1 grid grid-cols-5 gap-10 items-center mt-6">
        <div className="col-span-2 space-y-4 text-lg text-ink-soft">
          <p>The best tips live in WhatsApp threads, Telegram groups, and Reddit comments.</p>
          <p>Someone asks again. Someone digs up an old link. Repeat — for years.</p>
          <p className="font-marker text-2xl text-pin">The map forgets. So we ask again.</p>
        </div>
        <div className="col-span-3 h-full relative">
          <StylizedMap tint="var(--terracotta)" showLabels={false}>
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 10 + ((i * 37) % 80);
              const y = 10 + ((i * 19) % 45);
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ opacity: [1, 1, 0.1, 0.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 0.25 }}
                >
                  <Pin x={0} y={0} delay={0} size={18} color={i % 3 === 0 ? "var(--pin)" : i % 3 === 1 ? "var(--terracotta)" : "var(--sage)"} />
                </motion.div>
              );
            })}
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

/* 7. Layers */
const layers = [
  { name: "Facts", desc: "Has Wi-Fi. Has a sauna. Open now.", color: "var(--water)" },
  { name: "Reviews", desc: "Vibe, service, taste. From people like you.", color: "var(--sage)" },
  { name: "Friends", desc: "Where your taste-graph has been.", color: "var(--mustard)" },
  { name: "Neuro (soon)", desc: "Match places to your nervous system.", color: "var(--pin)" },
];
export function SlideLayers() {
  const [hover, setHover] = useState(1);
  return (
    <SlideShell>
      <Eyebrow>how it works</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-10">
        Layers of <span className="italic text-pin">understanding.</span>
      </H1>
      <div className="grid grid-cols-2 gap-12 flex-1 items-center">
        <div className="relative h-[60vh]">
          {layers.map((l, i) => (
            <motion.div
              key={l.name}
              onMouseEnter={() => setHover(i)}
              animate={{
                x: hover === i ? 40 : i * 30,
                y: i * 50,
                scale: hover === i ? 1.05 : 1,
                rotate: -6 + i * 2,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute inset-x-0 h-48 border-2 border-ink sticker p-5 cursor-pointer"
              style={{ background: l.color, zIndex: hover === i ? 10 : i }}
            >
              <div className="font-display text-3xl font-bold">{l.name}</div>
              <div className="font-marker text-xl mt-2 text-ink-soft">{l.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="text-lg text-ink-soft space-y-4">
          <p>
            The world has <b>facts</b>. People have <b>opinions</b>. Communities have <b>taste</b>.
          </p>
          <p>
            HyperMaps stacks them as transparent layers — you choose which lens to look through.
          </p>
          <p className="font-marker text-2xl text-pin">Tomorrow: your wearable joins the stack.</p>
        </div>
      </div>
    </SlideShell>
  );
}

/* 8. Vibes */
export function SlideVibes() {
  return (
    <SlideShell>
      <Eyebrow>matching</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-12">
        We match you with places of <span className="italic text-pin">your vibe.</span>
      </H1>
      <div className="flex-1 grid grid-cols-4 items-center gap-6">
        {["Who you are", "Where you are", "What you need"].map((t, i) => (
          <PaperCard key={t} rotate={i === 1 ? 1 : -1} className="text-center bg-paper-2">
            <div className="font-marker text-xl text-terracotta mb-2">input {i+1}</div>
            <div className="font-display font-bold text-2xl">{t}</div>
          </PaperCard>
        ))}
        <div className="flex flex-col items-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
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
          <div className="font-marker text-xl mt-3 text-ink-soft">synchronicity, on tap</div>
        </div>
      </div>
    </SlideShell>
  );
}

/* 9. Character profiles */
const profiles = [
  { name: "Julian", role: "explorer · 312 places", color: "var(--sage)", note: "138 hidden cafés mapped" },
  { name: "Tre Vineyard", role: "winery", color: "var(--terracotta)", note: "now poured in 47 places" },
  { name: "Resident Advisor", role: "events", color: "var(--ink)", note: "live tonight: 23 venues" },
  { name: "Michelin", role: "guide", color: "var(--pin)", note: "2026 picks · Saigon" },
];
export function SlideCharacter() {
  return (
    <SlideShell>
      <Eyebrow>identity</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-3">
        You are a <span className="italic text-pin">character</span> in these worlds.
      </H1>
      <p className="text-lg text-ink-soft max-w-2xl mb-10">
        A photo journal of where you've been. Lists. Guides. Reputation that compounds across worlds.
      </p>
      <div className="grid grid-cols-4 gap-6 flex-1">
        {profiles.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-paper border-2 border-ink sticker p-5 flex flex-col"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-ink mb-3" style={{ background: p.color }} />
            <div className="font-display font-bold text-2xl">{p.name}</div>
            <div className="font-marker text-lg text-ink-soft">{p.role}</div>
            <div className="mt-auto pt-4 grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="aspect-square border border-ink/40" style={{ background: `color-mix(in oklab, ${p.color} ${30 + j*10}%, var(--paper))` }} />
              ))}
            </div>
            <div className="font-marker text-base text-pin mt-3">{p.note}</div>
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
const pinDemos: Record<string, { photos: string[]; threads: string[]; highlight: string }> = {
  "gym": {
    photos: ["🏋️ squat rack", "🚿 clean showers", "💧 water fountain", "🧘 yoga corner"],
    threads: ["Is it safe for women at night?", "Air quality / ventilation?", "Bumper plates?"],
    highlight: "Best for: serious lifters · open 24h"
  },
  "cool café": {
    photos: ["☕ pour-over bar", "🌿 plant wall", "🪟 corner seat", "📚 reading nook"],
    threads: ["Wi-Fi speed?", "Quiet for calls?", "Outlet density?"],
    highlight: "Best for: long sessions · matcha"
  },
  "vegan spot": {
    photos: ["🥗 bowls", "🌱 tofu mapo", "🍵 menu", "🥑 brunch"],
    threads: ["GF options?", "Soy-free?", "Owner vegan or just vegan-friendly?"],
    highlight: "Best for: strict vegans · GF marked"
  },
};
export function SlidePin() {
  const [q, setQ] = useState<keyof typeof pinDemos>("gym");
  const d = pinDemos[q];
  return (
    <SlideShell>
      <Eyebrow>pin context</Eyebrow>
      <H1 className="text-5xl md:text-6xl max-w-3xl mb-3">
        Tap a pin. See <span className="italic text-pin">what you actually care about.</span>
      </H1>
      <div className="flex gap-2 mb-6">
        {(Object.keys(pinDemos) as (keyof typeof pinDemos)[]).map(k => (
          <button
            key={k}
            onClick={() => setQ(k)}
            className={`px-4 py-2 border-2 border-ink font-marker text-lg ${q===k?"bg-ink text-paper sticker":"bg-paper hover:bg-paper-2"}`}
          >searching: "{k}"</button>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-3 gap-6">
        <PaperCard rotate={-1}>
          <div className="font-marker text-xl text-terracotta mb-3">photos that matter</div>
          <div className="grid grid-cols-2 gap-2">
            <AnimatePresence mode="popLayout">
              {d.photos.map(p => (
                <motion.div
                  key={p}
                  layout
                  initial={{opacity:0, scale:0.8}}
                  animate={{opacity:1, scale:1}}
                  exit={{opacity:0}}
                  className="aspect-square bg-paper-2 border border-ink/40 flex items-center justify-center text-center p-2 font-marker"
                >{p}</motion.div>
              ))}
            </AnimatePresence>
          </div>
        </PaperCard>
        <PaperCard rotate={0.5}>
          <div className="font-marker text-xl text-terracotta mb-3">community threads</div>
          <div className="space-y-3">
            {d.threads.map(t => (
              <motion.div
                key={t}
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                className="border-l-4 border-pin pl-3 py-1 font-display"
              >{t}</motion.div>
            ))}
          </div>
        </PaperCard>
        <PaperCard rotate={1} className="bg-mustard">
          <div className="font-marker text-xl text-ink-soft mb-3">highlight</div>
          <div className="font-display text-2xl leading-snug">{d.highlight}</div>
          <div className="mt-6 font-marker text-base">·· 4 friends have been here</div>
        </PaperCard>
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
