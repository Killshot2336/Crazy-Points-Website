"use client";

import { motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import type { OSWindow } from "@/lib/types";

interface WindowFrameProps {
  window: OSWindow;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onDragStart: (clientX: number, clientY: number) => void;
  children: ReactNode;
}

export default function WindowFrame({
  window: win,
  onClose,
  onMinimize,
  onFocus,
  onDragStart,
  children,
}: WindowFrameProps) {
  if (win.isMinimized) return null;

  return (
    <motion.div
      className="window-chrome absolute flex flex-col overflow-hidden rounded-md"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        maxWidth: "calc(100vw - 2rem)",
        maxHeight: "calc(100vh - 6rem)",
      }}
      initial={{ scale: 0.85, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onMouseDown={onFocus}
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-border bg-onyx/60 px-3 py-2 active:cursor-grabbing"
        onPointerDown={(e) => {
          e.preventDefault();
          onDragStart(e.clientX, e.clientY);
        }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          {win.title}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Minimize window"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
            aria-label="Close window"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5">{children}</div>
    </motion.div>
  );
}
