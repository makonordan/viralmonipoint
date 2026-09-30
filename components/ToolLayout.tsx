import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Icon } from "@/components/Icon";

type SeoProps = {
  /** Browser/search title, e.g. "YouTube Watch Hours Calculator (Free) | ViralMoniPoint". */
  title: string;
  description: string;
  /** Path of the page, e.g. "/tools/watch-hours-calculator". Becomes the canonical URL. */
  path: string;
  /** Keep unfinished pages out of search results. */
  noindex?: boolean;
};

/**
 * SEO for a tool page. In the App Router, metadata is exported from the page file, so every tool does:
 *   export const metadata = toolMetadata({ title, description, path });
 */
export function toolMetadata({ title, description, path, noindex }: SeoProps): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

type ToolLayoutProps = {
  /** The single H1: phrase it as the real search query, e.g. "YouTube Watch Hours Calculator". */
  h1: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  /** Show the "nothing is stored" trust note (on by default for tools). */
  trustNote?: boolean;
  /** Show the back-to-all-tools link above the H1. */
  backLink?: boolean;
  children: React.ReactNode;
};

export function ToolLayout({ h1, eyebrow = "Free tool", intro, trustNote = true, backLink = true, children }: ToolLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-10 sm:pt-14">
        {backLink && (
          <Link href="/tools" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-grey no-underline hover:text-ink">
            <Icon name="arrow" className="size-4 rotate-180" /> All free tools
          </Link>
        )}
        <p className="mb-3 flex items-center gap-2.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink before:h-[3px] before:w-[22px] before:rounded-sm before:bg-red">
          {eyebrow}
        </p>
        <h1 className="mb-4 font-display text-[clamp(32px,5vw,52px)] font-black uppercase leading-[1.02] tracking-[-0.025em] text-ink [text-wrap:balance]">
          {h1}
        </h1>
        {intro && <div className="mb-6 max-w-[62ch] text-[17px] leading-relaxed text-grey">{intro}</div>}
        {trustNote && <TrustNote />}
        <div className="mt-8">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

export function TrustNote() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper py-1.5 pl-2 pr-4 text-[13px] font-semibold text-text">
      <span className="flex size-6 items-center justify-center rounded-full bg-green-soft text-green">
        <Icon name="lock" className="size-3.5" />
      </span>
      Nothing you enter here is stored or sent anywhere
    </p>
  );
}
