## Remove the "Contributing is a game" slide

Small, deterministic edit — two files:

### 1. `src/routes/index.tsx`
- Remove `SlideRewards` from the `slides` import from `@/components/deck/slides`.
- Remove the `{ id: "rewards", title: "contribute & reward", render: () => <SlideRewards /> }` entry from the `slides` array.

### 2. `src/components/deck/slides.tsx`
- Delete the entire `SlideRewards` block (the `/* 12. Rewards — RPG-style contribution */` section, including its supporting `Rarity`, `Loot`, `rarityStyle`, `loot`, and `shopExchanges` declarations) since nothing else uses them.

No other slides, routes, or styling touched. Approve and I'll apply.