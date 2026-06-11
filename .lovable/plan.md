## Goal

The deck currently uses a fixed desktop layout (large display type, multi-column grids, absolutely-positioned map elements). On phones everything is squeezed: huge headlines clip horizontally, multi-column grids collapse into unreadable strips, sticky notes overflow the viewport. Keep desktop largely as-is; make mobile actually readable.

## Approach

Use a **responsive-per-slide approach** (not a separate mobile deck). Each slide gets a mobile layout via Tailwind breakpoints (`md:` = desktop). Same content, restructured. No new dependencies.

### 1. Shell + chrome (`Deck.tsx`, `primitives.tsx`)

- `SlideShell`: drop padding from `px-16 py-20` to `px-5 py-12 md:px-16 md:py-20`.
- Add `useIsMobile` hook (already exists) where needed for conditional rendering.
- Nav arrows: shrink to 10×10 on mobile and move slightly inward so they don't overlap content; keep current size on `md:`.
- Brand mark + slide counter: shrink type and tighten spacing on mobile.
- Slide-title label at bottom: move higher so it doesn't collide with the progress route.
- Progress route: cap visual width and reduce dot spacing on mobile so all dots fit.
- Keep horizontal snap-scroll behavior unchanged (one slide per viewport on both).

### 2. Typography rules

- Display headlines (`H1`): currently `text-7xl`/`text-[8rem]`. Add a mobile size around `text-5xl` / `text-6xl` with `md:` bumping back up. Add `break-words` / `hyphens-auto` so they never overflow horizontally.
- Body copy: `text-base md:text-xl` (or similar) across slides — current `text-xl`/`text-2xl` body is too big at 390px.
- Eyebrows / marker text: scale down ~25% on mobile.

### 3. Per-slide restructuring

For every slide currently using `grid grid-cols-{3,4,5}` or `flex-1 grid` with absolute pins:

- **Cover**: stack globe → title → tagline vertically; shrink globe; keep flag.
- **Personas (3×2 grid)**: `grid-cols-2 md:grid-cols-3`, allow vertical scroll within slide if needed.
- **Decay ("Knowledge leaks away")**: stack title → paragraph → pin map vertically; map becomes a fixed-aspect block (e.g. `aspect-[4/3]`) instead of `flex-1` next to text. Reduce number of visible pins/tips on mobile (e.g. show 6 instead of 13) so the evaporation effect still reads.
- **Many Worlds**: title + intro on top, world-chip column scrollable, mini-map preview below as its own block instead of side-by-side.
- **Vibes ("places of your vibe")**: stack title/intro, then the 3 "what we stack" cards as a vertical column on mobile (`grid-cols-1 md:grid-cols-3`) instead of overlapping rotated cards.
- **Character ("Everyone gets a profile")**: profile cards in a horizontal snap-scroll row on mobile (`overflow-x-auto snap-x` with `min-w-[80%]` cards), full 4-col grid on desktop. Avoid current overlap that hides text.
- **Ask the area**: stack search/map vertically.
- **Pin context**: tabs/perspective panel stacks above map preview on mobile; AI summary stays full width.
- **Rewards (backpack)**: backpack grid stays 4 cols (small enough), partner-spots panel moves below instead of side-by-side. Long item names (`VeganStamp`, `GoldenPolaroid`) get `text-xs` and proper wrap.
- **Competition (quadrant chart)**: shrink chart, smaller pin labels, hide the rotated axis labels' rotation on mobile (use plain top/bottom/left/right text).
- **Close (vision)**: scale hero text down, keep centered.

### 4. Absolute-positioning fixes

Several slides use absolute pins relative to a flex container that loses its width on mobile. For each such block, wrap the absolute layer in a `relative` element with an explicit `aspect-*` ratio so coordinates stay meaningful at any width. Where labels are absolutely positioned with `whitespace-nowrap`, switch to `max-w-[40%] whitespace-normal` on mobile.

### 5. Viewport meta + overflow guards

- Confirm `<meta name="viewport" content="width=device-width, initial-scale=1">` in `__root.tsx`. Add if missing.
- Add `overflow-x-hidden` on each slide section to defensively prevent horizontal bleed.

### 6. Verification

After the edits, view the preview at 390×844 (mobile) and 1440×900 (desktop) using the browser tools and walk every slide; fix any remaining clip/overflow before declaring done.

## Out of scope

- No content/copy changes.
- No new slides; no removed slides.
- No tablet-specific tuning beyond what `md:` naturally gives.
