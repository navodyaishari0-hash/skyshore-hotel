import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/site";

const playfair = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Skyshore | A Private Villa Retreat in Sri Lanka",
    template: "%s | Skyshore",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: canonicalUrl('/'),
  },
  keywords: [
    "luxury villa sri lanka",
    "private villa sri lanka",
    "kabana sri lanka",
    "nature chalet",
    "boutique villa",
    "secluded tropical escape",
    "sri lanka luxury accommodation",
    "honeymoon villa sri lanka",
    "private dining sri lanka",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonicalUrl('/'),
    siteName: SITE_NAME,
    title: "Skyshore | A Private Villa Retreat in Sri Lanka",
    description:
      "An intimate, secluded tropical escape with two exclusive nature kabanas.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&h=1080&fit=crop",
        width: 1920,
        height: 1080,
        alt: "Skyshore private villa surrounded by tropical greenery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyshore",
    description:
      "A private villa retreat in Sri Lanka.",
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
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
