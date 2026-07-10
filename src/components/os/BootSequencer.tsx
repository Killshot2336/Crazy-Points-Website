"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BOOT_LINES, BOOT_TITLE, BOOT_TITLE_DURATION_MS } from "@/lib/content";
import { useGlitchText } from "@/hooks/useGlitchText";

interface BootSequencerProps {
  onComplete: () => void;
}

export default function BootSequencer({ onComplete }: BootSequencerProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [dissolving, setDissolving] = useState(false);
  const glitchTitle = useGlitchText(BOOT_TITLE, BOOT_TITLE_DURATION_MS, showTitle);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line.text]);
        }, line.delay),
      );
    });

    timers.push(
      setTimeout(() => setShowTitle(true), BOOT_LINES[BOOT_LINES.length - 1].delay + 400),
    );

    timers.push(
      setTimeout(() => setDissolving(true), BOOT_LINES[BOOT_LINES.length - 1].delay + 400 + BOOT_TITLE_DURATION_MS + 600),
    );

    timers.push(
      setTimeout(() => onComplete(), BOOT_LINES[BOOT_LINES.length - 1].delay + 400 + BOOT_TITLE_DURATION_MS + 1200),
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: dissolving ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-2xl px-8 font-mono">
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cyan/60">
          <span className="inline-block h-px w-10 bg-cyan/40" />
          <span>Diagnostic Boot Sequence</span>
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-cyan"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-500">
          {visibleLines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <span className="text-cyan/50">&gt;</span> {line}
            </motion.div>
          ))}
        </div>

        {showTitle && (
          <motion.h1
            className="mt-12 font-display text-3xl font-bold uppercase tracking-[0.2em] text-cyan glow-text sm:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {glitchTitle}
          </motion.h1>
        )}

        <motion.div
          className="mt-8 h-1 overflow-hidden rounded bg-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: showTitle ? 1 : 0 }}
        >
          <motion.div
            className="h-full bg-cyan"
            initial={{ width: "0%" }}
            animate={{ width: showTitle ? "100%" : "0%" }}
            transition={{ duration: BOOT_TITLE_DURATION_MS / 1000, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
