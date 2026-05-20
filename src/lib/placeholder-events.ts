import { Category } from '@/types';

export type PlaceholderEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: Exclude<Category, 'alle'>;
  emoji: string;
};

export const PLACEHOLDER_EVENTS: PlaceholderEvent[] = [
  // Sport
  {
    id: '1',
    title: 'Heimspiel: 1. FC Heidenheim vs. VfB',
    date: 'Sa, 16. Mai',
    time: '15:30 Uhr',
    location: 'Voith-Arena, Heidenheim',
    category: 'sport',
    emoji: '⚽',
  },
  {
    id: '2',
    title: 'Stadtlauf Aalen 2026',
    date: 'So, 24. Mai',
    time: '09:00 Uhr',
    location: 'Marktplatz, Aalen',
    category: 'sport',
    emoji: '⚽',
  },
  // Kultur
  {
    id: '3',
    title: 'Theateraufführung: Der Zerbrochne Krug',
    date: 'Fr, 22. Mai',
    time: '19:30 Uhr',
    location: 'Theater Heidenheim',
    category: 'kultur',
    emoji: '🎭',
  },
  {
    id: '4',
    title: 'Jazzkonzert im Stadtpark',
    date: 'Sa, 23. Mai',
    time: '20:00 Uhr',
    location: 'Stadtpark Aalen',
    category: 'kultur',
    emoji: '🎭',
  },
  // Bildung
  {
    id: '5',
    title: 'VHS Kurs: Italienisch für Anfänger',
    date: 'Mo, 18. Mai',
    time: '18:00 Uhr',
    location: 'Volkshochschule Heidenheim',
    category: 'bildung',
    emoji: '🎓',
  },
  {
    id: '6',
    title: 'Vortrag: Klimawandel und unsere Region',
    date: 'Di, 19. Mai',
    time: '19:00 Uhr',
    location: 'Stadtbibliothek Aalen',
    category: 'bildung',
    emoji: '🎓',
  },
  // Nightlife
  {
    id: '7',
    title: 'Club Night: Electronic Beats',
    date: 'Fr, 22. Mai',
    time: '23:00 Uhr',
    location: 'Club Cosmos, Aalen',
    category: 'nightlife',
    emoji: '🥂',
  },
  {
    id: '8',
    title: 'After-Work Drinks',
    date: 'Do, 21. Mai',
    time: '18:00 Uhr',
    location: 'Bar Central, Heidenheim',
    category: 'nightlife',
    emoji: '🥂',
  },
  // Familie
  {
    id: '9',
    title: 'Kinderfest im Freizeitpark',
    date: 'Sa, 23. Mai',
    time: '10:00 Uhr',
    location: 'Freizeitpark Heidenheim',
    category: 'familie',
    emoji: '🧸',
  },
  {
    id: '10',
    title: 'Vorlesestunde für Kinder',
    date: 'Mi, 20. Mai',
    time: '15:00 Uhr',
    location: 'Stadtbibliothek Aalen',
    category: 'familie',
    emoji: '🧸',
  },
  // Märkte
  {
    id: '11',
    title: 'Wochenmarkt Heidenheim',
    date: 'Mi, 21. Mai',
    time: '07:00 Uhr',
    location: 'Marktplatz, Heidenheim',
    category: 'maerkte',
    emoji: '🛒',
  },
  {
    id: '12',
    title: 'Flohmarkt Stadtgarten',
    date: 'So, 24. Mai',
    time: '08:00 Uhr',
    location: 'Stadtgarten, Aalen',
    category: 'maerkte',
    emoji: '🛒',
  },
];
