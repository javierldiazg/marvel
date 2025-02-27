"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useCharacterDetail } from "@/hooks/useCharacterDetail";
import { ComicCard } from "@/components/ComicCard";
import styles from "./CharacterDetail.module.scss";

export default function CharacterPage() {
  const { id } = useParams(); // Obtiene el id de la URL
  const { character, comics, isLoadingCharacter, isLoadingComics } =
    useCharacterDetail(id as string);

  if (isLoadingCharacter) return <div>Cargando personaje...</div>;

  return (
    <main className={styles.main}>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <Image
            className={styles.heroImage}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width={320}
            height={320}
          />
          <div className={styles.heroText}>
            <h1>{character.name}</h1>
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
              {comics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
