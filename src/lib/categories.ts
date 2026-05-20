import {
  Baby,
  BookOpen,
  Dumbbell,
  Lightbulb,
  MoreHorizontal,
  Music,
  Palette,
  PartyPopper,
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface EventCategory {
  id: string;
  label: string;
  Icon: LucideIcon;
  emoji: string;
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 'konzerte',  label: 'Konzerte',            Icon: Music,          emoji: '🎵' },
  { id: 'sport',     label: 'Sport',               Icon: Dumbbell,       emoji: '⚽' },
  { id: 'familie',   label: 'Familie',             Icon: Baby,           emoji: '🧸' },
  { id: 'kultur',    label: 'Kultur',              Icon: Palette,        emoji: '🎭' },
  { id: 'nightlife', label: 'Party & Nightlife',   Icon: PartyPopper,    emoji: '🥂' },
  { id: 'maerkte',   label: 'Märkte & Flohmärkte', Icon: ShoppingBag,    emoji: '🛒' },
  { id: 'workshops', label: 'Workshops',           Icon: Lightbulb,      emoji: '💡' },
  { id: 'bildung',   label: 'Bildung',             Icon: BookOpen,       emoji: '🎓' },
  { id: 'sonstiges', label: 'Sonstiges',           Icon: MoreHorizontal, emoji: '📌' },
];

// Emoji-only alias used by kategorie pages, EventCard, and CategoryFilter
export const CATEGORIES = EVENT_CATEGORIES.map(({ id, label, emoji }) => ({ id, label, emoji }));

export const CATEGORY_PARAM = 'kategorien';
