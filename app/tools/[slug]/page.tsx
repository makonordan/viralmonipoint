// Placeholder for tools that aren't built yet. A built tool gets its own folder
// (app/tools/<slug>/page.tsx), which takes priority over this dynamic route; set
// `live: true` for it in lib/tools.ts so it drops out of the list below.
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABlock } from "@/components/CTABlock";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";
import { ToolLayout, toolMetadata } from "@/components/ToolLayout";
import { getTool, TOOLS } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.filter((t) => !t.live).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return toolMetadata({
    title: `${tool.name} — Coming Soon | ViralMoniPoint`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    noindex: true,
  });
}

export default async function ComingSoon({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const related = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

  return (
    <ToolLayout h1={tool.name} eyebrow={tool.category} intro={tool.description} trustNote={false}>
      <div className="flex flex-col items-start gap-4 rounded-card border border-line-strong bg-paper-2 p-7 sm:flex-row sm:items-center">
        <span className="flex size-14 flex-none items-center justify-center rounded-full bg-ink text-yellow shadow-[0_0_0_3px_var(--color-yellow)]">
          <Icon name={tool.icon} className="size-6" />
        </span>
        <div className="flex-1">
          <p className="m-0 text-lg font-extrabold text-ink">This tool is being built</p>
          <p className="m-0 mt-1 text-[15px] leading-relaxed text-grey">
            Check back soon. In the meantime, explore the other free tools or talk to us about your channel.
          </p>
        </div>
        <Link href="/tools" className="inline-flex flex-none items-center gap-2 rounded-[10px] border-2 border-ink px-5 py-3 text-sm font-extrabold text-ink no-underline hover:bg-ink hover:text-white">
          Browse all tools
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-black tracking-[-0.02em] text-ink">More {tool.category.toLowerCase()} tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}

      <CTABlock pkg={tool.cta} />
    </ToolLayout>
  );
}
