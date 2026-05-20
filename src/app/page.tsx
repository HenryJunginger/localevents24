import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { EventList } from '@/components/events/EventList';

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
              <Input
                id="plz"
                label="PLZ / Ort"
                placeholder="z.B. 89522 Heidenheim"
                className="sm:max-w-[200px]"
              />
              <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                Finden
              </Button>
            </div>
          </div>

          <CategoryFilter />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <EventList />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
