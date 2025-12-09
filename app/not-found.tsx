import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Siden finnes ikke
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Beklager, siden du leter etter kunne ikke bli funnet. Den kan ha blitt flyttet eller slettet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg shadow-lg"
          >
            Tilbake til forsiden
          </Link>
          <Link
            href="/#contact"
            className="bg-transparent text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors text-lg"
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </div>
  );
}

