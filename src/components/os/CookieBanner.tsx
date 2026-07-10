"use client";

import { AnimatePresence, motion } from "framer-motion";
import { COOKIE, LINKS, SITE } from "@/lib/content";
import type { ConsentState } from "@/lib/types";

interface CookieBannerProps {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  onMore: () => void;
}

export default function CookieBanner({ visible, onAccept, onReject, onMore }: CookieBannerProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-12 left-0 right-0 z-[6000] border-t border-border bg-black/95 px-4 py-4 backdrop-blur-md sm:bottom-14 sm:px-6"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-xs leading-relaxed text-zinc-400 sm:text-sm">{COOKIE.banner}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={LINKS.privacyPolicy}
                className="rounded border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-300 hover:text-cyan"
              >
                {COOKIE.privacyPolicy}
              </a>
              <button
                type="button"
                onClick={onMore}
                className="rounded border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-300 hover:text-cyan"
              >
                {COOKIE.moreButton}
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="rounded border border-cyan bg-cyan/10 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan"
              >
                {COOKIE.accept}
              </button>
              <button
                type="button"
                onClick={onReject}
                className="rounded border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-300 hover:text-red-400"
              >
                {COOKIE.reject}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DashboardTrayProps {
  consent: ConsentState;
  onOpenCompliance: () => void;
}

export function DashboardTray({ consent, onOpenCompliance }: DashboardTrayProps) {
  const activeCount = [consent.video, consent.analytics, consent.translator].filter(Boolean).length;

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-[5000] border-t border-border bg-black/90 backdrop-blur-xl"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 26 }}
    >
      <div className="flex items-center justify-between px-4 py-2 sm:px-6">
        <p className="font-mono text-[10px] text-zinc-600">{SITE.copyright}</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenCompliance}
            className="flex items-center gap-2 rounded border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 hover:border-cyan/40 hover:text-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan/80" />
            </span>
            {COOKIE.moduleTitle}
            <span className="text-cyan/60">[{activeCount}/3]</span>
          </button>
          <a href={LINKS.privacyPolicy} className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
            Privacy Policy
          </a>
          <a href={LINKS.legalNotice} className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
            Legal Notice
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
