'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { EVENT_CATEGORIES } from '@/lib/categories';
import { loadEvents, formatEventDate } from '@/lib/events';
import type { LocalEvent } from '@/types';

const PLACEHOLDER_EVENTS: LocalEvent[] = [
  {
    id: 'p-1',
    title: 'Heimspiel: 1. FC Heidenheim vs. VfB',
    date: '2026-05-17',
    time: '15:30',
    location: 'Voith-Arena, Heidenheim',
    categoryId: 'sport',
    createdAt: 0,
  },
  {
    id: 'p-2',
    title: 'VHS Kurs: Italienisch für Anfänger',
    date: '2026-05-18',
    time: '18:00',
    location: 'Volkshochschule Heidenheim',
    categoryId: 'workshops',
    createdAt: 0,
  },
  {
    id: 'p-3',
    title: 'Wochenmarkt Heidenheim',
    date: '2026-05-21',
    time: '07:00',
    location: 'Marktplatz, Heidenheim',
    categoryId: 'maerkte',
    createdAt: 0,
  },
];

export function EventList() {
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEvents(loadEvents());
    setMounted(true);
  }, []);

  const isPlaceholder = !mounted || events.length === 0;
  const displayed = isPlaceholder ? PLACEHOLDER_EVENTS : events;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
          Events in deiner Nähe{' '}
          {isPlaceholder && (
            <span className="text-muted font-normal normal-case tracking-normal">
              (Beispiel-Einträge)
            </span>
          )}
        </h2>
        <select className="text-sm border border-border rounded-md bg-background text-foreground py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Sortieren: Datum</option>
          <option>Sortieren: Distanz</option>
        </select>
      </div>

      {!isPlaceholder && events.length === 0 && (
        <div className="text-center py-12 text-muted">
          <p className="text-lg">Noch keine Events</p>
          <p className="text-sm mt-1">
            Sei der Erste und{' '}
            <Link href="/event-erstellen" className="text-primary hover:underline">
              erstelle ein Event
            </Link>
            .
          </p>
        </div>
      )}

      <div className="space-y-3">
        {displayed.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: LocalEvent }) {
  const category = EVENT_CATEGORIES.find((c) => c.id === event.categoryId);
  const { Icon, emoji, label } = category ?? {
    Icon: null,
    emoji: '📌',
    label: event.categoryId,
  };

  return (
    <div className="bg-background rounded-lg border border-border shadow-card p-4 flex gap-4 hover:border-primary transition-colors cursor-pointer">
      <div className="emoji-box w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-surface border border-border shrink-0 flex items-center justify-center text-2xl">
        {Icon ? (
          <span className="flex flex-col items-center gap-1">
            <Icon size={28} className="text-primary" />
          </span>
        ) : (
          emoji
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{event.title}</h3>
        <p className="text-primary text-sm font-semibold mt-1">
          {formatEventDate(event.date)} | {event.time} Uhr
        </p>
        <p className="text-muted text-xs mt-0.5 truncate">{event.location}</p>
        {event.description && (
          <p className="text-muted text-xs mt-1 line-clamp-1">{event.description}</p>
        )}
        <div className="mt-2">
          <Badge label={label} />
        </div>
      </div>

      <button
        className="text-muted hover:text-primary transition-colors shrink-0 self-start"
        aria-label="Merken"
      >
        <HeartIcon />
      </button>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
