import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diegofm.vercel.app"),
  title: {
    default: "Diego Fuertes — Frontend Developer & UI/UX Designer",
    template: "%s | Diego Fuertes",
  },
  description:
    "Diseño y construyo interfaces de producto que usuarios quieren usar. React, Next.js, Angular, Figma. Valencia, España.",
  keywords: [
    "frontend developer",
    "UI/UX designer",
    "React",
    "Next.js",
    "Angular",
    "Figma",
    "Valencia",
    "SaaS",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Diego Fuertes Moreno" }],
  creator: "Diego Fuertes Moreno",
  openGraph: {
    title: "Diego Fuertes — Frontend Developer & UI/UX",
    description: "Interfaces de producto que los usuarios usan sin pensar.",
    url: "https://diegofm.vercel.app",
    siteName: "Diego Fuertes Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diego Fuertes — Frontend Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Fuertes — Frontend Developer & UI/UX",
    description: "Interfaces de producto que los usuarios usan sin pensar.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${ibmMono.variable} noise-overlay antialiased`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Ir al contenido principal
          </a>
          <CustomCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
