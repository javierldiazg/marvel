"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CharacterCard } from "@/components/CharacterCard";
import styles from "./Favorites.module.scss";

export default function FavoritesPage() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const [search, setSearch] = useState("");
  const filteredFavorites = favorites.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <h2>FAVORITES</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH A CHARACTER"
          className={styles.searchInput}
        />
        <div className={styles.resultsCount}>
          {filteredFavorites.length} RESULTS
        </div>
      </div>
      {filteredFavorites.length === 0 ? (
        <p className={styles.empty}>
          There are no favorite characters with that name.
        </p>
      ) : (
        <div className={styles.grid}>
          {filteredFavorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </main>
  );
}
