import Link from 'next/link';
import Image from 'next/image';
import ProductPackageCard from '@/components/ProductPackageCard';
import ContactForm from '@/components/ContactForm';
import ROIChart from '@/components/ROIChart';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AquaEnergy AI",
    "url": "https://aquaenergyai.com",
    "logo": "https://aquaenergyai.com/logo.png",
    "description": "AI som senker energikostnadene i oppdrett – automatisk. Spar 10–30% strøm med sanntidsdata og intelligente anbefalinger.",
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
        "description": "Rask installasjon, standard sensorer, dashboard + AI-varsler"
      },
      {
        "@type": "Offer",
        "name": "Sjøklar — Industri-pakke",
        "price": "55000",
        "priceCurrency": "NOK",
        "description": "Industrielle sensorer, avanserte analyser, full datalogging"
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
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920"
            alt="Akvakultur anlegg"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              AI som senker energikostnadene i oppdrett – automatisk
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Spar 10–30 % strøm med sanntidsdata og intelligente anbefalinger som optimaliserer pumper, oksygensystemer og vannstrøm.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mer kontroll. Mindre kostnader. Bedre fiskevelferd.
            </p>
            <Link
              href="#contact"
              className="inline-block bg-primary-600 text-white px-10 py-5 rounded-lg font-bold hover:bg-primary-700 transition-colors text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Få gratis energianalyse
            </Link>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Utfordringen i dagens oppdrett
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  Oppdrettsanlegg bruker ofte betydelig mer energi enn nødvendig.
                </p>
                <p>
                  Pumper går for lenge, oksygen blir feiljustert, og ingen oppdager avvik før det blir dyrt.
                </p>
                <p className="font-semibold text-gray-900">
                  Resultatet er høyere kostnader, unødvendig slitasje og svakere drift.
                </p>
              </div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-8 border-2 border-primary-200">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Løsningen
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                AquaEnergy AI analyserer energibruk, vannstrøm og oksygennivå i sanntid – og gir konkrete, automatiske anbefalinger som reduserer energibruken uten å gå på bekostning av fiskevelferden.
              </p>
              <p className="text-xl font-bold text-primary-700">
                Få lavere kostnader fra dag én.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sanntidsdata som gir full kontroll
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Overvåk alt i sanntid</h3>
              <p className="text-gray-600">
                Overvåk energiforbruk, vannstrøm, oksygennivå og temperatur – alt i ett moderne dashboard.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI som kutter kostnader</h3>
              <p className="text-gray-600">
                Algoritmene våre oppdager mønstre og ineffektiv drift, og foreslår tiltak som senker energiforbruket umiddelbart.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automatiske varsler</h3>
              <p className="text-gray-600">
                Få beskjed før noe går galt. Systemet fanger opp avvik og foreslår tiltak før feil oppstår eller fisk påvirkes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Installasjon på 1–4 timer</h3>
              <p className="text-gray-600">
                Plug & Play. Alt kommer forhåndskonfigurert – koble til, og systemet er klart samme dag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Få dokumenterte energibesparelser – hver dag
            </h2>
            <p className="text-lg text-gray-600">
              Et typisk oppdrettsanlegg sparer:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 text-center border-2 border-yellow-200">
              <div className="text-4xl mb-4">💡</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">18 400 kWh</div>
              <div className="text-gray-700">strøm per år</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center border-2 border-green-200">
              <div className="text-4xl mb-4">💸</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">27 600 kr</div>
              <div className="text-gray-700">i reduserte kostnader per år</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center border-2 border-blue-200">
              <div className="text-4xl mb-4">🌱</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,7 tonn</div>
              <div className="text-gray-700">CO₂-utslipp spart</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <p className="text-center text-gray-700 mb-4">
              Alt basert på optimalisering av pumper, vifter og oksygenstyring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                <h3 className="font-bold text-gray-900 mb-2">Uten AI:</h3>
                <p className="text-gray-700">kontinuerlig drift på maks → høyt energiforbruk</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="font-bold text-gray-900 mb-2">Med AI:</h3>
                <p className="text-gray-700">behovsbasert drift → 10–30 % besparelse</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/savings"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Beregn din besparelse
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="products" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Velg løsningen som passer ditt anlegg
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProductPackageCard
              name="Plug & Play – for mindre og mellomstore anlegg"
              sensors={[
                'Rask installasjon',
                'Standard sensorer (flow, oksygen, temperatur)',
                'Dashboard + AI-varsler',
                'Passer for RAS, merder og landbaserte anlegg'
              ]}
              price="25 000 kr"
              subscription="2 990 kr/mnd"
              installTime="1–4 timer"
            />
            <ProductPackageCard
              name="Sjøklar – for større og industrielle anlegg"
              sensors={[
                'Industrielle sensorer og integrasjoner',
                'Avanserte analyser og AI-modeller',
                'Full datalogging og eksportmuligheter',
                'Skreddersydd etter anlegg og drift'
              ]}
              price="55 000–80 000 kr"
              subscription="7 990 kr/mnd"
              installTime="1–2 dager"
              highlighted
            />
          </div>
        </div>
      </section>

      {/* Customer Case Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12 border-2 border-primary-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kundecase: 22 % energireduksjon på 30 dager
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Et mellomstort anlegg reduserte energibruken med 22 % ved å optimalisere pumpestyring og oksygenregulering basert på AquaEnergy AIs anbefalinger.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">↑</div>
                <div className="text-sm text-gray-600">Driftssikkerheten økte</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">↓</div>
                <div className="text-sm text-gray-600">Pumpene gikk færre timer</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">31 000 kr/år</div>
                <div className="text-sm text-gray-600">Besparelsen tilsvarte</div>
              </div>
            </div>
            <Link
              href="#contact"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Se flere resultater
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor velge AquaEnergy AI?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">1.</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lav risiko – høy gevinst</h3>
              <p className="text-gray-700">
                Hvis du ikke sparer strøm i testen, betaler du ingenting.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">2.</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Utviklet for oppdrett</h3>
              <p className="text-gray-700">
                Optimalisert for pumper, oksygenstyring og vannstrøm – ikke generiske sensorer.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">3.</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bedre fiskevelferd</h3>
              <p className="text-gray-700">
                Stabil oksygen og vannkvalitet → mindre stress → bedre vekst.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">4.</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Datadrevet drift</h3>
              <p className="text-gray-700">
                Du slipper å gjette. Systemet forteller hva som bør optimaliseres, når og hvorfor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Demo Section */}
      <section className="py-16 md:py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prøv AquaEnergy AI gratis i 30 dager
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Motta komplett installasjonspakke og dashboard klar til bruk.
          </p>
          <p className="text-lg text-white mb-8 font-semibold">
            Ingen forpliktelser – du betaler kun hvis du sparer strøm.
          </p>
          <Link
            href="#contact"
            className="inline-block bg-white text-primary-600 px-10 py-5 rounded-lg font-bold hover:bg-gray-50 transition-colors text-lg shadow-xl"
          >
            Start gratis pilot
          </Link>
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
