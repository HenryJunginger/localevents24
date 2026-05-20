import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/categories';
import { PLACEHOLDER_EVENTS } from '@/lib/placeholder-events';
import { EventCard } from '@/components/EventCard';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.id === slug);
  if (!category) return {};
  return {
    title: `${category.label} – Events | LocalEvents24`,
    description: `Alle ${category.label}-Events in deiner Nähe auf LocalEvents24.`,
  };
}

export default async function KategoriePage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.id === slug);
  if (!category) notFound();

  const events = PLACEHOLDER_EVENTS.filter(e => e.category === slug);
  const otherCategories = CATEGORIES.filter(c => c.id !== slug);

  return (
    <div className="bg-surface min-h-full">
      {/* Header-Banner */}
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{category.label}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="emoji-circle w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-3xl shadow-card shrink-0">
              {category.emoji}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{category.label}</h1>
              <p className="text-sm text-muted mt-0.5">
                {events.length === 0
                  ? 'Aktuell keine Events'
                  : `${events.length} Event${events.length !== 1 ? 's' : ''} gefunden`}
                <span className="mx-1.5">·</span>
                <span>Beispiel-Einträge</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Event-Liste */}
        <section>
          {events.length > 0 ? (
            <div className="space-y-3">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background rounded-lg border border-border shadow-card">
              <span className="text-5xl">{category.emoji}</span>
              <p className="text-foreground font-semibold mt-4">
                Noch keine {category.label}-Events
              </p>
              <p className="text-muted text-sm mt-1 mb-6">
                Sei der Erste und erstelle ein Event in dieser Kategorie.
              </p>
              <Link
                href="/event-erstellen"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                + Event erstellen
              </Link>
            </div>
          )}
        </section>

        {/* Andere Kategorien */}
        <section>
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Andere Kategorien
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map(cat => (
              <Link
                key={cat.id}
                href={`/kategorie/${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-card text-sm font-medium text-muted hover:border-primary hover:text-primary hover:bg-primary-light transition-colors"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
