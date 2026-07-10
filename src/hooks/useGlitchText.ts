"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "█▓▒░@#$%&*?/\\|<>[]{}01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useGlitchText(target: string, durationMs: number, active: boolean) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplay("");
      return;
    }

    let frame = 0;
    const totalFrames = Math.ceil(durationMs / 16);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const resolvedCount = Math.floor(progress * target.length);

      let next = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolvedCount) {
          next += target[i];
        } else {
          next += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }

      setDisplay(next);
      frame++;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    requestAnimationFrame(tick);

    return () => {
      frame = -1;
    };
  }, [target, durationMs, active]);

  return display;
}
