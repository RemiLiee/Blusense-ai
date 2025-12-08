import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Installasjonsmanual',
  description: 'Komplett installasjonsguide for AquaEnergy AI sensorpakker - Basic, Advanced og Premium',
};

export default function InstallasjonPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AQUAENERGY AI – INSTALLASJONSMANUAL
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Versjon 1.0</strong></p>
            <p>Gjelder: Basic, Advanced, Premium</p>
            <p>Målgruppe: Oppdrett/flåte-operatører, teknikere, servicepersonell</p>
            <p>Monteringstid: 30–90 min per lokasjon</p>
            <p>Kompetanse: Enkel teknisk bakgrunn; kun NB-IoT strømmåler krever elektriker</p>
          </div>
        </div>

        {/* PAKKE 1 – BASIC */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">🟦 PAKKE 1 – BASIC</h2>
          <p className="text-blue-800 mb-6 font-medium">Formål: Miljøsensorer + grunnleggende driftsovervåking</p>

          <div className="space-y-6">
            {/* 1. Aanderaa SeaGuard Lite */}
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Aanderaa SeaGuard Lite – Temp/O₂/Salinitet</h3>
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Montering:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Fest med tau/vaier eller brakett til merd</li>
                  <li>Senk til 3–10 meters dybde</li>
                  <li>Slå på batterienhet</li>
                  <li>Skann QR-kode i app → bekreft signal til gateway</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2"><strong>Vedlikehold:</strong> Skyll i ferskvann ved groing</p>
                <p className="text-sm text-gray-600"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Enkel</span></p>
              </div>
            </div>

            {/* 2. Aanderaa MOTUS */}
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Aanderaa MOTUS – Strøm, bølger, drift</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Festes på flåte eller bøye</li>
                <li>Koble til batteripakke</li>
                <li>Skann QR-kode → sensor logger automatisk</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Enkel</span></p>
            </div>

            {/* 3. Milesight EM300-TH */}
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Milesight EM300-TH – Temperatur/Fukt</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Tape, strips eller skru på vegg</li>
                <li>Sett inn batteri</li>
                <li>Skann QR → kobles automatisk til gateway</li>
                <li>Batteri varer 3–5 år</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Svært enkel</span></p>
            </div>

            {/* 4. Browan Water Leak Sensor */}
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Browan Water Leak Sensor</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Legges på gulv under potensielle lekkasjepunkter</li>
                <li>Slå på enhet</li>
                <li>App bekrefter målinger</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Enkel</span></p>
            </div>

            {/* 5. Milesight UG67 Gateway */}
            <div className="bg-white rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Milesight UG67 – LoRaWAN Gateway</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Sett inn SIM-kort (4G/LTE)</li>
                <li>Plugg i strøm</li>
                <li>Monter antenne ute</li>
                <li>Logg inn via nettleser</li>
                <li>Aktiver LoRaWAN-kanaler</li>
                <li>Test sensorer</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Enkel</span></p>
            </div>
          </div>
        </section>

        {/* PAKKE 2 – ADVANCED */}
        <section className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">🟩 PAKKE 2 – ADVANCED</h2>
          <p className="text-green-800 mb-6 font-medium">Alt i Basic + vibrasjon, motorhelse og energidata</p>

          <div className="space-y-6">
            {/* 1. BeanDevice AX-3D */}
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. BeanDevice AX-3D – Vibrasjonssensor</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Fest med magnetfot eller lim på motorhuset</li>
                <li>Sensor kalibrerer seg selv etter 60 sek</li>
                <li>Koble til LoRaWAN</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-yellow-600 font-semibold">Enkel/middels</span></p>
            </div>

            {/* 2. Accuenergy Split-Core CT Clamp */}
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Accuenergy Split-Core CT Clamp – Strømmåling</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Åpne split-core</li>
                <li>Klem rundt faseleder</li>
                <li>Klikk igjen</li>
                <li>Koble til IoT-sender</li>
                <li>Skann QR-kode</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-yellow-600 font-semibold">Middels</span></p>
              <p className="text-sm text-blue-700 mt-2 font-semibold">💡 Merk: Ingen elektriker nødvendig med clamp-on</p>
            </div>

            {/* 3. Aanderaa miniflåtesensor */}
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Aanderaa miniflåtesensor</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Monter som MOTUS-sensor</li>
                <li>Lett og kompakt</li>
                <li>Logger data automatisk</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PAKKE 3 – PREMIUM */}
        <section className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-orange-900 mb-4">🟧 PAKKE 3 – PREMIUM</h2>
          <p className="text-orange-800 mb-6 font-medium">Alt i Basic + Advanced + AI, kraftoptimalisering og produksjonsbeslutninger</p>

          <div className="space-y-6">
            {/* 1. Kamstrup NB-IoT Energi-/AMS-måler */}
            <div className="bg-white rounded-lg p-5 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Kamstrup NB-IoT Energi-/AMS-måler</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Krever elektriker</li>
                <li>Erstatt gammel måler</li>
                <li>Aktiver via app → NB-IoT sender data</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-red-600 font-semibold">Elektriker</span></p>
            </div>

            {/* 2. Luxsensor */}
            <div className="bg-white rounded-lg p-5 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Luxsensor – Lysstyring på flåte</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Fest på vegg eller stolpe</li>
                <li>Batteridrevet → ingen kabler</li>
                <li>QR-skann → automatisk til gateway</li>
              </ul>
            </div>

            {/* 3. GPS-enhet */}
            <div className="bg-white rounded-lg p-5 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. GPS-enhet – Flåteposisjon</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Fest med magnet eller skruer</li>
                <li>Sett inn SIM-kort</li>
                <li>Sender posisjon i sanntid</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-green-600 font-semibold">Enkel</span></p>
            </div>

            {/* 4. AI-kamera */}
            <div className="bg-white rounded-lg p-5 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. AI-kamera – Biomasse/dødfisk/fôrspill</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Festes på rør/ramme i merden</li>
                <li>Koble til 24V lavspenning</li>
                <li>Ethernet → edge-computer</li>
                <li>Systemet trener modellen automatisk</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2"><strong>Vanskelighetsgrad:</strong> <span className="text-yellow-600 font-semibold">Middels</span></p>
              <p className="text-sm text-gray-600"><strong>Elektriker:</strong> Nei</p>
            </div>
          </div>
        </section>

        {/* STRØM & SIGNALKRAV */}
        <section className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔌 STRØM & SIGNALKRAV</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-300">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Sensor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Strøm</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nettverk</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Krever elektriker?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">Aanderaa SeaGuard</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Batteri</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LoRaWAN</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">Milesight TH</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Batteri</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LoRaWAN</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">Vibrasjonssensor</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Batteri</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LoRaWAN</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">CT-klype</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Batteri / lavspenning</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LoRaWAN</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">NB-IoT måler</td>
                  <td className="px-4 py-3 text-sm text-gray-600">230V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">NB-IoT</td>
                  <td className="px-4 py-3 text-sm"><span className="text-red-600 font-semibold">Ja</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">AI-kamera</td>
                  <td className="px-4 py-3 text-sm text-gray-600">24V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Ethernet</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">Gateway UG67</td>
                  <td className="px-4 py-3 text-sm text-gray-600">230V adapter</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4G/LTE</td>
                  <td className="px-4 py-3 text-sm"><span className="text-green-600 font-semibold">Nei</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* DEKNING & GATEWAY-PLASSERING */}
        <section className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">📡 DEKNING & GATEWAY-PLASSERING</h2>
          <div className="bg-white rounded-lg p-5 border border-purple-200 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Plassering:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Høyest mulig, fri sikt mot merdene</li>
                <li>Minst 2 meter fra store motorer</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Rekkevidde:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li><strong>Sjø:</strong> 3–10 km</li>
                <li><strong>Flåte:</strong> 2–4 km</li>
                <li><strong>Land:</strong> 0.5–1.5 km</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-primary-900 mb-2">Trenger du hjelp?</h3>
          <p className="text-primary-700 mb-4">Kontakt oss for teknisk støtte eller spørsmål om installasjon</p>
          <div className="space-y-2 text-primary-800">
            <p>📧 <a href="mailto:info@aquaenergy.com" className="underline hover:text-primary-600">info@aquaenergy.com</a></p>
            <p>📞 <a href="tel:90024636" className="underline hover:text-primary-600">900 24 636</a> (Remi Lie)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
