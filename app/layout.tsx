import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07090C",
};

export const metadata: Metadata = {
  title: "APEX // TERMINAL — The Bloomberg Terminal for Crypto",
  description: "The institutional crypto trading workstation. Sub-millisecond execution, unified liquidity from 300+ centralized & decentralized venues, and real-time quantitative risk models.",
  keywords: [
    "crypto trading terminal",
    "bloomberg terminal for crypto",
    "institutional crypto workstation",
    "order book depth",
    "smart order router",
    "crypto quantitative trading",
    "FIX API crypto",
    "derivatives skew",
  ],
  authors: [{ name: "APEX Terminal Systems Inc." }],
  openGraph: {
    title: "APEX // TERMINAL — Every Venue. One Screen.",
    description: "The Bloomberg Terminal for crypto. Ultra-low latency, unified liquidity, and quantitative risk modeling for systematic funds and prop desks.",
    type: "website",
    locale: "en_US",
    siteName: "APEX TERMINAL",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX // TERMINAL — Institutional Crypto Workstation",
    description: "Every venue. One screen. Zero latency.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%2307090C'/><polygon points='16,4 28,26 4,26' fill='none' stroke='%23FF9F1C' stroke-width='3'/><circle cx='16' cy='18' r='3' fill='%23FF9F1C'/></svg>" />
      </head>
      <body className="min-h-screen bg-terminal-bg text-terminal-text antialiased selection:bg-terminal-amber selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
