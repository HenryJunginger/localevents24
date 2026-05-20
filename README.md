# LocalEvents24

Plattform zum Entdecken lokaler Events per Postleitzahl – Konzerte, Märkte, Sport und mehr.

## Starten

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Weitere Befehle

```bash
npm run build    # Produktions-Build
npm run lint     # ESLint
npm run format   # Prettier
```

## Ordnerstruktur

```
src/
  app/              # Next.js App Router (Pages, Layouts)
  components/
    ui/             # Basis-Komponenten: Button, Input, Badge
    layout/         # Header, Footer
  lib/              # utils.ts (cn-Helper)
  types/            # Globale TypeScript-Typen (Event, Category)
```

## Tech Stack

- **Next.js 16** – App Router, TypeScript
- **Tailwind CSS v4** – Design-Tokens in `globals.css`
- **Framer Motion** – Animationen (vorbereitet)
- **Inter** – Schriftart via `next/font`

## Design-Tokens

Alle Farben und Design-Tokens sind in `src/app/globals.css` unter `@theme` definiert und per Tailwind-Klassen nutzbar (z.B. `bg-primary`, `text-navy`, `shadow-card`).

## Nächste Schritte

- Supabase-Integration (Auth + Datenbank)
- Event-CRUD (Erstellen, Bearbeiten, Löschen)
- PLZ-Suche mit Umkreis-Filter
- Event-Detailseite
- Merkliste (Favoriten)
- Deployment via GitHub + Hostinger
