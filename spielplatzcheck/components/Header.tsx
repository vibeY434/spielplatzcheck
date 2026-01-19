export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎠</span>
            <span className="font-display text-xl font-bold text-gray-900">
              Spielplatz<span className="text-primary-500">check</span>
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              Karte
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              Über uns
            </a>
            <a
              href="https://www.openstreetmap.org/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4"
            >
              Spielplatz melden ➕
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
