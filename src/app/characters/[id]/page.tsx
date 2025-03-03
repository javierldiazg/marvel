"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useCharacterDetail } from "@/hooks/useCharacterDetail";
import { ComicCard } from "@/components/ComicCard";
import { FavoriteButton } from "@/components/FavoriteButton";
import styles from "./CharacterDetail.module.scss";

type Comic = {
  id: number;
  title: string;
  description: string;
  dates: { date: string }[];
  thumbnail: {
    path: string;
    extension: string;
  };
};

export default function CharacterPage() {
  const { id } = useParams();
  const { character, comics, isLoadingCharacter, isLoadingComics } =
    useCharacterDetail(id as string);

  if (isLoadingCharacter) return <div>Cargando personaje...</div>;

  return (
    <main className={styles.main}>
      <div className={styles.heroContainer} data-testid="hero-container">
        <div className={styles.hero}>
          <Image
            className={styles.heroImage}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width={320}
            height={320}
          />
          <div className={styles.heroText}>
            <div className={styles.heroTitle}>
              <h1>{character.name}</h1>
              <div className={styles.buttonWrapper}>
                <FavoriteButton character={character} type="detail" />
              </div>
            </div>
            <p>{character.description || ""}</p>
          </div>
        </div>
      </div>
      <section className={styles.comicsSection}>
        <h2>COMICS</h2>
        <div className={styles.comicsGrid}>
          {isLoadingComics ? (
            <p>Loading comics...</p>
          ) : (
            <>
              {comics.map((comic: Comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
