export type PackageKey = "watchHours" | "longForm" | "shorts";

export type Package = {
  name: string;
  price: string;
  priceNote: string;
  pitch: string;
};

// Mirrors the package cards on the homepage (public/index.html). Keep them in sync.
export const PACKAGES: Record<PackageKey, Package> = {
  watchHours: {
    name: "Watch Hours Only",
    price: "$300",
    priceNote: "one-time · 1-month plan",
    pitch:
      "A personalized watch-hour strategy, a retention-focused content calendar and a written action plan, built to close the gap to 4,000 hours before the Feb 1, 2027 change.",
  },
  longForm: {
    name: "Long-Form Monetization — Faceless AI Niche",
    price: "$400/mo",
    priceNote: "3-month plan · $1,200 total",
    pitch:
      "We build and run a faceless long-form channel for you: niche research, 3 videos a week, a daily Short, editing, posting and monthly reports, backed by our Work-Until-Eligible commitment.",
  },
  shorts: {
    name: "Shorts Monetization — Faceless AI Niche",
    price: "$1,100",
    priceNote: "one-time · 3-month plan paid upfront",
    pitch:
      "A fully automated Shorts system in one niche: channel setup, AI script, voice and edit templates, your first batch produced and scheduled, and a hand-off guide.",
  },
};

export const SITE_URL = "https://viralmonipoint.com";
export const CONTACT_URL = "/#contact";
export const PACKAGES_URL = "/#packages";
