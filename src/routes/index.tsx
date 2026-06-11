import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";
import {
  SlideCover, SlidePersonas, SlideDecay, SlideStuck, SlideSolutionHero,
  SlideManyWorlds, SlideVibes, SlideCharacter, SlideAsk,
  SlidePin, SlideRewards, SlideUX, SlideCompetition, SlideClose,
} from "@/components/deck/slides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HyperMaps.world — A map that knows your vibe" },
      { name: "description", content: "Pitch deck for HyperMaps.world: a playful, human-first map where you enter many worlds and find your vibe." },
      { property: "og:title", content: "HyperMaps.world — A map that knows your vibe" },
      { property: "og:description", content: "A playful, human-first map. Many worlds. Living layers. Your community curating the city." },
    ],
  }),
  component: Index,
});

const slides = [
  { id: "cover",       title: "cover",                 render: () => <SlideCover /> },
  { id: "personas",    title: "the people",            render: () => <SlidePersonas /> },
  { id: "decay",       title: "information decay",     render: () => <SlideDecay /> },
  { id: "stuck",       title: "the incumbent is stuck",render: () => <SlideStuck /> },
  { id: "solution",    title: "the solution",          render: () => <SlideSolutionHero /> },
  { id: "worlds",      title: "many worlds",           render: () => <SlideManyWorlds /> },
  { id: "vibes",       title: "matching your vibe",    render: () => <SlideVibes /> },
  { id: "character",   title: "you, the character",    render: () => <SlideCharacter /> },
  { id: "ask",         title: "ask the area",          render: () => <SlideAsk /> },
  { id: "pin",         title: "pin context",           render: () => <SlidePin /> },
  { id: "rewards",     title: "contribute & reward",   render: () => <SlideRewards /> },
  { id: "ux",          title: "smart defaults",        render: () => <SlideUX /> },
  { id: "competition", title: "competition",           render: () => <SlideCompetition /> },
  { id: "close",       title: "vision",                render: () => <SlideClose /> },
];

function Index() {
  return <Deck slides={slides} />;
}
