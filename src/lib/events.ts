export interface LocalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  emoji: string;
}

export const PLACEHOLDER_EVENTS: LocalEvent[] = [
  {
    id: '1',
    title: 'Heimspiel: 1. FC Heidenheim vs. VfB',
    date: 'Samstag, 16. Mai',
    time: '15:30 Uhr',
    location: 'Voith-Arena, Heidenheim',
    category: 'Sport',
    emoji: '⚽',
  },
  {
    id: '2',
    title: 'VHS Kurs: Italienisch für Anfänger',
    date: 'Montag, 18. Mai',
    time: '18:00 Uhr',
    location: 'Volkshochschule Heidenheim',
    category: 'Bildung',
    emoji: '🎓',
  },
  {
    id: '3',
    title: 'Wochenmarkt Heidenheim',
    date: 'Mittwoch, 21. Mai',
    time: '07:00 Uhr',
    location: 'Marktplatz, Heidenheim',
    category: 'Märkte',
    emoji: '🛒',
  },
];
