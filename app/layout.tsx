import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // optional: smoother typography control
});

export const metadata: Metadata = {
  title: "RoomVibe – Aesthetic Room Setup Finds",
  description: "Discover aesthetic room decor, LED lights, cozy gadgets, and minimal desk setups to elevate your space. Curated daily with trending picks.",
  keywords: ["room setup", "aesthetic", "vibe decor", "LED lights", "minimal desk", "gamer setup", "cozy room", "TikTok finds"],
  metadataBase: new URL("https://roomvibe.vercel.app"), // Change this to your live domain later
  openGraph: {
    title: "RoomVibe – Aesthetic Room Setup Finds",
    description: "Curated aesthetic room finds – LED lights, cozy gadgets, minimal setups, and more.",
    url: "https://roomvibe.vercel.app",
    siteName: "RoomVibe",
    images: [
      {
        url: "/og-image.png", // Optional: Add a real OG image later
        width: 1200,
        height: 630,
        alt: "RoomVibe OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoomVibe – Aesthetic Room Setup Finds",
    description: "Discover aesthetic gadgets and vibes for your dream room.",
    images: ["/og-image.png"], // Add your image
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/public/favicon.ico"/>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K5XP2M3496"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5XP2M3496');
          `}
        </Script>
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
