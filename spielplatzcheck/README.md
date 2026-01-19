# 🎠 Spielplatzcheck Mainz

Finde den perfekten Spielplatz für deine Familie! Eine interaktive Karte mit über 180 Spielplätzen in Mainz.

![Spielplatzcheck Screenshot](https://via.placeholder.com/800x400/22c55e/white?text=Spielplatzcheck+Mainz)

## ✨ Features

- 🗺️ **Interaktive Karte** – Alle Spielplätze auf einen Blick
- 🔍 **Clever filtern** – Schaukel, Rutsche, Sandkasten, Wasserspiel, Barrierefrei
- 📱 **Responsive** – Perfekt auf Handy und Desktop
- ⚡ **Schnell** – Dank Next.js und Vercel
- 🆓 **Kostenlos** – Open Source, keine Werbung

## 🚀 Schnellstart (3 Schritte)

### 1. Repository erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. Name: `spielplatzcheck`
3. Klicke "Create repository"

### 2. Code hochladen

```bash
# Im Projektordner:
git init
git add .
git commit -m "🎠 Initial commit: Spielplatzcheck Mainz"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/spielplatzcheck.git
git push -u origin main
```

### 3. Auf Vercel deployen

1. Gehe zu [vercel.com](https://vercel.com)
2. "Add New Project"
3. Wähle dein `spielplatzcheck` Repository
4. Klicke "Deploy"
5. ✅ Fertig! Deine Seite ist live unter `spielplatzcheck.vercel.app`

## 🌐 Eigene Domain verbinden (spielplatzcheck.org)

1. In Vercel: Settings → Domains
2. Füge `spielplatzcheck.org` hinzu
3. Bei deinem Domain-Anbieter:
   - A-Record: `76.76.19.19`
   - oder CNAME: `cname.vercel-dns.com`

## 🛠️ Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Öffne http://localhost:3000
```

## 📁 Projektstruktur

```
spielplatzcheck/
├── app/
│   ├── layout.tsx      # Haupt-Layout mit Fonts
│   ├── page.tsx        # Startseite
│   └── globals.css     # Globale Styles
├── components/
│   ├── Header.tsx      # Navigation
│   ├── FilterBar.tsx   # Filter-Buttons
│   ├── PlaygroundMap.tsx   # Leaflet Karte
│   └── PlaygroundList.tsx  # Spielplatz-Liste
├── lib/
│   └── playgrounds.ts  # Overpass API & Datenlogik
└── public/             # Statische Dateien
```

## 📊 Datenquellen

**Primäre Quelle:** [OpenStreetMap](https://www.openstreetmap.org) via [Overpass API](https://overpass-api.de) (ODbL-Lizenz)

**Offizielle Quellen der Stadt Mainz:**
- [jugend-in-mainz.de/spielplaetze](https://www.jugend-in-mainz.de/spielplaetze.html) – 271 Spielobjekte
- [Kinderstadtplan](https://www.jugend-in-mainz.de/kinderstadtplan.html) – PDFs für alle 15 Stadtteile
- [Stadt Mainz](https://www.mainz.de/freizeit-und-sport/spielplaetze-wasserspielplaetze.php) – Wasserspielplätze & Infos
- [Wasserspielplätze](https://www.jugend-in-mainz.de/wasserspielplaetze.html) – 4 Wasserspielplätze mit Öffnungszeiten

**Spielplatz vermissen?** 
- Auf OpenStreetMap hinzufügen: [→ OpenStreetMap bearbeiten](https://www.openstreetmap.org/edit)
- Defekt melden: [gruen-umweltamt@stadt.mainz.de](mailto:gruen-umweltamt@stadt.mainz.de)

## 🎯 Nächste Schritte

- [ ] Bilder für jeden Spielplatz (User Upload)
- [ ] Bewertungen & Kommentare
- [ ] Offline-Modus für unterwegs
- [ ] Erweiterte Filter (Alter, Entfernung)
- [ ] Favoritenliste

## 🤝 Mitmachen

Pull Requests sind willkommen! Für größere Änderungen bitte erst ein Issue erstellen.

## 📄 Lizenz

MIT License – Frei nutzbar für alle Mainzer Familien 💚

---

Gebaut mit ❤️ für Mainzer Familien

**Tech Stack:** Next.js 14 • React 18 • Tailwind CSS • Leaflet • OpenStreetMap
