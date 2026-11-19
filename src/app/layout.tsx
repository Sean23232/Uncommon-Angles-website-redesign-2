import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uncommonangles.com"),
  title: {
    default: "UnCommon Angles, Inc. | Custom Home Builders in Buena Vista, Colorado",
    template: "%s | UnCommon Angles, Inc.",
  },
  description:
    "Since 1997, UnCommon Angles has built custom homes and delivered structural construction, carpentry, roofing, and concrete work in Buena Vista, Colorado and beyond.",
  openGraph: {
    title: "UnCommon Angles, Inc. | Built With Purpose. Crafted to Last.",
    description:
      "Custom homes and quality construction in Buena Vista, Colorado. Founded by Matt Young in 1997.",
    type: "website",
    siteName: "UnCommon Angles, Inc.",
    images: ["/images/Project-3.jpeg"],
  },
  twitter: { card: "summary_large_image" },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ivory font-sans antialiased">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
