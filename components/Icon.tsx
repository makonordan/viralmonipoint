// Line icons in the same style as the homepage (24px grid, 2px stroke, round caps).
const PATHS = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />,
  dollar: <><path d="M12 2v20" /><path d="M17 6.5c-1-1.2-2.8-2-5-2-2.8 0-4.5 1.4-4.5 3.3 0 4.7 9.5 2.3 9.5 7.4 0 2-1.9 3.3-5 3.3-2.3 0-4.2-.8-5.2-2.2" /></>,
  calendar: <><rect x="3" y="4.5" width="18" height="16.5" rx="2" /><path d="M8 2.5v4M16 2.5v4M3 10h18" /></>,
  alert: <><path d="M12 3 2 20.5h20L12 3Z" /><path d="M12 10v4.5M12 17.5h.01" /></>,
  type: <><path d="M4 7V5h16v2" /><path d="M12 5v14M9 19h6" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  ruler: <><rect x="2.5" y="8" width="19" height="8" rx="1.5" /><path d="M6.5 8v3M10.5 8v4M14.5 8v3M18.5 8v4" /></>,
  text: <><path d="M4 6h16M4 10h16M4 14h10M4 18h13" /></>,
  tag: <><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><path d="M7.5 7.5h.01" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="m21 16-5-5-9 9" /></>,
  chart: <><path d="M3 20h18" /><path d="M6 16v-4M11 16V8M16 16v-6M20 16V5" /></>,
  heart: <path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.6 3.9 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.1 0 5.3 3.1 4.2 6.2C19.5 15.4 12 20 12 20Z" />,
  id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2.2" /><path d="M5.8 16c.6-1.5 1.8-2.3 3.2-2.3s2.6.8 3.2 2.3M15 10h3M15 13.5h3" /></>,
  film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  timer: <><circle cx="12" cy="13.5" r="7.5" /><path d="M12 10v3.5l2.5 1.5M9.5 2.5h5" /></>,
  copy: <><rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
