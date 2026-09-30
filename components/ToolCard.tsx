import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex h-full flex-col gap-3 rounded-card border border-line-strong bg-paper p-5 no-underline transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_14px_30px_-18px_rgba(11,11,12,0.45)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-ink text-yellow shadow-[0_0_0_3px_var(--color-yellow)]">
          <Icon name={tool.icon} className="size-5" />
        </span>
        {!tool.live && (
          <span className="rounded-full bg-paper-2 px-2.5 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.08em] text-grey">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="m-0 text-[16.5px] font-extrabold leading-snug text-ink">{tool.name}</h3>
      <p className="m-0 flex-1 text-[13.5px] leading-normal text-grey">{tool.description}</p>
      <span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-ink">
        {tool.live ? "Open tool" : "Preview"}
        <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
