# HyperMaps.world — Pitch Deck Plan

A single-page web pitch deck that scrolls horizontally (left → right) through ~14 slides. Playful cartographic aesthetic: hand-drawn map textures, layered paper, warm earthy palette with bright accent pins, geocaching/sidequest energy. Medium interactivity — most slides static-but-animated, key slides have a real interactive moment.

## Aesthetic

- **Palette:** warm parchment background (`#f4ead8`), ink black, terracotta + sage accents, hot-pink "pin" accent, dusty blue water. Subtle paper grain + faint topographic contour lines as ambient layer.
- **Type:** display serif with personality for headlines (e.g. *Fraunces* or *Instrument Serif*) + clean grotesque for body (*Manrope*). Hand-written marker font (*Caveat*) for map labels & annotations.
- **Motifs:** dashed travel paths, compass roses, sticker-style pins, postage stamps, "you are here" arrows, scribbled circles around key words.
- **Motion:** Framer Motion. Slide-in parallax on horizontal scroll, pins drop with a bounce, dashed paths draw on enter, gentle paper-fold transitions between sections.

## Navigation

- Horizontal scroll-snap container, one slide = one viewport.
- Keyboard ← / → and Space, on-screen prev/next pills, slide counter (`03 / 14`), and a tiny minimap progress bar at the bottom showing each slide as a pin along a dashed route.
- Touch swipe on mobile. Reduced-motion fallback respected.

## Slides

1. **Cover** — Big wordmark "HyperMaps.world", tagline "A map that knows your vibe." Hand-drawn globe with pins. Scroll hint.
2. **Problem intro** — Vignette grid of 6 illustrated personas (Saigon shopper, Dijana the chef, NYC jamming musician, tourist distrusting 4.8★, Julian following friends, Berlin newcomer asking a friend). Hover a vignette → short quote pops up.
3. **Problem: information decay** — Animated map where pins (WhatsApp/TG/FB group tips) fade out over time. Caption: *"Hidden groups. Information that leaks away."*
4. **Problem: Google Maps is stuck** — Side-by-side: a flat boring Google-style screenshot vs. our living map. Bullets: untrusted reviews, no TikTok-era discovery, boring, unchanged for years.
5. **Solution headline** — "A map that knows who you are." One sentence, big. Background: layered translucent map worlds drifting.
6. **Many Worlds (interactive)** — Stylized Saigon map. Toggle chips: *Vegan & GF*, *Parent-friendly*, *Modernist architecture*, *Affordable local clothes*, *Laptop-friendly*. Toggling re-skins the map: pins, color palette, and label set animate in/out. Core interactive moment.
7. **Layers** — Animated stack of translucent map planes: Facts → Subjective reviews → Friends' vibes → Neuro/biosignal (future). Hover a layer to bring it forward.
8. **Vibes & matching** — Diagram: *Who you are* + *Where you are* + *What you need* → synced with a place. Knowledge-graph neuron animation. "Synchronicity, on tap."
9. **You are a character** — User profile mock: photo journal, lists, guides, follow taste. Examples: winery, ResidentAdvisor, Michelin, influencer. Carousel of profile cards.
10. **Ask the area (interactive)** — Mock chat: user asks *"Where can I find art around me right now?"*. AI replies first, then two local "characters" reply with human insight. Uber-like matching animation showing nearby subscribed locals lighting up.
11. **Pin context** — Tap a pin → expanding card with the *right* photos for the query (equipment shots for "gym"), discussion threads (safety, air quality, vibe), highlights. Interactive: click between 3 sample queries to see photos/threads swap.
12. **Contribution & rewards** — Mystery-pack reveal interaction: click the pack, haptic-style shake, reward card flips. Copy on intrinsic motivation, mastery, completion loops.
13. **Smart UX defaults** — Animated list: open-now by default, happy-hour pins glow, auto-connect to Wi-Fi-friendly cafes, dynamic city zones (safe, hipster, tourist, industrial) shaded on the map.
14. **Competition 2x2** — Custom hand-drawn 2x2. Axes: **Personal / contextual ↔ Generic** (x) and **Static lists ↔ Living map** (y). Plotted: Google Maps, ChatGPT/Gemini, IG/Substack lists, Reddit/FB groups, niche apps (Wisepass, AllTrails), Corner/Where, vibecoded maps — HyperMaps.world sits top-right with a sticker-style pin.
15. **Vision close** — "Multidimensional belonging." Layered worlds drift across the screen, final CTA / contact.

## Technical

- TanStack Start route: `src/routes/index.tsx` becomes the deck. Existing root layout untouched.
- New components under `src/components/deck/`:
  - `Deck.tsx` — horizontal scroll-snap container, keyboard + button nav, progress minimap, slide-counter, scroll observer for active slide.
  - `Slide.tsx` — viewport-sized wrapper, supplies parallax context.
  - One component per slide (`SlideCover`, `SlideManyWorlds`, etc.) for code-splitting clarity.
- Interactive map demos use inline SVG (stylized Saigon shape with neighborhood blobs + pins). No real tile provider.
- Motion via `framer-motion` (already idiomatic). Add `bun add framer-motion` if missing.
- Fonts via Google Fonts `<link>` in `__root.tsx` head.
- Design tokens: extend `src/styles.css` with `--paper`, `--ink`, `--terracotta`, `--sage`, `--pin`, `--water`, `--marker`, plus a `--paper-grain` background-image data URL and a `--shadow-sticker` token.
- Generate 4–6 hero illustrations with `imagegen` (cover globe, persona vignettes, mystery-pack art, etc.) saved to `src/assets/deck/`.
- SEO: head meta updated for "HyperMaps.world — A map that knows your vibe."

## Out of scope (for this build)

- Real auth, backend, or saved state.
- Real map tiles or geolocation.
- Mobile-first redesign — deck is desktop-first, scales down gracefully but optimized for laptop/projector.
