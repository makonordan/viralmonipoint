"use client";

import { useState } from "react";
import { CTABlock } from "@/components/CTABlock";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { NumberInput } from "@/components/Inputs";
import { ResultPanel } from "@/components/ResultPanel";
import type { PackageKey } from "@/lib/packages";
import { assess, TIER1, TIER2, TIER2_2027, type Metric } from "@/lib/ypp";

const fmt = (n: number) => n.toLocaleString("en-US");

const METRICS: { key: Metric; label: string; unit: string; tier1: number; tier2: number }[] = [
  { key: "subs", label: "Subscribers", unit: "subscribers", tier1: TIER1.subs, tier2: TIER2.subs },
  { key: "watchHours", label: "Watch hours (365 days)", unit: "watch hours", tier1: TIER1.watchHours, tier2: TIER2.watchHours },
  { key: "shortsViews", label: "Shorts views (90 days)", unit: "Shorts views", tier1: TIER1.shortsViews, tier2: TIER2.shortsViews },
];

const TIER_TEXT = {
  2: { value: "Tier 2 met", detail: "You meet the full YouTube Partner Program thresholds, including ad revenue sharing." },
  1: { value: "Tier 1 met", detail: "You meet the fan-funding tier (memberships, Super Thanks and more), but not full ad revenue yet." },
  0: { value: "Not yet eligible", detail: "You haven't reached either YouTube Partner Program tier yet." },
} as const;

// Where each bottleneck points: watch hours → Watch Hours Only, Shorts → Shorts Monetization.
const CTA_FOR: Record<Metric, PackageKey> = { watchHours: "watchHours", shortsViews: "shorts", subs: "longForm" };

function Bar({ value, target, tier1, met }: { value: number; target: number; tier1: number; met: boolean }) {
  const pct = Math.min(100, (Math.max(0, value) / target) * 100);
  return (
    <div className="relative h-2.5 overflow-hidden rounded-full bg-ink-3" role="presentation">
      <div className={`h-full rounded-full ${met ? "bg-[#35c47c]" : "bg-yellow"}`} style={{ width: `${pct}%` }} />
      <span className="absolute inset-y-0 w-0.5 bg-white/60" style={{ left: `${(tier1 / target) * 100}%` }} title="Tier 1 threshold" />
    </div>
  );
}

