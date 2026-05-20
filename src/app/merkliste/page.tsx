'use client';

import { PLACEHOLDER_EVENTS } from '@/lib/events';
import { useFavorites } from '@/components/FavoritesProvider';
import { EventCard } from '@/components/ui/EventCard';

export default function MerklistePage() {
  const { favorites } = useFavorites();
  const favoriteEvents = PLACEHOLDER_EVENTS.filter((e) => favorites.has(e.id));

  return (
    <div className="bg-surface min-h-full">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-foreground mb-6">Meine Merkliste</h1>

        {favoriteEvents.length === 0 ? (
          <div className="text-center py-20">
            <HeartOutlineIcon />
            <p className="text-muted mt-4 text-sm max-w-xs mx-auto">
              Noch keine Events gespeichert. Drücke das Herz bei einem Event, um es hier zu
              speichern.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeartOutlineIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-muted mx-auto"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
