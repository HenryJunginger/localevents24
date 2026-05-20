import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlzInput } from '@/components/ui/PlzInput';
import { Badge } from '@/components/ui/Badge';
import { CategoryFilter } from '@/components/ui/CategoryFilter';

const PLACEHOLDER_EVENTS = [
  {
    id: '1',
    title: 'Heimspiel: 1. FC Heidenheim vs. VfB',
    date: 'Samstag, 16. Mai',
    time: '15:30 Uhr',
    location: 'Voith-Arena, Heidenheim',
    category: 'Sport',
    emoji: '⚽',
  },
  {
    id: '2',
    title: 'VHS Kurs: Italienisch für Anfänger',
    date: 'Montag, 18. Mai',
    time: '18:00 Uhr',
    location: 'Volkshochschule Heidenheim',
    category: 'Bildung',
    emoji: '🎓',
  },
  {
    id: '3',
    title: 'Wochenmarkt Heidenheim',
    date: 'Mittwoch, 21. Mai',
    time: '07:00 Uhr',
    location: 'Marktplatz, Heidenheim',
    category: 'Märkte',
    emoji: '🛒',
  },
];

export default function HomePage() {
  return (
    <div className="bg-surface min-h-full">
      {/* Hero: Suche + Kategorie-Filter */}
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="bg-background rounded-lg shadow-card border border-border p-5 max-w-2xl">
            <Input
              id="search"
              label="Was suchst du?"
              placeholder="z.B. Flohmarkt, Konzert"
              icon={<SearchIcon />}
            />

            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-end">
              <PlzInput />

              <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                Finden
              </Button>
            </div>
          </div>

          <CategoryFilter />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Event-Liste */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
              Events in deiner Nähe{' '}
              <span className="text-muted font-normal normal-case tracking-normal">
                (Beispiel-Einträge)
              </span>
            </h2>
            <select className="text-sm border border-border rounded-md bg-background text-foreground py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Sortieren: Datum</option>
              <option>Sortieren: Distanz</option>
            </select>
          </div>

          <div className="space-y-3">
            {PLACEHOLDER_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: (typeof PLACEHOLDER_EVENTS)[number] }) {
  return (
    <div className="bg-background rounded-lg border border-border shadow-card p-4 flex gap-4 hover:border-primary transition-colors cursor-pointer">
      <div className="emoji-box w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-surface border border-border shrink-0 flex items-center justify-center text-2xl">
        {event.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{event.title}</h3>
        <p className="text-primary text-sm font-semibold mt-1">
          {event.date} | {event.time}
        </p>
        <p className="text-muted text-xs mt-0.5 truncate">{event.location}</p>
        <div className="mt-2">
          <Badge label={event.category} />
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

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
