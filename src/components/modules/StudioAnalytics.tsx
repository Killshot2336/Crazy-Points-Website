"use client";

import { useEffect, useState } from "react";
import { METRICS } from "@/lib/content";

function useCountUp(target: number, duration = 1200, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return value;
}

function MetricCell({ value, label }: { value: number; label: string }) {
  const count = useCountUp(value);

  return (
    <div className="group rounded border border-border bg-black p-6 text-center transition-colors hover:border-cyan/30">
      <div className="font-display text-5xl font-bold text-cyan glow-text">{count}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400">
        {label}
      </div>
    </div>
  );
}

export default function StudioAnalytics() {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/60">Module C — STUDIO ANALYTICS</p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase text-white">Telemetry Terminal</h2>
        <p className="mt-2 font-mono text-xs text-zinc-500">LIVE STUDIO METRICS — RAVON_UPLINK ACTIVE</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {METRICS.map((m) => (
          <MetricCell key={m.label} value={m.value} label={m.label} />
        ))}
      </div>

      <div className="rounded border border-border bg-onyx/40 p-4 font-mono text-[10px] leading-relaxed text-zinc-500">
        <p>&gt; SCANNING PRODUCTION NODES...</p>
        <p>&gt; 1 Game Released</p>
        <p>&gt; 3 Active Projects</p>
        <p>&gt; 10 Team Members</p>
        <p className="text-cyan/70">&gt; ALL SYSTEMS NOMINAL</p>
      </div>
    </div>
  );
}
