import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { ToolLayout, toolMetadata } from "@/components/ToolLayout";
import { formatDate } from "@/lib/blog";

// The policy text lives in content/privacy.md so it can be edited without touching code.
function loadPolicy() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "privacy.md"), "utf8");
  const { data, content } = matter(raw);
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated);
  return { updated, html: marked.parse(content, { async: false }) };
}

export const metadata = toolMetadata({
  title: "Privacy Policy | ViralMoniPoint",
  description: "How ViralMoniPoint collects, uses and protects your information when you use viralmonipoint.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const policy = loadPolicy();
  return (
    <ToolLayout
      h1="Privacy Policy"
      eyebrow="Legal"
      backLink={false}
      trustNote={false}
      intro={<>Last updated {formatDate(policy.updated)}</>}
    >
      <div className="prose prose-brand max-w-[760px]" dangerouslySetInnerHTML={{ __html: policy.html }} />
    </ToolLayout>
  );
}
