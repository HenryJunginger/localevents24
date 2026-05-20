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
