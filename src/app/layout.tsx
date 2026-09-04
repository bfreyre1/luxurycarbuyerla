import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { BRAND } from "./lib/brand";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const defaultTitle = `${BRAND.siteName} - Beverly Hills Standard Cash Offers`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${BRAND.siteName}`,
  },
  description: BRAND.metaDescription,
  applicationName: BRAND.siteName,
  keywords: [
    "sell luxury car Los Angeles",
    "cash offer luxury vehicle",
    "Jim Falk Lexus of Beverly Hills",
    "sell exotic car California",
    "preliminary cash offer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND.siteName,
    title: defaultTitle,
    description: BRAND.metaDescription,
    images: [
      {
        url: "/images/hero-lcb.jpg",
        width: 1536,
        height: 1024,
        alt: "Luxury vehicle acquisition consultation in Beverly Hills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: BRAND.metaDescription,
    images: ["/images/hero-lcb.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <GoogleAnalytics />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
