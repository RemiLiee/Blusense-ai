import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ProductPackageCard from '@/components/ProductPackageCard';
import ContactForm from '@/components/ContactForm';
import ROIChart from '@/components/ROIChart';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AquaEnergy AI",
    "url": "https://aquaenergy.ai",
    "logo": "https://aquaenergy.ai/logo.png",
    "description": "Plug & Play sensorpakker + AI for energibesparelse i akvakulturanlegg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+47-900-24-636",
      "contactType": "customer service",
      "email": "info@aquaenergy.com",
      "areaServed": "NO",
      "availableLanguage": "Norwegian"
    },
    "sameAs": [
      // Legg til sosiale medier lenker her når de er tilgjengelige
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Plug & Play — Startpakke",
        "price": "25000",
        "priceCurrency": "NOK",
        "description": "Eastron SDM630, Clamp-on ultrasonisk flow, Optisk DO, PT100 temperatur, LoRaWAN/4G gateway"
      },
      {
        "@type": "Offer",
        "name": "Sjøklar — Industri-pakke",
        "price": "55000",
        "priceCurrency": "NOK",
        "description": "Industriell energimåler, Industrial clamp-on flow, Optisk DO, 2x IP68 PT100, 2x vibrasjonssensor"
      }
    ]
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
            alt="Akvakultur anlegg"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AquaEnergy AI — Plug & Play energi- og driftoptimalisering for oppdrett
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-medium">
              Sanntids sensorovervåkning + AI-styrt energibesparelse
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <Link
                href="#contact"
                className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                Book gratis pilot
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors text-lg"
              >
                Se demo-dashboard
              </Link>
            </div>
            <p className="text-sm sm:text-base text-gray-500 mt-4">
              Plug & Play-koffert • Sanntidsovervåkning • AI-optimalisering
            </p>
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
          alt="Akvakultur"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-600/20"></div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1920"
              alt="Sensorer og teknologi"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvordan det fungerer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Sensorer</h3>
              <p className="text-gray-600">
                Plug & Play, clamp-on, IP68. Enkle å installere sensorer som måler energi, vannstrøm, oksygen og temperatur.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Data & AI</h3>
              <p className="text-gray-600">
                Sanntid, analyser, anbefalinger. Vår AI behandler dataene og gir deg innsikt og forslag til optimalisering.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Resultat</h3>
              <p className="text-gray-600">
                10–30% energibesparelse. Reduser kostnader og forbedre lønnsomheten i oppdrettsanlegget ditt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
          alt="Oppdrettsanlegg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-transparent"></div>
      </div>

      {/* ROI Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor AquaEnergy AI?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Reduser strømforbruk 10–30%</h3>
                    <p className="text-gray-600 text-sm">Intelligent optimalisering reduserer energikostnader betydelig.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Mindre driftsstans</h3>
                    <p className="text-gray-600 text-sm">Prediktivt vedlikehold forhindrer uventede nedetider.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bedre fiskevelferd</h3>
                    <p className="text-gray-600 text-sm">Kontinuerlig overvåking sikrer optimale forhold for fisken.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Rask installasjon</h3>
                    <p className="text-gray-600 text-sm">Plug & Play-løsning klar på 1–4 timer.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ROIChart />
            </div>
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1920"
          alt="Energi og teknologi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary-600/30 to-transparent"></div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor velge AquaEnergy AI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Konkrete fordeler for din oppdrettsanlegg
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sanntids Overvåking</h3>
              <p className="text-gray-600">
                Overvåk energiforbruk, vannstrøm, oksygennivåer og temperatur i sanntid fra en enkel dashboard.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-drevne Innblikk</h3>
              <p className="text-gray-600">
                Få intelligente varsler og anbefalinger for å optimalisere operasjonene dine automatisk.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kostnadsbesparelser</h3>
              <p className="text-gray-600">
                Reduser energikostnader med opptil 30% gjennom intelligent optimalisering og automatisk styring.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rask ROI</h3>
              <p className="text-gray-600">
                Se resultater fra dag én. Mange kunder ser besparelser som dekker investeringen på under 12 måneder.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sikkerhet & Pålitelighet</h3>
              <p className="text-gray-600">
                Automatiske varsler ved unormale forhold beskytter fisken din og sikrer optimal drift 24/7.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enkel Integrasjon</h3>
              <p className="text-gray-600">
                Kompatibel med eksisterende systemer. Ingen store endringer i infrastrukturen nødvendig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Startpakker
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Velg løsningen som passer best for din oppdrettsanlegg
            </p>
          </div>
          
          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&h=600&fit=crop"
                alt="Plug & Play - enkel og kompakt sensorpakke"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">Plug & Play</h3>
                  <p className="text-white/90 text-sm">Enkel og kompakt løsning</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&h=600&fit=crop"
                alt="Sjøklar - avansert industriell sensorpakke med flere komponenter"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary-600/40 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">Sjøklar</h3>
                  <p className="text-white/90 text-sm">Avansert industriell løsning</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProductPackageCard
              name="Plug & Play — Startpakke"
              sensors={[
                'Eastron SDM630',
                'Clamp-on ultrasonisk flow',
                'Optisk DO',
                'PT100 temperatur',
                'LoRaWAN/4G gateway'
              ]}
              price="25 000 kr"
              subscription="2 990 kr/mnd"
              installTime="1–4 timer"
            />
            <ProductPackageCard
              name="Sjøklar — Industri-pakke"
              sensors={[
                'Industriell energimåler (MID/Modbus)',
                'Industrial clamp-on flow',
                'Optisk DO (industri)',
                '2x IP68 PT100',
                '2x vibrasjonssensor',
                'Utendørs gateway'
              ]}
              price="55 000–80 000 kr"
              subscription="7 990 kr/mnd"
              installTime="1–2 dager"
              highlighted
            />
          </div>
        </div>
      </section>

      {/* Image Divider */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
          alt="Akvakultur"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-600/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Klar for neste steg?</h2>
            <p className="text-xl text-white/90">Kontakt oss i dag for en uforpliktende samtale</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klar til å starte?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book en gratis pilot og se hvordan AquaEnergy AI kan optimalisere din oppdrettsanlegg
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg shadow-lg"
            >
              Book gratis pilot
            </Link>
            <Link
              href="/dashboard"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors text-lg"
            >
              Se demo-dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
