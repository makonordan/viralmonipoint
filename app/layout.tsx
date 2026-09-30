import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import { SITE_URL } from "@/lib/packages";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: "ViralMoniPoint", images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#FFC400",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${manrope.variable}`}>
      <head>
        {/* Google tag (gtag.js) — same property as the homepage */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BQFXSMT7K3" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BQFXSMT7K3');",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
