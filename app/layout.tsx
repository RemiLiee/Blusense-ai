import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://aquaenergyai.com'),
  title: {
    default: "AquaEnergy AI — AI-drevet energistyring",
    template: "%s | AquaEnergy AI"
  },
  description: "Plug & Play sensorpakker + AI for energibesparelse. Sanntids overvåking og optimalisering for industrianlegg. Reduser strømforbruk med 10-30%.",
  keywords: ["energibesparelse", "sensorovervåkning", "AI", "energistyring", "energioptimalisering", "IoT sensorer", "prediktivt vedlikehold", "pumpestyring", "industrianlegg", "energimåling"],
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
    title: "AquaEnergy AI — AI-drevet energistyring",
    description: "Plug & Play sensorpakker + AI for energibesparelse. Reduser strømforbruk med 10-30% i industrianlegg.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AquaEnergy AI - AI-drevet energistyring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaEnergy AI — AI-drevet energistyring",
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
        {/* Google Analytics - Consent Mode */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script id="google-analytics-consent" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied'
                });
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  'anonymize_ip': true
                });
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
        <CookieBanner />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}

