export type Category =
  | 'sport'
  | 'kultur'
  | 'bildung'
  | 'nightlife'
  | 'familie'
  | 'maerkte'
  | 'alle';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: Category;
  imageUrl?: string;
  isFeatured?: boolean;
}

export interface SearchParams {
  query: string;
  plz: string;
  category: Category;
}

export interface LocalEvent {
  id: string;
  title: string;
  description?: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  location: string;
  categoryId: string; // matches EVENT_CATEGORIES[].id
  createdAt: number;  // Date.now() timestamp
  lat?: number;
  lng?: number;
}
