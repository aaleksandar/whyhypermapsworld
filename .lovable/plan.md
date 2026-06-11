## Why you don't see the pulsing dot

The pulsing pink dot on each persona card was positioned at `-top-1.5 -right-1.5` (sticking outside the card edge), but the card itself has `overflow-hidden` — so the dot is rendered, then clipped away. Same root cause hurts the visibility of every "indicator outside the element" idea. The boxShadow ring also can't bloom out — it's clipped to the card too.

The other affordances technically render but are too subtle to read as "this is interactive":
- World chips: a 2px y-bounce blends into the page noise.
- Pin halo: the expanding ring renders inside the map container which is fine, but the ring is the same color as the pin background and barely contrasts on the map.
- Buttons: the breathing scale on the pink "next reply" / "contribute" buttons is visible but easy to miss in motion-rich slides.

## The plan

Make affordances visible by (a) not clipping them and (b) using a single, consistent visual idiom across the deck: a **soft pulsing glow halo** behind the interactive element, in the brand pink.

### 1. Persona cards (Problem 01)
- Move the pulsing dot **inside** the card bounds (top-right corner, ~8px in) so `overflow-hidden` stops clipping it.
- Switch from `boxShadow` ring (clipped) to an absolute child `<span>` that scales + fades — renders within the card, won't be clipped.
- Bump dot size slightly (12px → 14px) and add a soft blurred halo behind it.

### 2. Many Worlds chips (Solution)
- Wrap each inactive chip in a `relative` container with an absolutely-positioned soft pink blur halo behind it (`filter: blur(10px)`, pulsing opacity 0.3 ↔ 0.7).
- Keep the existing y-bounce but lower amplitude — the glow does the heavy lifting.
- Active chip keeps its solid pink shadow, no halo (signals "selected").

### 3. Pin context map (Pin Context slide)
- Strengthen the existing halo: switch from a thin border ring to a filled, blurred radial glow behind each inactive pin (same pink-tinted glow), opacity pulsing 0.3 ↔ 0.8.
- Keep the pin's own colored glow for visual identity; the new pink glow signals "interactive".
- The map container's `overflow-hidden` is fine here — halos sit inside.

### 4. Ask the area / Rewards buttons
- Add the same blurred pink halo behind the primary "next reply →" and "contribute" buttons, positioned with negative inset and `pointer-events-none` on a `relative` wrapper (no clipping — buttons aren't inside an overflow-hidden parent).
- Keep current scale/boxShadow pulse for tactile feel.

### Shared idiom
All five surfaces use the same "soft pink halo behind interactive element" visual, so once the user learns it on slide 2, they recognise it everywhere. No words, no emojis, no pointers.

### Files touched
- `src/components/deck/slides.tsx` — five small edits, one per slide listed above.

No new dependencies, no copy changes, no layout shifts.