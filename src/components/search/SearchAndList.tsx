'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { useFavorites } from '@/components/FavoritesProvider';
import { EVENT_CATEGORIES, CATEGORIES } from '@/lib/categories';
import { loadEvents, formatEventDate } from '@/lib/events';
import { haversineKm } from '@/lib/geo';
import { cn } from '@/lib/utils';
import type { LocalEvent } from '@/types';

const HEIDENHEIM = { lat: 48.6767, lng: 10.1536 };

const PLACEHOLDER_EVENTS: LocalEvent[] = [
  {
    id: 'p-1',
    title: 'Heimspiel: 1. FC Heidenheim vs. VfB',
    date: '2026-05-17',
    time: '15:30',
    location: 'Voith-Arena, Heidenheim',
    categoryId: 'sport',
    createdAt: 0,
    ...HEIDENHEIM,
  },
  {
    id: 'p-2',
    title: 'VHS Kurs: Italienisch für Anfänger',
    date: '2026-05-18',
    time: '18:00',
    location: 'Volkshochschule Heidenheim',
    categoryId: 'workshops',
    createdAt: 0,
    ...HEIDENHEIM,
  },
  {
    id: 'p-3',
    title: 'Wochenmarkt Heidenheim',
    date: '2026-05-21',
    time: '07:00',
    location: 'Marktplatz, Heidenheim',
    categoryId: 'maerkte',
    createdAt: 0,
    ...HEIDENHEIM,
  },
];

