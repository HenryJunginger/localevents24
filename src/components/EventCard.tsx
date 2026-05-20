import { Badge } from '@/components/ui/Badge';
import { CATEGORIES } from '@/lib/categories';
import { PlaceholderEvent } from '@/lib/placeholder-events';

export function EventCard({ event }: { event: PlaceholderEvent }) {
  const categoryLabel = CATEGORIES.find(c => c.id === event.category)?.label ?? event.category;

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
          <Badge label={categoryLabel} />
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
