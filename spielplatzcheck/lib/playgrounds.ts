// Types für Spielplatz-Daten
export interface Playground {
  id: number;
  osmType: "node" | "way" | "relation"; // OSM-Typ für korrekte Verlinkung
  name: string;
  lat: number;
  lon: number;
  district?: string; // Stadtteil
  isWaterPlayground?: boolean;
  tags: {
    name?: string;
    operator?: string;
    surface?: string;
    access?: string;
    wheelchair?: string;
    baby?: string;
    min_age?: string;
    max_age?: string;
    // Ausstattung
    playground?: string;
    [key: string]: string | undefined;
  };
  equipment: string[];
}

// Mainzer Stadtteile mit Bounding Boxes für Zuordnung
export const MAINZ_DISTRICTS = [
  { name: "Altstadt", bounds: { south: 49.995, north: 50.01, west: 8.26, east: 8.285 } },
  { name: "Neustadt", bounds: { south: 49.99, north: 50.01, west: 8.24, east: 8.27 } },
  { name: "Oberstadt", bounds: { south: 49.97, north: 49.995, west: 8.24, east: 8.28 } },
  { name: "Bretzenheim", bounds: { south: 49.97, north: 49.995, west: 8.19, east: 8.24 } },
  { name: "Gonsenheim", bounds: { south: 49.99, north: 50.02, west: 8.19, east: 8.24 } },
  { name: "Finthen", bounds: { south: 49.96, north: 49.99, west: 8.13, east: 8.19 } },
  { name: "Drais", bounds: { south: 49.95, north: 49.97, west: 8.17, east: 8.21 } },
  { name: "Marienborn", bounds: { south: 49.96, north: 49.98, west: 8.21, east: 8.25 } },
  { name: "Lerchenberg", bounds: { south: 49.95, north: 49.97, west: 8.21, east: 8.25 } },
  { name: "Hechtsheim", bounds: { south: 49.95, north: 49.975, west: 8.25, east: 8.30 } },
  { name: "Ebersheim", bounds: { south: 49.92, north: 49.95, west: 8.26, east: 8.32 } },
  { name: "Weisenau", bounds: { south: 49.97, north: 49.995, west: 8.28, east: 8.32 } },
  { name: "Laubenheim", bounds: { south: 49.95, north: 49.975, west: 8.30, east: 8.35 } },
  { name: "Mombach", bounds: { south: 50.00, north: 50.03, west: 8.21, east: 8.26 } },
  { name: "Hartenberg-Münchfeld", bounds: { south: 49.99, north: 50.01, west: 8.22, east: 8.26 } },
] as const;

// Offizielle Wasserspielplätze der Stadt Mainz
export const WATER_PLAYGROUNDS = [
  {
    name: "Meenzer Plitsch-Platsch-Platz (Volkspark)",
    lat: 50.0012,
    lon: 8.2385,
    district: "Gonsenheim",
    hours: "ca. 10-18 Uhr",
    description: "Großer Wasserspielplatz im Volkspark mit Liegewiesen und Minigolf",
  },
  {
    name: "Wasserspielplatz Hartenberg-Park",
    lat: 49.9985,
    lon: 8.2315,
    district: "Hartenberg-Münchfeld", 
    hours: "ca. 12-18 Uhr",
    description: "Wasserspielplatz mit Minigolfanlage und Grillplätzen",
  },
  {
    name: "Wasserspielplatz Goetheanlage",
    lat: 49.9965,
    lon: 8.2545,
    district: "Neustadt",
    hours: "ca. 11-18 Uhr",
    description: "Beliebter Wasserspielplatz in der Mainzer Neustadt",
  },
  {
    name: "Wasserspielplatz Weisenau",
    lat: 49.9785,
    lon: 8.2915,
    district: "Weisenau",
    hours: "ca. 9-18 Uhr",
    description: "Familiärer Wasserspielplatz im Stadtteil Weisenau",
  },
];

// Links zu offiziellen Quellen
export const OFFICIAL_SOURCES = {
  spielplaetze: "https://www.jugend-in-mainz.de/spielplaetze.html",
  kinderstadtplan: "https://www.jugend-in-mainz.de/kinderstadtplan.html",
  stadtMainz: "https://www.mainz.de/freizeit-und-sport/spielplaetze-wasserspielplaetze.php",
  wasserspielplaetze: "https://www.jugend-in-mainz.de/wasserspielplaetze.html",
  defektMelden: "mailto:gruen-umweltamt@stadt.mainz.de",
};

