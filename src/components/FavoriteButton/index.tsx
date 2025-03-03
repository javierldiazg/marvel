"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { Favorite } from "../Favorite";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  character: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  };
  type?: "detail" | "list";
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  character,
  type,
}) => {
  const { state, dispatch } = useFavorites();
  const isFavorite = state.favorites.some((fav) => fav.id === character.id);

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: "TOGGLE_FAVORITE", payload: character });
      }}
    >
      <Favorite isFavorite={isFavorite} type={type} />
    </button>
  );
};
