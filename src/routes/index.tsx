import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";
import {
  SlideCover, SlidePersonas, SlideDecay,
  SlideManyWorlds, SlideVibes, SlideCharacter, SlideAsk,
  SlidePin, SlideCompetition, SlideClose,
} from "@/components/deck/slides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hypermaps World — A map that knows your vibe" },
      { name: "description", content: "Pitch deck for HyperMaps.world: a playful, human-first map where you enter many worlds and find your vibe." },
      { property: "og:title", content: "Hypermaps World — A map that knows your vibe" },
      { property: "og:description", content: "A playful, human-first map. Many worlds. Living layers. Your community curating the city." },
      { property: "og:url", content: "https://why.hypermaps.world/" },
      { name: "twitter:title", content: "Hypermaps World — A map that knows your vibe" },
      { name: "twitter:description", content: "A playful, human-first map. Many worlds. Living layers. Your community curating the city." },
    ],
    links: [
      { rel: "canonical", href: "https://why.hypermaps.world/" },
    ],
  }),
  component: Index,
});

const slides = [
  { id: "cover",       title: "cover",                 render: () => <SlideCover /> },
  { id: "personas",    title: "the people",            render: () => <SlidePersonas /> },
  { id: "decay",       title: "information decay",     render: () => <SlideDecay /> },
  { id: "worlds",      title: "many worlds",           render: () => <SlideManyWorlds /> },
  { id: "vibes",       title: "how it works",          render: () => <SlideVibes /> },
  { id: "character",   title: "you, the character",    render: () => <SlideCharacter /> },
  { id: "ask",         title: "ask the area",          render: () => <SlideAsk /> },
  { id: "pin",         title: "pin context",           render: () => <SlidePin /> },
  
  { id: "competition", title: "competition",           render: () => <SlideCompetition /> },
  { id: "close",       title: "vision",                render: () => <SlideClose /> },
];

function Index() {
  return <Deck slides={slides} />;
}