// Kinderstadtplan PDFs pro Stadtteil
export const DISTRICT_PDF_URLS: Record<string, string> = {
  "Altstadt": "https://www.jugend-in-mainz.de/kinderstadtplan/altstadt.html",
  "Bretzenheim": "https://www.jugend-in-mainz.de/kinderstadtplan/bretzenheim-/-zahlbach.html",
  "Drais": "https://www.jugend-in-mainz.de/kinderstadtplan/drais.html",
  "Ebersheim": "https://www.jugend-in-mainz.de/kinderstadtplan/ebersheim.html",
  "Finthen": "https://www.jugend-in-mainz.de/kinderstadtplan/finthen.html",
  "Gonsenheim": "https://www.jugend-in-mainz.de/kinderstadtplan/gonsenheim.html",
  "Hartenberg-Münchfeld": "https://www.jugend-in-mainz.de/kinderstadtplan/hartenberg-muenchfeld.html",
  "Hechtsheim": "https://www.jugend-in-mainz.de/kinderstadtplan/hechtsheim.html",
  "Laubenheim": "https://www.jugend-in-mainz.de/kinderstadtplan/laubenheim.html",
  "Lerchenberg": "https://www.jugend-in-mainz.de/kinderstadtplan/lerchenberg.html",
  "Marienborn": "https://www.jugend-in-mainz.de/kinderstadtplan/marienborn.html",
  "Mombach": "https://www.jugend-in-mainz.de/kinderstadtplan/mombach.html",
  "Neustadt": "https://www.jugend-in-mainz.de/kinderstadtplan/neustadt.html",
  "Oberstadt": "https://www.jugend-in-mainz.de/kinderstadtplan/oberstadt.html",
  "Weisenau": "https://www.jugend-in-mainz.de/kinderstadtplan/weisenau.html",
};

// Funktion um Stadtteil anhand von Koordinaten zu ermitteln
export function getDistrictFromCoords(lat: number, lon: number): string | undefined {
  for (const district of MAINZ_DISTRICTS) {
    if (
      lat >= district.bounds.south &&
      lat <= district.bounds.north &&
      lon >= district.bounds.west &&
      lon <= district.bounds.east
    ) {
      return district.name;
    }
  }
  return undefined;
}

// Mainz Bounding Box
const MAINZ_BBOX = {
  south: 49.9,
  west: 8.15,
  north: 50.05,
  east: 8.35,
};

// Overpass Query für Spielplätze in Mainz
const buildQuery = () => `
[out:json][timeout:30];
(
  // Spielplatz-Flächen
  way["leisure"="playground"](${MAINZ_BBOX.south},${MAINZ_BBOX.west},${MAINZ_BBOX.north},${MAINZ_BBOX.east});
  // Spielplatz-Punkte
  node["leisure"="playground"](${MAINZ_BBOX.south},${MAINZ_BBOX.west},${MAINZ_BBOX.north},${MAINZ_BBOX.east});
);
out center tags;
`;

// Equipment-Tags die wir extrahieren wollen
const EQUIPMENT_TAGS = [
  "playground:slide",
  "playground:swing",
  "playground:sandpit",
  "playground:seesaw",
  "playground:springy",
  "playground:climbing_frame",
  "playground:carousel",
  "playground:zipwire",
  "playground:playhouse",
  "playground:water",
  "playground:basketball",
  "playground:soccer",
];

// Übersetze Equipment-Tags zu deutschen Labels
export const equipmentLabels: Record<string, { label: string; emoji: string }> = {
  "playground:slide": { label: "Rutsche", emoji: "🛝" },
  "playground:swing": { label: "Schaukel", emoji: "🎠" },
  "playground:sandpit": { label: "Sandkasten", emoji: "🏖️" },
  "playground:seesaw": { label: "Wippe", emoji: "⚖️" },
  "playground:springy": { label: "Federspielgerät", emoji: "🐴" },
  "playground:climbing_frame": { label: "Klettergerüst", emoji: "🧗" },
  "playground:carousel": { label: "Karussell", emoji: "🎪" },
  "playground:zipwire": { label: "Seilbahn", emoji: "🚡" },
  "playground:playhouse": { label: "Spielhaus", emoji: "🏠" },
  "playground:water": { label: "Wasserspiel", emoji: "💦" },
  "playground:basketball": { label: "Basketball", emoji: "🏀" },
  "playground:soccer": { label: "Fußball", emoji: "⚽" },
};

