"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";
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
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(character));
      }}
    >
      <Favorite isFavorite={isFavorite} type={type} />
    </button>
  );
};
