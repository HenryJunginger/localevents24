'use client';

import { useTheme } from '@/components/ThemeProvider';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
      className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
    >
      <span className="relative w-10 h-5 rounded-full border border-border bg-surface transition-colors">
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-primary transition-transform duration-200 ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      <span>{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
}
