"use client";

import { useState } from "react";
import { Play, Shield } from "lucide-react";
import { LINKS, VIDEO_CONSENT, VIDEOS } from "@/lib/content";

interface VideoViewportProps {
  videoId: string;
  videoAllowed: boolean;
  onAccept: () => void;
}

export default function VideoViewport({ videoId, videoAllowed, onAccept }: VideoViewportProps) {
  const [loaded, setLoaded] = useState(false);

  if (videoAllowed && loaded) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-glow-overlay pointer-events-none absolute inset-0" />
      </div>
    );
  }

  if (videoAllowed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-black">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-950 transition-colors hover:bg-zinc-900"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 text-cyan" />
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-cyan">Initialize Video Stream</span>
        </button>
        <div className="video-glow-overlay pointer-events-none absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-zinc-950">
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <p className="font-display text-lg font-semibold text-white">{VIDEO_CONSENT.title}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{VIDEO_CONSENT.body}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={LINKS.privacyPolicy}
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:border-cyan/50 hover:text-cyan"
          >
            <Shield className="h-3.5 w-3.5" />
            {VIDEO_CONSENT.privacyPolicy}
          </a>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex items-center gap-2 rounded border border-cyan bg-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
          >
            <Play className="h-3.5 w-3.5" />
            {VIDEO_CONSENT.accept}
          </button>
        </div>
      </div>
      <div className="video-glow-overlay pointer-events-none absolute inset-0" />
    </div>
  );
}

export { VIDEOS };
