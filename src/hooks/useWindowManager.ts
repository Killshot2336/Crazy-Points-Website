"use client";

import { useCallback, useRef, useState } from "react";
import { NAV_SHORTCUTS } from "@/lib/content";
import type { NavShortcut, OSWindow, WindowModuleId } from "@/lib/types";

let zCounter = 100;

function createWindow(moduleId: WindowModuleId, index: number): OSWindow {
  const shortcut = NAV_SHORTCUTS.find((s) => s.id === moduleId)!;
  const offset = index * 28;
  return {
    id: `${moduleId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    moduleId,
    title: shortcut.title,
    x: 80 + offset,
    y: 60 + offset,
    width: shortcut.defaultWidth,
    height: shortcut.defaultHeight,
    zIndex: ++zCounter,
    isMinimized: false,
  };
}

const EXTRA_MODULES: Record<string, Omit<NavShortcut, "id" | "label" | "icon">> = {
  analytics: {
    title: "STUDIO ANALYTICS",
    defaultWidth: 640,
    defaultHeight: 420,
  },
  world: {
    title: "WORLD FEED — CLIP ARCHIVE",
    defaultWidth: 760,
    defaultHeight: 560,
  },
  compliance: {
    title: "SYSTEM PERMISSIONS SECURITY MODULE",
    defaultWidth: 680,
    defaultHeight: 520,
  },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<OSWindow[]>([]);
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter, isMinimized: false } : w)),
    );
  }, []);

  const openWindow = useCallback(
    (moduleId: WindowModuleId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.moduleId === moduleId && !w.isMinimized);
        if (existing) {
          zCounter++;
          return prev.map((w) =>
            w.id === existing.id ? { ...w, zIndex: zCounter, isMinimized: false } : w,
          );
        }
        return [...prev, createWindow(moduleId, prev.length)];
      });
    },
    [],
  );

  const openExtraWindow = useCallback((moduleId: "analytics" | "world" | "compliance") => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.moduleId === moduleId && !w.isMinimized);
      if (existing) {
        zCounter++;
        return prev.map((w) =>
          w.id === existing.id ? { ...w, zIndex: zCounter, isMinimized: false } : w,
        );
      }
      const meta = EXTRA_MODULES[moduleId];
      const offset = prev.length * 28;
      const win: OSWindow = {
        id: `${moduleId}-${Date.now()}`,
        moduleId,
        title: meta.title,
        x: 120 + offset,
        y: 80 + offset,
        width: meta.defaultWidth,
        height: meta.defaultHeight,
        zIndex: ++zCounter,
        isMinimized: false,
      };
      return [...prev, win];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const startDrag = useCallback((id: string, clientX: number, clientY: number) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    dragRef.current = { id, ox: clientX - win.x, oy: clientY - win.y };
    focusWindow(id);
  }, [windows, focusWindow]);

  const onDrag = useCallback((clientX: number, clientY: number) => {
    if (!dragRef.current) return;
    const { id, ox, oy } = dragRef.current;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              x: Math.max(0, clientX - ox),
              y: Math.max(0, clientY - oy),
            }
          : w,
      ),
    );
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
  }, []);

  return {
    windows,
    openWindow,
    openExtraWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    startDrag,
    onDrag,
    endDrag,
  };
}
