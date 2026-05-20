'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <LocationPinIcon />
          <span className="text-navy font-bold text-lg leading-none">LocalEvents24</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link href="/merkliste" className="text-sm text-muted hover:text-foreground transition-colors">
            Merkliste
          </Link>
          <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">
            Einloggen
          </Link>
          <Button size="sm">+ Event erstellen</Button>
        </nav>

        {/* Mobile: nur CTA */}
        <div className="sm:hidden">
          <Button size="sm">+ Event</Button>
        </div>
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
