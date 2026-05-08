import type { Metadata } from "next";
import { Spline_Sans_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

const spline = Spline_Sans_Mono({
  style: "normal",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  weight: "800",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://Hussh-apparel.com"),

  title: {
    default: "Hussh — Minimal & Modern Apparel | Est. 2025",
    template: "%s | Hussh Apparel",
  },

  description:
    "Dressed for the life you're building. Hussh is modern, minimal apparel for those who move with intention. Clean lines, effortless style.",

  icons: {
    icon: "/favicon.svg",
  },

  keywords: [
    "modern apparel",
    "minimal clothing",
    "streetwear minimal",
    "contemporary fashion",
    "Hussh clothing",
    "premium basics",
  ],

  authors: [{ name: "Hussh" }],
  creator: "Hussh",

  openGraph: {
    title: "Hussh — Minimal & Modern Apparel",
    description:
      "Clothing for those who move through the world with intention — minimal, precise, effortless.",
    url: "https://Hussh-apparel.com",
    siteName: "Hussh",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hussh Apparel",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hussh — Minimal & Modern Apparel",
    description: "Minimal, precise, effortless clothing.",
    images: ["/og-image.jpg"],
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
      className={`${spline.className} ${barlow.className} antialiased`}
    >
      <body className="font-spline">
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
