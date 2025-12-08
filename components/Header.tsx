import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 bg-gradient-to-br from-primary-600 via-primary-500 to-aqua-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 overflow-hidden">
                <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {/* Bølger nederst */}
                  <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeLinecap="round"/>
                  <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeLinecap="round" opacity="0.7"/>
                  {/* Energi-bolt */}
                  <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" fill="currentColor" stroke="none"/>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">AquaEnergy</span>
                <span className="text-xs text-primary-600 font-semibold leading-tight">AI</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Hjem
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/savings" className="text-gray-700 hover:text-primary-600 transition-colors">
              Besparelser
            </Link>
            <Link href="/installasjon" className="text-gray-700 hover:text-primary-600 transition-colors">
              Installasjon
            </Link>
            <Link href="/#products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Produkter
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

