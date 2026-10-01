"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, TOOLS, toolsIn } from "@/lib/tools";

/** Tools listed per category before the "+N more" link. */
const PER_CATEGORY = 6;

/**
 * "Tools" flyout for the Next.js header. The panel is always rendered (just hidden)
 * so every tool link is in the HTML for search engines.
 * The static pages use the same design via public/tools-menu.js.
 */
export function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Hover opens on devices with a real pointer; touch devices use the click toggle.
  const hover = (next: boolean) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(next), next ? 80 : 180);
  };

  return (
    <div ref={wrap} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="tools-flyout"
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-bold ${open ? "text-ink" : "text-grey"} hover:text-ink`}
      >
        Tools
        <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="tools-flyout"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100vh-70px)] overflow-y-auto border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgba(11,11,12,0.35)]"
      >
        <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-6">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {CATEGORIES.map((category) => {
              const tools = toolsIn(category.id);
              const more = tools.length - PER_CATEGORY;
              return (
                <div key={category.id}>
                  <Link
                    href={`/tools#${category.id}`}
                    onClick={() => setOpen(false)}
                    className="mb-2 flex items-center gap-2 font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink no-underline before:h-[3px] before:w-4 before:rounded-sm before:bg-red hover:text-red"
                  >
                    {category.name}
                  </Link>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {tools.slice(0, PER_CATEGORY).map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          onClick={() => setOpen(false)}
                          className="-mx-2 flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[14px] font-semibold text-text no-underline hover:bg-yellow-soft hover:text-ink"
                        >
                          {tool.name}
                          {!tool.live && <span className="flex-none text-[10px] font-extrabold uppercase tracking-[0.06em] text-grey-dim">Soon</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {more > 0 && (
                    <Link href={`/tools#${category.id}`} onClick={() => setOpen(false)} className="mt-1 inline-block text-[13px] font-extrabold text-ink">
                      +{more} more
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <span className="text-[13px] font-semibold text-grey">Free · No sign-up · Nothing you enter is stored</span>
            <Link href="/tools" onClick={() => setOpen(false)} className="rounded-[10px] bg-yellow px-4 py-2.5 text-[13.5px] font-extrabold text-ink no-underline hover:bg-yellow-deep">
              View all {TOOLS.length} free tools →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
