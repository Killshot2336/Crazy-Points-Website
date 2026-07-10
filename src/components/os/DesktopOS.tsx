"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequencer from "./BootSequencer";
import Taskbar from "./Taskbar";
import WindowFrame from "./WindowFrame";
import CookieBanner, { DashboardTray } from "./CookieBanner";
import ParticleField from "@/components/webgl/ParticleField";
import CRTOverlay from "@/components/effects/CRTOverlay";
import CryoCommodore from "@/components/modules/CryoCommodore";
import QuestTimeline from "@/components/modules/QuestTimeline";
import StudioAnalytics from "@/components/modules/StudioAnalytics";
import CommsTerminal from "@/components/modules/CommsTerminal";
import CompliancePanel from "@/components/modules/CompliancePanel";
import CryodeathVRModule from "@/components/modules/CryodeathVRModule";
import PressKitModule from "@/components/modules/PressKitModule";
import WorldClipsModule from "@/components/modules/WorldClipsModule";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useConsent } from "@/hooks/useConsent";
import { useSyntheticAudio } from "@/hooks/useSyntheticAudio";
import type { OSWindow } from "@/lib/types";

function WindowContent({
  win,
  consent,
  onVideoAccept,
  onConsentToggle,
  onConsentSelectAll,
  onConsentSave,
  onTranslatorAccept,
  onTranslatorDecline,
}: {
  win: OSWindow;
  consent: ReturnType<typeof useConsent>["consent"];
  onVideoAccept: () => void;
  onConsentToggle: (key: "video" | "analytics" | "translator") => void;
  onConsentSelectAll: (enabled: boolean) => void;
  onConsentSave: () => void;
  onTranslatorAccept: () => void;
  onTranslatorDecline: () => void;
}) {
  switch (win.moduleId) {
    case "home":
      return <CryoCommodore videoAllowed={consent.video} onVideoAccept={onVideoAccept} />;
    case "cryodeath-vr":
      return <CryodeathVRModule videoAllowed={consent.video} onVideoAccept={onVideoAccept} />;
    case "press-kit":
      return <PressKitModule />;
    case "contact":
      return <CommsTerminal />;
    case "cryodeath-quest":
      return <QuestTimeline />;
    case "analytics":
      return <StudioAnalytics />;
    case "world":
      return <WorldClipsModule />;
    case "compliance":
      return (
        <CompliancePanel
          consent={consent}
          onToggle={onConsentToggle}
          onSelectAll={onConsentSelectAll}
          onSave={onConsentSave}
          onTranslatorAccept={onTranslatorAccept}
          onTranslatorDecline={onTranslatorDecline}
        />
      );
    default:
      return null;
  }
}

export default function DesktopOS() {
  const [booted, setBooted] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const {
    windows,
    openWindow,
    openExtraWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    startDrag,
    onDrag,
    endDrag,
  } = useWindowManager();
  const {
    consent,
    bannerVisible,
    hydrated,
    hydrate,
    acceptAll,
    rejectAll,
    toggleService,
    setAllServices,
    saveSettings,
    setConsent,
  } = useConsent();
  const { playTick, playHum } = useSyntheticAudio();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => onDrag(e.clientX, e.clientY);
    const onUp = () => endDrag();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onDrag, endDrag]);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setTimeout(() => setShowDesktop(true), 100);
    setTimeout(() => {
      openWindow("home");
      openExtraWindow("analytics");
    }, 500);
  }, [openWindow, openExtraWindow]);

  const handleNavClick = useCallback(() => {
    playTick("nav");
    playHum();
  }, [playTick, playHum]);

  const handleClose = useCallback(
    (id: string) => {
      playTick("close");
      closeWindow(id);
    },
    [closeWindow, playTick],
  );

  const handleVideoAccept = useCallback(() => {
    setConsent({ ...consent, video: true }, false);
    playTick("toggle");
  }, [consent, setConsent, playTick]);

  const minimizedModules = windows.filter((w) => w.isMinimized).map((w) => w.moduleId);

  return (
    <>
      <ParticleField />
      <div className="os-grid fixed inset-0 z-[1] opacity-30" aria-hidden="true" />

      {!booted && <BootSequencer onComplete={handleBootComplete} />}

      <AnimatePresence>
        {showDesktop && (
          <motion.div
            className="fixed inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Taskbar
              onLaunch={openWindow}
              onLaunchExtra={openExtraWindow}
              onNavClick={handleNavClick}
              minimizedModules={minimizedModules}
            />

            <main className="absolute inset-0 overflow-hidden pt-[88px] pb-12">
              <AnimatePresence>
                {windows.map((win) => (
                  <WindowFrame
                    key={win.id}
                    window={win}
                    onClose={() => handleClose(win.id)}
                    onMinimize={() => minimizeWindow(win.id)}
                    onFocus={() => focusWindow(win.id)}
                    onDragStart={(x, y) => startDrag(win.id, x, y)}
                  >
                    <WindowContent
                      win={win}
                      consent={consent}
                      onVideoAccept={handleVideoAccept}
                      onConsentToggle={toggleService}
                      onConsentSelectAll={setAllServices}
                      onConsentSave={() => {
                        saveSettings();
                        playTick("toggle");
                      }}
                      onTranslatorAccept={() => {
                        setConsent({ ...consent, translator: true }, false);
                        playTick("toggle");
                      }}
                      onTranslatorDecline={() => {
                        setConsent({ ...consent, translator: false }, false);
                      }}
                    />
                  </WindowFrame>
                ))}
              </AnimatePresence>

              {windows.length === 0 && (
                <motion.div
                  className="flex h-full items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
                    Select an OS Launch Shortcut to begin
                  </p>
                </motion.div>
              )}
            </main>

            {hydrated && (
              <>
                <CookieBanner
                  visible={bannerVisible}
                  onAccept={() => {
                    acceptAll();
                    playTick("toggle");
                  }}
                  onReject={() => {
                    rejectAll();
                    playTick("close");
                  }}
                  onMore={() => {
                    openExtraWindow("compliance");
                    playTick("nav");
                  }}
                />
                <DashboardTray
                  consent={consent}
                  onOpenCompliance={() => {
                    openExtraWindow("compliance");
                    playTick("nav");
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CRTOverlay />
    </>
  );
}
