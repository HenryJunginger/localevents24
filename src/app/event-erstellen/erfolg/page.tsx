import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function EventErfolgPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Event veröffentlicht!</h1>
        <p className="text-muted text-sm mb-8">
          Dein Event wurde erfolgreich eingereicht. Es wird nach der Prüfung auf LocalEvents24
          erscheinen.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Zur Startseite
            </Button>
          </Link>
          <Link href="/event-erstellen">
            <Button variant="secondary" size="lg">
              Weiteres Event erstellen
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
