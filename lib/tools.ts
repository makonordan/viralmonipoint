import type { IconName } from "@/components/Icon";
import type { PackageKey } from "@/lib/packages";
import data from "@/public/tools.json";

// public/tools.json is the single source of truth for every tool and category.
// It feeds the /tools index, each tool route, the sitemap, the Next.js header
// menu, and the Tools flyout on the static pages (public/tools-menu.js).
// To add a tool: add an entry there. To add a category: add it to "categories".

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  /** Category id from CATEGORIES. */
  category: string;
  icon: IconName;
  /** The package this tool's CTA points to. */
  cta: PackageKey;
  /** Flip to true once the tool page is built. Unbuilt tools render a "coming soon" page with noindex. */
  live: boolean;
};

export const CATEGORIES: Category[] = data.categories;
export const TOOLS = data.tools as Tool[];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getCategory(id: string): Category {
  const c = CATEGORIES.find((cat) => cat.id === id);
  if (!c) throw new Error(`Unknown tool category "${id}"`);
  return c;
}

export function toolsIn(categoryId: string): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}
