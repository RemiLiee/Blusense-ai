import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AquaEnergy AI</h3>
            <p className="text-gray-400 text-sm">
              Plug & Play sensorpakker + AI for energibesparelse i industrianlegg.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="text-gray-400 text-sm">
              E-post: <a href="mailto:post@aquaenergyai.com" className="hover:text-white">post@aquaenergyai.com</a>
            </p>
            <p className="text-gray-400 text-sm">
              Telefon: <a href="tel:+4790024636" className="hover:text-white">+47 900 24 636</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Lenker</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/personvern" className="text-gray-400 hover:text-white">
                  Personvern
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AquaEnergy AI. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  );
}
