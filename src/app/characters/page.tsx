"use client";

import { useState } from "react";
import { CharacterType } from "../../utils/constants";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import styles from "./Characters.module.scss";

export default function CharactersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { characters, isLoading, isError, error } = useCharacters(searchTerm);

  return (
    <main className={styles.main}>
      <SearchBar onSearch={setSearchTerm} resultsCount={characters.length} />

      {isLoading && <p>Loading...</p>}
      {isError && error && <p>Error: {error.message}</p>}

      <div className={styles.grid}>
        {characters.map((character: CharacterType) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
}
