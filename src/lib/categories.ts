import { Category } from '@/types';

export const CATEGORIES: { id: Exclude<Category, 'alle'>; label: string; emoji: string }[] = [
  { id: 'sport', label: 'Sport', emoji: '⚽' },
  { id: 'kultur', label: 'Kultur', emoji: '🎭' },
  { id: 'bildung', label: 'Bildung', emoji: '🎓' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🥂' },
  { id: 'familie', label: 'Familie', emoji: '🧸' },
  { id: 'maerkte', label: 'Märkte', emoji: '🛒' },
];
