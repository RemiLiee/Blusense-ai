import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AquaEnergy AI</h3>
            <p className="text-gray-600 text-sm">
              Intelligent energistyring for akvakulturoperasjoner.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Produkter</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Plug & Play</li>
              <li>Sjøklar</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h3>
            <p className="text-gray-600 text-sm mb-2">
              Remi Lie
            </p>
            <p className="text-gray-600 text-sm">
              <a href="tel:+4790024636" className="text-primary-600 hover:text-primary-700">900 24 636</a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>&copy; {new Date().getFullYear()} AquaEnergy AI. Alle rettigheter reservert.</p>
            <p>
              E-post: <a href="mailto:post@aquaenergyai.com" className="text-primary-600 hover:text-primary-700">post@aquaenergyai.com</a>
            </p>
            <p>
              Kontaktperson: Remi Lie | <a href="tel:+4790024636" className="text-primary-600 hover:text-primary-700">900 24 636</a>
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              <Link href="#contact" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                Book demo →
              </Link>
              <Link href="#" className="text-primary-600 hover:text-primary-700 text-sm">
                Personvern →
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Vi behandler personopplysninger i henhold til GDPR.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

