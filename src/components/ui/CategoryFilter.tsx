'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CATEGORIES, CATEGORY_PARAM } from '@/lib/categories';

function CategoryFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeIds = searchParams.get(CATEGORY_PARAM)?.split(',').filter(Boolean) ?? [];

  function toggle(id: string) {
    const next = activeIds.includes(id)
      ? activeIds.filter((c) => c !== id)
      : [...activeIds, id];

    const params = new URLSearchParams(searchParams.toString());
    if (next.length === 0) {
      params.delete(CATEGORY_PARAM);
    } else {
      params.set(CATEGORY_PARAM, next.join(','));
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ id, label, emoji }) => {
        const isActive = activeIds.includes(id);
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            aria-pressed={isActive}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer',
              isActive
                ? 'bg-primary text-white border-primary'
                : 'bg-background text-muted border-border hover:border-primary hover:text-foreground',
            )}
          >
            <span aria-hidden>{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-24 rounded-full bg-border animate-pulse"
          style={{ width: `${72 + (i % 3) * 20}px` }}
        />
      ))}
    </div>
  );
}

export function CategoryFilter() {
  return (
    <Suspense fallback={<CategoryFilterSkeleton />}>
      <CategoryFilterInner />
    </Suspense>
  );
}
