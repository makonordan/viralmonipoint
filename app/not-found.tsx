import Link from "next/link";
import { ToolLayout } from "@/components/ToolLayout";

export default function NotFound() {
  return (
    <ToolLayout h1="Page not found" eyebrow="404" trustNote={false} backLink={false} intro="That page doesn't exist or has moved.">
      <div className="flex flex-wrap gap-3">
        <Link href="/tools" className="rounded-[10px] bg-yellow px-5 py-3.5 font-extrabold text-ink no-underline hover:bg-yellow-deep">Browse free tools</Link>
        <a href="/" className="rounded-[10px] border-2 border-ink px-5 py-3 font-extrabold text-ink no-underline hover:bg-ink hover:text-white">Go to homepage</a>
      </div>
    </ToolLayout>
  );
}
