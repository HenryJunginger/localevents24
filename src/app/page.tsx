import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlzInput } from '@/components/ui/PlzInput';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { EventList } from '@/components/events/EventList';
import { CATEGORIES } from '@/lib/categories';

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
        {/* Kategorie-Schnellauswahl */}
        <section>
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
        </section>

        {/* Event-Liste */}
        <EventList />
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
