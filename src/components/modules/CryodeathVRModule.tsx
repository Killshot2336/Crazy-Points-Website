"use client";

import { ExternalLink } from "lucide-react";
import { HERO, LINKS } from "@/lib/content";
import VideoViewport, { VIDEOS } from "./VideoViewport";

interface CryodeathVRModuleProps {
  videoAllowed: boolean;
  onVideoAccept: () => void;
}

export default function CryodeathVRModule({ videoAllowed, onVideoAccept }: CryodeathVRModuleProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-bold uppercase text-white">
        <span className="text-cyan glow-text">CRYODEATH VR</span> Our First VR Title To Reach Your Headsets
      </h2>

      <a
        href={LINKS.steam}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan hover:text-white"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        {HERO.steamCta}
      </a>

      <p className="font-display text-base text-zinc-300">{HERO.tagline}</p>

      <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
        {HERO.paragraphs.map((p) => (
          <p key={p} className={p === "Welcome aboard." ? "font-display text-cyan glow-text" : ""}>
            {p}
          </p>
        ))}
      </div>

      <VideoViewport
        videoId={VIDEOS.cryodeath}
        videoAllowed={videoAllowed}
        onAccept={onVideoAccept}
      />
    </div>
  );
}
