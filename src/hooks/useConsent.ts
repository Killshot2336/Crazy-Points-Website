"use client";

import { useCallback, useState } from "react";
import type { ConsentState } from "@/lib/types";

const CONSENT_KEY = "ppg_cookie_consent";
const BANNER_KEY = "ppg_cookie_banner";

const DEFAULT_CONSENT: ConsentState = {
  video: false,
  analytics: false,
  translator: false,
};

function readConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : DEFAULT_CONSENT;
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentState>(DEFAULT_CONSENT);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const hydrate = useCallback(() => {
    setConsentState(readConsent());
    setBannerVisible(!localStorage.getItem(BANNER_KEY));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentState, dismissBanner = true) => {
    setConsentState(next);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    if (dismissBanner) {
      localStorage.setItem(BANNER_KEY, "1");
      setBannerVisible(false);
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ video: true, analytics: true, translator: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ video: false, analytics: false, translator: false });
  }, [persist]);

  const toggleService = useCallback(
    (key: keyof ConsentState) => {
      const next = { ...consent, [key]: !consent[key] };
      persist(next, false);
    },
    [consent, persist],
  );

  const setAllServices = useCallback(
    (enabled: boolean) => {
      persist({ video: enabled, analytics: enabled, translator: enabled }, false);
    },
    [persist],
  );

  const saveSettings = useCallback(() => {
    persist(consent);
    setSettingsOpen(false);
  }, [consent, persist]);

  return {
    consent,
    bannerVisible,
    settingsOpen,
    hydrated,
    hydrate,
    acceptAll,
    rejectAll,
    toggleService,
    setAllServices,
    saveSettings,
    setSettingsOpen,
    setConsent: persist,
  };
}
