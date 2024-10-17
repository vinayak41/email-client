import React, { useEffect, useState, useCallback, useMemo } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const addToFavorite = useCallback(
    (id: string) => {
      if (!isFavorite(id)) {
        setFavorites((prevFavorites) => [...prevFavorites, id]);
      }
    },
    [isFavorite]
  );

  const removeFromFavorite = useCallback(
    (id: string) => {
      if (isFavorite(id)) {
        setFavorites((prevFavorites) => prevFavorites.filter((i) => i !== id));
      }
    },
    [isFavorite]
  );

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(storedFavorites.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", favorites.join(","));
  }, [favorites]);

  return useMemo(
    () => ({
      isFavorite,
      addToFavorite,
      removeFromFavorite,
      favorites,
    }),
    [isFavorite, addToFavorite, removeFromFavorite, favorites]
  );
};

export default useFavorites;
