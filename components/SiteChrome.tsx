import Link from "next/link";
import { ToolsMenu } from "@/components/ToolsMenu";
import { CONTACT_URL, PACKAGES_URL } from "@/lib/packages";

export function Logo({ tag = "Creator Services", dark = false }: { tag?: string; dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="ViralMoniPoint home">
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-10 flex-none">
        <rect width="40" height="40" rx="9" fill="#FFC400" />
        <g transform="translate(1 2) scale(0.92)">
          <path d="M7.5 15H16L20 25L28.5 5H38L24.5 35H15.5Z" fill="#0b0b0c" stroke="#0b0b0c" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M4.5 2.5V14.5L14.5 8.5Z" fill="#E4161B" stroke="#E4161B" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-black tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}>
          ViralMoniPoint
        </span>
        <span className={`mt-1.5 font-display text-[8.5px] font-bold uppercase tracking-[0.36em] max-[420px]:hidden ${dark ? "text-[#9a9aa2]" : "text-grey"}`}>
          {tag}
        </span>
      </span>
    </Link>
  );
}

const NAV = [
  { href: PACKAGES_URL, label: "Packages" },
  { href: CONTACT_URL, label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-3">
        <Logo tag="Free Creator Tools" />
        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
          <ToolsMenu />
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-grey no-underline hover:text-ink max-sm:[&:nth-child(2)]:hidden"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-[6px] border-yellow bg-ink py-10 text-white">
      <div className="mx-auto max-w-[1120px] px-5">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <Logo dark />
          <div className="flex flex-wrap gap-5 text-[13.5px] font-semibold">
            <Link href="/tools" className="text-[#c9c9cf] no-underline hover:text-yellow">Free Tools</Link>
            <Link href={PACKAGES_URL} className="text-[#c9c9cf] no-underline hover:text-yellow">Packages</Link>
            <Link href="/#faq" className="text-[#c9c9cf] no-underline hover:text-yellow">FAQ</Link>
            <Link href={CONTACT_URL} className="text-[#c9c9cf] no-underline hover:text-yellow">Contact</Link>
            <a href="/partners.html" className="text-[#c9c9cf] no-underline hover:text-yellow">Partners</a>
          </div>
        </div>
        <p className="m-0 max-w-[80ch] text-xs leading-relaxed text-[#8a8a92]">
          © {new Date().getFullYear()} ViralMoniPoint. Prices in USD. Monetization eligibility and approval are set by
          YouTube and not guaranteed. Independent creator service — not affiliated with, endorsed by, or sponsored by
          YouTube or Google.
        </p>
      </div>
    </footer>
  );
}
