import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABlock } from "@/components/CTABlock";
import { Icon } from "@/components/Icon";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { toolMetadata } from "@/components/ToolLayout";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/packages";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = toolMetadata({ title: `${post.title} | ViralMoniPoint`, description: post.description, path: `/blog/${post.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date } };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "ViralMoniPoint", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.png`,
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-10 sm:pt-14">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="mx-auto max-w-[720px]">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-grey no-underline hover:text-ink">
            <Icon name="arrow" className="size-4 rotate-180" /> All articles
          </Link>
          <h1 className="mb-4 font-display text-[clamp(30px,4.6vw,46px)] font-black leading-[1.08] tracking-[-0.025em] text-ink [text-wrap:balance]">
            {post.title}
          </h1>
          <p className="mb-8 border-b border-line pb-6 text-sm font-semibold text-grey">
            {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <div className="prose prose-lg prose-brand max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        {more.length > 0 && (
          <section className="mx-auto mt-14 max-w-[720px] border-t border-line pt-8">
            <h2 className="mb-4 font-display text-xl font-black text-ink">Keep reading</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="font-bold text-ink underline decoration-yellow-deep decoration-2 underline-offset-4 hover:bg-yellow-soft">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mx-auto max-w-[960px]">
          <CTABlock pkg="watchHours" lead="Want help getting monetized before Feb 1, 2027?" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
