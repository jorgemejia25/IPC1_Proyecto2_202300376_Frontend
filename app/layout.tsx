import "@/styles/globals.css";

import { Inter, Nunito } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import MainNavbar from "@/components/main-navbar";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const montserrat = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.className}>
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "white" }}>
          <Analytics />
          <SpeedInsights />
          <main className="text-foreground">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
