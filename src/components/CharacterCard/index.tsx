"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import styles from "./CharacterCard.module.scss";

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  };
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleClick = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <Image
        className={styles.image}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={500}
        height={500}
        layout="responsive"
      />
      <div className={styles.wrapper}>
        <div className={styles.title}>{character.name}</div>
        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(character));
          }}
        >
          {isFavorite ? "★ Favorito" : "☆ Agregar"}
        </button>
      </div>
    </div>
  );
};
