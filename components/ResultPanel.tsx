"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type ResultPanelProps = {
  label: string;
  /** The headline output: a number, amount or short text. */
  value: React.ReactNode;
  /** Plain text that the copy button puts on the clipboard. Defaults to the value when it's a string/number. */
  copyText?: string;
  /** Supporting line under the value. */
  detail?: React.ReactNode;
  /** "big" for a single number, "text" for longer copyable output like titles or descriptions. */
  variant?: "big" | "text";
};

export function ResultPanel({ label, value, copyText, detail, variant = "big" }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const text = copyText ?? (typeof value === "string" || typeof value === "number" ? String(value) : "");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this:", text);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-6 text-white after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:bg-yellow" aria-live="polite">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="m-0 font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#9a9aa2]">{label}</p>
        {text && (
          <button
            type="button"
            onClick={copy}
            className="inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-yellow px-3 py-1.5 text-[12.5px] font-extrabold text-ink hover:bg-yellow-deep"
          >
            <Icon name="copy" className="size-3.5" />
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      {variant === "big" ? (
        <div className="font-num text-[clamp(34px,6vw,52px)] font-black leading-none tracking-[-0.03em] text-yellow tabular">{value}</div>
      ) : (
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#ececf0]">{value}</div>
      )}
      {detail && <div className="mt-3 pb-1 text-sm leading-relaxed text-[#c9c9cf]">{detail}</div>}
    </div>
  );
}