const RADIUS_OPTIONS = [
  { value: 0, label: 'Überall' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' },
];

interface Coords {
  lat: number;
  lng: number;
}

export function SearchAndList() {
  const [query, setQuery] = useState('');
  const [plz, setPlz] = useState('');
  const [radius, setRadius] = useState(0);
  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [plzError, setPlzError] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEvents(loadEvents());
    setMounted(true);
  }, []);

  const isPlaceholder = !mounted || events.length === 0;
  const source = isPlaceholder ? PLACEHOLDER_EVENTS : events;
  const hasFilter = query.trim() !== '' || userCoords !== null;

  const filtered = useMemo(() => {
    return source.filter((event) => {
      if (query.trim()) {
        const haystack =
          `${event.title} ${event.location} ${event.description ?? ''}`.toLowerCase();
        if (!haystack.includes(query.toLowerCase().trim())) return false;
      }
      if (userCoords && radius > 0) {
        if (!event.lat || !event.lng) return false;
        if (haversineKm(userCoords.lat, userCoords.lng, event.lat, event.lng) > radius)
          return false;
      }
      return true;
    });
  }, [source, query, userCoords, radius]);

  async function handleSearch() {
    setPlzError('');
    if (!plz.trim()) {
      setUserCoords(null);
      return;
    }
    setIsGeocoding(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(plz.trim())}`);
      const coords: Coords | null = await res.json();
      if (coords) {
        setUserCoords(coords);
      } else {
        setUserCoords(null);
        setPlzError('PLZ / Ort nicht gefunden.');
      }
    } catch {
      setUserCoords(null);
      setPlzError('Standort konnte nicht ermittelt werden.');
    } finally {
      setIsGeocoding(false);
    }
  }

  return (
    <>
      {/* Hero-Suchbereich */}
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="bg-background rounded-lg shadow-card border border-border p-5 max-w-2xl">
            <Input
              id="search"
              label="Was suchst du?"
              placeholder="z.B. Flohmarkt, Konzert"
              icon={<SearchIcon />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-end flex-wrap">
              <Input
                id="plz"
                label="PLZ / Ort"
                placeholder="z.B. 89522 Heidenheim"
                value={plz}
                onChange={(e) => {
                  setPlz(e.target.value);
                  setPlzError('');
                  if (!e.target.value) setUserCoords(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                error={plzError}
                className="sm:max-w-[180px]"
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-foreground">Radius</label>
                <RadiusButton value={radius} onChange={setRadius} />
              </div>

              <Button
                size="lg"
                onClick={handleSearch}
                isLoading={isGeocoding}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Finden
              </Button>
            </div>

            {userCoords && (
              <p className="mt-2 text-xs text-success flex items-center gap-1">
                <MapPin size={12} />
                Standort erkannt
                {radius > 0 && ` – zeige Events im Umkreis von ${radius} km`}
              </p>
            )}
          </div>

          <CategoryFilter />
        </div>
      </section>

      {/* Kategorie-Schnellauswahl */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex gap-5 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategorie/${cat.id}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <span className="emoji-circle w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-2xl shadow-card group-hover:border-primary group-hover:bg-primary-light transition">
                {cat.emoji}
              </span>
              <span className="text-xs font-medium text-muted group-hover:text-primary transition">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Event-Liste */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
            {hasFilter ? (
              <>
                {filtered.length} Ergebnis{filtered.length !== 1 && 'se'}
                <button
                  onClick={() => {
                    setQuery('');
                    setPlz('');
                    setUserCoords(null);
                    setRadius(0);
                    setPlzError('');
                  }}
                  className="ml-3 text-xs font-normal normal-case tracking-normal text-primary hover:underline"
                >
                  Filter zurücksetzen
                </button>
              </>
            ) : (
              <>
                Events in deiner Nähe{' '}
                {isPlaceholder && (
                  <span className="text-muted font-normal normal-case tracking-normal">
                    (Beispiel-Einträge)
                  </span>
                )}
              </>
            )}
          </h2>

          <select className="text-sm border border-border rounded-md bg-background text-foreground py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sortieren: Datum</option>
            <option>Sortieren: Distanz</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-foreground font-medium">Keine Events gefunden</p>
            <p className="text-sm text-muted">
              {hasFilter
                ? 'Versuche es mit einem anderen Suchbegriff oder einem größeren Radius.'
                : 'Sei der Erste und '}
              {!hasFilter && (
                <Link href="/event-erstellen" className="text-primary hover:underline">
                  erstelle ein Event
                </Link>
              )}
              .
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} userCoords={userCoords} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function EventCard({ event, userCoords }: { event: LocalEvent; userCoords: Coords | null }) {
  const category = EVENT_CATEGORIES.find((c) => c.id === event.categoryId);
  const { Icon, label } = category ?? { Icon: null, label: event.categoryId };
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(event.id);

  const distanceKm =
    userCoords && event.lat && event.lng
      ? haversineKm(userCoords.lat, userCoords.lng, event.lat, event.lng)
      : null;

  return (
    <div className="bg-background rounded-lg border border-border shadow-card p-4 flex gap-4 hover:border-primary transition-colors cursor-pointer">
      <div className="emoji-box w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-surface border border-border shrink-0 flex items-center justify-center">
        {Icon ? <Icon size={28} className="text-primary" /> : <span className="text-2xl">📌</span>}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{event.title}</h3>
        <p className="text-primary text-sm font-semibold mt-1">
          {formatEventDate(event.date)} | {event.time} Uhr
        </p>
        <p className="text-muted text-xs mt-0.5 truncate">
          {event.location}
          {distanceKm !== null && (
            <span className="ml-2 text-success font-medium">
              ~ {distanceKm < 1 ? '<1' : Math.round(distanceKm)} km
            </span>
          )}
        </p>
        {event.description && (
          <p className="text-muted text-xs mt-1 line-clamp-1">{event.description}</p>
        )}
        <div className="mt-2">
          <Badge label={label} />
        </div>
      </div>

      <button
        className="shrink-0 self-start transition-colors"
        aria-label={favorited ? 'Von Merkliste entfernen' : 'Merken'}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(event.id);
        }}
      >
        <HeartIcon filled={favorited} />
      </button>
    </div>
  );
}

function RadiusButton({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 whitespace-nowrap border border-border rounded-md bg-background text-foreground hover:border-primary transition-colors py-2.5 px-3 text-sm h-[42px]"
      >
        <MapPin size={14} className="text-muted shrink-0" />
        <span>{value === 0 ? 'Überall' : `${value} km`}</span>
        <ChevronDown
          size={12}
          className={cn('text-muted transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 bg-background border border-border rounded-md shadow-card py-1 min-w-[110px]">
          {RADIUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-2 text-sm hover:bg-surface transition-colors',
                value === opt.value && 'text-primary font-semibold',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? '#ef4444' : 'none'}
      stroke={filled ? '#ef4444' : 'currentColor'}
      strokeWidth="2"
      className={filled ? '' : 'text-muted hover:text-primary'}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
