"use client";

import { PlaygroundFilters, MAINZ_DISTRICTS } from "@/lib/playgrounds";

interface FilterBarProps {
  filters: PlaygroundFilters;
  onFilterChange: (filters: PlaygroundFilters) => void;
  resultCount: number;
}

interface FilterOption {
  key: keyof PlaygroundFilters;
  label: string;
  emoji: string;
}

const filterOptions: FilterOption[] = [
  { key: "hasSwing", label: "Schaukel", emoji: "🎠" },
  { key: "hasSlide", label: "Rutsche", emoji: "🛝" },
  { key: "hasSandpit", label: "Sandkasten", emoji: "🏖️" },
  { key: "hasWater", label: "Wasserspiel", emoji: "💦" },
  { key: "hasClimbing", label: "Klettern", emoji: "🧗" },
  { key: "isAccessible", label: "Barrierefrei", emoji: "♿" },
  { key: "isWaterPlayground", label: "Wasserspielplatz", emoji: "🌊" },
];

export default function FilterBar({
  filters,
  onFilterChange,
  resultCount,
}: FilterBarProps) {
  const toggleFilter = (key: keyof PlaygroundFilters) => {
    if (key === "district") return; // District wird separat behandelt
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  const setDistrict = (district: string | undefined) => {
    onFilterChange({
      ...filters,
      district,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 space-y-3">
      {/* Equipment Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-500 font-medium text-sm">Ausstattung:</span>

        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => toggleFilter(option.key)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
              text-sm font-medium transition-all duration-200
              ${
                filters[option.key]
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            <span>{option.emoji}</span>
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      {/* District Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-gray-500 font-medium text-sm">Stadtteil:</span>
        <select
          value={filters.district || ""}
          onChange={(e) => setDistrict(e.target.value || undefined)}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium
                     border-0 focus:ring-2 focus:ring-primary-400 focus:bg-white
                     cursor-pointer transition-all"
        >
          <option value="">Alle Stadtteile</option>
          {MAINZ_DISTRICTS.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Filter zurücksetzen
          </button>
        )}

        <div className="ml-auto text-sm text-gray-500">
          <span className="font-bold text-primary-600">{resultCount}</span> Spielplätze
        </div>
      </div>
    </div>
  );
}
