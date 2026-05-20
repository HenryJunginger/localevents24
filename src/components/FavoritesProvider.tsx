'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextValue {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: new Set(),
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        setFavorites(new Set(JSON.parse(stored) as string[]));
      } catch {}
    }
  }, []);

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('favorites', JSON.stringify([...next]));
      return next;
    });
  }

  function isFavorite(id: string) {
    return favorites.has(id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
