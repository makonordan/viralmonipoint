import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/packages";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/tools`, priority: 0.9 },
    ...TOOLS.filter((t) => t.live).map((t) => ({ url: `${SITE_URL}/tools/${t.slug}`, priority: 0.8 })),
    { url: `${SITE_URL}/partners.html`, priority: 0.4 },
  ];
}
