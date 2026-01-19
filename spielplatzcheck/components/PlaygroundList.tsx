"use client";

import { Playground, equipmentLabels } from "@/lib/playgrounds";

interface PlaygroundListProps {
  playgrounds: Playground[];
  selectedPlayground: Playground | null;
  onSelectPlayground: (playground: Playground) => void;
  compact?: boolean;
}

export default function PlaygroundList({
  playgrounds,
  selectedPlayground,
  onSelectPlayground,
  compact = false,
}: PlaygroundListProps) {
  if (playgrounds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-gray-600">
          Keine Spielplätze mit diesen Filtern gefunden.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Versuche, einige Filter zu entfernen.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-${compact ? "2" : "4"}`}>
      {playgrounds.map((playground) => (
        <PlaygroundCard
          key={playground.id}
          playground={playground}
          isSelected={selectedPlayground?.id === playground.id}
          onSelect={() => onSelectPlayground(playground)}
          compact={compact}
        />
      ))}
    </div>
  );
}

interface PlaygroundCardProps {
  playground: Playground;
  isSelected: boolean;
  onSelect: () => void;
  compact: boolean;
}

function PlaygroundCard({
  playground,
  isSelected,
  onSelect,
  compact,
}: PlaygroundCardProps) {
  // Equipment Tags anzeigen
  const equipmentTags = playground.equipment.slice(0, compact ? 3 : 6);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left transition-all duration-200
        ${
          compact
            ? "p-3 rounded-xl"
            : "p-4 rounded-2xl shadow-md hover:shadow-lg"
        }
        ${
          isSelected
            ? "bg-primary-50 border-2 border-primary-400 ring-2 ring-primary-200"
            : "bg-white hover:bg-gray-50 border border-gray-100"
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`
            flex-shrink-0 flex items-center justify-center rounded-xl
            ${compact ? "w-10 h-10 text-lg" : "w-12 h-12 text-2xl"}
            ${playground.isWaterPlayground ? "bg-blue-100" : isSelected ? "bg-primary-100" : "bg-gray-100"}
          `}
        >
          {playground.isWaterPlayground ? "🌊" : "🎠"}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <h3
            className={`
              font-semibold text-gray-900 truncate
              ${compact ? "text-sm" : "text-base"}
            `}
          >
            {playground.name}
          </h3>

          {/* Stadtteil */}
          {playground.district && !compact && (
            <p className="text-xs text-gray-500 mt-0.5">
              📍 {playground.district}
            </p>
          )}

          {/* Equipment Tags */}
          {equipmentTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {equipmentTags.map((eq) => {
                const info = equipmentLabels[eq];
                if (!info) return null;
                return (
                  <span
                    key={eq}
                    className={`
                      inline-flex items-center gap-0.5 px-2 py-0.5 
                      bg-gray-100 rounded-full text-gray-600
                      ${compact ? "text-xs" : "text-xs"}
                    `}
                  >
                    <span>{info.emoji}</span>
                    {!compact && <span>{info.label}</span>}
                  </span>
                );
              })}
              {playground.equipment.length > equipmentTags.length && (
                <span className="text-xs text-gray-400">
                  +{playground.equipment.length - equipmentTags.length}
                </span>
              )}
            </div>
          )}

          {/* Additional Info (nur in voller Ansicht) */}
          {!compact && (
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              {playground.tags.wheelchair === "yes" && (
                <span className="inline-flex items-center gap-1">
                  <span>♿</span> Barrierefrei
                </span>
              )}
              {playground.tags.surface && (
                <span className="inline-flex items-center gap-1">
                  <span>🏖️</span> {playground.tags.surface}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow */}
        <div
          className={`
            flex-shrink-0 text-gray-400
            ${isSelected ? "text-primary-500" : ""}
          `}
        >
          <svg
            className={`${compact ? "w-4 h-4" : "w-5 h-5"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
