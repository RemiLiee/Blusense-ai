import Link from 'next/link';

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Personvernpolicy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Sist oppdatert: {new Date().toLocaleDateString('no-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Innledning</h2>
            <p className="text-gray-700 mb-4">
              AquaEnergy AI ("vi", "oss", "vår") respekterer ditt personvern og er forpliktet til å beskytte dine personopplysninger. 
              Denne personvernpolicyn forklarer hvordan vi samler inn, bruker, deler og beskytter dine personopplysninger når du bruker vår nettside.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Personopplysninger vi samler inn</h2>
            <p className="text-gray-700 mb-4">
              Vi kan samle inn følgende typer personopplysninger:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Navn og kontaktinformasjon (e-postadresse, telefonnummer)</li>
              <li>Bedriftsnavn</li>
              <li>Meldinger du sender oss gjennom kontaktskjemaet</li>
              <li>Teknisk informasjon (IP-adresse, nettlesertype, operativsystem)</li>
              <li>Bruksdata (hvilke sider du besøker, hvor lenge du er på siden)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Hvordan vi bruker personopplysningene</h2>
            <p className="text-gray-700 mb-4">
              Vi bruker personopplysningene dine for å:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Svare på henvendelser og forespørsler</li>
              <li>Sende deg informasjon om våre tjenester</li>
              <li>Forbedre nettsiden vår og brukeropplevelsen</li>
              <li>Analysere bruksmønstre for å forbedre tjenestene våre</li>
              <li>Overholde juridiske forpliktelser</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Informasjonskapsler (Cookies)</h2>
            <p className="text-gray-700 mb-4">
              Vi bruker informasjonskapsler for å forbedre opplevelsen din på nettsiden. Du kan når som helst velge å avvise eller godta informasjonskapsler. 
              Vi bruker Google Analytics for å analysere trafikken på nettsiden, men kun etter at du har gitt ditt samtykke.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Deling av personopplysninger</h2>
            <p className="text-gray-700 mb-4">
              Vi deler ikke dine personopplysninger med tredjeparter, bortsett fra:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Når det er nødvendig for å levere tjenestene våre (f.eks. e-posttjenester)</li>
              <li>Når vi er juridisk forpliktet til det</li>
              <li>Med ditt eksplisitte samtykke</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Dine rettigheter</h2>
            <p className="text-gray-700 mb-4">
              Du har rett til å:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Få innsyn i hvilke personopplysninger vi har om deg</li>
              <li>Kreve retting av feilaktige opplysninger</li>
              <li>Kreve sletting av personopplysninger</li>
              <li>Trekke tilbake ditt samtykke til behandling av personopplysninger</li>
              <li>Klage til Datatilsynet hvis du mener vi behandler personopplysninger i strid med personvernloven</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sikkerhet</h2>
            <p className="text-gray-700 mb-4">
              Vi tar sikkerheten til dine personopplysninger på alvor og bruker passende tekniske og organisatoriske tiltak for å beskytte dem mot uautorisert tilgang, tap eller ødeleggelse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Kontakt oss</h2>
            <p className="text-gray-700 mb-4">
              Hvis du har spørsmål om denne personvernpolicyn eller ønsker å utøve dine rettigheter, kan du kontakte oss på:
            </p>
            <p className="text-gray-700 mb-4">
              <strong>E-post:</strong> <a href="mailto:post@aquaenergyai.com" className="text-primary-600 hover:underline">post@aquaenergyai.com</a><br />
              <strong>Telefon:</strong> <a href="tel:+4790024636" className="text-primary-600 hover:underline">+47 900 24 636</a>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Tilbake til forsiden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

