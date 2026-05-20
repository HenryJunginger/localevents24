'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const primaryBtn = cn(
  'inline-flex items-center justify-center font-semibold rounded-md transition-colors',
  'bg-primary text-white hover:bg-primary-hover',
);

export function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <LocationPinIcon />
          <span className="text-navy font-bold text-lg leading-none">LocalEvents24</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link
            href="/merkliste"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Merkliste
          </Link>
          <Link
            href="/login"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Einloggen
          </Link>
          <Link href="/event-erstellen" className={cn(primaryBtn, 'px-3 py-1.5 text-sm')}>
            + Event erstellen
          </Link>
        </nav>

        {/* Mobile: nur CTA */}
        <Link href="/event-erstellen" className={cn(primaryBtn, 'sm:hidden px-3 py-1.5 text-sm')}>
          + Event
        </Link>
      </div>
    </header>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
        fill="#F97316"
      />
    </svg>
  );
}
