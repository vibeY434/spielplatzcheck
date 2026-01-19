"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Playground, fetchPlaygrounds, filterPlaygrounds, PlaygroundFilters } from "@/lib/playgrounds";
import PlaygroundList from "@/components/PlaygroundList";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";

// Map dynamisch laden (SSR deaktivieren für Leaflet)
const PlaygroundMap = dynamic(() => import("@/components/PlaygroundMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-3xl animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-gray-500">Karte wird geladen...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState<Playground[]>([]);
  const [filters, setFilters] = useState<PlaygroundFilters>({});
  const [selectedPlayground, setSelectedPlayground] = useState<Playground | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // Lade Spielplätze beim Start
  useEffect(() => {
    async function loadPlaygrounds() {
      try {
        setIsLoading(true);
        const data = await fetchPlaygrounds();
        setPlaygrounds(data);
        setFilteredPlaygrounds(data);
      } catch (err) {
        setError("Spielplätze konnten nicht geladen werden. Bitte versuche es später erneut.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlaygrounds();
  }, []);

  // Filter anwenden
  useEffect(() => {
    const filtered = filterPlaygrounds(playgrounds, filters);
    setFilteredPlaygrounds(filtered);
  }, [filters, playgrounds]);

  // Filter ändern
  const handleFilterChange = (newFilters: PlaygroundFilters) => {
    setFilters(newFilters);
  };

  // Spielplatz auswählen
  const handleSelectPlayground = (playground: Playground) => {
    setSelectedPlayground(playground);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Finde den perfekten{" "}
            <span className="text-primary-500">Spielplatz</span> 🎠
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Entdecke über {playgrounds.length > 0 ? playgrounds.length : "180"} Spielplätze 
            in Mainz. Mit Karte, Filteroptionen und allen wichtigen Infos.
          </p>
        </section>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={filteredPlaygrounds.length}
        />

        {/* View Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setViewMode("map")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              viewMode === "map"
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            🗺️ Karte
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              viewMode === "list"
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            📋 Liste
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block animate-bounce text-6xl mb-4">🎈</div>
            <p className="text-gray-600 text-lg">Spielplätze werden geladen...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">😔</div>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 btn-primary"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map or List View */}
            <div className={viewMode === "map" ? "lg:col-span-2" : "lg:col-span-3"}>
              {viewMode === "map" ? (
                <PlaygroundMap
                  playgrounds={filteredPlaygrounds}
                  selectedPlayground={selectedPlayground}
                  onSelectPlayground={handleSelectPlayground}
                />
              ) : (
                <PlaygroundList
                  playgrounds={filteredPlaygrounds}
                  selectedPlayground={selectedPlayground}
                  onSelectPlayground={handleSelectPlayground}
                />
              )}
            </div>

            {/* Sidebar with List (only in map view) */}
            {viewMode === "map" && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-lg p-4 max-h-[600px] overflow-y-auto">
                  <h2 className="font-display text-xl font-bold mb-4 sticky top-0 bg-white py-2">
                    {filteredPlaygrounds.length} Spielplätze gefunden
                  </h2>
                  <PlaygroundList
                    playgrounds={filteredPlaygrounds}
                    selectedPlayground={selectedPlayground}
                    onSelectPlayground={handleSelectPlayground}
                    compact
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-display text-xl font-bold mb-2">271 Spielobjekte</h3>
            <p className="text-gray-600">
              Laut Stadt Mainz gibt es 271 Spielobjekte in 15 Stadtteilen – Spielplätze, Bolzplätze, Skateranlagen und mehr.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-display text-xl font-bold mb-2">Kinderstadtplan</h3>
            <p className="text-gray-600">
              Der offizielle{" "}
              <a 
                href="https://www.jugend-in-mainz.de/kinderstadtplan.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                Kinderstadtplan
              </a>{" "}
              mit PDFs für jeden Stadtteil.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-3">🌊</div>
            <h3 className="font-display text-xl font-bold mb-2">4 Wasserspielplätze</h3>
            <p className="text-gray-600">
              Im Sommer kostenlos! Volkspark, Hartenberg-Park, Goetheanlage und Weisenau.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Beschreibung */}
            <div>
              <p className="font-display text-2xl mb-4">Spielplatzcheck Mainz 🎠</p>
              <p className="text-gray-400 text-sm">
                Ein Herzensprojekt für Mainzer Familien. Alle Spielplätze auf einen Blick.
              </p>
            </div>

            {/* Offizielle Quellen */}
            <div>
              <h4 className="font-semibold mb-3">Offizielle Quellen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a 
                    href="https://www.jugend-in-mainz.de/spielplaetze.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Jugend-in-Mainz.de
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.jugend-in-mainz.de/kinderstadtplan.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Kinderstadtplan (PDF)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.mainz.de/freizeit-und-sport/spielplaetze-wasserspielplaetze.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Stadt Mainz
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.jugend-in-mainz.de/wasserspielplaetze.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Wasserspielplätze
                  </a>
                </li>
              </ul>
            </div>

            {/* Mitmachen */}
            <div>
              <h4 className="font-semibold mb-3">Mitmachen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a 
                    href="https://www.openstreetmap.org/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Spielplatz auf OpenStreetMap ergänzen
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:gruen-umweltamt@stadt.mainz.de"
                    className="hover:text-primary-400 transition-colors"
                  >
                    → Defekt melden (Stadt Mainz)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Kartendaten von{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                OpenStreetMap
              </a>{" "}
              (ODbL) • Offizielle Infos:{" "}
              <a
                href="https://www.jugend-in-mainz.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                jugend-in-mainz.de
              </a>
            </p>
            <p className="text-gray-500 text-xs">
              Laut Stadt Mainz: 271 Spielobjekte in 15 Stadtteilen 💚
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
