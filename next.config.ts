import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The homepage and partners page are hand-written HTML in public/. Serve the
  // homepage at "/" so they keep working unchanged alongside the /tools app.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
    };
  },
};

export default nextConfig;
