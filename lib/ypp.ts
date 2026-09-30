// YouTube Partner Program thresholds as published by YouTube for new applicants.
// Tier 1 (fan funding) also requires 3 public uploads in the last 90 days, which isn't an input here.
export const TIER1 = { subs: 500, watchHours: 3_000, shortsViews: 3_000_000 };
export const TIER2 = { subs: 1_000, watchHours: 4_000, shortsViews: 10_000_000 };
/** Tier 2 viewing thresholds for new applicants from Feb 1, 2027 (subscribers unchanged). */
export const TIER2_2027 = { watchHours: 8_000, shortsViews: 20_000_000 };

export type Metric = "subs" | "watchHours" | "shortsViews";

export type Numbers = { subs: number; watchHours: number; shortsViews: number };

type Tier = { subs: number; watchHours: number; shortsViews: number };

export function meetsTier(n: Numbers, t: Tier): boolean {
  return n.subs >= t.subs && (n.watchHours >= t.watchHours || n.shortsViews >= t.shortsViews);
}

/** Progress toward a target, capped at 1. */
export function progress(value: number, target: number): number {
  return Math.min(1, Math.max(0, value) / target);
}

export type Assessment = {
  tier: 0 | 1 | 2;
  /** Share of each Tier 2 target reached (0–1). */
  progress: Record<Metric, number>;
  /** The viewing path the channel is closer on: long-form watch hours or Shorts views. */
  path: "watchHours" | "shortsViews";
  /** The requirement holding the channel back from Tier 2, or null if Tier 2 is met. */
  bottleneck: Metric | null;
  /** How much more of the bottleneck metric is needed for Tier 2. */
  shortfall: number;
  meets2027: boolean;
};

export function assess(n: Numbers): Assessment {
  const p: Record<Metric, number> = {
    subs: progress(n.subs, TIER2.subs),
    watchHours: progress(n.watchHours, TIER2.watchHours),
    shortsViews: progress(n.shortsViews, TIER2.shortsViews),
  };
  const tier = meetsTier(n, TIER2) ? 2 : meetsTier(n, TIER1) ? 1 : 0;

  // Watch hours OR Shorts views qualifies, so only the closer path matters. Ties go to watch hours.
  const path = p.shortsViews > p.watchHours ? "shortsViews" : "watchHours";

  let bottleneck: Metric | null = null;
  if (tier !== 2) bottleneck = p.subs < p[path] ? "subs" : path;
  const shortfall = bottleneck ? Math.max(0, TIER2[bottleneck] - n[bottleneck]) : 0;

  const meets2027 =
    n.subs >= TIER2.subs && (n.watchHours >= TIER2_2027.watchHours || n.shortsViews >= TIER2_2027.shortsViews);

  return { tier, progress: p, path, bottleneck, shortfall, meets2027 };
}
