"use client";

import { useState } from "react";
import { BarChart2, Languages, Youtube } from "lucide-react";
import { COOKIE, LINKS, TRANSLATOR_CONSENT } from "@/lib/content";
import type { ConsentState } from "@/lib/types";

interface CompliancePanelProps {
  consent: ConsentState;
  onToggle: (key: keyof ConsentState) => void;
  onSelectAll: (enabled: boolean) => void;
  onSave: () => void;
  onTranslatorAccept: () => void;
  onTranslatorDecline: () => void;
}

export default function CompliancePanel({
  consent,
  onToggle,
  onSelectAll,
  onSave,
  onTranslatorAccept,
  onTranslatorDecline,
}: CompliancePanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const allOn = consent.video && consent.analytics && consent.translator;

  const services = [
    { key: "translator" as const, icon: Languages, ...COOKIE.services.translator },
    { key: "analytics" as const, icon: BarChart2, ...COOKIE.services.analytics },
    { key: "video" as const, icon: Youtube, ...COOKIE.services.video },
  ];

  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/60">Module E — COMPLIANCE CONTEXT PANEL</p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase text-white">{COOKIE.moduleTitle}</h2>
        <p className="mt-2 text-sm text-zinc-400">{COOKIE.settingsDescription}</p>
      </div>

      {!consent.translator && (
        <div className="rounded border border-border bg-onyx/40 p-4 text-center">
          <p className="font-display text-sm font-semibold text-white">{TRANSLATOR_CONSENT.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{TRANSLATOR_CONSENT.body}</p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              type="button"
              onClick={onTranslatorDecline}
              className="rounded border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400 hover:text-red-400"
            >
              {TRANSLATOR_CONSENT.decline}
            </button>
            <button
              type="button"
              onClick={onTranslatorAccept}
              className="rounded border border-cyan bg-cyan/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan"
            >
              {TRANSLATOR_CONSENT.accept}
            </button>
          </div>
        </div>
      )}

      {consent.translator && (
        <p className="font-mono text-xs text-cyan">{TRANSLATOR_CONSENT.enabled}</p>
      )}

      <div className="flex items-center justify-between rounded border border-border bg-black p-3">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">{COOKIE.selectAll}</span>
        <button
          type="button"
          role="switch"
          aria-checked={allOn}
          className={`industrial-toggle ${allOn ? "active" : ""}`}
          onClick={() => onSelectAll(!allOn)}
        />
      </div>

      {services.map(({ key, icon: Icon, name, description }) => (
        <div key={key} className="rounded border border-border bg-black">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-cyan" />
              <span className="font-mono text-xs text-zinc-300">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="font-mono text-[10px] uppercase tracking-wider text-cyan hover:underline"
                onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
              >
                {expanded[key] ? COOKIE.expandLess : COOKIE.expandMore}
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={consent[key]}
                className={`industrial-toggle ${consent[key] ? "active" : ""}`}
                onClick={() => onToggle(key)}
              />
            </div>
          </div>
          {expanded[key] && (
            <div className="border-t border-border px-3 py-2 text-xs text-zinc-500">{description}</div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={onSave}
        className="w-full rounded border border-cyan bg-cyan/10 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
      >
        {COOKIE.saveSettings}
      </button>

      <div className="flex flex-wrap gap-4 border-t border-border pt-4">
        <a href={LINKS.privacyPolicy} className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
          Privacy Policy
        </a>
        <a href={LINKS.legalNotice} className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
          Legal Notice
        </a>
      </div>
    </div>
  );
}
