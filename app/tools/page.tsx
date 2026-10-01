import { CTABlock } from "@/components/CTABlock";
import { ToolCard } from "@/components/ToolCard";
import { ToolLayout, toolMetadata } from "@/components/ToolLayout";
import { CATEGORIES, TOOLS, toolsIn } from "@/lib/tools";

export const metadata = toolMetadata({
  title: "Free YouTube Creator Tools | ViralMoniPoint",
  description:
    "Free YouTube tools for creators: watch hours calculator, monetization eligibility checker, title and tag generators, and more. No sign-up, nothing stored.",
  path: "/tools",
});

export default function ToolsIndex() {
  return (
    <ToolLayout
      h1="Free YouTube Tools for Creators"
      eyebrow="VMP Tools"
      backLink={false}
      intro={
        <>
          {TOOLS.length} free tools to plan, create and optimize your way to YouTube monetization. No sign-up, and
          everything runs in your browser.
        </>
      }
    >
      <nav aria-label="Tool categories" className="mb-10 flex flex-wrap gap-2.5">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[13px] font-extrabold text-ink no-underline hover:bg-yellow hover:border-yellow"
          >
            {c.name}
          </a>
        ))}
      </nav>

      {CATEGORIES.map((category) => {
        const tools = toolsIn(category.id);
        return (
          <section key={category.id} id={category.id} className="mb-14 scroll-mt-24">
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-line pb-3">
              <h2 className="m-0 font-display text-[clamp(22px,3vw,28px)] font-black tracking-[-0.02em] text-ink">{category.name}</h2>
              <span className="whitespace-nowrap text-sm font-bold text-grey tabular">{tools.length} tools</span>
            </div>
            <p className="-mt-2 mb-5 text-[15px] text-grey">{category.description}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      <CTABlock pkg="watchHours" lead="Rather skip the spreadsheets? We'll get you to 4,000 hours." />
    </ToolLayout>
  );
}
