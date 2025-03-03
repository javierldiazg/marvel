"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FavoriteButton } from "../FavoriteButton";
import styles from "./CharacterCard.module.scss";

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  };
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/characters/${character.id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={190}
          height={190}
          objectFit="cover"
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>{character.name}</div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonWrapper}>
            <FavoriteButton character={character} />
          </div>
        </div>
      </div>
    </div>
  );
};
