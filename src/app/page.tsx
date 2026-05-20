import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlzInput } from '@/components/ui/PlzInput';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { EventCard } from '@/components/ui/EventCard';
import { PLACEHOLDER_EVENTS } from '@/lib/events';
import { CATEGORY_PARAM } from '@/lib/categories';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const raw = params[CATEGORY_PARAM];
  const activeIds = typeof raw === 'string' ? raw.split(',').filter(Boolean) : [];

  const filteredEvents =
    activeIds.length === 0
      ? PLACEHOLDER_EVENTS
      : PLACEHOLDER_EVENTS.filter((e) => activeIds.includes(e.category));

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

          {filteredEvents.length === 0 ? (
            <p className="text-muted text-sm py-10 text-center">
              Keine Events für diese Kategorie gefunden.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </div>
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
