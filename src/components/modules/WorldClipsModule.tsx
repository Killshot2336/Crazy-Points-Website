import { Tv } from "lucide-react";
import { LINKS, WORLD } from "@/lib/content";

export default function WorldClipsModule() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-bold uppercase text-white">{WORLD.title}</h2>
      <p className="text-base text-zinc-400">{WORLD.subtitle}</p>
      <a
        href={LINKS.twitchClips}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded border border-cyan bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
      >
        <Tv className="h-4 w-4" />
        {WORLD.clipsCta}
      </a>
      <div className="overflow-hidden rounded border border-border">
        <img
          src={WORLD.image}
          alt="CryoDeath VR gameplay"
          className="w-full object-cover opacity-90"
          loading="lazy"
        />
      </div>
    </div>
  );
}
