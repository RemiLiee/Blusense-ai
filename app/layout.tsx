import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://aquaenergyai.com'),
  title: {
    default: "AquaEnergy AI — Energioptimalisering for oppdrett",
    template: "%s | AquaEnergy AI"
  },
  description: "Plug & Play sensorpakker + AI for energibesparelse. Sanntids overvåking og optimalisering for akvakulturanlegg. Reduser strømforbruk med 10-30%.",
  keywords: ["akvakultur", "energibesparelse", "sensorovervåkning", "AI", "oppdrett", "energistyring", "fiskeoppdrett", "energioptimalisering", "IoT sensorer", "prediktivt vedlikehold"],
  authors: [{ name: "AquaEnergy AI" }],
  creator: "AquaEnergy AI",
  publisher: "AquaEnergy AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "https://aquaenergyai.com",
    siteName: "AquaEnergy AI",
    title: "AquaEnergy AI — Energioptimalisering for oppdrett",
    description: "Plug & Play sensorpakker + AI for energibesparelse. Reduser strømforbruk med 10-30% i akvakulturanlegg.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AquaEnergy AI - Energioptimalisering for oppdrett",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaEnergy AI — Energioptimalisering for oppdrett",
    description: "Plug & Play sensorpakker + AI for energibesparelse. Reduser strømforbruk med 10-30%.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://aquaenergyai.com",
  },
  verification: {
    // Legg til Google Search Console verification code her når du har det
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

