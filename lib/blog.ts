import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Blog posts are Markdown files in content/blog/. The file name is the URL slug:
// content/blog/my-post.md -> /blog/my-post. Front matter fields:
//   title, description (used for SEO and the post card), date (YYYY-MM-DD), author (optional)

const DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function read(slug: string): { meta: PostMeta; body: string } {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  for (const field of ["title", "description", "date"]) {
    if (!data[field]) throw new Error(`content/blog/${slug}.md is missing "${field}" in its front matter`);
  }
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description),
      date,
      author: data.author ? String(data.author) : "ViralMoniPoint Team",
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)),
    },
    body: content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f.replace(/\.md$/, "")).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DIR, `${slug}.md`))) return undefined;
  const { meta, body } = read(slug);
  return { ...meta, html: marked.parse(body, { async: false }) };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
