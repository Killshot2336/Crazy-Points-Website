"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, Phone, Send } from "lucide-react";
import { CONTACT, FORM, LINKS, TRANSFER_LINES } from "@/lib/content";
import type { ContactFormData } from "@/lib/types";

const INITIAL: ContactFormData = {
  name: "",
  email: "",
  steam: "",
  discord: "",
  message: "",
  businessEnquiry: false,
  lookingForWork: false,
  support: false,
  consent: false,
};

export default function CommsTerminal() {
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData | "global", string>>>({});
  const [transferring, setTransferring] = useState(false);
  const [transferLine, setTransferLine] = useState(0);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = FORM.requiredError;
    if (!form.email.trim()) next.email = FORM.requiredError;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = FORM.emailInvalid;
    if (!form.message.trim()) next.message = FORM.requiredError;
    if (!form.consent) next.consent = FORM.requiredError;
    if (Object.keys(next).length) next.global = FORM.globalError;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const runTransfer = () => {
    setTransferring(true);
    setTransferLine(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTransferLine(i);
      if (i >= TRANSFER_LINES.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTransferring(false);
          setSuccess(true);
          setForm(INITIAL);
        }, 400);
      }
    }, 500);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setSendError(false);
    if (!validate()) return;
    runTransfer();
  };

  return (
    <div className="relative space-y-5">
      <AnimatePresence>
        {transferring && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-sm space-y-2 font-mono text-xs text-cyan">
              {TRANSFER_LINES.slice(0, transferLine).map((line) => (
                <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  &gt; {line}
                </motion.p>
              ))}
            </div>
            <motion.div
              className="mt-6 h-1 w-48 overflow-hidden rounded bg-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-cyan"
                animate={{ width: `${(transferLine / TRANSFER_LINES.length) * 100}%` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/60">Module D — INTEGRATED COMS TERMINAL</p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase text-white">{CONTACT.title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href={LINKS.phoneHref}
          className="flex items-center gap-3 rounded border border-border bg-onyx/40 p-3 text-sm text-zinc-300 hover:border-cyan/30"
        >
          <Phone className="h-4 w-4 text-cyan" />
          {CONTACT.telephone}
        </a>
        <a
          href={LINKS.emailHref}
          className="flex items-center gap-3 rounded border border-border bg-onyx/40 p-3 text-sm text-zinc-300 hover:border-cyan/30"
        >
          <Mail className="h-4 w-4 text-cyan" />
          {CONTACT.email}
        </a>
      </div>

      <div className="flex gap-2">
        <a href={LINKS.emailHref} className="rounded border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
          Email
        </a>
        <a href={LINKS.phoneHref} className="rounded border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-cyan">
          Tel
        </a>
      </div>

      <p className="font-display text-sm font-semibold text-white">{CONTACT.supportLine}</p>
      <p className="text-sm text-cyan glow-text">{CONTACT.cta}</p>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {FORM.name}<span className="text-cyan">*</span>
          </label>
          <input
            type="text"
            maxLength={200}
            autoComplete="off"
            className="terminal-input w-full rounded border border-border bg-black px-3 py-2.5 text-sm text-zinc-200"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {FORM.email}<span className="text-cyan">*</span>
          </label>
          <input
            type="email"
            maxLength={200}
            autoComplete="nope"
            className="terminal-input w-full rounded border border-border bg-black px-3 py-2.5 text-sm text-zinc-200"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">{FORM.steam}</label>
          <input
            type="text"
            maxLength={200}
            autoComplete="off"
            className="terminal-input w-full rounded border border-border bg-black px-3 py-2.5 text-sm text-zinc-200"
            value={form.steam}
            onChange={(e) => setForm({ ...form, steam: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">{FORM.discord}</label>
          <input
            type="text"
            maxLength={200}
            autoComplete="off"
            className="terminal-input w-full rounded border border-border bg-black px-3 py-2.5 text-sm text-zinc-200"
            value={form.discord}
            onChange={(e) => setForm({ ...form, discord: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {FORM.message}<span className="text-cyan">*</span>
          </label>
          <textarea
            rows={6}
            maxLength={2500}
            autoComplete="off"
            className="terminal-input w-full resize-y rounded border border-border bg-black px-3 py-2.5 text-sm text-zinc-200"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>

        <fieldset className="space-y-2">
          <legend className="sr-only">Enquiry type</legend>
          {[
            { key: "businessEnquiry" as const, label: FORM.businessEnquiry },
            { key: "lookingForWork" as const, label: FORM.lookingForWork },
            { key: "support" as const, label: FORM.support },
          ].map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                className="rounded border-border bg-black text-cyan"
              />
              {label}
            </label>
          ))}
        </fieldset>

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 rounded border-border bg-black text-cyan"
            />
            <span>
              {FORM.consent}<span className="text-cyan">*</span>
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent}</p>}
        </div>

        {errors.global && <p className="text-xs text-red-400">{errors.global}</p>}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded border border-cyan bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan/20"
        >
          <Send className="h-4 w-4" />
          {FORM.send}
        </button>

        {sendError && <p className="text-xs text-red-400">{FORM.sendError}</p>}

        {success && (
          <div className="flex items-center gap-2 rounded border border-cyan/30 bg-cyan/5 p-3 text-sm text-cyan">
            <CheckCircle className="h-4 w-4" />
            {FORM.sendSuccess}
          </div>
        )}
      </form>
    </div>
  );
}
