import type { IconName } from "@/components/Icon";
import type { PackageKey } from "@/lib/packages";

export type ToolCategory =
  | "Monetization & Eligibility"
  | "Content Creation"
  | "Optimization"
  | "Setup & Utility";

export const CATEGORIES: ToolCategory[] = [
  "Monetization & Eligibility",
  "Content Creation",
  "Optimization",
  "Setup & Utility",
];

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: IconName;
  /** The package this tool's CTA points to. */
  cta: PackageKey;
  /** Flip to true once the tool page is built. Unbuilt tools render a "coming soon" page with noindex. */
  live: boolean;
};

// Single source of truth for the /tools index, the per-tool routes and the sitemap.
export const TOOLS: Tool[] = [
  // Monetization & Eligibility
  { slug: "watch-hours-calculator", name: "YouTube Watch Hours Calculator", description: "See how many watch hours your channel has and how far you are from 4,000.", category: "Monetization & Eligibility", icon: "clock", cta: "watchHours", live: false },
  { slug: "ypp-eligibility-checker", name: "YPP Eligibility Checker", description: "Check your subscribers, watch hours and Shorts views against both YouTube Partner Program tiers.", category: "Monetization & Eligibility", icon: "check", cta: "watchHours", live: true },
  { slug: "shorts-views-calculator", name: "Shorts Views Calculator", description: "Work out the daily Shorts views you need to hit the 90-day threshold.", category: "Monetization & Eligibility", icon: "bolt", cta: "shorts", live: false },
  { slug: "youtube-earnings-calculator", name: "YouTube Earnings Estimator", description: "Estimate ad revenue from views and RPM, with low, typical and high ranges.", category: "Monetization & Eligibility", icon: "dollar", cta: "longForm", live: false },
  { slug: "monetization-timeline-calculator", name: "Monetization Timeline Calculator", description: "Estimate how long it could take to qualify at your current pace.", category: "Monetization & Eligibility", icon: "calendar", cta: "watchHours", live: false },
  { slug: "ypp-2027-requirements-calculator", name: "Feb 2027 YPP Change Calculator", description: "See what the doubled watch-hour and Shorts thresholds mean for your channel.", category: "Monetization & Eligibility", icon: "alert", cta: "watchHours", live: false },

  // Content Creation
  { slug: "youtube-title-generator", name: "YouTube Title Generator", description: "Turn a topic into proven title formats you can adapt.", category: "Content Creation", icon: "type", cta: "longForm", live: false },
  { slug: "video-hook-generator", name: "Video Hook Generator", description: "Write opening lines that keep viewers past the first 15 seconds.", category: "Content Creation", icon: "sparkle", cta: "longForm", live: false },
  { slug: "video-script-outline", name: "Video Script Outline Builder", description: "Structure a video from hook to call to action in minutes.", category: "Content Creation", icon: "list", cta: "longForm", live: false },
  { slug: "faceless-niche-finder", name: "Faceless Channel Niche Finder", description: "Explore faceless niche ideas matched to your interests and format.", category: "Content Creation", icon: "compass", cta: "longForm", live: false },
  { slug: "content-calendar-planner", name: "Content Calendar Planner", description: "Plan a realistic upload schedule you can actually stick to.", category: "Content Creation", icon: "calendar", cta: "longForm", live: false },

  // Optimization
  { slug: "title-length-checker", name: "Title Length Checker", description: "Check title length and preview how it truncates on mobile and desktop.", category: "Optimization", icon: "ruler", cta: "watchHours", live: false },
  { slug: "youtube-description-generator", name: "YouTube Description Generator", description: "Build a structured description with chapters, links and keywords.", category: "Optimization", icon: "text", cta: "longForm", live: false },
  { slug: "youtube-tag-generator", name: "YouTube Tag Generator", description: "Generate keyword variations from your topic to use as tags.", category: "Optimization", icon: "tag", cta: "watchHours", live: false },
  { slug: "thumbnail-text-checker", name: "Thumbnail Text Checker", description: "Keep thumbnail text short and readable at small sizes.", category: "Optimization", icon: "image", cta: "longForm", live: false },
  { slug: "audience-retention-calculator", name: "Audience Retention Calculator", description: "Convert average view duration into retention and watch-hour impact.", category: "Optimization", icon: "chart", cta: "watchHours", live: false },
  { slug: "engagement-rate-calculator", name: "Engagement Rate Calculator", description: "Measure likes and comments against views to benchmark your videos.", category: "Optimization", icon: "heart", cta: "watchHours", live: false },

  // Setup & Utility
  { slug: "channel-name-generator", name: "Channel Name Generator", description: "Brainstorm memorable channel names from your niche and style.", category: "Setup & Utility", icon: "id", cta: "longForm", live: false },
  { slug: "youtube-chapters-generator", name: "YouTube Chapters Generator", description: "Format timestamps into chapters YouTube recognises.", category: "Setup & Utility", icon: "film", cta: "longForm", live: false },
  { slug: "channel-art-size-guide", name: "Channel Art Size Guide", description: "Every YouTube image size in one place: banner, thumbnail, profile and more.", category: "Setup & Utility", icon: "layout", cta: "longForm", live: false },
  { slug: "script-length-calculator", name: "Script Length Calculator", description: "Convert word count to video length, and video length to word count.", category: "Setup & Utility", icon: "timer", cta: "shorts", live: false },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
