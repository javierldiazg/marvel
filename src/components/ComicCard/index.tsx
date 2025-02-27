"use client";

import Image from "next/image";
import styles from "./ComicCard.module.scss";

interface ComicCardProps {
  comic: {
    id: number;
    title: string;
    dates: { date: string }[];
    thumbnail: { path: string; extension: string };
  };
}

export const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  return (
    <div key={comic.id} className={styles.container}>
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        width={200}
        height={300}
      />
      <div className={styles.info}>
        <h6>{comic.title}</h6>
        <p>{new Date(comic.dates[0].date).getFullYear()}</p>
      </div>
    </div>
  );
};
