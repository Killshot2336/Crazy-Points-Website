"use client";

import { ExternalLink } from "lucide-react";
import { HERO, LINKS } from "@/lib/content";
import VideoViewport, { VIDEOS } from "./VideoViewport";

interface CryoCommodoreProps {
  videoAllowed: boolean;
  onVideoAccept: () => void;
}

export default function CryoCommodore({ videoAllowed, onVideoAccept }: CryoCommodoreProps) {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/60">Module A — CRYO-COMMODORE</p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-white glow-text sm:text-2xl">
          {HERO.headline}
        </h2>
        <a
          href={LINKS.steam}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {HERO.steamCta}
        </a>
        <p className="mt-4 font-display text-base text-zinc-300">{HERO.tagline}</p>
      </div>

      <VideoViewport
        videoId={VIDEOS.questTeaser}
        videoAllowed={videoAllowed}
        onAccept={onVideoAccept}
      />

      <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">{HERO.questTeaserTitle}</p>

      <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
        {HERO.paragraphs.map((p) => (
          <p key={p} className={p === "Welcome aboard." ? "font-display text-cyan glow-text" : ""}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
