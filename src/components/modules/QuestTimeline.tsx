"use client";

import { CheckCircle, Loader, MessageCircle } from "lucide-react";
import { LINKS, QUEST, ROADMAP } from "@/lib/content";

export default function QuestTimeline() {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/60">Module B — CRYODEATH QUEST TIMELINE</p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase text-white sm:text-2xl">{QUEST.title}</h2>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>{QUEST.paragraphs[0]}</p>
        <p>{QUEST.paragraphs[1]}</p>
        <p>{QUEST.paragraphs[2]}</p>
      </div>

      <div className="relative border-l border-cyan/20 pl-6">
        {ROADMAP.map((item, index) => (
          <div key={item.label} className="relative pb-8 last:pb-0">
            <div
              className={`absolute -left-[25px] top-1 flex h-3 w-3 items-center justify-center rounded-full border ${
                item.status === "development" ? "radar-node border-yellow-400/60 bg-yellow-400/20" : "border-cyan/60 bg-cyan/20"
              }`}
            />
            {index < ROADMAP.length - 1 && (
              <div className="absolute -left-[19px] top-4 h-full w-px bg-border" />
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-sm text-zinc-300">{item.label}</span>
              {item.status === "complete" ? (
                <span className="status-complete inline-flex w-fit items-center gap-2 rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  <CheckCircle className="h-3.5 w-3.5" />
                  COMPLETE
                </span>
              ) : (
                <span className="status-dev inline-flex w-fit items-center gap-2 rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  <Loader className="h-3.5 w-3.5 animate-spin" />
                  IN DEVELOPMENT
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">{QUEST.paragraphs[3]}</p>

      <a
        href={LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded border border-cyan bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
      >
        <MessageCircle className="h-4 w-4" />
        {QUEST.discordCta}
      </a>
    </div>
  );
}
