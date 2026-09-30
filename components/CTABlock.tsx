import { Icon } from "@/components/Icon";
import { CONTACT_URL, PACKAGES, PACKAGES_URL, type PackageKey } from "@/lib/packages";

type CTABlockProps = {
  /** The package that's the natural next step after this tool. */
  pkg: PackageKey;
  /** Optional line tying the CTA to the tool, e.g. "You're 1,200 hours short." */
  lead?: string;
};

export function CTABlock({ pkg, lead }: CTABlockProps) {
  const p = PACKAGES[pkg];
  return (
    <section className="relative mt-12 grid gap-6 overflow-hidden rounded-[22px] bg-ink p-7 text-white after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:bg-yellow sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="mb-2 flex items-center gap-2.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-yellow before:h-[3px] before:w-[22px] before:rounded-sm before:bg-red">
          Want this done for you?
        </p>
        <h2 className="mb-2 font-display text-[clamp(22px,3vw,30px)] font-black leading-tight tracking-[-0.02em]">
          {lead ?? p.name}
        </h2>
        {lead && <p className="mb-1 font-bold text-white">{p.name}</p>}
        <p className="m-0 max-w-[62ch] text-[15px] leading-relaxed text-[#c9c9cf]">{p.pitch}</p>
        <p className="mb-0 mt-4 font-num text-3xl font-black tracking-[-0.02em] text-yellow tabular">
          {p.price} <span className="font-sans text-sm font-semibold tracking-normal text-[#9a9aa2]">{p.priceNote}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2.5 md:min-w-[220px]">
        <a href={CONTACT_URL} className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-yellow px-5 py-3.5 text-[15px] font-extrabold text-ink no-underline hover:bg-yellow-deep">
          Book a free discovery call <Icon name="arrow" className="size-4" />
        </a>
        <a href={PACKAGES_URL} className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#3a3a40] px-5 py-3 text-[14px] font-extrabold text-white no-underline hover:border-white">
          Compare all packages
        </a>
      </div>
    </section>
  );
}
