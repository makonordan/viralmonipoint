import Link from "next/link";
import { CTABlock } from "@/components/CTABlock";
import { Icon } from "@/components/Icon";
import { ToolLayout, toolMetadata } from "@/components/ToolLayout";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata = toolMetadata({
  title: "YouTube Monetization Blog | ViralMoniPoint",
  description:
    "Guides on YouTube Partner Program requirements, watch hours, Shorts and growing a channel the right way, from the ViralMoniPoint team.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <ToolLayout
      h1="The ViralMoniPoint Blog"
      eyebrow="Blog"
      backLink={false}
      trustNote={false}
      intro="Plain-English guides to YouTube monetization: the requirements, the deadlines and the real ways to grow."
    >
      {posts.length === 0 ? (
        <p className="text-grey">New posts are on the way.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-card border border-line-strong bg-paper p-6 no-underline transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_14px_30px_-18px_rgba(11,11,12,0.45)]"
            >
              <p className="mb-3 text-[12.5px] font-bold text-grey tabular">
                {formatDate(post.date)} · {post.readingMinutes} min read
              </p>
              <h2 className="mb-2 font-display text-[19px] font-black leading-snug tracking-[-0.01em] text-ink">{post.title}</h2>
              <p className="mb-4 flex-1 text-[14.5px] leading-relaxed text-grey">{post.description}</p>
              <span className="inline-flex items-center gap-1.5 text-[13.5px] font-extrabold text-ink">
                Read article <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
      <CTABlock pkg="watchHours" lead="Want a plan built for your channel instead?" />
    </ToolLayout>
  );
}
