import {
  Baby,
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
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 'konzerte', label: 'Konzerte', Icon: Music },
  { id: 'sport', label: 'Sport', Icon: Dumbbell },
  { id: 'familie', label: 'Familie', Icon: Baby },
  { id: 'kultur', label: 'Kultur', Icon: Palette },
  { id: 'nightlife', label: 'Party & Nightlife', Icon: PartyPopper },
  { id: 'maerkte', label: 'Märkte & Flohmärkte', Icon: ShoppingBag },
  { id: 'workshops', label: 'Workshops', Icon: Lightbulb },
  { id: 'sonstiges', label: 'Sonstiges', Icon: MoreHorizontal },
];

export const CATEGORY_PARAM = 'kategorien';