// Extrahiere Equipment aus Tags
function extractEquipment(tags: Record<string, string>): string[] {
  return EQUIPMENT_TAGS.filter((tag) => tags[tag] === "yes");
}

// Berechne Mittelpunkt eines Ways
function calculateCenter(
  nodes: Array<{ lat: number; lon: number }>
): { lat: number; lon: number } | null {
  if (!nodes || nodes.length === 0) return null;
  const lat = nodes.reduce((sum, n) => sum + n.lat, 0) / nodes.length;
  const lon = nodes.reduce((sum, n) => sum + n.lon, 0) / nodes.length;
  return { lat, lon };
}

// Fetch Spielplätze von Overpass API
export async function fetchPlaygrounds(): Promise<Playground[]> {
  const query = buildQuery();
  const url = "https://overpass-api.de/api/interpreter";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transformiere Daten zu unserer Struktur
    const playgrounds: Playground[] = data.elements
      .map((element: any) => {
        // Koordinaten bestimmen
        let lat: number, lon: number;

        if (element.type === "node") {
          lat = element.lat;
          lon = element.lon;
        } else if (element.center) {
          lat = element.center.lat;
          lon = element.center.lon;
        } else {
          return null;
        }

        // WICHTIG: Nur Spielplätze innerhalb von Mainz akzeptieren
        if (
          lat < MAINZ_BBOX.south ||
          lat > MAINZ_BBOX.north ||
          lon < MAINZ_BBOX.west ||
          lon > MAINZ_BBOX.east
        ) {
          return null;
        }

        const tags = element.tags || {};
        const equipment = extractEquipment(tags);

        // Stadtteil ermitteln
        const district = getDistrictFromCoords(lat, lon);

        // Prüfen ob Wasserspielplatz
        const isWaterPlayground = 
          tags["playground:water"] === "yes" || 
          tags.name?.toLowerCase().includes("wasser") ||
          equipment.includes("playground:water");

        // Name generieren wenn keiner vorhanden
        let name = tags.name;
        if (!name) {
          // Versuche einen sinnvollen Namen zu generieren
          if (tags["addr:street"]) {
            name = `Spielplatz ${tags["addr:street"]}`;
          } else if (district) {
            name = `Spielplatz in ${district}`;
          } else {
            name = `Spielplatz #${element.id}`;
          }
        }

        return {
          id: element.id,
          osmType: element.type as "node" | "way" | "relation",
          name,
          lat,
          lon,
          district,
          isWaterPlayground,
          tags,
          equipment,
        };
      })
      .filter((p: Playground | null): p is Playground => p !== null);

    return playgrounds;
  } catch (error) {
    console.error("Fehler beim Laden der Spielplätze:", error);
    throw error;
  }
}

// Filter-Typen
export interface PlaygroundFilters {
  hasSwing?: boolean;
  hasSlide?: boolean;
  hasSandpit?: boolean;
  hasWater?: boolean;
  hasClimbing?: boolean;
  isAccessible?: boolean;
  isWaterPlayground?: boolean;
  district?: string;
}

// Filtere Spielplätze
export function filterPlaygrounds(
  playgrounds: Playground[],
  filters: PlaygroundFilters
): Playground[] {
  return playgrounds.filter((p) => {
    if (filters.hasSwing && !p.equipment.includes("playground:swing")) return false;
    if (filters.hasSlide && !p.equipment.includes("playground:slide")) return false;
    if (filters.hasSandpit && !p.equipment.includes("playground:sandpit")) return false;
    if (filters.hasWater && !p.equipment.includes("playground:water")) return false;
    if (filters.hasClimbing && !p.equipment.includes("playground:climbing_frame"))
      return false;
    if (filters.isAccessible && p.tags.wheelchair !== "yes") return false;
    if (filters.isWaterPlayground && !p.isWaterPlayground) return false;
    if (filters.district && p.district !== filters.district) return false;
    return true;
  });
}

// Zähle Spielplätze pro Stadtteil
export function countByDistrict(playgrounds: Playground[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of playgrounds) {
    const district = p.district || "Sonstige";
    counts[district] = (counts[district] || 0) + 1;
  }
  return counts;
}
