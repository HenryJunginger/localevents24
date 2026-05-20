import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <span>© {new Date().getFullYear()} LocalEvents24</span>
        <nav className="flex items-center gap-5">
          <Link href="/impressum" className="hover:text-foreground transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-foreground transition-colors">
            Datenschutz
          </Link>
          <Link href="/ueber-uns" className="hover:text-foreground transition-colors">
            Über uns
          </Link>
        </nav>
      </div>
    </footer>
  );
}
