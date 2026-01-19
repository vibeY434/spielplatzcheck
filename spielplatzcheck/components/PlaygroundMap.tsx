"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Playground, equipmentLabels } from "@/lib/playgrounds";

interface PlaygroundMapProps {
  playgrounds: Playground[];
  selectedPlayground: Playground | null;
  onSelectPlayground: (playground: Playground) => void;
}

// Mainz Zentrum
const MAINZ_CENTER: [number, number] = [50.0, 8.27];
const DEFAULT_ZOOM = 13;

// Custom Icon für Spielplätze
const createPlaygroundIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${isSelected ? "48px" : "40px"};
        height: ${isSelected ? "48px" : "40px"};
        background: linear-gradient(135deg, ${isSelected ? "#16a34a" : "#22c55e"} 0%, ${isSelected ? "#14532d" : "#16a34a"} 100%);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: ${isSelected ? "0 6px 20px rgba(34, 197, 94, 0.5)" : "0 4px 12px rgba(34, 197, 94, 0.4)"};
        border: 3px solid white;
        transition: all 0.2s ease;
      ">
        <span style="transform: rotate(45deg); font-size: ${isSelected ? "22px" : "18px"};">🎠</span>
      </div>
    `,
    iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
    iconAnchor: [isSelected ? 24 : 20, isSelected ? 48 : 40],
    popupAnchor: [0, -40],
  });
};

// Popup Content erstellen
const createPopupContent = (playground: Playground): string => {
  const equipmentHtml = playground.equipment
    .slice(0, 4)
    .map((eq) => {
      const info = equipmentLabels[eq];
      if (!info) return "";
      return `<span style="
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 2px 8px;
        background: #f3f4f6;
        border-radius: 9999px;
        font-size: 12px;
        margin: 2px;
      ">${info.emoji} ${info.label}</span>`;
    })
    .join("");

  const accessibleBadge =
    playground.tags.wheelchair === "yes"
      ? `<span style="
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px 8px;
          background: #dcfce7;
          color: #166534;
          border-radius: 9999px;
          font-size: 12px;
          margin-top: 8px;
        ">♿ Barrierefrei</span>`
      : "";

  return `
    <div style="padding: 12px; min-width: 200px; font-family: system-ui, sans-serif;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827;">
        ${playground.name}
      </h3>
      ${
        equipmentHtml
          ? `<div style="display: flex; flex-wrap: wrap; gap: 2px; margin-top: 8px;">${equipmentHtml}</div>`
          : ""
      }
      ${accessibleBadge}
      <a 
        href="https://www.openstreetmap.org/node/${playground.id}" 
        target="_blank" 
        rel="noopener noreferrer"
        style="
          display: inline-block;
          margin-top: 12px;
          color: #22c55e;
          font-size: 12px;
          text-decoration: none;
        "
      >
        Auf OpenStreetMap ansehen →
      </a>
    </div>
  `;
};

export default function PlaygroundMap({
  playgrounds,
  selectedPlayground,
  onSelectPlayground,
}: PlaygroundMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Map initialisieren
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Map erstellen
    const map = L.map(containerRef.current, {
      center: MAINZ_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
    });

    // Zoom Control rechts positionieren
    L.control.zoom({ position: "topright" }).addTo(map);

    // OpenStreetMap Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Marker aktualisieren wenn Spielplätze sich ändern
  useEffect(() => {
    if (!mapRef.current) return;

    // Alte Marker entfernen
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Neue Marker hinzufügen
    playgrounds.forEach((playground) => {
      const isSelected = selectedPlayground?.id === playground.id;
      const marker = L.marker([playground.lat, playground.lon], {
        icon: createPlaygroundIcon(isSelected),
      });

      marker.bindPopup(createPopupContent(playground), {
        maxWidth: 280,
        className: "playground-popup",
      });

      marker.on("click", () => {
        onSelectPlayground(playground);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.set(playground.id, marker);
    });
  }, [playgrounds, selectedPlayground, onSelectPlayground]);

  // Bei Auswahl zur Position fliegen
  useEffect(() => {
    if (!mapRef.current || !selectedPlayground) return;

    const marker = markersRef.current.get(selectedPlayground.id);
    if (marker) {
      mapRef.current.flyTo([selectedPlayground.lat, selectedPlayground.lon], 16, {
        duration: 0.5,
      });
      marker.openPopup();
    }
  }, [selectedPlayground]);

  // Marker Icons aktualisieren wenn Auswahl sich ändert
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const isSelected = selectedPlayground?.id === id;
      marker.setIcon(createPlaygroundIcon(isSelected));
    });
  }, [selectedPlayground]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] lg:h-[600px] rounded-3xl shadow-lg overflow-hidden"
    />
  );
}
