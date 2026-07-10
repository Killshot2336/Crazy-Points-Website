"use client";

import { useCallback, useRef } from "react";

export function useSyntheticAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playTick = useCallback(
    (variant: "nav" | "close" | "toggle" | "submit" = "nav") => {
      const ctx = getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const profiles = {
        nav: { freq: 880, type: "square" as OscillatorType, duration: 0.04, vol: 0.03 },
        close: { freq: 440, type: "sawtooth" as OscillatorType, duration: 0.06, vol: 0.025 },
        toggle: { freq: 1200, type: "sine" as OscillatorType, duration: 0.03, vol: 0.02 },
        submit: { freq: 660, type: "triangle" as OscillatorType, duration: 0.12, vol: 0.035 },
      };

      const p = profiles[variant];
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      osc.frequency.exponentialRampToValueAtTime(p.freq * 0.5, now + p.duration);

      filter.type = "bandpass";
      filter.frequency.value = p.freq;
      filter.Q.value = 8;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(p.vol, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + p.duration + 0.01);
    },
    [getContext],
  );

  const playHum = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.008, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }, [getContext]);

  return { playTick, playHum };
}
