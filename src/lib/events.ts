import type { LocalEvent } from '@/types';

const STORAGE_KEY = 'localevents24_events';

export function loadEvents(): LocalEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalEvent[]) : [];
  } catch {
    return [];
  }
}

export function saveEvent(data: Omit<LocalEvent, 'id' | 'createdAt'>): LocalEvent {
  const event: LocalEvent = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const events = loadEvents();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([event, ...events]));
  return event;
}

export function formatEventDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