export function EligibilityChecker() {
  const [subs, setSubs] = useState<number | "">("");
  const [watchHours, setWatchHours] = useState<number | "">("");
  const [shortsViews, setShortsViews] = useState<number | "">("");

  const numbers = { subs: Number(subs) || 0, watchHours: Number(watchHours) || 0, shortsViews: Number(shortsViews) || 0 };
  const hasInput = subs !== "" || watchHours !== "" || shortsViews !== "";
  const a = assess(numbers);
  const t = TIER_TEXT[a.tier];

  const bottleneckLine =
    a.bottleneck &&
    `Your bottleneck is ${METRICS.find((m) => m.key === a.bottleneck)!.unit}: ${fmt(a.shortfall)} more to reach Tier 2.`;

  const copyText = [
    `YPP eligibility: ${t.value}`,
    ...METRICS.map((m) => `${m.label}: ${fmt(numbers[m.key])} / ${fmt(m.tier2)} (${Math.round(a.progress[m.key] * 100)}%)`),
    bottleneckLine ?? "",
  ]
    .filter(Boolean)
    .join("\n");

  const ctaPkg: PackageKey = a.bottleneck ? CTA_FOR[a.bottleneck] : "watchHours";
  const ctaLead =
    a.bottleneck === "watchHours"
      ? `You're ${fmt(a.shortfall)} watch hours short. We can help close that gap.`
      : a.bottleneck === "shortsViews"
        ? `You're ${fmt(a.shortfall)} Shorts views short. Let's build the system that gets you there.`
        : a.bottleneck === "subs"
          ? `You need ${fmt(a.shortfall)} more subscribers. Let a done-for-you channel do the heavy lifting.`
          : undefined;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        <div className="flex flex-col gap-5 rounded-card border border-line bg-paper p-6">
          <NumberInput label="Subscribers" value={subs} onChange={setSubs} placeholder="e.g. 640" />
          <NumberInput label="Watch hours" hint="(last 365 days)" value={watchHours} onChange={setWatchHours} suffix="hrs" placeholder="e.g. 2,150" />
          <NumberInput label="Shorts views" hint="(last 90 days)" value={shortsViews} onChange={setShortsViews} placeholder="e.g. 1,200,000" />
          <p className="m-0 text-[13px] leading-relaxed text-grey">
            Find these in <strong className="text-ink">YouTube Studio → Earn</strong>, or in Analytics for the last 365 and 90 days. Only
            public watch hours on long-form videos count.
          </p>
        </div>

        {hasInput ? (
          <ResultPanel
            label="Your eligibility"
            value={t.value}
            copyText={copyText}
            detail={
              <div className="flex flex-col gap-5">
                <p className="m-0">{t.detail}</p>
                {METRICS.map((m) => {
                  const met = numbers[m.key] >= m.tier2;
                  const dim = a.bottleneck && m.key !== "subs" && m.key !== a.path;
                  return (
                    <div key={m.key} className={dim ? "opacity-55" : undefined}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="font-bold text-white">{m.label}</span>
                        <span className="font-num font-bold tabular">
                          {fmt(numbers[m.key])} <span className="text-[#9a9aa2]">/ {fmt(m.tier2)}</span>
                        </span>
                      </div>
                      <Bar value={numbers[m.key]} target={m.tier2} tier1={m.tier1} met={met} />
                    </div>
                  );
                })}
                <p className="m-0 text-xs text-[#9a9aa2]">Bars show progress to Tier 2. The white tick marks the Tier 1 threshold. You need watch hours or Shorts views, not both.</p>
                {bottleneckLine && (
                  <p className="m-0 rounded-xl bg-red/15 px-4 py-3 font-bold text-white ring-1 ring-red/50">⚠ {bottleneckLine}</p>
                )}
                {a.tier === 2 && !a.meets2027 && (
                  <p className="m-0 rounded-xl bg-yellow/10 px-4 py-3 text-[13.5px] text-[#ffe08a] ring-1 ring-yellow/40">
                    Apply soon: from Feb 1, 2027, new applicants need {fmt(TIER2_2027.watchHours)} watch hours or{" "}
                    {fmt(TIER2_2027.shortsViews)} Shorts views. Your numbers meet today&apos;s bar but not the new one.
                  </p>
                )}
              </div>
            }
          />
        ) : (
          <div className="flex min-h-[260px] items-center justify-center rounded-card border-2 border-dashed border-line-strong bg-paper-2 p-8 text-center text-[15px] font-semibold text-grey">
            Enter your subscribers, watch hours and Shorts views to see which tier you qualify for.
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <TierCard title="Tier 1 — Fan funding" items={[`${fmt(TIER1.subs)} subscribers`, `${fmt(TIER1.watchHours)} watch hours (365 days) or ${fmt(TIER1.shortsViews)} Shorts views (90 days)`, "3 public uploads in the last 90 days"]} unlocks="Channel memberships, Super Chat, Super Thanks and Shopping" />
        <TierCard title="Tier 2 — Full YPP" items={[`${fmt(TIER2.subs)} subscribers`, `${fmt(TIER2.watchHours)} watch hours (365 days) or ${fmt(TIER2.shortsViews)} Shorts views (90 days)`]} unlocks="Everything in Tier 1, plus ad revenue sharing" note={`From Feb 1, 2027: ${fmt(TIER2_2027.watchHours)} watch hours or ${fmt(TIER2_2027.shortsViews)} Shorts views for new applicants.`} />
      </div>

      <div className="mt-8">
        <DisclaimerBox>
          <strong className="text-ink">These are YouTube&apos;s published thresholds.</strong> Meeting them makes you eligible to
          apply, not approved. YouTube reviews every channel against its policies, and YouTube, not ViralMoniPoint, decides who
          is accepted into the Partner Program.
        </DisclaimerBox>
      </div>

      <CTABlock pkg={ctaPkg} lead={hasInput ? ctaLead : undefined} />
    </>
  );
}

function TierCard({ title, items, unlocks, note }: { title: string; items: string[]; unlocks: string; note?: string }) {
  return (
    <div className="rounded-card border border-line bg-paper-2 p-5">
      <h2 className="mb-3 mt-0 font-display text-lg font-black tracking-[-0.01em] text-ink">{title}</h2>
      <ul className="m-0 mb-3 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-text">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <p className="m-0 text-[13px] text-grey"><strong className="text-ink">Unlocks:</strong> {unlocks}</p>
      {note && <p className="mb-0 mt-2 text-[13px] font-semibold text-red">{note}</p>}
    </div>
  );
}
