import Link from 'next/link';
import Image from 'next/image';
import ProductPackageCard from '@/components/ProductPackageCard';
import ContactForm from '@/components/ContactForm';
import ROIChart from '@/components/ROIChart';

export default function Home() {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AquaEnergy AI",
    "url": "https://aquaenergyai.com",
    "logo": "https://aquaenergyai.com/logo.png",
    "description": "Plug & Play sensorpakker + AI for energibesparelse i industrianlegg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+47-900-24-636",
      "contactType": "customer service",
      "email": "post@aquaenergyai.com",
      "areaServed": "NO",
      "availableLanguage": "Norwegian"
    },
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
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      
      {/* Hero Section - med bølgebilde */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden min-h-[70vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
          alt="Industrielt anlegg"
          fill
          className="object-cover"
          style={{ 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'none',
            opacity: 1,
            zIndex: 0
          }}
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              AI-drevet energistyring
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-10 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
              Sammen med anleggseier blir vi enige om tiltak og etter hvert som disse iverksettes, vises forbedringene i dashboardet. Slik får du som anleggseier full kontroll over anlegget og dets energibruk og drift. Resultatet er som regel betydelige energibesparelser.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg shadow-lg"
              >
                Book gratis pilot
              </Link>
              <Link
                href="/dashboard"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-700 transition-colors text-lg shadow-lg"
              >
                Se demo-dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tre trin til selvkjørende anlegg */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tre trin til selvkjørende anlegg
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kartlegging og Datainnsamling</h3>
              <p className="text-gray-700 text-lg">
                Vi bruker den nyeste sensorteknologien for å kartlegge og samle inn data om de viktigste komponentene i ditt anlegg: energi, vannstrøm, oksygen og temperatur.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimalisering og Kontroll</h3>
              <p className="text-gray-700 text-lg">
                Våre sensorer identifiserer enkle tiltak som gir umiddelbar reduksjon i energiforbruket. Vi gir deg verktøyene for å ta data-drevne beslutninger og oppnå maksimal effektivitet i ditt anlegg.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Selvkjørende Anlegg</h3>
              <p className="text-gray-700 text-lg">
                Slutt på unødvendige kalendere og manuell styring – våre sensorer gir beslutningsgrunnlaget for å redusere energiforbruket ytterligere og gjøre anlegget selvstyrende.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section - ligner Energy Control */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AquaEnergy Dashboard
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Innsikt i ditt anlegg
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementer effektive tiltak</h3>
              <p className="text-gray-700 mb-6 text-lg">
                For å betydelig forbedre energieffektiviteten, ved å dra nytte av de omfattende dataene vi samler inn direkte fra ditt anlegg.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tidlig varsling</h3>
              <p className="text-gray-700 text-lg">
                Gjennom bruk av avanserte sensorer og dyptgående innsikt, er vi i stand til å nøye analysere anleggets tilstand. Dette gir oss muligheten til å identifisere behovet for potensielle justeringer, spesielt når det kommer til å håndtere faktorer som unormale oksygennivåer, temperaturvariasjoner og pumpedrift.
              </p>
              <Link
                href="/dashboard"
                className="inline-block mt-6 text-primary-600 font-semibold hover:text-primary-700"
              >
                Learn More →
              </Link>
            </div>
            <div className="section-image relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1920"
                alt="Industriell pumpesystem installasjon"
                fill
                className="object-cover"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">100+</div>
              <div className="text-primary-100 text-lg">aktive anlegg</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">1 trillion</div>
              <div className="text-primary-100 text-lg">datapunkter</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">10/10</div>
              <div className="text-primary-100 text-lg">av anlegg har feil</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - med bilder av produkter i hardt vær */}
      <section id="products" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Startpakker
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Velg løsningen som passer best for ditt anlegg
            </p>
          </div>
          
          {/* Product Images - med bilder av produkter i hardt vær */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="section-image relative h-80 group">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
                alt="Industrielt anlegg"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ opacity: 1, filter: 'none' }}
              />
              <div className="absolute inset-0 flex items-end p-8 z-10">
                <div>
                  <h3 className="text-white text-3xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Plug & Play</h3>
                  <p className="text-white text-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Robust og pålitelig i alle værforhold</p>
                </div>
              </div>
            </div>
            <div className="section-image relative h-80 group">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920"
                alt="Industrielt anlegg nærbilde"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ opacity: 1, filter: 'none' }}
              />
              <div className="absolute inset-0 flex items-end p-8 z-10">
                <div>
                  <h3 className="text-white text-3xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Sjøklar</h3>
                  <p className="text-white text-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Industriell styrke for ekstreme forhold</p>
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

      {/* Hva man kan forvente Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hva man kan forvente med AquaEnergy AI
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-600 mb-4">Stabil overvåkning</h3>
              <p className="text-gray-700 italic">
                &ldquo;Sensorene gir kontinuerlig innsikt i pumpenes drift, slik at man får bedre kontroll på energibruken uten manuell oppfølging.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-600 mb-4">Rask igangkjøring</h3>
              <p className="text-gray-700 italic">
                &ldquo;Systemet er enkelt å sette opp, og kan tas i bruk samme dag.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-600 mb-4">Smartere drift med Dashboard</h3>
              <p className="text-gray-700 italic">
                &ldquo;Dashboardet gir full oversikt over pumpene, slik at man kan tilpasse driften etter behov og bruke energi mer effektivt.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-600 mb-4">Samlet kontroll på ett sted</h3>
              <p className="text-gray-700 italic">
                &ldquo;Alle enheter kan overvåkes samlet i ett system, noe som gjør det enklere å ta beslutninger for hele driften.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-600 mb-4">Mulighet for kostnadsbesparelser</h3>
              <p className="text-gray-700 italic">
                &ldquo;Ved å følge med på energiforbruket og justere pumpene etter behov, kan man redusere unødvendig bruk og spare penger.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hvorfor velge AquaEnergy AI - VS Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor velge AquaEnergy AI?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">AquaEnergy AI</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Ingen skjulte avgifter. Ingen overraskelser</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Automatisk optimalisering</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Støtter alle typer anlegg</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Gir 24/7 live support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Integreres sømløst med eksisterende systemer</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Bruker sanntidsdata for optimalisering</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Andre løsninger</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Komplisert avgiftsstruktur</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Trenger mye manuell håndtering</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Støtter 50-100 anleggstyper</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Har dårlig support og stenger i helger</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Har spredte integrasjoner</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Bruker urettferdige, høyere energipriser</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klar til å starte?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book en gratis pilot og se hvordan AquaEnergy AI kan optimalisere ditt anlegg
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
