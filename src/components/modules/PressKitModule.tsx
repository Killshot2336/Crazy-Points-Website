import { ExternalLink, FolderOpen } from "lucide-react";
import { LINKS } from "@/lib/content";

export default function PressKitModule() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-bold uppercase text-white">Press Kit</h2>
      <p className="text-sm leading-relaxed text-zinc-400">
        Access the official Panic Point Games press kit archive containing media assets, studio information, and CryoDeath VR promotional materials.
      </p>
      <a
        href={LINKS.pressKit}
        className="inline-flex items-center gap-2 rounded border border-cyan bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
      >
        <FolderOpen className="h-4 w-4" />
        Open Press Kit
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
