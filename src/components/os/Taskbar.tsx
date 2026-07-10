"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  Activity,
  BarChart3,
  FolderOpen,
  Gamepad2,
  Globe,
  Home,
  Radar,
  Radio,
  Shield,
} from "lucide-react";
import { NAV_SHORTCUTS, SITE } from "@/lib/content";
import type { WindowModuleId } from "@/lib/types";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  home: Home,
  "gamepad-2": Gamepad2,
  "folder-open": FolderOpen,
  radio: Radio,
  radar: Radar,
};

interface TaskbarProps {
  onLaunch: (id: WindowModuleId) => void;
  onLaunchExtra: (id: "analytics" | "world" | "compliance") => void;
  onNavClick: () => void;
  minimizedModules: WindowModuleId[];
}

export default function Taskbar({ onLaunch, onLaunchExtra, onNavClick, minimizedModules }: TaskbarProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[5000] border-b border-border bg-black/80 backdrop-blur-xl"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 26 }}
    >
      <div className="flex items-center justify-between px-3 py-2 sm:px-5">
        <div className="flex items-center gap-3">
          <img src={SITE.logo} alt="Panic Point Games" className="h-8 w-auto sm:h-9" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/60 sm:inline">
            CRYO_OS v3.7
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-1" aria-label="OS Launch Shortcuts">
          {NAV_SHORTCUTS.map((shortcut) => {
            const Icon = ICON_MAP[shortcut.icon] ?? Home;
            const isMin = minimizedModules.includes(shortcut.id);
            return (
              <button
                key={shortcut.id}
                type="button"
                onClick={() => {
                  onNavClick();
                  onLaunch(shortcut.id);
                }}
                className={`group flex items-center gap-1.5 rounded border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all sm:px-3 sm:text-xs ${
                  shortcut.id === "cryodeath-quest"
                    ? "border-cyan/40 bg-cyan/5 text-cyan hover:border-cyan hover:bg-cyan/10"
                    : "border-border text-zinc-400 hover:border-cyan/40 hover:text-cyan"
                } ${isMin ? "ring-1 ring-cyan/30" : ""}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{shortcut.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 border-t border-border/60 px-3 py-1.5 sm:px-5">
        <button
          type="button"
          onClick={() => {
            onNavClick();
            onLaunchExtra("analytics");
          }}
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:bg-zinc-900 hover:text-cyan"
        >
          <BarChart3 className="h-3 w-3" />
          Analytics
        </button>
        <button
          type="button"
          onClick={() => {
            onNavClick();
            onLaunchExtra("world");
          }}
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:bg-zinc-900 hover:text-cyan"
        >
          <Globe className="h-3 w-3" />
          World Feed
        </button>
        <button
          type="button"
          onClick={() => {
            onNavClick();
            onLaunchExtra("compliance");
          }}
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:bg-zinc-900 hover:text-cyan"
        >
          <Shield className="h-3 w-3" />
          Permissions
        </button>
        <div className="ml-auto flex items-center gap-2 font-mono text-[10px] text-zinc-600">
          <Activity className="h-3 w-3 text-cyan/60" />
          SYS_NOMINAL
        </div>
      </div>
    </motion.header>
  );
}
